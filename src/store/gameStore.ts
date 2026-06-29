import { create } from 'zustand';
import type { GameState, Stats, DifficultyLevel } from '../types/game';
import type { Choice } from '../types/events';
import { DEFAULT_STATS, OPPONENT_DEFAULT_STATS, DIFFICULTY_MODIFIERS } from '../utils/constants';
import { clamp } from '../utils/random';
import { recalcPolls } from '../engine/pollingEngine';
import { projectEV } from '../engine/electoralCollege';
import { pickEvent, applyChoice, applyOpponentDay, scaleEffects } from '../engine/eventEngine';
import { tickEconomy } from '../engine/economySystem';
import { checkScandalEscalation, SCANDAL_STAT_HIT } from '../engine/scandalSystem';
import { autosave, saveGame, deleteSave } from '../engine/saveSystem';
import { candidates, opponents } from '../data/candidates';

function defaultState(): GameState {
  return {
    phase: 'menu',
    day: 1,
    totalDays: 120,
    candidate: null,
    opponent: null,
    stats: { ...DEFAULT_STATS },
    opponentStats: { ...OPPONENT_DEFAULT_STATS },
    polls: { player: 50, opponent: 50 },
    electoralVotes: { player: 220, opponent: 210, tossup: 108 },
    eventLog: [],
    activeEffects: [],
    difficulty: 'normal',
    savedAt: null,
    scandalStage: 0,
    achievements: [],
    pendingEventId: null,
    lastChoiceHeadline: null,
    unlockedEventIds: [],
    seenEventIds: [],
  };
}

interface GameStore extends GameState {
  // Actions
  setDifficulty: (d: DifficultyLevel) => void;
  startGame: (candidateId: string, opponentId: string) => void;
  loadState: (s: GameState) => void;
  advanceDay: () => void;
  makeChoice: (choice: Choice, eventId: string) => void;
  returnToDashboard: () => void;
  goToMainMenu: () => void;
  saveToSlot: (slot: number) => void;
  deleteSaveSlot: (slot: number) => void;
}

export const useGameStore = create<GameStore>((set, get) => ({
  ...defaultState(),

  setDifficulty: (difficulty) => set({ difficulty }),

  startGame: (candidateId, opponentId) => {
    const candidate = candidates.find((c) => c.id === candidateId) ?? candidates[0];
    const opponent = opponents.find((o) => o.id === opponentId) ?? opponents[0];
    const state = defaultState();
    state.candidate = candidate;
    state.opponent = opponent;
    state.phase = 'campaign';
    state.polls = recalcPolls(state.stats, state.opponentStats);
    state.electoralVotes = projectEV(state.stats, state.opponentStats);
    set(state);
  },

  loadState: (s) =>
    set({
      ...defaultState(),
      ...s,
      unlockedEventIds: s.unlockedEventIds ?? [],
      seenEventIds: s.seenEventIds ?? [],
    }),

  advanceDay: () => {
    const state = get();
    if (state.phase !== 'campaign') return;

    const { day, totalDays, difficulty } = state;
    const diffMod = DIFFICULTY_MODIFIERS[difficulty];

    // Apply pending long-term effects
    let stats = { ...state.stats };
    const remainingEffects = state.activeEffects.filter((eff) => {
      if (eff.appliesOnDay <= day) {
        for (const [key, delta] of Object.entries(eff.effects)) {
          const k = key as keyof Stats;
          if (k === 'funds') {
            (stats as Record<string, number>)[k] = Math.max(0, (stats[k] as number) + (delta as number));
          } else {
            (stats as Record<string, number>)[k] = clamp((stats[k] as number) + (delta as number));
          }
        }
        return false;
      }
      return true;
    });

    // Economy tick
    const econEffects = tickEconomy(stats, day);
    for (const [key, delta] of Object.entries(econEffects)) {
      const k = key as keyof Stats;
      if (k === 'funds') {
        (stats as Record<string, number>)[k] = Math.max(0, (stats[k] as number) + (delta as number));
      } else {
        (stats as Record<string, number>)[k] = clamp((stats[k] as number) + (delta as number));
      }
    }

    // Scandal check
    const newScandalStage = checkScandalEscalation(
      state.scandalStage,
      stats.scandalRisk,
      diffMod.scandalsFreq,
    );
    if (newScandalStage > state.scandalStage) {
      const hit = SCANDAL_STAT_HIT[newScandalStage] as Partial<Stats>;
      for (const [key, delta] of Object.entries(hit)) {
        const k = key as keyof Stats;
        (stats as Record<string, number>)[k] = clamp((stats[k] as number) + (delta as number) * diffMod.eventPenaltyMult);
      }
    }

    // Opponent AI tick
    const opponentStats = applyOpponentDay(state.opponentStats, stats);

    // Check for election
    if (day >= totalDays) {
      const polls = recalcPolls(stats, opponentStats);
      const electoralVotes = projectEV(stats, opponentStats);
      set({ stats, opponentStats, polls, electoralVotes, phase: 'election-night', scandalStage: newScandalStage, activeEffects: remainingEffects });
      return;
    }

    // Pick and show next event
    const nextState: Partial<GameState> = {
      stats,
      opponentStats,
      day: day + 1,
      scandalStage: newScandalStage,
      activeEffects: remainingEffects,
      polls: recalcPolls(stats, opponentStats),
      electoralVotes: projectEV(stats, opponentStats),
    };

    const event = pickEvent({ ...state, ...nextState } as GameState);
    if (event) {
      nextState.pendingEventId = event.id;
      // Mark as seen so it won't repeat, and consume it from the unlocked queue.
      nextState.seenEventIds = [...(state.seenEventIds ?? []), event.id];
      nextState.unlockedEventIds = (state.unlockedEventIds ?? []).filter((id) => id !== event.id);
      if (event.isDebate) nextState.phase = 'debate';
      else if (event.isPress) nextState.phase = 'press';
      else nextState.phase = 'event';
    }

    set(nextState as GameState);
    autosave({ ...state, ...nextState } as GameState);
  },

  makeChoice: (choice, eventId) => {
    const state = get();
    const diffMod = DIFFICULTY_MODIFIERS[state.difficulty];
    const stats = applyChoice(state.stats, choice, diffMod.eventPenaltyMult);

    // Queue long-term effects (difficulty-scaled the same way as immediate effects)
    const newEffects = [...state.activeEffects];
    if (choice.longTermEffects && choice.longTermDelay) {
      newEffects.push({
        id: `${eventId}-lt-${state.day}`,
        label: choice.headline,
        effects: scaleEffects(choice.longTermEffects, diffMod.eventPenaltyMult),
        appliesOnDay: state.day + choice.longTermDelay,
      });
    }

    // Branching: queue any events this choice unlocks
    const unlockedEventIds = choice.unlocks?.length
      ? Array.from(new Set([...(state.unlockedEventIds ?? []), ...choice.unlocks]))
      : state.unlockedEventIds ?? [];

    const polls = recalcPolls(stats, state.opponentStats);
    const electoralVotes = projectEV(stats, state.opponentStats);

    const logEntry = {
      day: state.day,
      headline: choice.headline.replace(/"\{name\}"/g, state.candidate?.name ?? 'Candidate'),
      category: 'news',
    };

    set({
      stats,
      polls,
      electoralVotes,
      activeEffects: newEffects,
      unlockedEventIds,
      lastChoiceHeadline: logEntry.headline,
      eventLog: [logEntry, ...state.eventLog].slice(0, 50),
      pendingEventId: null,
    });
  },

  returnToDashboard: () => set({ phase: 'campaign', pendingEventId: null }),

  goToMainMenu: () => set(defaultState()),

  saveToSlot: (slot) => {
    saveGame(get(), slot);
  },

  deleteSaveSlot: (slot) => {
    deleteSave(slot);
  },
}));

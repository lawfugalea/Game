import { create } from 'zustand';
import type { GameState, Stats, DifficultyLevel, Candidate } from '../types/game';
import type { Choice } from '../types/events';
import { DEFAULT_STATS, OPPONENT_DEFAULT_STATS, DIFFICULTY_MODIFIERS, TOTAL_DAYS, EV_TO_WIN, ACTIONS_PER_DAY, MAX_DISTRICT_PUSH } from '../utils/constants';
import { getCampaignAction } from '../data/campaignActions';
import { clamp, chance } from '../utils/random';
import { recalcPolls } from '../engine/pollingEngine';
import { projectEV } from '../engine/electoralCollege';
import { pickEvent, applyChoice, applyOpponentDay, scaleEffects } from '../engine/eventEngine';
import { tickEconomy } from '../engine/economySystem';
import { checkScandalEscalation, SCANDAL_STAT_HIT } from '../engine/scandalSystem';
import { autosave, saveGame, deleteSave, recordEarnedAchievements } from '../engine/saveSystem';
import { evaluateAchievements, type AchContext, type AchSnapshot } from '../engine/achievements';
import { playScandal } from '../engine/audioSystem';
import { candidates, opponents } from '../data/candidates';

// Evaluates achievements against a post-mutation snapshot, persists any newly-earned ones to the
// cross-run profile, and returns the merged in-run earned list.
function mergeAchievements(snapshot: AchSnapshot, ctx: AchContext, prior: string[]): string[] {
  const merged = Array.from(new Set([...prior, ...evaluateAchievements(snapshot, ctx)]));
  const newly = merged.filter((id) => !prior.includes(id));
  if (newly.length) recordEarnedAchievements(newly);
  return merged;
}

function defaultState(): GameState {
  return {
    phase: 'menu',
    day: 1,
    totalDays: TOTAL_DAYS,
    candidate: null,
    opponent: null,
    stats: { ...DEFAULT_STATS },
    opponentStats: { ...OPPONENT_DEFAULT_STATS },
    prevStats: null,
    polls: { player: 50, opponent: 50 },
    electoralVotes: { player: 32, opponent: 33, tossup: 0 },
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
    dayEventsRemaining: 0,
    actionsRemaining: ACTIONS_PER_DAY,
    districtPushes: {},
    storyFlags: [],
  };
}

// Sentiment stats that drift back toward the centre each day, so a lead can't be banked
// and a slump isn't permanent. Funds, scandal, stamina, party/donor support are excluded.
const REVERT_KEYS: (keyof Stats)[] = [
  'popularity', 'trust', 'momentum', 'mediaApproval', 'economyConfidence',
  'foreignPolicy', 'youthVote', 'workingClass', 'urban', 'rural', 'independents',
];

// How many events the player faces on a given day, by difficulty (more pressure = more events).
function eventsPerDay(difficulty: DifficultyLevel): number {
  switch (difficulty) {
    case 'easy': return chance(40) ? 2 : 1;
    case 'normal': return chance(55) ? 3 : 2;
    case 'hard': return chance(60) ? 3 : 2;
    case 'brutal': return chance(35) ? 4 : 3;
  }
}

// Picks the next event from a state snapshot and returns the slice of state needed to show it.
function queueEvent(base: GameState): Partial<GameState> {
  const event = pickEvent(base);
  if (!event) return { phase: 'campaign', pendingEventId: null };
  return {
    pendingEventId: event.id,
    seenEventIds: [...(base.seenEventIds ?? []), event.id],
    unlockedEventIds: (base.unlockedEventIds ?? []).filter((id) => id !== event.id),
    phase: event.isDebate ? 'debate' : event.isPress ? 'press' : 'event',
  };
}

interface GameStore extends GameState {
  // Actions
  setDifficulty: (d: DifficultyLevel) => void;
  startGame: (candidateId: string, opponentId: string) => void;
  startCustomGame: (candidate: Candidate, opponentId: string, statMods: Partial<Stats>) => void;
  loadState: (s: GameState) => void;
  advanceDay: () => void;
  makeChoice: (choice: Choice, eventId: string) => void;
  runCampaignAction: (actionId: string, districtCode?: string) => void;
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
    state.polls = recalcPolls(state.stats, state.opponentStats, state.day, state.totalDays);
    state.electoralVotes = projectEV(state.stats, state.opponentStats, state.districtPushes);
    set(state);
  },

  startCustomGame: (candidate, opponentId, statMods) => {
    const opponent = opponents.find((o) => o.id === opponentId) ?? opponents[0];
    const state = defaultState();
    state.candidate = candidate;
    state.opponent = opponent;
    state.phase = 'campaign';

    // Apply the created leader's background + trait stat modifiers to the opening profile.
    const stats = { ...DEFAULT_STATS };
    for (const [k, v] of Object.entries(statMods)) {
      const key = k as keyof Stats;
      if (key === 'funds') {
        stats[key] = Math.max(0, stats[key] + (v as number));
      } else {
        stats[key] = clamp(stats[key] + (v as number));
      }
    }
    state.stats = stats;

    state.polls = recalcPolls(state.stats, state.opponentStats, state.day, state.totalDays);
    state.electoralVotes = projectEV(state.stats, state.opponentStats, state.districtPushes);
    set(state);
  },

  loadState: (s) =>
    set({
      ...defaultState(),
      ...s,
      unlockedEventIds: s.unlockedEventIds ?? [],
      seenEventIds: s.seenEventIds ?? [],
      dayEventsRemaining: s.dayEventsRemaining ?? 0,
      storyFlags: s.storyFlags ?? [],
      prevStats: s.prevStats ?? null,
      actionsRemaining: s.actionsRemaining ?? ACTIONS_PER_DAY,
      districtPushes: s.districtPushes ?? {},
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
      playScandal();
    }

    // Mean reversion: nudge sentiment stats back toward the centre so leads erode if not
    // actively defended (stronger on harder difficulties). Prevents runaway dominance.
    const revertRate = 0.05 * diffMod.eventPenaltyMult;
    for (const k of REVERT_KEYS) {
      (stats as Record<string, number>)[k] = clamp((stats[k] as number) + (50 - (stats[k] as number)) * revertRate);
    }

    // Opponent AI tick (rubber-bands harder on higher difficulty, presses your scandals,
    // and intensifies toward polling day)
    const opponentStats = applyOpponentDay(state.opponentStats, stats, diffMod.opponentMult, {
      playerScandalRisk: stats.scandalRisk,
      playerScandalStage: newScandalStage,
      day,
      totalDays,
    });

    // Check for election
    if (day >= totalDays) {
      const polls = recalcPolls(stats, opponentStats, day, totalDays);
      const electoralVotes = projectEV(stats, opponentStats, state.districtPushes);
      const achievements = mergeAchievements(
        { stats, difficulty, scandalStage: newScandalStage },
        { won: electoralVotes.player >= EV_TO_WIN, seats: electoralVotes.player },
        state.achievements ?? [],
      );
      set({ stats, opponentStats, polls, electoralVotes, phase: 'election-night', scandalStage: newScandalStage, activeEffects: remainingEffects, achievements });
      return;
    }

    // Pick and show next event
    const nextState: Partial<GameState> = {
      stats,
      opponentStats,
      // Snapshot pre-day stats so the Dashboard can show the net ▲▼ change over the day just run.
      prevStats: { ...state.stats },
      day: day + 1,
      scandalStage: newScandalStage,
      activeEffects: remainingEffects,
      // Reset the day's War Room action allowance.
      actionsRemaining: ACTIONS_PER_DAY,
      achievements: mergeAchievements(
        { stats, difficulty, scandalStage: newScandalStage },
        {},
        state.achievements ?? [],
      ),
      polls: recalcPolls(stats, opponentStats, day + 1, totalDays),
      electoralVotes: projectEV(stats, opponentStats, state.districtPushes),
    };

    // Build the day's event load and queue the first one. The rest resolve in sequence
    // (see returnToDashboard) so each day can surface multiple events.
    const totalToday = eventsPerDay(difficulty);
    const queued = queueEvent({ ...state, ...nextState } as GameState);
    Object.assign(nextState, queued);
    nextState.dayEventsRemaining = queued.pendingEventId ? totalToday - 1 : 0;

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

    // Story continuity: record any flags this choice sets, for later narrative callbacks
    const storyFlags = choice.setsFlags?.length
      ? Array.from(new Set([...(state.storyFlags ?? []), ...choice.setsFlags]))
      : state.storyFlags ?? [];

    const polls = recalcPolls(stats, state.opponentStats, state.day, state.totalDays);
    const electoralVotes = projectEV(stats, state.opponentStats, state.districtPushes);

    const logEntry = {
      day: state.day,
      headline: choice.headline.replace(/"\{name\}"/g, state.candidate?.name ?? 'Candidate'),
      category: 'news',
    };

    const achievements = mergeAchievements(
      { stats, difficulty: state.difficulty, scandalStage: state.scandalStage },
      {},
      state.achievements ?? [],
    );

    set({
      stats,
      polls,
      electoralVotes,
      activeEffects: newEffects,
      unlockedEventIds,
      storyFlags,
      achievements,
      lastChoiceHeadline: logEntry.headline,
      eventLog: [logEntry, ...state.eventLog].slice(0, 50),
      pendingEventId: null,
    });
  },

  runCampaignAction: (actionId, districtCode) => {
    const state = get();
    if (state.phase !== 'campaign' || state.actionsRemaining <= 0) return;

    const action = getCampaignAction(actionId);
    if (!action) return;
    if (state.stats.funds < action.cost) return;
    if (action.staminaCost && state.stats.stamina < action.staminaCost) return;
    if (action.targetsDistrict && !districtCode) return;

    const diffMod = DIFFICULTY_MODIFIERS[state.difficulty];

    // Spend the funds + stamina up front (cost is separate from any stat effects).
    let stats = { ...state.stats, funds: Math.max(0, state.stats.funds - action.cost) };
    if (action.staminaCost) stats.stamina = clamp(stats.stamina - action.staminaCost);

    // Apply player stat effects with the same diminishing-returns balance as event choices.
    if (action.effects) {
      stats = applyChoice(stats, { label: action.label, effects: action.effects, headline: '' });
    }

    // Apply any effects to the rival (e.g. opposition research raises their scandal risk).
    let opponentStats = state.opponentStats;
    if (action.opponentEffects) {
      const next = { ...opponentStats } as unknown as Record<string, number>;
      for (const [key, delta] of Object.entries(action.opponentEffects)) {
        next[key] = clamp((next[key] ?? 0) + (delta as number) * diffMod.opponentMult);
      }
      opponentStats = next as unknown as Stats;
    }

    // Local ground-game push, capped per district so it can't run away.
    const districtPushes = { ...state.districtPushes };
    if (action.targetsDistrict && districtCode && action.pushAmount) {
      districtPushes[districtCode] = Math.min(MAX_DISTRICT_PUSH, (districtPushes[districtCode] ?? 0) + action.pushAmount);
    }

    const achievements = mergeAchievements(
      { stats, difficulty: state.difficulty, scandalStage: state.scandalStage },
      {},
      state.achievements ?? [],
    );

    set({
      stats,
      opponentStats,
      districtPushes,
      actionsRemaining: state.actionsRemaining - 1,
      achievements,
      polls: recalcPolls(stats, opponentStats, state.day, state.totalDays),
      electoralVotes: projectEV(stats, opponentStats, districtPushes),
    });
  },

  returnToDashboard: () => {
    const state = get();
    // More events queued for today? Show the next one (re-picked live, so branch unlocks
    // and the stat changes from the choice just made are respected).
    if (state.dayEventsRemaining > 0) {
      const queued = queueEvent(state);
      if (queued.pendingEventId) {
        set({ ...queued, dayEventsRemaining: state.dayEventsRemaining - 1 });
        return;
      }
    }
    set({ phase: 'campaign', pendingEventId: null, dayEventsRemaining: 0 });
  },

  goToMainMenu: () => set(defaultState()),

  saveToSlot: (slot) => {
    saveGame(get(), slot);
  },

  deleteSaveSlot: (slot) => {
    deleteSave(slot);
  },
}));

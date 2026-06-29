import type { GameEvent, Choice } from '../types/events';
import type { Stats, GameState } from '../types/game';
import { weightedRandom, chance } from '../utils/random';
import { allEvents } from '../data/events';

export function pickEvent(state: GameState): GameEvent | null {
  const { stats, eventLog, difficulty } = state;
  const seenIds = new Set(eventLog.map((e) => e.headline));

  const available = allEvents.filter((ev) => {
    // Prerequisites
    if (ev.prerequisites) {
      for (const [key, threshold] of Object.entries(ev.prerequisites)) {
        if ((stats[key as keyof Stats] ?? 0) < (threshold as number)) return false;
      }
    }
    // Rare events less common on easy
    if (ev.rare && difficulty === 'easy' && !chance(30)) return false;
    if (ev.rare && difficulty === 'normal' && !chance(50)) return false;
    return true;
  });

  if (!available.length) return allEvents[0];

  return weightedRandom(available.map((ev) => ({ item: ev, weight: ev.weight })));
  void seenIds;
}

export function applyChoice(stats: Stats, choice: Choice): Stats {
  const next = { ...stats };
  for (const [key, delta] of Object.entries(choice.effects)) {
    const k = key as keyof Stats;
    const current = next[k] as number;
    if (k === 'funds') {
      (next as Record<string, number>)[k] = Math.max(0, current + (delta as number));
    } else {
      (next as Record<string, number>)[k] = Math.max(0, Math.min(100, current + (delta as number)));
    }
  }
  return next;
}

export function applyOpponentDay(opponentStats: Stats, playerStats: Stats): Stats {
  const next = { ...opponentStats };
  // Opponent mirrors some player momentum, competitive drift
  if (playerStats.popularity > opponentStats.popularity) {
    next.momentum = Math.min(100, next.momentum + 0.5);
  }
  // Small random walk
  const keys: (keyof Stats)[] = ['popularity', 'trust', 'mediaApproval'];
  for (const k of keys) {
    const delta = (Math.random() - 0.5) * 2;
    (next as Record<string, number>)[k] = Math.max(0, Math.min(100, (next[k] as number) + delta));
  }
  return next;
}

import type { GameEvent, Choice } from '../types/events';
import type { Stats, GameState } from '../types/game';
import { weightedRandom, chance } from '../utils/random';
import { allEvents } from '../data/events';

function meetsPrereq(ev: GameEvent, stats: Stats): boolean {
  if (!ev.prerequisites) return true;
  for (const [key, threshold] of Object.entries(ev.prerequisites)) {
    if ((stats[key as keyof Stats] ?? 0) < (threshold as number)) return false;
  }
  return true;
}

export function pickEvent(state: GameState): GameEvent | null {
  const { stats, difficulty } = state;
  const seen = new Set(state.seenEventIds ?? []);
  const unlocked = state.unlockedEventIds ?? [];

  // 1) Branch events unlocked by previous choices take priority (in unlock order).
  for (const id of unlocked) {
    if (seen.has(id)) continue;
    const ev = allEvents.find((e) => e.id === id);
    if (ev && meetsPrereq(ev, stats)) return ev;
  }

  // Rarity gating: rare/wild-card events show less often on lower difficulties.
  const rarePass = (ev: GameEvent) => {
    if (!ev.rare) return true;
    if (difficulty === 'easy') return chance(30);
    if (difficulty === 'normal') return chance(55);
    return true; // hard / brutal: full chaos
  };

  // 2) Normal pool: unseen, prerequisites met, not branch-only, rarity-gated.
  let pool = allEvents.filter(
    (ev) => !seen.has(ev.id) && !ev.branchOnly && meetsPrereq(ev, stats) && rarePass(ev),
  );

  // 3) If the unseen pool is empty, allow repeats so a long campaign never stalls.
  if (!pool.length) {
    pool = allEvents.filter((ev) => !ev.branchOnly && meetsPrereq(ev, stats));
  }
  if (!pool.length) return allEvents[0] ?? null;

  return weightedRandom(pool.map((ev) => ({ item: ev, weight: ev.weight })));
}

// Applies a choice's effects. On harder difficulties, negative outcomes are amplified
// by `penaltyMult` so mistakes hurt more — positive gains are never scaled.
export function applyChoice(stats: Stats, choice: Choice, penaltyMult = 1): Stats {
  const next = { ...stats };
  for (const [key, delta] of Object.entries(choice.effects)) {
    const k = key as keyof Stats;
    const raw = delta as number;
    const scaled = raw < 0 ? raw * penaltyMult : raw;
    const current = next[k] as number;
    if (k === 'funds') {
      (next as Record<string, number>)[k] = Math.max(0, current + scaled);
    } else {
      (next as Record<string, number>)[k] = Math.max(0, Math.min(100, current + scaled));
    }
  }
  return next;
}

// Scales a long-term effect bundle the same way (negatives amplified by difficulty).
export function scaleEffects(effects: Partial<Stats>, penaltyMult: number): Partial<Stats> {
  const out: Partial<Stats> = {};
  for (const [key, delta] of Object.entries(effects)) {
    const raw = delta as number;
    (out as Record<string, number>)[key] = raw < 0 ? raw * penaltyMult : raw;
  }
  return out;
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

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

function flagsSatisfied(ev: GameEvent, flags: Set<string>): boolean {
  if (ev.requiresFlags && !ev.requiresFlags.every((f) => flags.has(f))) return false;
  if (ev.forbidsFlags && ev.forbidsFlags.some((f) => flags.has(f))) return false;
  return true;
}

// Dynamic event director: bias the random pool toward stories that fit the current state of the
// race, so a campaign in trouble *feels* like one. Returns a multiplier on the event's base
// weight — the underlying randomness stays, but the odds bend toward the moment.
function contextualWeight(ev: GameEvent, state: GameState): number {
  const { stats, opponentStats, day, totalDays } = state;
  const cat = ev.category;
  const lead = stats.popularity - opponentStats.popularity; // < 0 means trailing
  const progress = (day ?? 1) / (totalDays || 35);
  let m = 1;

  // A brewing scandal pulls scandal/press stories into the news cycle; a clean run keeps them rare.
  if (stats.scandalRisk > 55) {
    if (cat === 'scandal') m *= 2.2;
    if (cat === 'press') m *= 1.5;
  } else if (stats.scandalRisk < 20 && cat === 'scandal') {
    m *= 0.5;
  }

  // Behind in the race → the campaign gets louder and more combative; ahead → consolidate the base.
  if (lead < -6) {
    if (cat === 'rally' || cat === 'debate') m *= 1.6;
    if (cat === 'foreign') m *= 1.3;
  } else if (lead > 8) {
    if (cat === 'party' || cat === 'donor') m *= 1.4;
    if (cat === 'scandal') m *= 1.2; // front-runners draw fire
  }

  // Money troubles surface donor/fundraiser pressure; a full war chest quiets it.
  if (stats.funds < 400_000) {
    if (cat === 'donor' || cat === 'fundraiser') m *= 1.9;
  } else if (stats.funds > 1_500_000 && cat === 'fundraiser') {
    m *= 0.6;
  }

  // A shaky economy dominates the agenda.
  if (stats.economyConfidence < 38 && cat === 'economy') m *= 1.7;

  // Closing stretch: the air war and the ground game crowd out the routine business.
  if (progress > 0.7) {
    if (cat === 'rally' || cat === 'debate' || cat === 'press') m *= 1.4;
    if (cat === 'fundraiser' || cat === 'donor') m *= 0.7;
  }

  return m;
}

export function pickEvent(state: GameState): GameEvent | null {
  const { stats, difficulty, day } = state;
  const seen = new Set(state.seenEventIds ?? []);
  const unlocked = state.unlockedEventIds ?? [];
  const flags = new Set(state.storyFlags ?? []);

  // 0) Story beats drive the narrative: fire the next due, unseen beat (in script order)
  //    whose day-window, flag and stat conditions are all met. Highest priority.
  for (const ev of allEvents) {
    if (!ev.storyBeat || seen.has(ev.id)) continue;
    if (ev.minDay && day < ev.minDay) continue;
    if (ev.maxDay && day > ev.maxDay) continue;
    if (!flagsSatisfied(ev, flags) || !meetsPrereq(ev, stats)) continue;
    return ev;
  }

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

  // 2) Normal pool: unseen, prerequisites met, not branch-only/story, rarity-gated.
  let pool = allEvents.filter(
    (ev) => !seen.has(ev.id) && !ev.branchOnly && !ev.storyBeat && meetsPrereq(ev, stats) && rarePass(ev),
  );

  // 3) If the unseen pool is empty, allow repeats so a long campaign never stalls.
  if (!pool.length) {
    pool = allEvents.filter((ev) => !ev.branchOnly && !ev.storyBeat && meetsPrereq(ev, stats));
  }
  if (!pool.length) return allEvents[0] ?? null;

  return weightedRandom(pool.map((ev) => ({ item: ev, weight: ev.weight * contextualWeight(ev, state) })));
}

// Applies a choice's effects. On harder difficulties, negative outcomes are amplified
// by `penaltyMult` so mistakes hurt more — positive gains are never scaled.
export function applyChoice(stats: Stats, choice: Choice, penaltyMult = 1): Stats {
  const next = { ...stats };
  for (const [key, delta] of Object.entries(choice.effects)) {
    const k = key as keyof Stats;
    const raw = delta as number;
    const current = next[k] as number;
    if (k === 'funds') {
      (next as Record<string, number>)[k] = Math.max(0, current + raw);
      continue;
    }
    // Negatives are amplified by difficulty; positives suffer diminishing returns as the
    // stat climbs (pushing 80 -> 90 is much harder than 40 -> 50). Keeps leads from snowballing.
    let scaled: number;
    if (raw < 0) {
      scaled = raw * penaltyMult;
    } else {
      const headroomFactor = 0.45 + 0.55 * ((100 - current) / 100); // ~1.0 at 0, ~0.45 at 100
      scaled = raw * headroomFactor;
    }
    (next as Record<string, number>)[k] = Math.max(0, Math.min(100, current + scaled));
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

export interface OpponentContext {
  playerScandalRisk?: number; // 0..100
  playerScandalStage?: 0 | 1 | 2 | 3 | 4;
  day?: number;
  totalDays?: number;
}

export function applyOpponentDay(
  opponentStats: Stats,
  playerStats: Stats,
  opponentMult = 1,
  ctx: OpponentContext = {},
): Stats {
  const next = { ...opponentStats };
  const lead = playerStats.popularity - opponentStats.popularity;

  // The rival presses harder in the closing stretch — the campaign intensifies toward polling day.
  const progress = (ctx.day ?? 1) / (ctx.totalDays || 35);
  const intensity = opponentMult * (1 + 0.5 * progress);

  if (lead > 0) {
    // A trailing opponent fights back — harder on higher difficulty (rubber-banding).
    const push = Math.min(3.2, lead * 0.085) * intensity;
    next.popularity = Math.min(100, next.popularity + push);
    next.momentum = Math.min(100, next.momentum + push * 0.8);
    next.mediaApproval = Math.min(100, next.mediaApproval + push * 0.5);
  } else {
    // When ahead, the opponent eases off slightly, giving you room to claw back.
    next.momentum = Math.max(0, next.momentum - 0.3);
  }

  // The rival capitalizes on your troubles: a live scandal hands them free momentum and airtime,
  // and the bigger the scandal, the more they press it.
  const scandalRisk = ctx.playerScandalRisk ?? 0;
  const scandalStage = ctx.playerScandalStage ?? 0;
  if (scandalRisk > 50 || scandalStage > 0) {
    const capitalize = (scandalStage * 0.8 + (scandalRisk > 50 ? 1 : 0)) * opponentMult;
    next.momentum = Math.min(100, next.momentum + capitalize);
    next.mediaApproval = Math.min(100, next.mediaApproval + capitalize * 0.7);
    next.popularity = Math.min(100, next.popularity + capitalize * 0.4);
  }

  // Small random walk
  const keys: (keyof Stats)[] = ['popularity', 'trust', 'mediaApproval'];
  for (const k of keys) {
    const delta = (Math.random() - 0.5) * 1.6;
    (next as Record<string, number>)[k] = Math.max(0, Math.min(100, (next[k] as number) + delta));
  }
  return next;
}

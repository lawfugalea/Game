import type { GameState } from '../types/game';

// End-of-campaign facts the election-night transition passes in. Undefined `won` means the
// achievement is being evaluated mid-campaign (only the in-run threshold ones can fire then).
export interface AchContext {
  won?: boolean;
  seats?: number;
}

// The snapshot an achievement predicate reads. Kept narrow so the store can pass a synthetic
// post-choice / post-day state without constructing a whole GameState.
export type AchSnapshot = Pick<GameState, 'stats' | 'difficulty' | 'scandalStage'>;

export interface Achievement {
  id: string;
  emoji: string;
  label: string;
  desc: string;
  predicate: (s: AchSnapshot, ctx: AchContext) => boolean;
}

const ended = (ctx: AchContext) => ctx.won !== undefined;

export const ACHIEVEMENTS: Achievement[] = [
  // --- in-run thresholds (can fire any day) ---
  { id: 'trusted', emoji: '🤝', label: 'Man of His Word', desc: 'Reach 80 Trust.', predicate: (s) => s.stats.trust >= 80 },
  { id: 'momentum', emoji: '🚀', label: 'Unstoppable', desc: 'Reach 85 Momentum.', predicate: (s) => s.stats.momentum >= 85 },
  { id: 'ratings', emoji: '📈', label: 'Ratings King', desc: 'Reach 78 Popularity.', predicate: (s) => s.stats.popularity >= 78 },
  { id: 'euro', emoji: '🇪🇺', label: "Brussels' Favourite", desc: 'Reach 80 EU Standing.', predicate: (s) => s.stats.foreignPolicy >= 80 },
  { id: 'under-fire', emoji: '🔥', label: 'Under Fire', desc: 'Face a full magisterial inquiry.', predicate: (s) => s.scandalStage >= 4 },
  { id: 'shoestring', emoji: '🪙', label: 'On a Shoestring', desc: 'Drop below €100k in the war chest.', predicate: (s) => s.stats.funds < 100_000 },
  // --- end-of-campaign ---
  { id: 'elected', emoji: '🎖️', label: 'Prime Minister', desc: 'Win a campaign.', predicate: (_s, c) => c.won === true },
  { id: 'landslide', emoji: '🏛️', label: 'Landslide', desc: 'Win with 44+ seats.', predicate: (_s, c) => c.won === true && (c.seats ?? 0) >= 44 },
  { id: 'squeaker', emoji: '😅', label: 'By a Whisker', desc: 'Win with 34 seats or fewer.', predicate: (_s, c) => c.won === true && (c.seats ?? 0) <= 34 },
  { id: 'iron-will', emoji: '💀', label: 'Iron Will', desc: 'Win a campaign on Brutal.', predicate: (s, c) => c.won === true && s.difficulty === 'brutal' },
  { id: 'spotless', emoji: '🕊️', label: 'Spotless', desc: 'Win with Scandal Risk under 15.', predicate: (s, c) => c.won === true && s.stats.scandalRisk < 15 },
  { id: 'principled', emoji: '🌹', label: 'Principled to the End', desc: 'Lose, but with Trust 58+.', predicate: (s, c) => ended(c) && c.won === false && s.stats.trust >= 58 },
];

const BY_ID = new Map(ACHIEVEMENTS.map((a) => [a.id, a]));

export function getAchievement(id: string): Achievement | undefined {
  return BY_ID.get(id);
}

// Returns every achievement id whose condition the snapshot currently satisfies.
export function evaluateAchievements(s: AchSnapshot, ctx: AchContext): string[] {
  return ACHIEVEMENTS.filter((a) => a.predicate(s, ctx)).map((a) => a.id);
}

// Malta general election: ~5-week campaign, 13 districts × 5 = 65 seats, 33 for a majority.
export const TOTAL_DAYS = 35;
export const TOTAL_SEATS = 65;
export const EV_TO_WIN = 33; // seats needed to govern
// Kept as an alias so older references compile; equals the full house.
export const TOTAL_EV = TOTAL_SEATS;

// War Room: how many proactive campaign actions the player may take per day, and the ceiling on
// how far a single district can be shifted by repeated District Pushes (keeps it from running away).
export const ACTIONS_PER_DAY = 2;
export const MAX_DISTRICT_PUSH = 0.14;

export const DIFFICULTY_MODIFIERS = {
  easy:   { opponentMult: 0.7,  eventPenaltyMult: 0.7,  scandalsFreq: 0.5 },
  normal: { opponentMult: 1.0,  eventPenaltyMult: 1.0,  scandalsFreq: 1.0 },
  hard:   { opponentMult: 1.3,  eventPenaltyMult: 1.2,  scandalsFreq: 1.3 },
  brutal: { opponentMult: 1.6,  eventPenaltyMult: 1.5,  scandalsFreq: 1.8 },
};

export const DEFAULT_STATS = {
  popularity: 48,
  trust: 50,
  momentum: 50,
  funds: 1_800_000, // campaign war chest, in euros
  mediaApproval: 50,
  partySupport: 65,
  donorSupport: 55, // business / developer lobby goodwill
  economyConfidence: 50,
  foreignPolicy: 50, // EU standing & neutrality
  youthVote: 45,
  workingClass: 45,
  urban: 55, // harbour / Sliema-side urban voters
  rural: 35, // Gozo & village Malta
  independents: 42, // floaters / switchers
  scandalRisk: 10,
  stamina: 85,
};

export const OPPONENT_DEFAULT_STATS = {
  ...DEFAULT_STATS,
  popularity: 46,
  trust: 52,
  urban: 42,
  rural: 52,
  independents: 44,
};

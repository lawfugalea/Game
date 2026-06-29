export const TOTAL_DAYS = 120;
export const EV_TO_WIN = 270;
export const TOTAL_EV = 538;

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
  funds: 12_000_000,
  mediaApproval: 50,
  partySupport: 65,
  donorSupport: 55,
  economyConfidence: 50,
  foreignPolicy: 50,
  youthVote: 45,
  workingClass: 45,
  urban: 55,
  rural: 35,
  independents: 42,
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

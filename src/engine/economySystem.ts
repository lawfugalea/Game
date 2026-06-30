import type { Stats } from '../types/game';
import { chance, roll } from '../utils/random';

export function tickEconomy(stats: Stats, day: number): Partial<Stats> {
  const effects: Partial<Stats> = {};

  // Gradual natural drift toward 50
  if (stats.economyConfidence > 60 && chance(15)) effects.economyConfidence = -1;
  if (stats.economyConfidence < 40 && chance(15)) effects.economyConfidence = 1;

  // Economy affects popularity passively
  if (stats.economyConfidence > 65) effects.popularity = 0.3;
  if (stats.economyConfidence < 35) effects.popularity = -0.4;

  // Occasional economic shock — roughly one every couple of weeks (never on the opening days).
  // Bad news bites a bit harder than good, the way it does in a real campaign's news cycle.
  if (day > 2 && chance(7)) {
    effects.economyConfidence = (effects.economyConfidence ?? 0) + (chance(45) ? roll(3, 8) : -roll(3, 11));
  }

  // Overnight stamina recovery — enough to roughly offset a couple of events per day,
  // so juggling multiple events daily forces real fatigue management. Low stamina bites.
  if (stats.stamina < 30) {
    effects.popularity = (effects.popularity ?? 0) - 0.5;
    effects.momentum = -0.5;
  }
  if (stats.stamina < 100) {
    effects.stamina = 14; // overnight rest
  }

  return effects;
}

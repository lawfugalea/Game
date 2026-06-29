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

  // Random economic shock every 15–25 days
  if (day % roll(15, 25) === 0) {
    const shock = chance(50) ? 'positive' : 'negative';
    effects.economyConfidence = shock === 'positive' ? roll(3, 8) : -roll(3, 10);
  }

  // Stamina recovery — small daily recovery, fatigue from low stamina
  if (stats.stamina < 30) {
    effects.popularity = (effects.popularity ?? 0) - 0.5;
    effects.momentum = -0.5;
  }
  if (stats.stamina < 100) {
    effects.stamina = 0.8; // slow natural recovery
  }

  return effects;
}

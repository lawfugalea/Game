import type { EVProjection, Stats } from '../types/game';
import { usStates } from '../data/states';
import { clamp } from '../utils/random';

export function projectEV(playerStats: Stats, opponentStats: Stats): EVProjection {
  const playerAdvantage = playerStats.popularity - opponentStats.popularity;

  let playerEV = 0, opponentEV = 0, tossupEV = 0;

  for (const state of usStates) {
    // Shift the state lean by the national poll advantage + demographic factors
    const urbanBonus = state.region === 'northeast' || state.region === 'west'
      ? (playerStats.urban - opponentStats.urban) * 0.15
      : 0;
    const ruralBonus = state.region === 'south' || state.region === 'midwest'
      ? (opponentStats.rural - playerStats.rural) * 0.15
      : 0;

    const adjustedLean = state.baseLean
      - (playerAdvantage * 0.5)
      - urbanBonus
      + ruralBonus;

    const margin = clamp(Math.abs(adjustedLean), 0, 100);

    if (adjustedLean < -5) {
      playerEV += state.electoralVotes;        // player (Liberty/Progress) wins
    } else if (adjustedLean > 5) {
      opponentEV += state.electoralVotes;       // opponent wins
    } else {
      // Tossup — give to whoever is ahead nationally
      if (playerAdvantage > 0) playerEV += state.electoralVotes;
      else if (playerAdvantage < 0) opponentEV += state.electoralVotes;
      else tossupEV += state.electoralVotes;
    }
    void margin;
  }

  return { player: playerEV, opponent: opponentEV, tossup: tossupEV };
}

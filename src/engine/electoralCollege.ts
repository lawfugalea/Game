import type { EVProjection, Stats } from '../types/game';
import { districts } from '../data/states';

// Player vote share (0..1) in a district, from its base lean, the national mood, and demographics.
export function districtPlayerShare(d: typeof districts[number], playerStats: Stats, opponentStats: Stats): number {
  const advantage = playerStats.popularity - opponentStats.popularity; // -100..100
  // Tightened so a polling lead converts to seats only when sustained, not off one good week.
  let share = 0.5 - d.baseLean / 100 + advantage * 0.003;

  // Labour (player) over-performs with working-class harbour/south; Nationalist with affluent north/central.
  if (d.region === 'harbour' || d.region === 'south') {
    share += (playerStats.workingClass - opponentStats.workingClass) * 0.0012;
  }
  if (d.region === 'north' || d.region === 'central') {
    share += (playerStats.urban - opponentStats.urban) * 0.0012;
  }
  // Gozo swings on momentum and trust (parochial, retail politics)
  if (d.region === 'gozo') {
    share += (playerStats.momentum - opponentStats.momentum) * 0.001;
  }

  return Math.max(0.05, Math.min(0.95, share));
}

// Projects the 65-seat parliament (STV-style proportional split within each 5-seat district).
export function projectEV(playerStats: Stats, opponentStats: Stats): EVProjection {
  let player = 0;
  let opponent = 0;

  for (const d of districts) {
    const share = districtPlayerShare(d, playerStats, opponentStats);
    const playerSeats = Math.round(share * d.seats);
    player += playerSeats;
    opponent += d.seats - playerSeats;
  }

  // Proportional system has no "tossup" bucket; one side always reaches 33 of 65.
  return { player, opponent, tossup: 0 };
}

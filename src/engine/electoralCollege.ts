import type { EVProjection, Stats } from '../types/game';
import { districts } from '../data/states';

// Player vote share (0..1) in a district, from its base lean, the national mood, demographics,
// and any local ground-game push the player has bought there (`pushes`, keyed by district code).
export function districtPlayerShare(
  d: typeof districts[number],
  playerStats: Stats,
  opponentStats: Stats,
  pushes?: Record<string, number>,
): number {
  const advantage = playerStats.popularity - opponentStats.popularity; // -100..100
  // Tightened so a polling lead converts to seats only when sustained, not off one good week.
  let share = 0.5 - d.baseLean / 100 + advantage * 0.003;

  // Demographic over/under-performance. Weights are tuned so a strong (~30-40pt) lead in the
  // relevant group can actually flip a swing district's rounded seat — small enough that the
  // district's base lean and national popularity still dominate.
  // Labour (player) over-performs with the working-class harbour/south; Nationalist with the
  // affluent north/central.
  if (d.region === 'harbour' || d.region === 'south') {
    share += (playerStats.workingClass - opponentStats.workingClass) * 0.0022;
  }
  if (d.region === 'north' || d.region === 'central') {
    share += (playerStats.urban - opponentStats.urban) * 0.0022;
  }
  // The affluent, pro-EU north (Sliema-side, St Julian's) and the educated central belt weigh
  // your standing in Europe — these are the districts where EU credibility wins switchers.
  if (d.region === 'north' || d.region === 'central') {
    share += (playerStats.foreignPolicy - opponentStats.foreignPolicy) * 0.0026;
  }
  // The villages of the south are swayed by your rural standing as much as by class.
  if (d.region === 'south') {
    share += (playerStats.rural - opponentStats.rural) * 0.0016;
  }
  // Gozo & Comino is village Malta writ large: it swings on rural standing, with a parochial
  // retail-politics momentum kicker.
  if (d.region === 'gozo') {
    share += (playerStats.rural - opponentStats.rural) * 0.003;
    share += (playerStats.momentum - opponentStats.momentum) * 0.0008;
  }

  // Bought-and-paid-for local ground game in this district.
  share += pushes?.[d.code] ?? 0;

  return Math.max(0.05, Math.min(0.95, share));
}

// Projects the 65-seat parliament (STV-style proportional split within each 5-seat district).
export function projectEV(playerStats: Stats, opponentStats: Stats, pushes?: Record<string, number>): EVProjection {
  let player = 0;
  let opponent = 0;

  for (const d of districts) {
    const share = districtPlayerShare(d, playerStats, opponentStats, pushes);
    const playerSeats = Math.round(share * d.seats);
    player += playerSeats;
    opponent += d.seats - playerSeats;
  }

  // Proportional system has no "tossup" bucket; one side always reaches 33 of 65.
  return { player, opponent, tossup: 0 };
}

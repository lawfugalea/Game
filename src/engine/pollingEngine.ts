import type { Stats, PollData } from '../types/game';
import { clamp, seededUnit } from '../utils/random';

function support(stats: Stats): number {
  return (
    stats.popularity * 0.30 +
    stats.trust * 0.20 +
    stats.momentum * 0.10 +
    stats.independents * 0.15 +
    stats.mediaApproval * 0.10 +
    (stats.youthVote + stats.workingClass) * 0.075
  );
}

// Turns the underlying fundamentals into a *published* headline poll. Unlike the seat
// projection (which reads the true fundamentals), the published poll is deliberately an
// imperfect readout — that gap is what makes the race feel alive and the result uncertain:
//   • Undecideds: early on, lots of voters are unfirm, so the race reads closer to 50/50 and
//     swings more; as polling day nears, support firms toward the fundamentals.
//   • Momentum: a late surge lets a candidate poll above their fundamentals, a slump below.
//   • House effect: each day carries its own sampling bias (a margin-of-error wobble) that
//     shrinks toward election day as pollsters herd.
export function recalcPolls(
  playerStats: Stats,
  opponentStats: Stats,
  day = 1,
  totalDays = 35,
): PollData {
  const total = support(playerStats) + support(opponentStats);
  const trueShare = total > 0 ? support(playerStats) / total : 0.5;

  // 0 on launch day, 1 on polling day. The whole race opens as a genuine dead heat — no lead is
  // handed to anyone — and the true standing only emerges as undecideds break over the campaign.
  const progress = clamp((day - 1) / Math.max(1, totalDays - 1), 0, 1);

  // Undecideds firm up as the campaign closes: none of the gap shows at launch, all of it by the end.
  let share = 0.5 + (trueShare - 0.5) * progress;

  // Momentum surge/slump: ±~4 points at the extremes — but only once the race has begun to move.
  share += ((playerStats.momentum - opponentStats.momentum) / 100) * 0.04 * progress;

  // House effect (sampling wobble): nil at the launch dead heat, peaks mid-campaign, then shrinks
  // again toward polling day as pollsters herd.
  const noiseAmp = 0.12 * progress * (1 - progress);
  share += (seededUnit(day) * 2 - 1) * noiseAmp;

  const player = clamp(Math.round(share * 100), 15, 85);
  return { player, opponent: 100 - player };
}

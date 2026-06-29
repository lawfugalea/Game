import type { Stats, PollData } from '../types/game';
import { clamp } from '../utils/random';

export function recalcPolls(playerStats: Stats, opponentStats: Stats): PollData {
  const playerScore =
    playerStats.popularity * 0.30 +
    playerStats.trust * 0.20 +
    playerStats.momentum * 0.10 +
    playerStats.independents * 0.15 +
    playerStats.mediaApproval * 0.10 +
    (playerStats.youthVote + playerStats.workingClass) * 0.075;

  const opponentScore =
    opponentStats.popularity * 0.30 +
    opponentStats.trust * 0.20 +
    opponentStats.momentum * 0.10 +
    opponentStats.independents * 0.15 +
    opponentStats.mediaApproval * 0.10 +
    (opponentStats.youthVote + opponentStats.workingClass) * 0.075;

  const total = playerScore + opponentScore;
  const player = clamp(Math.round((playerScore / total) * 100), 20, 80);
  return { player, opponent: 100 - player };
}

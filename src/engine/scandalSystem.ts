import type { Stats } from '../types/game';
import { chance } from '../utils/random';

export type ScandalStage = 0 | 1 | 2 | 3 | 4;

export const SCANDAL_LABELS: Record<ScandalStage, string> = {
  0: 'Clean',
  1: 'Whispers',
  2: 'Leaked Chats',
  3: 'Front Page',
  4: 'Magisterial Inquiry',
};

export const SCANDAL_STAT_HIT: Record<ScandalStage, Partial<Stats>> = {
  0: {},
  1: { trust: -3, mediaApproval: -5 },
  2: { trust: -8, popularity: -5, donorSupport: -8 },
  3: { trust: -15, popularity: -12, partySupport: -10, donorSupport: -12, momentum: -10 },
  4: { trust: -25, popularity: -20, partySupport: -20, donorSupport: -20, momentum: -18 },
};

export function checkScandalEscalation(
  currentStage: ScandalStage,
  scandalRisk: number,
  difficulty: number,
): ScandalStage {
  if (currentStage >= 4) return 4;
  const escalationChance = (scandalRisk / 100) * 12 * difficulty;
  if (chance(escalationChance)) {
    return (currentStage + 1) as ScandalStage;
  }
  // Natural recovery at low risk
  if (scandalRisk < 15 && currentStage > 0 && chance(8)) {
    return (currentStage - 1) as ScandalStage;
  }
  return currentStage;
}

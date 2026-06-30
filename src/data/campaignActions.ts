import type { Stats } from '../types/game';

// Proactive "War Room" actions the player can buy on the Dashboard between events. Each costs
// funds (and sometimes stamina) and consumes one of the day's action slots — turning the €1.8M
// war chest from a number you watch into a resource you spend.
export interface CampaignAction {
  id: string;
  label: string;
  desc: string;
  cost: number;                     // funds spent
  staminaCost?: number;             // stamina spent (gated like a choice if too low)
  effects?: Partial<Stats>;         // applied to the player (diminishing-returns, like a choice)
  opponentEffects?: Partial<Stats>; // applied to the rival
  targetsDistrict?: boolean;        // if true, the player picks a swing district to push
  pushAmount?: number;              // share added to the chosen district (before the per-district cap)
}

export const CAMPAIGN_ACTIONS: CampaignAction[] = [
  {
    id: 'ad-blitz',
    label: 'Ad Blitz',
    desc: 'Saturate TV, radio and billboards for a week.',
    cost: 250_000,
    effects: { mediaApproval: 6, popularity: 3 },
  },
  {
    id: 'gotv',
    label: 'Get Out The Vote',
    desc: 'Pour organisers into the clubs and the door-knocking.',
    cost: 200_000,
    staminaCost: 6,
    effects: { partySupport: 7, workingClass: 3, rural: 3 },
  },
  {
    id: 'oppo-research',
    label: 'Opposition Research',
    desc: 'Dig into the rival and feed the press a story.',
    cost: 300_000,
    opponentEffects: { scandalRisk: 11, trust: -3, momentum: -2 },
  },
  {
    id: 'district-push',
    label: 'District Push',
    desc: 'Throw the machine at one battleground district.',
    cost: 150_000,
    staminaCost: 4,
    targetsDistrict: true,
    pushAmount: 0.05,
  },
];

export function getCampaignAction(id: string): CampaignAction | undefined {
  return CAMPAIGN_ACTIONS.find((a) => a.id === id);
}

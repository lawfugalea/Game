import type { Stats, CandidateTrait } from '../types/game';

// A starting archetype sets the flavour and the opening stat profile of a created leader.
export interface Background {
  id: string;
  label: string;
  title: string; // becomes the leader's title
  blurb: string;
  statMods: Partial<Stats>;
}

export const backgrounds: Background[] = [
  {
    id: 'union',
    label: 'Union Firebrand',
    title: 'Union Leader',
    blurb: 'Forged in the shipyards and the GWU halls. The shop floor loves you; the boardrooms and Brussels do not.',
    statMods: { workingClass: 14, momentum: 6, popularity: 4, donorSupport: -12, foreignPolicy: -4 },
  },
  {
    id: 'technocrat',
    label: 'Economist Technocrat',
    title: 'Former Finance Minister',
    blurb: 'A central-bank brain with a spreadsheet for a heart. Markets trust you; the youth find you cold.',
    statMods: { economyConfidence: 14, donorSupport: 8, trust: 5, youthVote: -8, momentum: -4 },
  },
  {
    id: 'eu-insider',
    label: 'Brussels Insider',
    title: 'Former MEP',
    blurb: 'A decade in the European Parliament made you fluent in summits and rule-of-law. The villages call you "too European."',
    statMods: { foreignPolicy: 16, trust: 8, urban: 6, rural: -10 },
  },
  {
    id: 'activist',
    label: 'Grassroots Activist',
    title: 'Civil-Society Campaigner',
    blurb: 'You came up through NGOs, marches and Repubblika-style petitions. The base adores you; the party machine is wary.',
    statMods: { youthVote: 14, urban: 8, momentum: 5, trust: 4, partySupport: -12 },
  },
  {
    id: 'loyalist',
    label: 'Party Loyalist',
    title: 'Party Secretary-General',
    blurb: 'You bled the party colours since you could walk. The clubs, the funds and the apparatus are all yours.',
    statMods: { partySupport: 16, funds: 600000, donorSupport: 6, independents: -8 },
  },
  {
    id: 'outsider',
    label: 'Clean-Hands Outsider',
    title: 'Reformist Newcomer',
    blurb: 'A respected outsider untainted by the old scandals. Switchers trust you; the establishment quietly resents you.',
    statMods: { trust: 14, independents: 10, mediaApproval: 5, scandalRisk: -5, partySupport: -10, donorSupport: -6 },
  },
];

// Each trait gives a modest opening bonus. A leader picks two.
export const TRAIT_MODS: Record<CandidateTrait, Partial<Stats>> = {
  Charismatic: { popularity: 6, momentum: 4 },
  Technocrat: { economyConfidence: 7, trust: 2 },
  Populist: { workingClass: 6, popularity: 3 },
  Reformer: { trust: 6, youthVote: 3 },
  'EU-Federalist': { foreignPolicy: 8 },
  Traditionalist: { rural: 7, partySupport: 2 },
  Unionist: { workingClass: 7, donorSupport: -2 },
  Environmentalist: { youthVote: 7, urban: 3 },
};

export const ALL_TRAITS = Object.keys(TRAIT_MODS) as CandidateTrait[];

// Sums a background's mods with the picked traits' mods into one stat-modifier bundle.
export function combineStatMods(base: Partial<Stats>, traits: CandidateTrait[]): Partial<Stats> {
  const out: Partial<Stats> = { ...base };
  for (const t of traits) {
    for (const [k, v] of Object.entries(TRAIT_MODS[t])) {
      const key = k as keyof Stats;
      out[key] = (out[key] ?? 0) + (v as number);
    }
  }
  return out;
}

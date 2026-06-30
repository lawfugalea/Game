import type { GameEvent } from '../../types/events';

// Neutrality, EU and foreign-affairs events (Malta is constitutionally neutral).
export const warEvents: GameEvent[] = [
  {
    id: 'foreign-eu-defence',
    category: 'foreign',
    title: 'Pressure to Join an EU Defence Fund',
    description: 'With war on Europe\'s flanks, Brussels wants every member state to chip into a common defence fund. Malta\'s constitution enshrines neutrality. The phones from your capitals are ringing.',
    choices: [
      { label: 'Contribute only to non-lethal and humanitarian funds', effects: { foreignPolicy: 8, trust: 6, independents: 5, stamina: -4 }, headline: '"{name}" backs humanitarian-only EU role: "Neutral, never indifferent"' },
      { label: 'Refuse outright — neutrality is non-negotiable', effects: { rural: 8, partySupport: 6, foreignPolicy: -8, youthVote: -3 }, headline: '"{name}" rejects EU defence fund: "Not a single euro for weapons"' },
      { label: 'Quietly contribute to keep allies happy', effects: { foreignPolicy: 10, economyConfidence: 3, trust: -6, rural: -6 }, headline: '"{name}" signs up to EU fund — neutrality hawks furious' },
    ],
    weight: 8,
  },
  {
    id: 'foreign-libya-energy',
    category: 'energy',
    title: 'A Gas Deal With a Difficult Neighbour',
    description: 'A North African government offers a cheap long-term gas supply — a lifeline for energy bills, but it comes with murky middlemen and uncomfortable strings.',
    choices: [
      { label: 'Sign the deal — cheap energy now', effects: { economyConfidence: 8, workingClass: 6, popularity: 5, scandalRisk: 10, foreignPolicy: -4 }, headline: '"{name}" signs cut-price gas deal to shield families from bills' },
      { label: 'Walk away over the middlemen', effects: { trust: 10, foreignPolicy: 6, mediaApproval: 5, economyConfidence: -4 }, headline: '"{name}" kills gas deal: "I will not sign what I cannot explain"' },
      { label: 'Renegotiate it transparently and slowly', effects: { trust: 5, foreignPolicy: 4, momentum: -3, stamina: -6 }, headline: '"{name}" reopens gas talks, demands an open tender' },
    ],
    weight: 8,
  },
  {
    id: 'foreign-frontex',
    category: 'foreign',
    title: 'Frontex Wants a Bigger Base in Malta',
    description: 'The EU border agency proposes expanding operations from Malta. It means jobs and EU goodwill — and it means Malta\'s name on a controversial pushback debate.',
    choices: [
      { label: 'Welcome it with human-rights guarantees attached', effects: { foreignPolicy: 8, economyConfidence: 4, trust: 4, youthVote: -3 }, headline: '"{name}" backs expanded Frontex role with rights safeguards' },
      { label: 'Decline — too toxic for Malta\'s reputation', effects: { youthVote: 6, urban: 5, foreignPolicy: -5, economyConfidence: -3 }, headline: '"{name}" rejects bigger Frontex base on the island' },
      { label: 'Use it as leverage for relocation deals', effects: { foreignPolicy: 10, independents: 6, momentum: 4, stamina: -5 }, headline: '"{name}" trades Frontex base for binding EU relocation pledges' },
    ],
    weight: 7,
  },
];

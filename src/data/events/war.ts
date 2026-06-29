import type { GameEvent } from '../../types/events';

export const warEvents: GameEvent[] = [
  {
    id: 'war-crisis',
    category: 'war',
    title: 'Military Crisis Erupts',
    description: 'A US ally in the Pacific has been attacked. The President hasn\'t spoken yet. Your campaign is getting calls from every network. The world wants to know where you stand.',
    choices: [
      { label: 'Issue a strong statement of solidarity', effects: { foreignPolicy: 8, rural: 4, youthVote: -5, popularity: 3 }, headline: '"{name}" vows to stand with allies: "America does not abandon friends"' },
      { label: 'Call for restraint and diplomacy', effects: { youthVote: 8, foreignPolicy: -5, rural: -4, trust: 3 }, headline: '"{name}" urges restraint in Pacific crisis: "War is not the answer"' },
      { label: 'Stay silent until the facts are clearer', effects: { trust: 2, momentum: -4, mediaApproval: -5 }, headline: '"{name}" stays quiet on Pacific crisis — called "absent" by critics' },
      { label: 'Criticise the current administration\'s foreign policy', effects: { momentum: 5, foreignPolicy: -2, popularity: 4, mediaApproval: 3 }, headline: '"{name}" blasts administration\'s "failed" foreign policy amid crisis' },
    ],
    weight: 8,
  },
  {
    id: 'war-vet-scandal',
    category: 'war',
    title: 'Veterans\' Benefits Controversy',
    description: 'A leaked budget document shows your proposed cuts would reduce veterans\' healthcare funding by 12%. VFW chapters are calling for your resignation.',
    choices: [
      { label: 'Deny and clarify — it was misrepresented', effects: { trust: -4, scandalRisk: 6, mediaApproval: -3 }, headline: '"{name}" disputes leaked veterans budget figures' },
      { label: 'Reverse the policy immediately', effects: { trust: 2, funds: -1000000, popularity: 3, partySupport: -5 }, headline: '"{name}" reverses veterans cut policy after public outrage' },
      { label: 'Meet with VFW leaders publicly', effects: { trust: 5, popularity: 4, stamina: -5, scandalRisk: -4 }, headline: '"{name}" sits down with VFW: "I hear you"' },
      { label: 'Use it to announce a new Veterans First plan', effects: { popularity: 6, funds: -1500000, rural: 5, workingClass: 4 }, headline: '"{name}" turns controversy into Veterans First policy announcement' },
    ],
    weight: 9,
  },
];

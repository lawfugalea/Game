import type { GameEvent } from '../../types/events';

export const debateEvents: GameEvent[] = [
  {
    id: 'debate-leaders',
    category: 'debate',
    title: 'The Leaders\' Debate, Live on National TV',
    description: 'The whole island is watching. The moderator opens on the economy and the cost of living. Your rival is already on the attack about rents and wages.',
    isDebate: true,
    participants: ['Moderator', 'Your Rival'],
    choices: [
      { label: 'Reel off the growth and jobs figures', effects: { economyConfidence: 8, popularity: 6, trust: 3, stamina: -6 }, headline: '"{name}" touts record growth in fiery leaders\' debate' },
      { label: 'Pivot hard to cost of living and wages', effects: { workingClass: 10, youthVote: 6, popularity: 5, stamina: -6 }, headline: '"{name}" hammers cost of living: "Growth that families never feel"' },
      { label: 'Go negative on your rival\'s record', effects: { momentum: 8, mediaApproval: 4, trust: -5, stamina: -7 }, headline: '"{name}" goes on the attack in bruising TV debate' },
    ],
    weight: 7,
  },
  {
    id: 'debate-corruption',
    category: 'debate',
    title: 'Debate Turns to Governance and Corruption',
    description: 'The moderator raises the inquiries, the leaks and the rule-of-law concerns from Brussels. The audience leans in. This is the question that can sink a campaign.',
    isDebate: true,
    participants: ['Moderator', 'Your Rival'],
    choices: [
      { label: 'Promise root-and-branch good-governance reforms', effects: { trust: 10, foreignPolicy: 6, youthVote: 5, donorSupport: -6, stamina: -6 }, headline: '"{name}" pledges sweeping governance reform on live TV' },
      { label: 'Turn it around on your rival\'s own record', effects: { momentum: 7, popularity: 4, trust: -4, stamina: -6 }, headline: '"{name}" throws governance attack back at rival' },
      { label: 'Dismiss it as elite obsession, talk kitchen-table issues', effects: { workingClass: 8, rural: 5, trust: -8, mediaApproval: -5, stamina: -5 }, headline: '"{name}": "People care about their pay packet, not Brussels gossip"' },
    ],
    weight: 7,
  },
  {
    id: 'debate-eu-neutrality',
    category: 'debate',
    title: 'Debate Clash on the EU and Neutrality',
    description: 'A pointed question on Malta\'s constitutional neutrality and its place in the EU. With war on Europe\'s edges, the room is tense and divided.',
    isDebate: true,
    participants: ['Moderator', 'Your Rival'],
    choices: [
      { label: 'Defend neutrality as Malta\'s sacred principle', effects: { rural: 6, popularity: 6, trust: 5, foreignPolicy: -3, stamina: -6 }, headline: '"{name}" defends neutrality: "Malta is a bridge, not a barracks"' },
      { label: 'Argue for a more active EU role', effects: { foreignPolicy: 10, youthVote: 6, urban: 5, rural: -6, stamina: -6 }, headline: '"{name}" calls for Malta to "punch above its weight" in Europe' },
      { label: 'Straddle it — neutral but a committed European', effects: { independents: 8, trust: 4, momentum: 2, stamina: -5 }, headline: '"{name}" threads the needle on neutrality and the EU' },
    ],
    weight: 6,
  },
];

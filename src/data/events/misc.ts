import type { GameEvent } from '../../types/events';

export const miscEvents: GameEvent[] = [
  {
    id: 'health-summer-er',
    category: 'healthcare',
    title: 'Mater Dei A&E in Crisis',
    description: 'The national hospital\'s emergency department is overflowing — patients on trolleys in corridors, staff burning out. A viral photo has made it the story of the week.',
    choices: [
      { label: 'Announce emergency funding and new beds', effects: { popularity: 7, trust: 6, funds: -2000000, workingClass: 4 }, headline: '"{name}" pledges emergency cash to ease A&E overcrowding' },
      { label: 'Visit overnight and talk to the nurses', effects: { popularity: 5, trust: 8, stamina: -8, momentum: 4 }, headline: '"{name}" spends night shift at Mater Dei: "I had to see it myself"' },
      { label: 'Blame mismanagement and the hospitals deal', effects: { momentum: 5, mediaApproval: 3, trust: -2, scandalRisk: -2 }, headline: '"{name}" blames "wasted millions" for hospital chaos' },
      { label: 'Promise to recruit foreign nurses fast', effects: { workingClass: 4, economyConfidence: 3, rural: -3 }, headline: '"{name}" vows fast-track recruitment to plug nursing gaps' },
    ],
    weight: 10,
  },
  {
    id: 'energy-blackout',
    category: 'energy',
    title: 'Heatwave Triggers Rolling Blackouts',
    description: 'A 40°C heatwave has overloaded an ageing distribution grid. Whole localities are without power for hours; fridges and air-con are dead. Tempers are frying with the asphalt.',
    choices: [
      { label: 'Announce a crash grid-upgrade programme', effects: { popularity: 7, economyConfidence: 6, funds: -3000000, trust: 4 }, headline: '"{name}" launches emergency grid overhaul after blackouts' },
      { label: 'Compensate affected households immediately', effects: { workingClass: 8, popularity: 6, funds: -1500000 }, headline: '"{name}" promises compensation for blackout-hit families' },
      { label: 'Blame the distribution operator', effects: { trust: -4, mediaApproval: -3, momentum: 2 }, headline: '"{name}" pins blackouts on operator\'s "years of neglect"' },
      { label: 'Pivot to a big solar and storage push', effects: { youthVote: 8, foreignPolicy: 5, donorSupport: -4 }, headline: '"{name}" uses blackout to pitch national solar drive' },
    ],
    weight: 9,
  },
  {
    id: 'env-hunting',
    category: 'environment',
    title: 'The Spring Hunting Question Returns',
    description: 'The hunting lobby — organised, loyal and a swing bloc in several districts — wants the spring season protected. Conservationists and the EU want it gone. Both sides vote.',
    choices: [
      { label: 'Back the hunters and their tradition', effects: { rural: 10, workingClass: 5, youthVote: -8, urban: -6, foreignPolicy: -4 }, headline: '"{name}" sides with hunters: "A Maltese tradition worth defending"' },
      { label: 'Side with conservation and EU rules', effects: { youthVote: 10, urban: 8, foreignPolicy: 6, rural: -10 }, headline: '"{name}" backs conservationists on spring hunting' },
      { label: 'Promise tighter enforcement, not a ban', effects: { independents: 6, rural: 3, trust: 3 }, headline: '"{name}" proposes stricter rules but no hunting ban' },
    ],
    weight: 9,
  },
  {
    id: 'infra-gozo-tunnel',
    category: 'economy',
    title: 'The Gozo Tunnel — Dream or Folly?',
    description: 'Gozitans are split: a fixed link would end the ferry queues and double-insularity, but geologists and greens warn of cost, spoil and irreversible damage to the channel.',
    choices: [
      { label: 'Commit fully — "Gozo deserves a permanent link"', effects: { rural: 12, donorSupport: 8, youthVote: -5, foreignPolicy: -3 }, headline: '"{name}" greenlights Gozo tunnel: "An end to double insularity"' },
      { label: 'Invest in a faster fast-ferry instead', effects: { rural: 5, urban: 4, trust: 5, donorSupport: -4 }, headline: '"{name}" shelves tunnel for a rapid fast-ferry network' },
      { label: 'Order an independent feasibility review first', effects: { trust: 6, independents: 5, rural: -3, momentum: -2 }, headline: '"{name}" pauses Gozo tunnel for independent review' },
    ],
    weight: 8,
  },
  {
    id: 'party-pressure',
    category: 'party',
    title: 'The Party Old Guard Wants a Word',
    description: 'Three veteran power-brokers corner you in the club. They think your reform talk is spooking the loyal base and the donors. They want you to tone it down.',
    choices: [
      { label: 'Hold firm — the reforms stay', effects: { youthVote: 8, trust: 6, partySupport: -10, momentum: 4 }, headline: '"{name}" defies party barons: "I answer to the country"' },
      { label: 'Make peace and soften the edges', effects: { partySupport: 10, donorSupport: 5, youthVote: -6, trust: -4 }, headline: '"{name}" softens reform pledges after internal pressure' },
      { label: 'Find a face-saving compromise', effects: { partySupport: 4, trust: 3, momentum: 2 }, headline: '"{name}" strikes truce with party veterans over direction' },
    ],
    weight: 9,
  },
  {
    id: 'donor-developer',
    category: 'donor',
    title: 'A Construction Magnate Comes Calling',
    description: 'One of the island\'s biggest developers offers to bankroll your billboards and clubs — if you go quiet on the building-height reforms. He delivers a lot of votes too.',
    choices: [
      { label: 'Take the money, keep the reforms', effects: { funds: 2500000, donorSupport: 6, scandalRisk: 8 }, headline: '"{name}" accepts developer backing but won\'t drop reforms' },
      { label: 'Refuse — and say so loudly', effects: { youthVote: 10, trust: 8, funds: -0, donorSupport: -12, momentum: 4 }, headline: '"{name}" turns down developer cash: "Malta is not for sale by the floor"' },
      { label: 'Take it quietly, soften the reforms later', effects: { funds: 3000000, donorSupport: 8, trust: -10, scandalRisk: 12, youthVote: -6 }, headline: '"{name}" reportedly waters down height rules after big donation' },
    ],
    weight: 8,
  },
  {
    id: 'edu-stipends',
    category: 'education',
    title: 'Students March Over Stipends and Rents',
    description: 'University and MCAST students are marching: stipends haven\'t kept pace, and rents near campus are brutal. It is the largest youth mobilisation in years.',
    choices: [
      { label: 'Raise stipends and build student housing', effects: { youthVote: 14, urban: 6, funds: -1500000, trust: 4 }, headline: '"{name}" pledges higher stipends and new student housing' },
      { label: 'Offer skills bonuses tied to in-demand jobs', effects: { youthVote: 6, economyConfidence: 5, donorSupport: 4 }, headline: '"{name}" links student support to "jobs of the future"' },
      { label: 'Praise them but plead fiscal caution', effects: { trust: 3, youthVote: -4, economyConfidence: 3 }, headline: '"{name}" sympathises with students but warns on spending' },
    ],
    weight: 8,
  },
];

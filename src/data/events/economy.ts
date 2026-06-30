import type { GameEvent } from '../../types/events';

export const economyEvents: GameEvent[] = [
  {
    id: 'econ-cost-of-living',
    category: 'economy',
    title: 'Rents and Prices Keep Climbing',
    description: 'A loaf, a coffee, a flat in Sliema — everything costs more. Young couples say they cannot afford to move out. The cost of living is now the number-one issue at every door.',
    choices: [
      { label: 'Pledge to keep the energy & grain subsidies whatever the cost', effects: { popularity: 9, workingClass: 8, economyConfidence: -4, foreignPolicy: -4 }, longTermEffects: { funds: -1500000 }, longTermDelay: 4, headline: '"{name}" vows to keep subsidies: "Maltese families come first"' },
      { label: 'Announce a first-time-buyers and rent-cap scheme', effects: { youthVote: 12, urban: 6, donorSupport: -8 }, headline: '"{name}" unveils rent caps and help for first-time buyers' },
      { label: 'Blame global inflation and Brussels', effects: { trust: -5, mediaApproval: -3, rural: 3 }, headline: '"{name}" pins price rises on "imported inflation and EU rules"' },
      { label: 'Hand out a one-off cost-of-living cheque', effects: { popularity: 7, workingClass: 6, funds: -2500000, trust: -2 }, headline: '"{name}" promises €100 cheques to every household' },
    ],
    weight: 11,
  },
  {
    id: 'econ-greylist',
    category: 'economy',
    title: 'FATF Threatens to Greylist Malta',
    description: 'International watchdogs warn Malta could be greylisted over weak enforcement against money laundering. The financial-services and iGaming sectors — tens of thousands of jobs — are terrified.',
    choices: [
      { label: 'Launch an aggressive enforcement crackdown', effects: { trust: 10, foreignPolicy: 12, mediaApproval: 6, donorSupport: -10 }, headline: '"{name}" orders financial-crime crackdown to dodge greylisting' },
      { label: 'Lobby allies quietly in Brussels and Paris', effects: { foreignPolicy: 6, trust: 3, momentum: -2, stamina: -6 }, headline: '"{name}" works the phones to keep Malta off the grey list' },
      { label: 'Downplay it — "our sector is world-class"', effects: { donorSupport: 8, economyConfidence: 4, trust: -8, foreignPolicy: -8 }, headline: '"{name}" dismisses greylist fears: "Scaremongering by our rivals"' },
    ],
    weight: 9,
  },
  {
    id: 'econ-igaming',
    category: 'trade',
    title: 'iGaming Giant Threatens to Leave',
    description: 'One of the island\'s biggest remote-gaming employers says new EU tax-harmonisation talk makes Malta "uncompetitive." They employ 1,800 people and sponsor half the football league.',
    choices: [
      { label: 'Guarantee the low-tax regime stays', effects: { economyConfidence: 8, donorSupport: 10, funds: 2000000, foreignPolicy: -6, trust: -3 }, headline: '"{name}" guarantees iGaming tax deal: "Malta stays open for business"' },
      { label: 'Pitch a pivot to fintech and AI instead', effects: { youthVote: 8, economyConfidence: 4, trust: 5, donorSupport: -4 }, headline: '"{name}" courts fintech as iGaming wobbles: "We diversify or we sink"' },
      { label: 'Call their bluff publicly', effects: { popularity: 4, momentum: 5, donorSupport: -12, economyConfidence: -5 }, headline: '"{name}" tells gaming firm: "Malta is not for sale to anyone"' },
    ],
    weight: 9,
  },
  {
    id: 'econ-eu-funds',
    category: 'economy',
    title: 'A Billion in EU Funds to Allocate',
    description: 'The new EU budget cycle hands Malta a major envelope of cohesion funds. Every minister, mayor and lobby wants a slice. How you spend it will define your term.',
    choices: [
      { label: 'Pour it into roads, tunnels and infrastructure', effects: { rural: 8, workingClass: 6, donorSupport: 8, trust: -3 }, headline: '"{name}" earmarks EU funds for roads and the Gozo link' },
      { label: 'Invest in health, schools and green energy', effects: { trust: 8, youthVote: 8, foreignPolicy: 6, donorSupport: -6 }, headline: '"{name}" directs EU billions to hospitals, schools and solar' },
      { label: 'Split it for maximum district coverage', effects: { partySupport: 8, popularity: 5, trust: -3 }, headline: '"{name}" spreads EU funds across all 13 districts' },
    ],
    weight: 8,
  },
  {
    id: 'econ-traffic',
    category: 'economy',
    title: 'Traffic Gridlock Boils Over',
    description: 'A morning crash shut the Regional Road and the whole island ground to a halt. Commuters are furious. Road-building has not kept pace with 80,000 new cars in a decade.',
    choices: [
      { label: 'Promise free, frequent public transport', effects: { youthVote: 10, urban: 6, funds: -1500000 }, headline: '"{name}" pledges free buses and a metro feasibility study' },
      { label: 'Announce a massive new flyover programme', effects: { workingClass: 6, donorSupport: 8, rural: 4, youthVote: -5 }, headline: '"{name}" promises new flyovers to "finally fix the roads"' },
      { label: 'Push car-free village cores and cycle lanes', effects: { youthVote: 8, urban: 5, rural: -6, workingClass: -4 }, headline: '"{name}" backs car-free village cores — hauliers up in arms' },
    ],
    weight: 9,
  },
];

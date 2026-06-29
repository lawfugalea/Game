import type { GameEvent } from '../../types/events';

export const economyEvents: GameEvent[] = [
  {
    id: 'econ-inflation-surge',
    category: 'economy',
    title: 'Inflation Hits 7%',
    description: 'The latest Consumer Price Index figures just dropped — inflation has surged to 7%, the highest in a decade. Grocery stores are packed with angry shoppers. The media is camped outside your campaign office.',
    choices: [
      { label: 'Blame the current administration', effects: { popularity: 4, workingClass: 5, trust: -3, mediaApproval: 2 }, headline: '"{name}" slams administration on inflation crisis', longTermEffects: { economyConfidence: -3 }, longTermDelay: 10 },
      { label: 'Propose a bold wage subsidy plan', effects: { youthVote: 6, workingClass: 8, donorSupport: -6, funds: -500000 }, headline: '"{name}" unveils $2B wage protection plan', longTermEffects: { popularity: 3 }, longTermDelay: 14 },
      { label: 'Pivot to fiscal responsibility messaging', effects: { trust: 5, donorSupport: 4, workingClass: -4, popularity: -2 }, headline: '"{name}" calls for spending cuts amid inflation surge' },
      { label: 'Stay silent — let the numbers speak', effects: { momentum: -4, mediaApproval: -6 }, headline: '"{name}" refuses to comment on inflation data' },
    ],
    weight: 12,
  },
  {
    id: 'econ-stock-crash',
    category: 'economy',
    title: 'Markets in Freefall',
    description: 'The Dow has dropped 1,200 points in a single session. Retirement accounts are bleeding. Your economic advisor is on the phone asking what to say.',
    choices: [
      { label: 'Call for emergency Fed rate action', effects: { economyConfidence: 5, trust: 3, donorSupport: 4 }, headline: '"{name}" urges Fed intervention after market crash' },
      { label: 'Promise a sweeping economic rescue package', effects: { popularity: 6, momentum: 5, funds: -800000, donorSupport: -5 }, headline: '"{name}" promises bold rescue for market meltdown' },
      { label: 'Say markets are cyclical — stay calm', effects: { trust: 4, popularity: -3, mediaApproval: -4 }, headline: '"{name}" urges calm as markets plunge — critics say tone-deaf' },
      { label: 'Use the crisis to promote your tax plan', effects: { donorSupport: 6, workingClass: -5, popularity: -2 }, headline: '"{name}" revives tax plan as response to market crash' },
    ],
    weight: 10,
  },
  {
    id: 'econ-jobs-report',
    category: 'economy',
    title: 'Jobs Report: 400K Jobs Lost',
    description: 'The monthly jobs report just landed like a bomb. 400,000 jobs lost last month — manufacturing and retail hardest hit. Your opponent is already tweeting.',
    choices: [
      { label: 'Announce a jobs creation initiative', effects: { workingClass: 8, popularity: 5, funds: -600000 }, headline: '"{name}" launches Emergency Jobs Initiative' },
      { label: 'Blame trade policy', effects: { rural: 5, independents: 3, foreignPolicy: -4, mediaApproval: 2 }, headline: '"{name}" blames trade deals for job losses' },
      { label: 'Hold a rally in the hardest-hit city', effects: { momentum: 7, popularity: 4, stamina: -8, funds: -200000 }, headline: '"{name}" rallies with laid-off workers in Steelton' },
      { label: 'Commission an independent economic review', effects: { trust: 5, momentum: -3 }, headline: '"{name}" orders economic review — opponents call it a delay tactic' },
    ],
    weight: 11,
  },
  {
    id: 'econ-gas-prices',
    category: 'economy',
    title: 'Gas Prices Hit $6',
    description: 'Pump prices have crossed $6 a gallon nationally. Road rage is everywhere. Rural voters — your key demographic — are furious.',
    choices: [
      { label: 'Promise to release the Strategic Reserve', effects: { rural: 8, popularity: 5, foreignPolicy: -3 }, headline: '"{name}" promises emergency oil reserve release' },
      { label: 'Push for clean energy transition', effects: { youthVote: 10, urban: 6, rural: -8, workingClass: -4 }, headline: '"{name}" uses gas crisis to push green energy agenda' },
      { label: 'Propose a gas tax holiday', effects: { popularity: 6, workingClass: 5, donorSupport: -4, economyConfidence: -2 }, headline: '"{name}" calls for 90-day gas tax holiday' },
      { label: 'Blame OPEC and threaten sanctions', effects: { foreignPolicy: -6, rural: 4, mediaApproval: 3 }, headline: '"{name}" threatens sanctions against OPEC over gas prices' },
    ],
    weight: 10,
  },
  {
    id: 'econ-billionaire-endorsement',
    category: 'economy',
    title: 'Tech Billionaire Offers Endorsement',
    description: 'A well-known tech billionaire has offered a public endorsement — and a $5M super-PAC contribution. But he\'s controversial: workers hate him.',
    choices: [
      { label: 'Accept enthusiastically', effects: { funds: 5000000, donorSupport: 8, workingClass: -10, youthVote: -5 }, headline: '"{name}" embraces billionaire donor — union leaders furious' },
      { label: 'Accept quietly, no photo op', effects: { funds: 3000000, donorSupport: 4, workingClass: -4 }, headline: '"{name}" quietly accepts tech donor support' },
      { label: 'Decline — send a strong message', effects: { workingClass: 10, youthVote: 8, funds: 0, momentum: 6 }, headline: '"{name}" turns down billionaire\'s $5M — "I\'m not for sale"' },
      { label: 'Meet but request different terms', effects: { donorSupport: 2, trust: 3, funds: 1500000 }, headline: '"{name}" holds talks with tech mogul, details unclear' },
    ],
    weight: 8,
  },
];

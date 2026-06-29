import type { GameEvent } from '../../types/events';

export const miscEvents: GameEvent[] = [
  // Healthcare
  {
    id: 'health-hospital-visit',
    category: 'healthcare',
    title: 'Hospital Crisis — Waiting Times Hit 18 Hours',
    description: 'Emergency rooms are at 300% capacity. A viral photo of patients on gurneys in hallways has been shared 4 million times. Healthcare is suddenly the #1 issue.',
    choices: [
      { label: 'Announce a universal healthcare expansion plan', effects: { youthVote: 10, urban: 8, donorSupport: -8, popularity: 5 }, headline: '"{name}" calls for universal healthcare amid ER crisis' },
      { label: 'Blame hospital mismanagement', effects: { popularity: 3, trust: -3, mediaApproval: 2 }, headline: '"{name}" blames hospital administration for ER overcrowding' },
      { label: 'Promise emergency hospital funding', effects: { popularity: 6, funds: -2000000, trust: 4 }, headline: '"{name}" pledges $2B emergency hospital relief package' },
      { label: 'Visit a hospital and speak with staff', effects: { popularity: 5, trust: 6, stamina: -6, momentum: 4 }, headline: '"{name}" visits overcrowded ER: "I had to see it for myself"' },
    ],
    weight: 10,
  },
  // Immigration
  {
    id: 'immig-border-crisis',
    category: 'immigration',
    title: 'Border Crossing Numbers Surge',
    description: 'New figures show a record 250,000 border crossings last month. Your opponent is running attack ads. Rural and suburban voters are watching closely.',
    choices: [
      { label: 'Propose firm border enforcement measures', effects: { rural: 8, workingClass: 5, youthVote: -8, urban: -5 }, headline: '"{name}" calls for stronger border enforcement amid record crossings' },
      { label: 'Focus on the humanitarian dimension', effects: { youthVote: 10, urban: 8, rural: -8, independents: -3 }, headline: '"{name}" calls border situation a "humanitarian crisis requiring compassion"' },
      { label: 'Propose a comprehensive immigration reform package', effects: { trust: 6, independents: 5, partySupport: -5, popularity: 3 }, headline: '"{name}" unveils sweeping immigration reform plan' },
      { label: 'Attack your opponent\'s record on immigration', effects: { momentum: 5, mediaApproval: 3, trust: -3 }, headline: '"{name}" hits opponent on immigration: "They had their chance"' },
    ],
    weight: 10,
  },
  // Disaster
  {
    id: 'disaster-hurricane',
    category: 'disaster',
    title: 'Category 5 Hurricane Strikes',
    description: 'A catastrophic hurricane has hit the Gulf Coast. 2 million without power. The President has declared a federal emergency. Your response will define your character for many voters.',
    choices: [
      { label: 'Fly to the disaster zone immediately', effects: { popularity: 8, trust: 8, stamina: -12, funds: -300000 }, headline: '"{name}" lands in disaster zone: "We will rebuild"' },
      { label: 'Announce a major relief donation drive', effects: { popularity: 6, trust: 5, funds: -500000 }, headline: '"{name}" launches hurricane relief drive from campaign trail' },
      { label: 'Criticise the federal disaster response', effects: { popularity: 4, momentum: 5, foreignPolicy: -2 }, headline: '"{name}" blasts federal hurricane response as "criminally slow"' },
      { label: 'Stay on the trail — release a statement', effects: { popularity: -4, trust: -3, momentum: -2 }, headline: '"{name}" releases statement on hurricane — doesn\'t visit victims' },
    ],
    weight: 8,
  },
  // Rare
  {
    id: 'rare-celebrity',
    category: 'rare',
    title: 'A-List Celebrity Surprise Endorsement',
    description: 'One of the world\'s most famous musicians just posted a photo wearing your campaign shirt to 200 million followers. Your phone has exploded. The party elders are calling — some panicking.',
    choices: [
      { label: 'Embrace it — joint appearance at a stadium', effects: { youthVote: 15, popularity: 8, momentum: 10, partySupport: -5, stamina: -8 }, headline: '"{name}" joins [Celebrity] on stage — internet breaks' },
      { label: 'Thank them graciously and keep it short', effects: { youthVote: 8, popularity: 5, momentum: 5 }, headline: '"{name}" thanks celebrity endorser — polls tick up with young voters' },
      { label: 'Politely distance yourself', effects: { partySupport: 4, youthVote: -5, momentum: -3 }, headline: '"{name}" downplays celebrity endorsement — youth voters confused' },
    ],
    weight: 3,
    rare: true,
  },
  // Party
  {
    id: 'party-pressure-moderate',
    category: 'party',
    title: 'Party Leaders Demand You Move to the Centre',
    description: 'Three senior senators have called a private meeting. They want you to drop your bold healthcare pledge — they think it\'s costing you swing voters.',
    choices: [
      { label: 'Agree — update your position publicly', effects: { partySupport: 8, youthVote: -6, trust: -4, popularity: -2 }, headline: '"{name}" softens healthcare stance following party pressure' },
      { label: 'Refuse — double down on the pledge', effects: { youthVote: 8, partySupport: -10, momentum: 5, popularity: 4 }, headline: '"{name}" defies party elders: "I answer to the voters, not the caucus"' },
      { label: 'Find a compromise position', effects: { partySupport: 3, trust: 4, popularity: 2 }, headline: '"{name}" announces refined healthcare position after internal talks' },
      { label: 'Delay the discussion until after the election', effects: { partySupport: -3, trust: -2, momentum: 2 }, headline: '"{name}" defers healthcare policy fight: "Let\'s win first"' },
    ],
    weight: 10,
  },
  // Environment
  {
    id: 'env-wildfire',
    category: 'environment',
    title: 'Wildfires Burn Across the West',
    description: '3 million acres and counting. Air quality alerts across 5 states. Climate activists are calling this "exactly what we warned about." Industry groups are calling for more logging.',
    choices: [
      { label: 'Declare a climate emergency', effects: { youthVote: 12, urban: 8, rural: -8, workingClass: -4 }, headline: '"{name}" uses wildfire crisis to declare climate emergency' },
      { label: 'Focus on immediate relief — avoid climate politics', effects: { independents: 5, popularity: 4, youthVote: -3 }, headline: '"{name}" focuses on wildfire relief, sidesteps climate debate' },
      { label: 'Propose a bipartisan forest management bill', effects: { trust: 6, independents: 6, partySupport: -4 }, headline: '"{name}" proposes forest management compromise as fires rage' },
      { label: 'Blame regulatory overreach', effects: { rural: 7, workingClass: 5, urban: -6, youthVote: -8 }, headline: '"{name}" blames regulations for worsening wildfire season' },
    ],
    weight: 9,
  },
  // Donor
  {
    id: 'donor-pull',
    category: 'donor',
    title: 'Major Donor Threatens to Walk',
    description: 'Your second-largest donor — a pharmaceutical executive — says your drug pricing policy "crosses a line." He\'s threatening to pull $8M from your super PAC.',
    choices: [
      { label: 'Soften the drug pricing policy', effects: { donorSupport: 8, funds: 8000000, youthVote: -6, popularity: -3 }, headline: '"{name}" revises drug pricing stance — progressive wing furious' },
      { label: 'Let him walk — make a statement of it', effects: { youthVote: 10, popularity: 6, funds: -8000000, donorSupport: -5 }, headline: '"{name}" loses $8M donor: "I won\'t be bought by Big Pharma"' },
      { label: 'Meet privately and find middle ground', effects: { donorSupport: 4, funds: 3000000, trust: -2 }, headline: '"{name}" holds private talks with major donor — outcome unclear' },
      { label: 'Replace him publicly with small-dollar donors', effects: { youthVote: 8, popularity: 5, funds: 1000000, donorSupport: -3 }, headline: '"{name}" launches small-dollar campaign: "One million $8 donors"' },
    ],
    weight: 8,
  },
];

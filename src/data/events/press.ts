import type { GameEvent } from '../../types/events';

export const pressEvents: GameEvent[] = [
  {
    id: 'press-migration',
    category: 'press',
    title: 'Grilled on Migration and Search-and-Rescue',
    description: 'A veteran journalist presses you: another boat is in distress in Malta\'s vast search-and-rescue zone, and the EU still hasn\'t agreed on relocation. What will you actually do?',
    isPress: true,
    participants: ['Investigative Journalist'],
    choices: [
      { label: 'Demand binding EU burden-sharing, rescue in the meantime', effects: { foreignPolicy: 10, youthVote: 6, trust: 5, rural: -5, stamina: -5 }, headline: '"{name}" demands EU solidarity: "Malta cannot be Europe\'s border alone"' },
      { label: 'Take a hard line on irregular crossings', effects: { rural: 8, workingClass: 6, urban: -5, youthVote: -8, foreignPolicy: -4 }, headline: '"{name}" vows tougher line on irregular migration' },
      { label: 'Stress humanity and our duty at sea', effects: { youthVote: 10, urban: 7, trust: 6, rural: -8 }, headline: '"{name}": "We are a nation of seafarers — we do not let people drown"' },
    ],
    weight: 9,
  },
  {
    id: 'press-environment',
    category: 'environment',
    title: 'Interview: Is Malta Being Concreted Over?',
    description: 'The reporter holds up photos of cranes on every skyline and asks the question a generation is asking: is there any countryside left to save?',
    isPress: true,
    participants: ['Environment Correspondent'],
    choices: [
      { label: 'Pledge a moratorium on ODZ development', effects: { youthVote: 12, urban: 8, trust: 6, donorSupport: -14 }, headline: '"{name}" pledges ODZ building moratorium: "Enough is enough"' },
      { label: 'Defend construction as the engine of the economy', effects: { donorSupport: 10, workingClass: 6, youthVote: -8, trust: -4 }, headline: '"{name}" defends construction: "It built the Malta we live in"' },
      { label: 'Promise more open space and stricter rules', effects: { trust: 6, youthVote: 6, urban: 5, donorSupport: -6 }, headline: '"{name}" promises new parks and tighter building rules' },
    ],
    weight: 9,
  },
  {
    id: 'press-social',
    category: 'press',
    title: 'Cornered on IVF, Divorce and Conscience',
    description: 'The interviewer pivots to the social questions that split the island down the middle — reproductive rights and where the Church\'s influence ends. There is no safe answer.',
    isPress: true,
    participants: ['Sunday Talk-Show Host'],
    choices: [
      { label: 'Champion progressive, secular reform', effects: { youthVote: 12, urban: 8, rural: -10, partySupport: -4 }, headline: '"{name}" backs reform: "The state legislates, not the sacristy"' },
      { label: 'Defend tradition and family values', effects: { rural: 10, workingClass: 4, youthVote: -10, urban: -6 }, headline: '"{name}" stands with "Maltese family values" on social issues' },
      { label: 'Call for a calm national conversation', effects: { independents: 8, trust: 6, momentum: -2 }, headline: '"{name}" urges "respectful national dialogue" on divisive issues' },
    ],
    weight: 8,
  },
];

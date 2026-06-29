import type { GameEvent } from '../../types/events';

export const rallyEvents: GameEvent[] = [
  {
    id: 'rally-big-crowd',
    category: 'rally',
    title: 'Massive Rally in Swing State',
    description: '80,000 people showed up. The energy is electric. But your speech writer is sick, the teleprompter just died, and you\'re on in 10 minutes.',
    choices: [
      { label: 'Wing it — speak from the heart', effects: { popularity: 8, momentum: 7, trust: 3, stamina: -10 }, headline: '"{name}" delivers surprise off-script speech to record crowd' },
      { label: 'Stick to the notes you scribbled backstage', effects: { popularity: 5, momentum: 5, stamina: -8 }, headline: '"{name}" fires up 80,000 supporters in swing state rally' },
      { label: 'Shorten the speech — hit only the highlights', effects: { popularity: 4, momentum: 4, stamina: -5 }, headline: '"{name}" delivers punchy rally speech — leaves crowd wanting more' },
      { label: 'Have a surrogate open so you can prepare', effects: { popularity: 3, momentum: 2, stamina: -4, partySupport: 3 }, headline: '"{name}" rallies supporters alongside key surrogate' },
    ],
    weight: 10,
  },
  {
    id: 'rally-protest',
    category: 'rally',
    title: 'Protesters Storm the Stage',
    description: 'Mid-speech, a group of activists breach the security cordon and reach the stage, chanting. Cameras everywhere. Your security team is frozen.',
    choices: [
      { label: 'Engage with them — hear them out', effects: { youthVote: 8, trust: 5, momentum: -3, stamina: -5 }, headline: '"{name}" pauses rally to speak with protesters: "Your voice matters"' },
      { label: 'Signal security to remove them firmly', effects: { rural: 5, workingClass: 3, youthVote: -8, mediaApproval: -4 }, headline: '"{name}" has protesters removed — clips divide the internet' },
      { label: 'Make a joke to defuse the tension', effects: { popularity: 6, momentum: 5, trust: 2 }, headline: '"{name}" wins the crowd with quick wit during protest interruption' },
      { label: 'Walk off stage — cancel the event', effects: { momentum: -10, popularity: -6, scandalRisk: 5 }, headline: '"{name}" abandons rally after protest — campaign in damage control' },
    ],
    weight: 9,
  },
  {
    id: 'rally-fundraiser',
    category: 'fundraiser',
    title: 'Black-Tie Fundraiser Gala',
    description: 'A $5,000-a-plate fundraiser in a Manhattan ballroom. You\'re expected to schmooze, charm, and promise things that walk the line. But a journalist got a ticket.',
    choices: [
      { label: 'Be careful — speak on the record only', effects: { trust: 4, funds: 1500000, donorSupport: 3 }, headline: '"{name}" raises $1.5M at gala — stays disciplined with press present' },
      { label: 'Say what the donors want to hear', effects: { funds: 3000000, donorSupport: 10, workingClass: -8, scandalRisk: 8 }, headline: 'LEAKED: "{name}" makes private promises to donors at $5K gala' },
      { label: 'Give an honest, non-pandering speech', effects: { trust: 8, funds: 800000, donorSupport: -3, momentum: 4 }, headline: '"{name}" refuses to play ball at donor gala — donors surprised but impressed' },
      { label: 'Announce a bold policy to excite the room', effects: { funds: 2000000, popularity: 4, donorSupport: 5, partySupport: 3 }, headline: '"{name}" unveils policy surprise at private fundraiser' },
    ],
    weight: 9,
  },
];

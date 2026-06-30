import type { GameEvent } from '../../types/events';

export const rallyEvents: GameEvent[] = [
  {
    id: 'rally-mass-meeting',
    category: 'rally',
    title: 'The Sunday Mass Meeting',
    description: 'Tens of thousands are packing the square, flags everywhere, the band club warming up. This is the set-piece of a Maltese campaign. The crowd wants fire.',
    choices: [
      { label: 'Deliver a barnstormer off-script', effects: { popularity: 9, momentum: 9, trust: 2, stamina: -12 }, headline: '"{name}" electrifies a sea of flags with off-the-cuff speech' },
      { label: 'Stick to the disciplined message', effects: { popularity: 6, momentum: 5, partySupport: 4, stamina: -8 }, headline: '"{name}" delivers polished, on-message mass-meeting address' },
      { label: 'Keep it short — save your voice for the week', effects: { popularity: 4, momentum: 3, stamina: -4 }, headline: '"{name}" keeps mass meeting brief, eyes the home stretch' },
      { label: 'Bring local district candidates up on stage', effects: { partySupport: 8, popularity: 3, rural: 4, stamina: -6 }, headline: '"{name}" rallies the crowd alongside district candidates' },
    ],
    weight: 10,
  },
  {
    id: 'rally-village-feast',
    category: 'rally',
    title: 'A Village Festa in Full Swing',
    description: 'Petards are going off, the statue is out, the band is marching. You have been invited to three feasts in one weekend. The optics matter; so does your back.',
    choices: [
      { label: 'Do all three — be everywhere, shake every hand', effects: { rural: 10, popularity: 8, workingClass: 5, stamina: -14 }, headline: '"{name}" works three village feasts in a single weekend' },
      { label: 'Pick the swing-district feast and do it properly', effects: { rural: 6, independents: 5, popularity: 4, stamina: -6 }, headline: '"{name}" spends festa night charming a key swing district' },
      { label: 'Skip the religious bits, keep it secular', effects: { youthVote: 5, urban: 4, rural: -6, stamina: -4 }, headline: '"{name}" keeps a careful distance from the feast\'s religious core' },
    ],
    weight: 9,
  },
  {
    id: 'rally-protesters',
    category: 'rally',
    title: 'Hecklers Crash Your Walkabout',
    description: 'A knot of activists with placards on overdevelopment and corruption has gatecrashed your Republic Street walkabout. The cameras are rolling.',
    choices: [
      { label: 'Stop and engage them respectfully', effects: { youthVote: 8, trust: 6, momentum: -2, stamina: -5 }, headline: '"{name}" stops to debate protesters: "Your anger is fair"' },
      { label: 'Smile, wave and keep moving', effects: { popularity: 3, momentum: 2, mediaApproval: -2 }, headline: '"{name}" breezes past hecklers on the campaign trail' },
      { label: 'Snap back at them', effects: { momentum: 4, partySupport: 3, trust: -6, youthVote: -6, stamina: -4 }, headline: '"{name}" loses cool with protesters — clip goes viral' },
    ],
    weight: 8,
  },
];

import type { Stats } from '../types/game';

// Plain-language definitions for the stats surfaced on the Dashboard. Used by tap-to-explain
// tooltips so players aren't left guessing what "Switchers" or "Developer Lobby" mean.
export const STAT_INFO: Partial<Record<keyof Stats, string>> = {
  popularity: 'Overall public support — the single biggest driver of how many seats you win.',
  trust: 'How much voters believe you. Wins over switchers and shapes which ending you get.',
  momentum: "Your campaign's sense of motion — fuels late surges in the published polls.",
  mediaApproval: 'How favourably the press covers you day to day.',
  foreignPolicy: 'Your standing with the EU and on neutrality. Matters most to urban switchers.',
  stamina: 'Your energy. Big set-pieces (rallies, debates) drain it; you recover overnight.',
  youthVote: 'Support among younger voters.',
  workingClass: 'Support in the harbour and southern working-class districts.',
  urban: 'Support among Sliema-side and harbour urban voters.',
  rural: 'Support in Gozo and the villages — decides those districts on election night.',
  independents: 'Floating voters and switchers. They decide every close race.',
  funds: 'Your campaign war chest, in euros.',
  scandalRisk: 'How exposed you are to a scandal breaking. The higher it climbs, the worse it bites.',
  donorSupport: 'Goodwill from the business and developer lobby.',
};

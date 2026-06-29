export type DifficultyLevel = 'easy' | 'normal' | 'hard' | 'brutal';
export type Party = 'Liberty' | 'Progress';
export type CandidateTrait = 'Charismatic' | 'Hawkish' | 'Populist' | 'Technocrat' | 'Veteran' | 'Reformer' | 'Economist' | 'Idealist';

export interface Candidate {
  id: string;
  name: string;
  title: string;
  party: Party;
  traits: CandidateTrait[];
  bio: string;
  color: string;
  avatarBg: string;
  initials: string;
}

export interface Stats {
  popularity: number;
  trust: number;
  momentum: number;
  funds: number;
  mediaApproval: number;
  partySupport: number;
  donorSupport: number;
  economyConfidence: number;
  foreignPolicy: number;
  youthVote: number;
  workingClass: number;
  urban: number;
  rural: number;
  independents: number;
  scandalRisk: number;
  stamina: number;
}

export interface PollData {
  player: number;
  opponent: number;
}

export interface EVProjection {
  player: number;
  opponent: number;
  tossup: number;
}

export interface ActiveEffect {
  id: string;
  label: string;
  effects: Partial<Stats>;
  appliesOnDay: number;
}

export interface EventLogEntry {
  day: number;
  headline: string;
  category: string;
}

export type GamePhase = 'menu' | 'candidate-select' | 'campaign' | 'event' | 'debate' | 'press' | 'election-night' | 'game-over';

export interface GameState {
  phase: GamePhase;
  day: number;
  totalDays: number;
  candidate: Candidate | null;
  opponent: Candidate | null;
  stats: Stats;
  opponentStats: Stats;
  polls: PollData;
  electoralVotes: EVProjection;
  eventLog: EventLogEntry[];
  activeEffects: ActiveEffect[];
  difficulty: DifficultyLevel;
  savedAt: string | null;
  scandalStage: 0 | 1 | 2 | 3 | 4;
  achievements: string[];
  pendingEventId: string | null;
  lastChoiceHeadline: string | null;
  // M9: events unlocked by previous choices (branching), and events already shown
  unlockedEventIds: string[];
  seenEventIds: string[];
}

import type { Stats } from './game';

export type EventCategory =
  | 'economy' | 'healthcare' | 'immigration' | 'trade' | 'war'
  | 'environment' | 'crime' | 'disaster' | 'party' | 'donor'
  | 'debate' | 'press' | 'rally' | 'fundraiser' | 'scandal'
  | 'supreme-court' | 'election-security' | 'foreign' | 'education'
  | 'technology' | 'energy' | 'rare';

export interface Choice {
  label: string;
  tooltip?: string;
  effects: Partial<Stats>;
  longTermEffects?: Partial<Stats>;
  longTermDelay?: number;
  headline: string;
  unlocks?: string[];
  // Story continuity: flags this choice records, which later beats/events can react to
  setsFlags?: string[];
  // Skill-check gating: this option is locked unless the player meets every stat threshold here
  // (e.g. { trust: 60 } — a credible clean-government attack needs real standing first).
  prerequisites?: Partial<Record<keyof Stats, number>>;
}

export interface GameEvent {
  id: string;
  category: EventCategory;
  title: string;
  description: string;
  flavour?: string;
  choices: Choice[];
  weight: number;
  rare?: boolean;
  prerequisites?: Partial<Record<keyof Stats, number>>;
  isDebate?: boolean;
  isPress?: boolean;
  participants?: string[];
  // M9: only ever appears when unlocked by another choice's `unlocks`, never at random
  branchOnly?: boolean;
  // Story arc: scripted beats that drive the campaign narrative forward in order.
  storyBeat?: boolean;
  minDay?: number;          // earliest day this beat may fire
  maxDay?: number;          // latest day this beat may fire
  requiresFlags?: string[]; // only if all these story flags are set
  forbidsFlags?: string[];  // only if none of these story flags are set
}

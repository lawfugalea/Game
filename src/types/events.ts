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
}

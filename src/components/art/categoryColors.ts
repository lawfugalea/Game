import type { EventCategory } from '../../types/events';

const CATEGORY_COLORS: Record<EventCategory, string> = {
  economy: '#d8ad3d',
  healthcare: '#2f9f6b',
  immigration: '#7c5fb8',
  trade: '#d8ad3d',
  war: '#8b949e',
  environment: '#2f9f6b',
  crime: '#8b949e',
  disaster: '#f97316',
  party: '#13579f',
  donor: '#d8ad3d',
  debate: '#13579f',
  press: '#d8ad3d',
  rally: '#c91424',
  fundraiser: '#d8ad3d',
  scandal: '#c91424',
  'supreme-court': '#d9c7a6',
  'election-security': '#2f9f6b',
  foreign: '#13579f',
  education: '#d8ad3d',
  technology: '#7c5fb8',
  energy: '#f2c14e',
  rare: '#f7efe2',
};

export function getCategoryColor(category: EventCategory) {
  return CATEGORY_COLORS[category];
}

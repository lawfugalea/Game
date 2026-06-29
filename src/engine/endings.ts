import type { Stats } from '../types/game';

export type EndingTone = 'gold' | 'red' | 'neutral';

export interface Ending {
  id: string;
  emoji: string;
  label: string;
  desc: string;
  tone: EndingTone;
}

// Six distinct endings determined by the final stat combination — three wins, three losses.
export function determineEnding(won: boolean, evPlayer: number, stats: Stats): Ending {
  if (won) {
    // 1. Crushing electoral blowout
    if (evPlayer >= 350) {
      return {
        id: 'landslide',
        emoji: '🏛️',
        label: 'Landslide Mandate',
        desc: 'A historic blowout. The nation didn\'t just pick you — it rejected the alternative outright. You enter office with a mandate few presidents ever get.',
        tone: 'gold',
      };
    }
    // 2. Clean, trusted, beloved victory
    if (stats.trust >= 58 && stats.popularity >= 52) {
      return {
        id: 'peoples',
        emoji: '🤝',
        label: "The People's President",
        desc: 'You won with your integrity intact and the public firmly behind you. A rare victory built on conviction rather than compromise.',
        tone: 'gold',
      };
    }
    // 3. Won, but on scandal and broken trust
    if (stats.scandalRisk >= 55 || stats.trust < 42) {
      return {
        id: 'hollow',
        emoji: '🃏',
        label: 'A Hollow Crown',
        desc: 'You won — but the path here was ugly. The scandals didn\'t stop you, yet the investigations are already being scheduled. The honeymoon will be short.',
        tone: 'red',
      };
    }
    // Default win
    return {
      id: 'elect',
      emoji: '🎖️',
      label: 'President-Elect',
      desc: 'A hard-fought, narrow win. The margins were thin and the nights were long — but the office is yours. Now the real work begins.',
      tone: 'gold',
    };
  }

  // 4. Total collapse — scandal or bankruptcy
  if (stats.scandalRisk >= 55 || stats.funds < 500_000) {
    return {
      id: 'ruins',
      emoji: '📉',
      label: 'Campaign in Ruins',
      desc: 'It fell apart. Whether it was the scandals or the empty coffers, your message never broke through. A case study in what not to do.',
      tone: 'red',
    };
  }
  // 5. Lost, but with honor
  if (stats.trust >= 58) {
    return {
      id: 'honorable',
      emoji: '🕊️',
      label: 'Honorable Defeat',
      desc: 'You lost the election but kept your principles. You leave the trail respected — and the party will come calling again.',
      tone: 'neutral',
    };
  }
  // 6. Default loss — heartbreakingly close
  return {
    id: 'short',
    emoji: '📰',
    label: 'A Few Votes Short',
    desc: 'So close. The numbers didn\'t fall your way, but the movement you built doesn\'t vanish overnight. History will remember the effort.',
    tone: 'neutral',
  };
}

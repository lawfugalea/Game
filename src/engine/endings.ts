import type { Stats } from '../types/game';

export type EndingTone = 'gold' | 'red' | 'neutral';

export interface Ending {
  id: string;
  emoji: string;
  label: string;
  desc: string;
  tone: EndingTone;
}

// Six distinct endings determined by the final seat count and stat combination.
// `evPlayer` is the player's seats out of 65 (33 to govern, ~44+ is a landslide).
export function determineEnding(won: boolean, evPlayer: number, stats: Stats): Ending {
  if (won) {
    // 1. Crushing super-majority
    if (evPlayer >= 44) {
      return {
        id: 'landslide',
        emoji: '🏛️',
        label: 'Landslide Mandate',
        desc: 'A historic super-majority. The island didn\'t just elect you — it handed you the keys to Castille outright. Few Prime Ministers ever govern with a mandate this large.',
        tone: 'gold',
      };
    }
    // 2. Clean, trusted, beloved victory
    if (stats.trust >= 58 && stats.popularity >= 52) {
      return {
        id: 'peoples',
        emoji: '🤝',
        label: 'Prime Minister of the People',
        desc: 'You won with your integrity intact and the country firmly behind you. A rare mandate built on conviction rather than backroom deals.',
        tone: 'gold',
      };
    }
    // 3. Won as Malta's pro-European standard-bearer
    if (stats.foreignPolicy >= 62 && stats.trust >= 50) {
      return {
        id: 'europe',
        emoji: '🇪🇺',
        label: 'Malta\'s European Moment',
        desc: 'You won a mandate to put Malta back at the heart of Europe. Brussels is already returning your calls, and the summit invitations are stacking up. A small island, suddenly punching above its weight.',
        tone: 'gold',
      };
    }
    // 4. Won, but on scandal and broken trust
    if (stats.scandalRisk >= 55 || stats.trust < 42) {
      return {
        id: 'hollow',
        emoji: '🃏',
        label: 'A Hollow Victory',
        desc: 'You take Castille — but the road here was ugly. The scandals didn\'t sink you, yet the magisterial inquiries and the questions from Brussels are already being filed. The honeymoon will be short.',
        tone: 'red',
      };
    }
    // Default win
    return {
      id: 'elect',
      emoji: '🎖️',
      label: 'Prime Minister-Elect',
      desc: 'A hard-fought, narrow majority — a seat or two in the right districts made all the difference. The keys to Castille are yours. Now the real work begins.',
      tone: 'gold',
    };
  }

  // 4. Total collapse — scandal or empty coffers
  if (stats.scandalRisk >= 55 || stats.funds < 250_000) {
    return {
      id: 'ruins',
      emoji: '📉',
      label: 'Campaign in Ruins',
      desc: 'It fell apart. Whether it was the scandals or the empty coffers, your message never broke through the village clubs and the front pages. A case study in what not to do.',
      tone: 'red',
    };
  }
  // 5. Lost, but with honour
  if (stats.trust >= 58) {
    return {
      id: 'honorable',
      emoji: '🕊️',
      label: 'Honourable Defeat',
      desc: 'You lost the election but kept your principles. You sit in Opposition respected — and on this island, the pendulum always swings back.',
      tone: 'neutral',
    };
  }
  // 6. Default loss — heartbreakingly close
  return {
    id: 'short',
    emoji: '📰',
    label: 'A Few Seats Short',
    desc: 'So close. The numbers didn\'t fall your way across the districts, but the movement you built doesn\'t vanish overnight. The next election is never far away.',
    tone: 'neutral',
  };
}

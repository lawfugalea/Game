import type { Stats } from '../types/game';
import type { Choice } from '../types/events';

// How much stamina a choice burns (a positive number), derived from its negative stamina effect.
export function choiceStaminaCost(choice: Choice): number {
  const s = choice.effects.stamina ?? 0;
  return s < 0 ? -s : 0;
}

export interface ChoiceLock {
  locked: boolean;
  reason?: string;
}

// Human-readable stat name for a lock reason, e.g. 'foreignPolicy' -> 'Foreign Policy'.
function statName(key: string): string {
  return key.replace(/([A-Z])/g, ' $1').replace(/^./, (c) => c.toUpperCase()).trim();
}

// A single choice is locked when the candidate is too exhausted to afford its stamina cost, or
// when it carries a skill-check (`prerequisites`) the player's stats don't yet meet.
export function getChoiceLock(stats: Stats, choice: Choice): ChoiceLock {
  const cost = choiceStaminaCost(choice);
  if (cost > 0 && stats.stamina < cost) {
    return { locked: true, reason: `Too exhausted · needs ${cost} stamina` };
  }
  if (choice.prerequisites) {
    for (const [key, threshold] of Object.entries(choice.prerequisites)) {
      const k = key as keyof Stats;
      if ((stats[k] ?? 0) < (threshold as number)) {
        const label = k === 'funds' ? `€${((threshold as number) / 1_000_000).toFixed(1)}M funds` : `${statName(key)} ${threshold}+`;
        return { locked: true, reason: `Needs ${label}` };
      }
    }
  }
  return { locked: false };
}

// Lock map for an event's choices. Guarantees the player is never fully soft-locked:
// if every option is unaffordable, the cheapest one is freed.
export function getChoiceLocks(stats: Stats, choices: Choice[]): ChoiceLock[] {
  const locks = choices.map((c) => getChoiceLock(stats, c));
  if (locks.length && locks.every((l) => l.locked)) {
    let cheapestIdx = 0;
    let cheapest = Infinity;
    choices.forEach((c, i) => {
      const cost = choiceStaminaCost(c);
      if (cost < cheapest) {
        cheapest = cost;
        cheapestIdx = i;
      }
    });
    locks[cheapestIdx] = { locked: false };
  }
  return locks;
}

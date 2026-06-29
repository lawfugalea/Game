import type { GameState } from '../types/game';

const SAVE_PREFIX = 'campaign_chaos_save_';
const NUM_SLOTS = 3;

export function saveGame(state: GameState, slot: number = 0): void {
  const key = `${SAVE_PREFIX}${slot}`;
  const payload = { ...state, savedAt: new Date().toISOString() };
  localStorage.setItem(key, JSON.stringify(payload));
}

export function loadGame(slot: number = 0): GameState | null {
  const key = `${SAVE_PREFIX}${slot}`;
  const raw = localStorage.getItem(key);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as GameState;
  } catch {
    return null;
  }
}

export function listSaves(): Array<{ slot: number; savedAt: string | null; candidateName: string | null; day: number }> {
  return Array.from({ length: NUM_SLOTS }, (_, i) => {
    const raw = localStorage.getItem(`${SAVE_PREFIX}${i}`);
    if (!raw) return { slot: i, savedAt: null, candidateName: null, day: 0 };
    try {
      const s = JSON.parse(raw) as Partial<GameState>;
      return { slot: i, savedAt: s.savedAt ?? null, candidateName: s.candidate?.name ?? null, day: s.day ?? 0 };
    } catch {
      return { slot: i, savedAt: null, candidateName: null, day: 0 };
    }
  });
}

export function deleteSave(slot: number): void {
  localStorage.removeItem(`${SAVE_PREFIX}${slot}`);
}

export function autosave(state: GameState): void {
  saveGame(state, 0);
}

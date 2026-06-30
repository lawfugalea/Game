import type { GameState } from '../types/game';

const SAVE_PREFIX = 'campaign_chaos_save_';
const AUTOSAVE_KEY = 'campaign_chaos_autosave';
const PROFILE_KEY = 'campaign_chaos_profile';
export const NUM_SLOTS = 3;

export interface SaveInfo {
  slot: number;
  savedAt: string | null;
  candidateName: string | null;
  day: number;
}

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

export function listSaves(): SaveInfo[] {
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

// Autosave lives in its own key so it never overwrites a manual save slot.
export function autosave(state: GameState): void {
  const payload = { ...state, savedAt: new Date().toISOString() };
  localStorage.setItem(AUTOSAVE_KEY, JSON.stringify(payload));
}

export function loadAutosave(): GameState | null {
  const raw = localStorage.getItem(AUTOSAVE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as GameState;
  } catch {
    return null;
  }
}

// Wipes every manual slot and the autosave — used by "Delete all saved data".
export function clearAllSaves(): void {
  for (let i = 0; i < NUM_SLOTS; i++) localStorage.removeItem(`${SAVE_PREFIX}${i}`);
  localStorage.removeItem(AUTOSAVE_KEY);
}

export function autosaveInfo(): SaveInfo | null {
  const raw = localStorage.getItem(AUTOSAVE_KEY);
  if (!raw) return null;
  try {
    const s = JSON.parse(raw) as Partial<GameState>;
    return { slot: -1, savedAt: s.savedAt ?? null, candidateName: s.candidate?.name ?? null, day: s.day ?? 0 };
  } catch {
    return null;
  }
}

// --- Cross-run profile: achievements ever earned + best result. Persists through "delete
//     saved data" (it's progression, not a save slot). ---

export interface Profile {
  earned: string[];
  campaigns: number;
  wins: number;
  bestSeats: number;
}

const EMPTY_PROFILE: Profile = { earned: [], campaigns: 0, wins: 0, bestSeats: 0 };

export function loadProfile(): Profile {
  try {
    const raw = localStorage.getItem(PROFILE_KEY);
    if (!raw) return { ...EMPTY_PROFILE };
    return { ...EMPTY_PROFILE, ...(JSON.parse(raw) as Partial<Profile>) };
  } catch {
    return { ...EMPTY_PROFILE };
  }
}

function saveProfile(p: Profile): void {
  try {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(p));
  } catch {
    /* ignore quota / unavailable storage */
  }
}

// Union the given achievement ids into the lifetime-earned set.
export function recordEarnedAchievements(ids: string[]): void {
  if (!ids.length) return;
  const p = loadProfile();
  const earned = Array.from(new Set([...p.earned, ...ids]));
  if (earned.length !== p.earned.length) saveProfile({ ...p, earned });
}

// Tally a finished campaign (call once, at game over).
export function recordCampaignResult(seats: number, won: boolean): void {
  const p = loadProfile();
  saveProfile({
    ...p,
    campaigns: p.campaigns + 1,
    wins: p.wins + (won ? 1 : 0),
    bestSeats: Math.max(p.bestSeats, seats),
  });
}

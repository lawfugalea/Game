import { useState } from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '../store/gameStore';
import { listSaves, loadGame, loadAutosave, autosaveInfo, clearAllSaves, loadProfile } from '../engine/saveSystem';
import { ACHIEVEMENTS } from '../engine/achievements';
import { MainMenuHeroArt } from '../components/art';
import { playTap, isMuted, toggleMuted } from '../engine/audioSystem';
import type { DifficultyLevel } from '../types/game';

const DIFFICULTIES: { id: DifficultyLevel; label: string; desc: string }[] = [
  { id: 'easy', label: 'Easy', desc: 'Forgiving first campaign' },
  { id: 'normal', label: 'Normal', desc: 'Balanced island fight' },
  { id: 'hard', label: 'Hard', desc: 'Smarter opposition machine' },
  { id: 'brutal', label: 'Brutal', desc: 'Every gaffe becomes headline news' },
];

export function MainMenu() {
  const { difficulty, setDifficulty, phase, loadState } = useGameStore();
  const [confirmWipe, setConfirmWipe] = useState(false);
  const [refresh, setRefresh] = useState(0);
  const [muted, setMuted] = useState(isMuted());
  const [showTrophies, setShowTrophies] = useState(false);
  void refresh;
  const saves = listSaves();
  const auto = autosaveInfo();
  const hasSave = auto !== null || saves.some((s) => s.savedAt);
  const profile = loadProfile();
  const earnedSet = new Set(profile.earned);

  function handleWipe() {
    clearAllSaves();
    setConfirmWipe(false);
    setRefresh((n) => n + 1);
  }

  function handleNewGame() {
    playTap();
    useGameStore.setState({ phase: 'candidate-select' });
  }

  function handleLoad(slot: number) {
    const saved = loadGame(slot);
    if (saved) loadState(saved);
  }

  function handleResume() {
    const saved = loadAutosave();
    if (saved) loadState(saved);
  }

  void phase;

  return (
    <div className="screen flex min-h-screen flex-col px-5 pb-8">
      <div className="top-stripe -mx-5" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55 }}
        className="flex flex-1 flex-col justify-center py-8"
      >
        <div className="mb-7">
          <div className="mb-4 flex items-center justify-between">
            <div className="section-label">Malta Votes · 5 Week Sprint</div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setMuted(toggleMuted())}
                className="text-sm leading-none transition-opacity hover:opacity-80"
                aria-label={muted ? 'Unmute sound' : 'Mute sound'}
                title={muted ? 'Unmute' : 'Mute'}
              >
                {muted ? '🔇' : '🔊'}
              </button>
              <div className="rounded-sm border border-chaos-gold/35 bg-chaos-gold/12 px-2 py-1 text-[0.62rem] font-black uppercase text-chaos-gold">LIVE</div>
            </div>
          </div>

          <div className="relative overflow-hidden border-y border-chaos-gold/35 py-5">
            <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,rgba(247,239,226,0.05)_0_1px,transparent_1px_5px)]" />
            <div className="relative mb-4">
              <MainMenuHeroArt />
            </div>
            <h1 className="display-title relative text-[3.85rem] leading-[0.82] text-chaos-ink">
              Campaign
              <span className="block text-transparent" style={{ WebkitTextStroke: '1.5px var(--gold)' }}>Chaos</span>
            </h1>
            <div className="relative mt-4 grid grid-cols-[1fr_auto_1fr] items-center gap-2 text-[0.68rem] font-black uppercase text-white/50">
              <span className="h-px bg-chaos-red/60" />
              <span>General Election Simulator</span>
              <span className="h-px bg-chaos-blue/60" />
            </div>
          </div>
        </div>

        <div className="broadcast-card mb-5 p-4">
          <div className="mb-3 flex items-end justify-between">
            <div>
              <div className="section-label">Difficulty</div>
              <div className="text-sm font-bold text-white/56">Set the newsroom pressure.</div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {DIFFICULTIES.map((d) => (
              <button
                key={d.id}
                onClick={() => { playTap(); setDifficulty(d.id); }}
                className={`rounded-sm border p-3 text-left transition-all ${
                  difficulty === d.id
                    ? 'border-chaos-gold/65 bg-chaos-gold/14 text-chaos-ink'
                    : 'border-white/10 bg-black/12 text-white/58 hover:border-white/24 hover:text-white'
                }`}
              >
                <div className="display-title text-sm">{d.label}</div>
                <div className="mt-1 text-xs leading-snug opacity-70">{d.desc}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <motion.button whileTap={{ scale: 0.98 }} onClick={handleNewGame} className="btn-primary w-full py-4 text-lg font-black">
            New Campaign
          </motion.button>

          {hasSave && (
            <div className="space-y-2">
              <div className="section-label text-center">Continue</div>
              {auto && (
                <button onClick={handleResume} className="paper-card flex w-full items-center justify-between p-3 text-left text-chaos-ink">
                  <span className="text-sm font-black">Resume Autosave · {auto.candidateName ?? 'Unknown'}</span>
                  <span className="text-xs font-bold text-chaos-gold">Day {auto.day}</span>
                </button>
              )}
              {saves.filter((s) => s.savedAt).map((s) => (
                <button key={s.slot} onClick={() => handleLoad(s.slot)} className="paper-card flex w-full items-center justify-between gap-3 p-3 text-left">
                  <span className="truncate text-sm font-black text-chaos-ink">{s.candidateName ?? 'Unknown'}</span>
                  <span className="shrink-0 text-xs text-white/42">Day {s.day}</span>
                </button>
              ))}
            </div>
          )}

          {hasSave && (
            <div className="pt-1 text-center">
              {!confirmWipe ? (
                <button onClick={() => setConfirmWipe(true)} className="text-xs font-bold uppercase text-white/35 transition-colors hover:text-chaos-red">
                  Delete saved data
                </button>
              ) : (
                <div className="paper-card p-3 text-left">
                  <div className="serif-note mb-2 text-xs text-white/72">Delete all saves and the autosave? This cannot be undone.</div>
                  <div className="flex gap-2">
                    <button onClick={handleWipe} className="flex-1 rounded-sm border border-chaos-red/50 bg-chaos-red/15 px-3 py-2 text-xs font-black uppercase text-chaos-red">
                      Delete everything
                    </button>
                    <button onClick={() => setConfirmWipe(false)} className="btn-ghost flex-1 px-3 py-2 text-xs font-black uppercase">
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="mt-5">
          <button
            onClick={() => { playTap(); setShowTrophies((v) => !v); }}
            className="paper-card flex w-full items-center justify-between p-3 text-left"
          >
            <span className="text-sm font-black text-chaos-ink">Trophy Cabinet</span>
            <span className="text-xs font-bold text-chaos-gold">{profile.earned.length}/{ACHIEVEMENTS.length} · {showTrophies ? 'Hide' : 'Show'}</span>
          </button>
          {showTrophies && (
            <div className="broadcast-card mt-2 p-4">
              <div className="mb-3 grid grid-cols-3 gap-2 text-center">
                <div><div className="display-title text-xl text-chaos-ink">{profile.campaigns}</div><div className="text-[0.6rem] font-black uppercase text-white/40">Campaigns</div></div>
                <div><div className="display-title text-xl text-chaos-gold">{profile.wins}</div><div className="text-[0.6rem] font-black uppercase text-white/40">Wins</div></div>
                <div><div className="display-title text-xl text-chaos-ink">{profile.bestSeats}</div><div className="text-[0.6rem] font-black uppercase text-white/40">Best Seats</div></div>
              </div>
              <div className="grid grid-cols-1 gap-2">
                {ACHIEVEMENTS.map((a) => {
                  const got = earnedSet.has(a.id);
                  return (
                    <div key={a.id} className={`flex items-center gap-3 rounded-sm border p-2 ${got ? 'border-chaos-gold/35 bg-chaos-gold/10' : 'border-white/8 bg-black/15 opacity-55'}`}>
                      <span className="text-lg">{got ? a.emoji : '🔒'}</span>
                      <div className="min-w-0">
                        <div className="text-xs font-black text-chaos-ink">{a.label}</div>
                        <div className="serif-note text-[0.68rem] leading-snug text-white/50">{a.desc}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        <p className="serif-note mt-7 text-center text-xs italic text-white/28">
          All characters and events are fictional. The headlines are the problem.
        </p>
      </motion.div>
    </div>
  );
}

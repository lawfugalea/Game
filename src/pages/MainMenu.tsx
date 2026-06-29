import { motion } from 'framer-motion';
import { useGameStore } from '../store/gameStore';
import { listSaves, loadGame } from '../engine/saveSystem';
import type { DifficultyLevel } from '../types/game';

const DIFFICULTIES: { id: DifficultyLevel; label: string; desc: string }[] = [
  { id: 'easy', label: 'Easy', desc: 'Forgiving — great for first-timers' },
  { id: 'normal', label: 'Normal', desc: 'Balanced challenge' },
  { id: 'hard', label: 'Hard', desc: 'Opponent plays smarter' },
  { id: 'brutal', label: 'Brutal', desc: 'One mistake can end your campaign' },
];

export function MainMenu() {
  const { difficulty, setDifficulty, phase, loadState } = useGameStore();
  const saves = listSaves();
  const hasSave = saves.some((s) => s.savedAt);

  function handleNewGame() {
    useGameStore.setState({ phase: 'candidate-select' });
  }

  function handleLoad(slot: number) {
    const saved = loadGame(slot);
    if (saved) loadState(saved);
  }

  void phase;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #080810 0%, #0d0d1f 50%, #080810 100%)' }}>

      {/* Background stars */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 40 }).map((_, i) => (
          <div key={i} className="absolute rounded-full bg-white/20"
            style={{ width: 1 + Math.random() * 2, height: 1 + Math.random() * 2, left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, opacity: 0.2 + Math.random() * 0.5 }} />
        ))}
      </div>

      {/* US flag stripes accent */}
      <div className="absolute top-0 left-0 right-0 h-1 flex">
        {Array.from({ length: 13 }).map((_, i) => (
          <div key={i} className="flex-1" style={{ background: i % 2 === 0 ? '#E0212F' : '#fff' }} />
        ))}
      </div>

      <motion.div initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
        className="w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1 mb-3">
            <div className="w-6 h-6 rounded bg-chaos-red" />
            <div className="w-6 h-6 rounded bg-chaos-blue" />
            <div className="w-6 h-6 rounded" style={{ background: '#F5C518' }} />
          </div>
          <h1 className="text-5xl font-black text-white tracking-tight leading-none">
            CAMPAIGN<br />
            <span style={{ WebkitTextStroke: '2px #E0212F', color: 'transparent' }}>CHAOS</span>
          </h1>
          <p className="text-white/30 text-sm mt-3 tracking-widest uppercase">The Presidential Simulation</p>
        </div>

        {/* Difficulty */}
        <div className="mb-6">
          <div className="text-xs text-white/40 uppercase tracking-widest mb-2">Difficulty</div>
          <div className="grid grid-cols-2 gap-2">
            {DIFFICULTIES.map((d) => (
              <button key={d.id} onClick={() => setDifficulty(d.id)}
                className={`p-3 rounded-lg border text-left transition-all ${difficulty === d.id ? 'border-chaos-red bg-chaos-red/15 text-white' : 'border-white/10 bg-white/3 text-white/50 hover:border-white/30 hover:text-white/80'}`}>
                <div className="font-bold text-sm">{d.label}</div>
                <div className="text-xs opacity-60 mt-0.5">{d.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="space-y-3">
          <button onClick={handleNewGame}
            className="w-full py-4 rounded-xl font-black text-lg tracking-wide text-white transition-all active:scale-98"
            style={{ background: 'linear-gradient(135deg, #E0212F, #c01828)' }}>
            NEW CAMPAIGN
          </button>

          {hasSave && (
            <div className="space-y-2">
              <div className="text-xs text-white/30 uppercase tracking-widest text-center">Continue</div>
              {saves.filter((s) => s.savedAt).map((s) => (
                <button key={s.slot} onClick={() => handleLoad(s.slot)}
                  className="w-full py-3 px-4 rounded-xl border border-white/10 bg-white/4 hover:border-white/30 text-left text-white transition-all flex justify-between items-center">
                  <span className="text-sm font-semibold">{s.candidateName ?? 'Unknown'}</span>
                  <span className="text-xs text-white/40">Day {s.day} · {new Date(s.savedAt!).toLocaleDateString()}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <p className="text-center text-white/15 text-xs mt-8">
          All characters and events are entirely fictional.
        </p>
      </motion.div>
    </div>
  );
}

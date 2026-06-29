import { useState } from 'react';
import { motion } from 'framer-motion';
import { candidates, opponents } from '../data/candidates';
import { useGameStore } from '../store/gameStore';

export function CandidateSelect() {
  const [selected, setSelected] = useState<string | null>(null);
  const [oppSelected, setOppSelected] = useState<string>(opponents[0].id);
  const startGame = useGameStore((s) => s.startGame);

  const candidate = candidates.find((c) => c.id === selected);

  return (
    <div className="min-h-screen flex flex-col px-4 py-8 max-w-lg mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <button onClick={() => useGameStore.setState({ phase: 'menu' })}
          className="text-white/40 hover:text-white text-sm mb-6 flex items-center gap-2">
          ← Back
        </button>
        <h2 className="text-2xl font-black text-white mb-1">Choose Your Candidate</h2>
        <p className="text-white/40 text-sm mb-6">Your traits shape how events unfold.</p>

        <div className="space-y-3 mb-8">
          {candidates.map((c, i) => (
            <motion.button key={c.id}
              initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}
              onClick={() => setSelected(c.id)}
              className={`w-full text-left p-4 rounded-xl border transition-all ${selected === c.id ? 'border-chaos-red bg-chaos-red/10' : 'border-white/8 bg-white/3 hover:border-white/20'}`}>
              <div className="flex gap-4 items-center">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${c.avatarBg} flex items-center justify-center shrink-0`}>
                  <span className="text-white font-black text-lg">{c.initials}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-white font-bold">{c.name}</div>
                  <div className="text-white/40 text-xs">{c.title} · {c.party} Party</div>
                  <div className="flex gap-1.5 mt-1.5 flex-wrap">
                    {c.traits.map((t) => (
                      <span key={t} className="text-xs px-2 py-0.5 rounded-full border border-chaos-gold/30 text-chaos-gold/80">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
              {selected === c.id && (
                <p className="text-white/50 text-xs mt-3 leading-relaxed">{c.bio}</p>
              )}
            </motion.button>
          ))}
        </div>

        {/* Opponent selector */}
        <div className="mb-8">
          <h3 className="text-sm font-semibold text-white/40 uppercase tracking-widest mb-3">Your Opponent</h3>
          <div className="space-y-2">
            {opponents.map((o) => (
              <button key={o.id} onClick={() => setOppSelected(o.id)}
                className={`w-full text-left p-3 rounded-xl border transition-all ${oppSelected === o.id ? 'border-chaos-blue bg-chaos-blue/10' : 'border-white/8 hover:border-white/20'}`}>
                <div className="flex gap-3 items-center">
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${o.avatarBg} flex items-center justify-center shrink-0`}>
                    <span className="text-white font-black text-sm">{o.initials}</span>
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm">{o.name}</div>
                    <div className="text-white/40 text-xs">{o.title}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <button
          disabled={!selected}
          onClick={() => selected && startGame(selected, oppSelected)}
          className="w-full py-4 rounded-xl font-black text-lg text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed active:scale-98"
          style={{ background: selected ? 'linear-gradient(135deg, #E0212F, #c01828)' : '#333' }}>
          {selected ? `Run as ${candidate?.name.split(' ')[1]}` : 'Select a Candidate'}
        </button>
      </motion.div>
    </div>
  );
}

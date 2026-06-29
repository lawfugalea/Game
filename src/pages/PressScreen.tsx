import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../store/gameStore';
import { allEvents } from '../data/events';
import { ChoiceCard } from '../components/ui/ChoiceCard';
import { getChoiceLocks } from '../engine/staminaSystem';
import type { Choice } from '../types/events';

export function PressScreen() {
  const { pendingEventId, candidate, stats, makeChoice, returnToDashboard } = useGameStore();
  const [chosen, setChosen] = useState<Choice | null>(null);
  const event = allEvents.find((e) => e.id === pendingEventId);

  if (!event || !candidate) return null;

  const journalist = event.participants?.[0] ?? 'Press Reporter';
  const locks = getChoiceLocks(stats, event.choices);

  function handleChoice(choice: Choice) {
    setChosen(choice);
    makeChoice(choice, event!.id);
    setTimeout(() => {
      setChosen(null);
      returnToDashboard();
    }, 2200);
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#050510' }}>
      {/* TV studio header */}
      <div className="px-4 pt-6 pb-4 border-b border-white/8"
        style={{ background: 'linear-gradient(to bottom, #0d1020, transparent)' }}>
        <div className="flex items-center gap-3 mb-4">
          <div className="flex gap-1">
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <div className="w-2 h-2 rounded-full bg-yellow-500" />
            <div className="w-2 h-2 rounded-full bg-green-500" />
          </div>
          <span className="text-xs font-bold text-white/40 uppercase tracking-widest">LIVE INTERVIEW</span>
        </div>

        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-slate-800 to-slate-600 flex items-center justify-center border border-white/10">
            <span className="text-2xl">🎙</span>
          </div>
          <div>
            <div className="text-white font-bold">{journalist}</div>
            <div className="text-white/30 text-xs">Press Interview</div>
          </div>
        </div>
      </div>

      {/* Interview content */}
      <div className="px-4 py-5 flex-1 overflow-y-auto no-scrollbar">
        <div className="bg-white/4 border border-white/8 rounded-xl p-4 mb-5">
          <div className="text-xs text-white/30 mb-2">"{journalist}" asks:</div>
          <p className="text-white/80 leading-relaxed text-sm italic">"{event.description}"</p>
        </div>

        <div className="text-xs text-white/30 uppercase tracking-widest mb-3">Your Answer</div>
        <div className="space-y-3">
          {event.choices.map((choice, i) => (
            <ChoiceCard key={i} choice={choice} index={i} onSelect={() => handleChoice(choice)} disabled={!!chosen} locked={locks[i].locked} lockReason={locks[i].reason} />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {chosen && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
            className="mx-4 mb-6 p-4 rounded-xl border border-white/15 bg-white/5">
            <div className="text-xs text-white/40 uppercase tracking-widest mb-1">Published Headline</div>
            <div className="text-white font-semibold text-sm">
              {chosen.headline.replace(/"\{name\}"/g, candidate.name)}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

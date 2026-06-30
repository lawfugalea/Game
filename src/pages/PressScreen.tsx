import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../store/gameStore';
import { allEvents } from '../data/events';
import { ChoiceCard } from '../components/ui/ChoiceCard';
import { ScenarioArt } from '../components/art';
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
    <div className="screen flex min-h-screen flex-col">
      <div className="border-b border-white/10 px-4 pb-4 pt-6 scanlines"
        style={{ background: 'linear-gradient(to bottom, rgba(19,87,159,0.20), transparent)' }}>
        <ScenarioArt category="press" title="Press interview illustration" className="mb-4 h-28" />
        <div className="flex items-center gap-3 mb-4">
          <div className="flex gap-1">
            <div className="h-2 w-2 rounded-full bg-chaos-red alert-pulse" />
            <div className="h-2 w-2 rounded-full bg-chaos-gold" />
            <div className="h-2 w-2 rounded-full bg-chaos-green" />
          </div>
          <span className="text-xs font-black uppercase text-white/44">LIVE INTERVIEW</span>
        </div>

        <div className="flex items-center gap-4">
          <div className="avatar-tile flex h-14 w-14 items-center justify-center bg-gradient-to-br from-stone-800 to-stone-600">
            <span className="display-title text-lg text-chaos-gold">MIC</span>
          </div>
          <div>
            <div className="text-lg font-black text-chaos-ink">{journalist}</div>
            <div className="text-xs font-bold uppercase text-white/40">Press Interview</div>
          </div>
        </div>
      </div>

      <div className="px-4 py-5 flex-1 overflow-y-auto no-scrollbar">
        <div className="paper-card mb-5 p-4">
          <div className="section-label mb-2">{journalist} asks</div>
          <p className="serif-note text-[0.95rem] italic leading-relaxed text-white/74">"{event.description}"</p>
        </div>

        <div className="section-label mb-3">Your Answer</div>
        <div className="space-y-3">
          {event.choices.map((choice, i) => (
            <ChoiceCard key={i} choice={choice} index={i} onSelect={() => handleChoice(choice)} disabled={!!chosen} locked={locks[i].locked} lockReason={locks[i].reason} />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {chosen && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
            className="paper-card mx-4 mb-6 p-4">
            <div className="section-label mb-1">Published Headline</div>
            <div className="text-sm font-black text-chaos-ink">
              {chosen.headline.replace(/"\{name\}"/g, candidate.name)}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

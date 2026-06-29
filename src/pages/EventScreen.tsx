import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../store/gameStore';
import { allEvents } from '../data/events';
import { ChoiceCard } from '../components/ui/ChoiceCard';
import { TVLowerThird } from '../components/ui/TVLowerThird';
import { getChoiceLocks } from '../engine/staminaSystem';
import type { Choice } from '../types/events';

const CATEGORY_COLORS: Record<string, string> = {
  economy: '#F5C518',
  scandal: '#E0212F',
  war: '#6b7280',
  disaster: '#f97316',
  healthcare: '#22c55e',
  immigration: '#a855f7',
  party: '#1E6FC8',
  donor: '#F5C518',
  environment: '#22c55e',
  crime: '#6b7280',
  default: '#E0212F',
};

export function EventScreen() {
  const { pendingEventId, candidate, stats, makeChoice, returnToDashboard } = useGameStore();
  const [chosen, setChosen] = useState<Choice | null>(null);
  const event = allEvents.find((e) => e.id === pendingEventId);

  if (!event || !candidate) return null;

  const color = CATEGORY_COLORS[event.category] ?? CATEGORY_COLORS.default;
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
    <div className="min-h-screen flex flex-col" style={{ background: '#08080f' }}>
      {/* Event header */}
      <div className="relative">
        <div className="px-4 pt-8 pb-6"
          style={{ background: `linear-gradient(135deg, ${color}18, transparent)`, borderBottom: `1px solid ${color}30` }}>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 rounded-full" style={{ background: color }} />
            <span className="text-xs uppercase tracking-widest font-bold" style={{ color }}>
              {event.category.replace('-', ' ')}
            </span>
          </div>
          <h2 className="text-2xl font-black text-white leading-tight mb-2">{event.title}</h2>
          {event.participants && (
            <div className="flex flex-wrap gap-2">
              {event.participants.map((p) => (
                <span key={p} className="text-xs text-white/30 border border-white/10 px-2 py-1 rounded">{p}</span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Event description */}
      <div className="px-4 py-5 flex-1 overflow-y-auto no-scrollbar">
        <p className="text-white/75 leading-relaxed text-sm mb-6">{event.description}</p>

        {/* Choices */}
        <div className="space-y-3">
          {event.choices.map((choice, i) => (
            <ChoiceCard
              key={i}
              choice={choice}
              index={i}
              onSelect={() => handleChoice(choice)}
              disabled={!!chosen}
              locked={locks[i].locked}
              lockReason={locks[i].reason}
            />
          ))}
        </div>
      </div>

      {/* Outcome toast */}
      <AnimatePresence>
        {chosen && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-0 left-0 right-0 px-4 pb-6 pt-4"
            style={{ background: 'linear-gradient(to top, #080810, transparent)' }}>
            <div className="bg-white/10 border border-white/15 rounded-xl p-4 backdrop-blur-sm relative overflow-hidden">
              <TVLowerThird
                network="NNN BREAKING"
                headline={chosen.headline.replace(/"\{name\}"/g, candidate.name)}
              />
              <div className="pr-2 pb-10">
                <div className="text-xs text-white/40 uppercase tracking-widest mb-1">Breaking News</div>
                <div className="text-white font-semibold text-sm">
                  {chosen.headline.replace(/"\{name\}"/g, candidate.name)}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

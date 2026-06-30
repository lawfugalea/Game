import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../store/gameStore';
import { allEvents } from '../data/events';
import { ChoiceCard } from '../components/ui/ChoiceCard';
import { TVLowerThird } from '../components/ui/TVLowerThird';
import { ScenarioArt, getCategoryColor } from '../components/art';
import { getChoiceLocks } from '../engine/staminaSystem';
import type { Choice } from '../types/events';

export function EventScreen() {
  const { pendingEventId, candidate, stats, makeChoice, returnToDashboard } = useGameStore();
  const [chosen, setChosen] = useState<Choice | null>(null);
  const event = allEvents.find((e) => e.id === pendingEventId);

  if (!event || !candidate) return null;

  const color = getCategoryColor(event.category);
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
      <div className="relative">
        <div className="px-4 pb-4 pt-6 scanlines"
          style={{ background: `linear-gradient(135deg, ${color}24, rgba(0,0,0,0.08))`, borderBottom: `1px solid ${color}55` }}>
          <ScenarioArt category={event.category} title={`${event.category} illustration`} className="mb-4 h-32" />
          <div className="flex items-center gap-2 mb-3">
            <div className="h-2 w-2 rounded-full alert-pulse" style={{ background: color }} />
            <span className="text-xs font-black uppercase" style={{ color }}>
              {event.category.replace('-', ' ')}
            </span>
          </div>
          <h2 className="display-title text-3xl leading-none text-chaos-ink">{event.title}</h2>
          {event.participants && (
            <div className="mt-3 flex flex-wrap gap-2">
              {event.participants.map((p) => (
                <span key={p} className="rounded-sm border border-white/14 bg-black/14 px-2 py-1 text-xs font-bold text-white/46">{p}</span>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="px-4 py-5 flex-1 overflow-y-auto no-scrollbar">
        <div className="paper-card mb-5 p-4">
          <p className="serif-note text-[0.95rem] leading-relaxed text-white/72">{event.description}</p>
        </div>

        <div className="section-label mb-3">Campaign Response</div>
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
            style={{ background: 'linear-gradient(to top, #17110d, transparent)' }}>
            <div className="broadcast-card relative overflow-hidden p-4 backdrop-blur-sm">
              <TVLowerThird
                network="MALTA LIVE"
                headline={chosen.headline.replace(/"\{name\}"/g, candidate.name)}
              />
              <div className="pr-2 pb-10">
                <div className="section-label mb-1">Breaking News</div>
                <div className="text-sm font-black text-chaos-ink">
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

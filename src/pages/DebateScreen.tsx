import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../store/gameStore';
import { allEvents } from '../data/events';
import { ChoiceCard } from '../components/ui/ChoiceCard';
import { getChoiceLocks } from '../engine/staminaSystem';
import type { Choice } from '../types/events';

export function DebateScreen() {
  const { pendingEventId, candidate, opponent, stats, makeChoice, returnToDashboard } = useGameStore();
  const [chosen, setChosen] = useState<Choice | null>(null);
  const [audienceMeter, setAudienceMeter] = useState(50);
  const event = allEvents.find((e) => e.id === pendingEventId);

  if (!event || !candidate || !opponent) return null;

  const locks = getChoiceLocks(stats, event.choices);

  function handleChoice(choice: Choice) {
    setChosen(choice);
    const pop = choice.effects.popularity ?? 0;
    setAudienceMeter((prev) => Math.max(10, Math.min(90, prev + pop)));
    makeChoice(choice, event!.id);
    setTimeout(() => {
      setChosen(null);
      returnToDashboard();
    }, 2500);
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#05050e' }}>
      {/* TV broadcast header */}
      <div className="bg-chaos-blue/20 border-b border-chaos-blue/30 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-xs font-black text-white uppercase tracking-widest">LIVE DEBATE</span>
          </div>
          <span className="text-xs text-white/30">NNN Presidential Coverage</span>
        </div>
      </div>

      {/* Candidates portrait area */}
      <div className="flex items-center gap-4 px-4 py-5 border-b border-white/8">
        <div className="flex-1 flex flex-col items-center gap-2">
          <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${candidate.avatarBg} flex items-center justify-center border-2 border-chaos-red/40`}>
            <span className="text-white font-black text-xl">{candidate.initials}</span>
          </div>
          <div className="text-center">
            <div className="text-white font-bold text-sm">{candidate.name}</div>
            <div className="text-xs text-chaos-red">{candidate.party}</div>
          </div>
        </div>

        {/* VS & Audience meter */}
        <div className="flex flex-col items-center gap-2">
          <div className="text-white/30 font-black text-lg">VS</div>
          <div className="text-xs text-white/30 uppercase tracking-wider">Audience</div>
          <div className="w-20 h-2 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-chaos-gold transition-all duration-700 rounded-full"
              style={{ width: `${audienceMeter}%` }} />
          </div>
          <div className="text-xs text-chaos-gold font-bold">{audienceMeter}%</div>
        </div>

        <div className="flex-1 flex flex-col items-center gap-2">
          <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${opponent.avatarBg} flex items-center justify-center border-2 border-chaos-blue/40`}>
            <span className="text-white font-black text-xl">{opponent.initials}</span>
          </div>
          <div className="text-center">
            <div className="text-white font-bold text-sm">{opponent.name}</div>
            <div className="text-xs text-chaos-blue">{opponent.party}</div>
          </div>
        </div>
      </div>

      {/* Event description */}
      <div className="px-4 py-5 flex-1 overflow-y-auto no-scrollbar">
        <div className="text-xs text-white/40 uppercase tracking-widest mb-2">{event.title}</div>
        <p className="text-white/75 leading-relaxed text-sm mb-6">{event.description}</p>

        <div className="text-xs text-white/30 uppercase tracking-widest mb-3">Your Response</div>
        <div className="space-y-3">
          {event.choices.map((choice, i) => (
            <ChoiceCard key={i} choice={choice} index={i} onSelect={() => handleChoice(choice)} disabled={!!chosen} locked={locks[i].locked} lockReason={locks[i].reason} />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {chosen && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
            className="mx-4 mb-6 p-4 rounded-xl border border-chaos-gold/30 bg-chaos-gold/10">
            <div className="text-xs text-chaos-gold uppercase tracking-widest mb-1">Debate Result</div>
            <div className="text-white font-semibold text-sm">
              {chosen.headline.replace(/"\{name\}"/g, candidate.name)}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../store/gameStore';
import { allEvents } from '../data/events';
import { ChoiceCard } from '../components/ui/ChoiceCard';
import { CandidatePortrait, ScenarioArt } from '../components/art';
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
    <div className="screen flex min-h-screen flex-col">
      <div className="border-b border-chaos-blue/35 bg-chaos-blue/18 px-4 py-3 scanlines">
        <ScenarioArt category="debate" title="Debate studio illustration" className="mb-3 h-28" />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-chaos-red alert-pulse" />
            <span className="text-xs font-black uppercase text-white">LIVE DEBATE</span>
          </div>
          <span className="text-xs font-bold uppercase text-white/36">National Coverage</span>
        </div>
      </div>

      <div className="flex items-center gap-4 border-b border-white/10 px-4 py-5">
        <div className="flex-1 flex flex-col items-center gap-2">
          <CandidatePortrait candidate={candidate} className="h-16 w-16 border-chaos-red/45" label={`${candidate.name} portrait`} />
          <div className="text-center">
            <div className="text-sm font-black text-chaos-ink">{candidate.name}</div>
            <div className="text-xs font-bold uppercase text-chaos-red">{candidate.party}</div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-2">
          <div className="rounded-sm border border-white/12 bg-black/20 px-2 py-1 text-sm font-black text-white/36">VS</div>
          <div className="text-[0.62rem] font-black uppercase text-white/34">Audience</div>
          <div className="h-2.5 w-20 overflow-hidden rounded-sm bg-black/32 ring-1 ring-white/10">
            <div className="h-full bg-chaos-gold transition-all duration-700"
              style={{ width: `${audienceMeter}%` }} />
          </div>
          <div className="text-xs font-black text-chaos-gold">{audienceMeter}%</div>
        </div>

        <div className="flex-1 flex flex-col items-center gap-2">
          <CandidatePortrait candidate={opponent} className="h-16 w-16 border-chaos-blue/45" label={`${opponent.name} portrait`} />
          <div className="text-center">
            <div className="text-sm font-black text-chaos-ink">{opponent.name}</div>
            <div className="text-xs font-bold uppercase text-chaos-blue">{opponent.party}</div>
          </div>
        </div>
      </div>

      <div className="px-4 py-5 flex-1 overflow-y-auto no-scrollbar">
        <div className="section-label mb-2">{event.title}</div>
        <div className="paper-card mb-5 p-4">
          <p className="serif-note text-sm leading-relaxed text-white/72">{event.description}</p>
        </div>

        <div className="section-label mb-3">Your Response</div>
        <div className="space-y-3">
          {event.choices.map((choice, i) => (
            <ChoiceCard key={i} choice={choice} index={i} onSelect={() => handleChoice(choice)} disabled={!!chosen} locked={locks[i].locked} lockReason={locks[i].reason} />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {chosen && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
            className="broadcast-card mx-4 mb-6 p-4">
            <div className="section-label mb-1 text-chaos-gold">Debate Result</div>
            <div className="text-sm font-black text-chaos-ink">
              {chosen.headline.replace(/"\{name\}"/g, candidate.name)}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

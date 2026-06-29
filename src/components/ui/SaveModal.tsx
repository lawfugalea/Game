import { useState } from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '../../store/gameStore';
import { listSaves, type SaveInfo } from '../../engine/saveSystem';

export function SaveModal({ onClose }: { onClose: () => void }) {
  const saveToSlot = useGameStore((s) => s.saveToSlot);
  const deleteSaveSlot = useGameStore((s) => s.deleteSaveSlot);
  const [slots, setSlots] = useState<SaveInfo[]>(() => listSaves());
  const [justSaved, setJustSaved] = useState<number | null>(null);

  function handleSave(slot: number) {
    saveToSlot(slot);
    setSlots(listSaves());
    setJustSaved(slot);
    setTimeout(() => setJustSaved(null), 1600);
  }

  function handleDelete(slot: number) {
    deleteSaveSlot(slot);
    setSlots(listSaves());
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-sm px-4 pb-4"
    >
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 40, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md rounded-2xl border border-white/10 p-5"
        style={{ background: '#0d0d1a' }}
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-xs text-white/40 uppercase tracking-widest">Save Campaign</div>
            <div className="text-white font-black text-lg">Choose a Slot</div>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 text-white/60 hover:text-white">✕</button>
        </div>

        <div className="space-y-3">
          {slots.map((s) => (
            <div key={s.slot} className="border border-white/10 bg-white/4 rounded-xl p-3 flex items-center gap-3">
              <div className="shrink-0 w-9 h-9 rounded-lg bg-chaos-blue/20 border border-chaos-blue/30 flex items-center justify-center">
                <span className="text-chaos-blue font-black text-sm">{s.slot + 1}</span>
              </div>
              <div className="flex-1 min-w-0">
                {s.savedAt ? (
                  <>
                    <div className="text-white text-sm font-semibold truncate">{s.candidateName ?? 'Unknown'}</div>
                    <div className="text-white/40 text-xs">Day {s.day} · {new Date(s.savedAt).toLocaleString()}</div>
                  </>
                ) : (
                  <div className="text-white/30 text-sm italic">Empty slot</div>
                )}
              </div>
              {s.savedAt && (
                <button
                  onClick={() => handleDelete(s.slot)}
                  className="shrink-0 text-xs px-2 py-1.5 rounded-lg border border-white/10 text-white/40 hover:text-chaos-red hover:border-chaos-red/40"
                >
                  Delete
                </button>
              )}
              <button
                onClick={() => handleSave(s.slot)}
                className="shrink-0 text-xs font-bold px-3 py-1.5 rounded-lg text-white transition-all active:scale-95"
                style={{ background: justSaved === s.slot ? '#22c55e' : 'linear-gradient(135deg, #E0212F, #c01828)' }}
              >
                {justSaved === s.slot ? 'Saved ✓' : s.savedAt ? 'Overwrite' : 'Save'}
              </button>
            </div>
          ))}
        </div>

        <p className="text-center text-white/20 text-xs mt-4">Your campaign also autosaves every day.</p>
      </motion.div>
    </motion.div>
  );
}

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
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/72 px-4 pb-4 backdrop-blur-sm sm:items-center"
    >
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 40, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="broadcast-card w-full max-w-md p-5"
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="section-label">Save Campaign</div>
            <div className="display-title text-xl text-chaos-ink">Choose a Slot</div>
          </div>
          <button onClick={onClose} className="btn-ghost h-8 w-8 text-sm font-black hover:text-white">X</button>
        </div>

        <div className="space-y-3">
          {slots.map((s) => (
            <div key={s.slot} className="paper-card flex items-center gap-3 p-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-sm border border-chaos-blue/35 bg-chaos-blue/18">
                <span className="display-title text-sm text-chaos-blue">{s.slot + 1}</span>
              </div>
              <div className="flex-1 min-w-0">
                {s.savedAt ? (
                  <>
                    <div className="truncate text-sm font-black text-chaos-ink">{s.candidateName ?? 'Unknown'}</div>
                    <div className="text-xs text-white/42">Day {s.day} · {new Date(s.savedAt).toLocaleString()}</div>
                  </>
                ) : (
                  <div className="serif-note text-sm italic text-white/34">Empty slot</div>
                )}
              </div>
              {s.savedAt && (
                <button
                  onClick={() => handleDelete(s.slot)}
                  className="btn-ghost shrink-0 px-2 py-1.5 text-xs font-bold hover:border-chaos-red/45 hover:text-chaos-red"
                >
                  Delete
                </button>
              )}
              <button
                onClick={() => handleSave(s.slot)}
                className="shrink-0 rounded-sm px-3 py-1.5 text-xs font-black uppercase text-white transition-all active:scale-95"
                style={{ background: justSaved === s.slot ? '#2f9f6b' : 'linear-gradient(135deg, #df1e31, #a90f1d)' }}
              >
                {justSaved === s.slot ? 'Saved' : s.savedAt ? 'Overwrite' : 'Save'}
              </button>
            </div>
          ))}
        </div>

        <p className="mt-4 text-center text-xs text-white/24">Your campaign also autosaves every day.</p>
      </motion.div>
    </motion.div>
  );
}

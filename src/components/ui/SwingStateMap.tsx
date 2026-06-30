import type { Stats } from '../../types/game';
import { swingDistricts } from '../../data/states';
import { districtPlayerShare } from '../../engine/electoralCollege';

interface SwingStateMapProps {
  playerStats: Stats;
  opponentStats: Stats;
  pushes?: Record<string, number>;
}

export function SwingStateMap({ playerStats, opponentStats, pushes }: SwingStateMapProps) {
  return (
    <div className="broadcast-card p-4">
      <div className="mb-3 flex items-center justify-between">
        <div className="section-label">Battleground Districts</div>
        <div className="text-[0.65rem] font-black uppercase text-chaos-gold">STV watch</div>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {swingDistricts.map((d) => {
          const share = districtPlayerShare(d, playerStats, opponentStats, pushes);
          const isLeaning = share > 0.53;
          const isOpponent = share < 0.47;
          const isTossup = !isLeaning && !isOpponent;
          return (
            <div
              key={d.code}
              className="relative overflow-hidden rounded-sm border px-2 py-2 text-center text-xs font-black text-white"
              style={{
                background: isLeaning
                  ? 'rgba(201,20,36,0.34)'
                  : isOpponent
                  ? 'rgba(19,87,159,0.34)'
                  : 'rgba(216,173,61,0.2)',
                borderColor: isLeaning ? '#c9142470' : isOpponent ? '#13579f70' : '#d8ad3d70',
              }}
              title={`${d.name} (${d.seats} seats)`}
            >
              <div className="display-title text-sm leading-none">{d.code}</div>
              <div className="mt-1 text-[0.62rem] text-white/58">{Math.round(share * 100)}%</div>
              {isTossup && <div className="absolute right-1 top-1 h-1.5 w-1.5 rounded-full bg-chaos-gold" />}
            </div>
          );
        })}
      </div>
      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[0.65rem] font-bold uppercase text-white/34">
        <span><span className="text-chaos-red">■</span> You</span>
        <span><span className="text-chaos-gold">■</span> Tossup</span>
        <span><span className="text-chaos-blue">■</span> Rival</span>
      </div>
    </div>
  );
}

import type { PollData } from '../../types/game';

interface PollGaugeProps {
  polls: PollData;
  playerName: string;
  opponentName: string;
}

export function PollGauge({ polls, playerName, opponentName }: PollGaugeProps) {
  const lead = polls.player - polls.opponent;
  const leadText = Math.abs(lead) < 1 ? 'Dead heat' : `${lead > 0 ? playerName : opponentName} +${Math.abs(lead).toFixed(1)}`;

  return (
    <div className="broadcast-card scanlines p-4">
      <div className="relative z-[1]">
        <div className="flex items-center justify-between mb-3">
          <div className="section-label">National Polling</div>
          <div className="text-[0.65rem] font-black uppercase text-chaos-gold">{leadText}</div>
        </div>
        <div className="flex items-center gap-2 mb-2">
          <span className="w-10 text-right text-sm font-black text-chaos-red">{polls.player}%</span>
          <div className="relative h-5 flex-1 overflow-hidden rounded-sm bg-black/30 ring-1 ring-white/10">
            <div className="absolute inset-y-0 left-1/2 w-px bg-chaos-gold/70" />
            <div className="absolute inset-y-0 left-0 w-1/3 bg-white/5" />
            <div className="absolute inset-y-0 right-0 w-1/3 bg-white/5" />
            <div
              className="absolute left-0 h-full bg-chaos-red transition-all duration-700"
              style={{ width: `${polls.player}%` }}
            />
            <div
              className="absolute right-0 h-full bg-chaos-blue transition-all duration-700"
              style={{ width: `${polls.opponent}%` }}
            />
          </div>
          <span className="w-10 text-sm font-black text-chaos-blue">{polls.opponent}%</span>
        </div>
        <div className="flex justify-between text-[0.68rem] font-bold uppercase text-white/46">
          <span>{playerName}</span>
          <span>{opponentName}</span>
        </div>
      </div>
    </div>
  );
}

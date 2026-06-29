import type { PollData } from '../../types/game';

interface PollGaugeProps {
  polls: PollData;
  playerName: string;
  opponentName: string;
}

export function PollGauge({ polls, playerName, opponentName }: PollGaugeProps) {
  return (
    <div className="bg-white/5 border border-white/8 rounded-xl p-4">
      <div className="text-xs text-white/40 uppercase tracking-widest mb-3 text-center">National Polling</div>
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xs font-bold text-chaos-red w-8 text-right">{polls.player}%</span>
        <div className="flex-1 h-4 rounded-full overflow-hidden bg-white/8 relative">
          <div
            className="h-full bg-chaos-red rounded-l-full absolute left-0 transition-all duration-700"
            style={{ width: `${polls.player}%` }}
          />
          <div
            className="h-full bg-chaos-blue rounded-r-full absolute right-0 transition-all duration-700"
            style={{ width: `${polls.opponent}%` }}
          />
        </div>
        <span className="text-xs font-bold text-chaos-blue w-8">{polls.opponent}%</span>
      </div>
      <div className="flex justify-between">
        <span className="text-xs text-white/50">{playerName}</span>
        <span className="text-xs text-white/50">{opponentName}</span>
      </div>
    </div>
  );
}

import { useGameStore } from './store/gameStore';
import { MainMenu } from './pages/MainMenu';
import { CandidateSelect } from './pages/CandidateSelect';
import { Dashboard } from './pages/Dashboard';
import { EventScreen } from './pages/EventScreen';
import { DebateScreen } from './pages/DebateScreen';
import { PressScreen } from './pages/PressScreen';
import { ElectionNight } from './pages/ElectionNight';
import { GameOver } from './pages/GameOver';

export default function App() {
  const phase = useGameStore((s) => s.phase);

  return (
    <div className="app-shell">
      {phase === 'menu' && <MainMenu />}
      {phase === 'candidate-select' && <CandidateSelect />}
      {phase === 'campaign' && <Dashboard />}
      {phase === 'event' && <EventScreen />}
      {phase === 'debate' && <DebateScreen />}
      {phase === 'press' && <PressScreen />}
      {phase === 'election-night' && <ElectionNight />}
      {phase === 'game-over' && <GameOver />}
    </div>
  );
}

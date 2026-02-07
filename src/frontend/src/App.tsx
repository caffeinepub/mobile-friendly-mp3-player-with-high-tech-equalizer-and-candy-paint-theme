import { ThemeProvider } from './theme/ThemeProvider';
import PlayerShell from './components/player/PlayerShell';
import { Toaster } from '@/components/ui/sonner';

export default function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/10">
        <PlayerShell />
        <Toaster />
      </div>
    </ThemeProvider>
  );
}

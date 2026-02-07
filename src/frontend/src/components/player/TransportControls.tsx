import { Button } from '@/components/ui/button';
import { Play, Pause, SkipBack, SkipForward } from 'lucide-react';

interface TransportControlsProps {
  isPlaying: boolean;
  onTogglePlayPause: () => void;
  onPrevious: () => void;
  onNext: () => void;
  disabled?: boolean;
}

export default function TransportControls({
  isPlaying,
  onTogglePlayPause,
  onPrevious,
  onNext,
  disabled = false,
}: TransportControlsProps) {
  return (
    <div className="flex items-center justify-center gap-4">
      <Button
        variant="outline"
        size="icon"
        onClick={onPrevious}
        disabled={disabled}
        className="h-12 w-12"
        aria-label="Previous track"
      >
        <SkipBack className="w-5 h-5" />
      </Button>
      <Button
        size="icon"
        onClick={onTogglePlayPause}
        disabled={disabled}
        className="h-16 w-16 rounded-full shadow-lg shadow-primary/50"
        aria-label={isPlaying ? 'Pause' : 'Play'}
      >
        {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={onNext}
        disabled={disabled}
        className="h-12 w-12"
        aria-label="Next track"
      >
        <SkipForward className="w-5 h-5" />
      </Button>
    </div>
  );
}

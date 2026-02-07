import { Slider } from '@/components/ui/slider';
import { formatTime } from '../../utils/formatTime';

interface SeekBarProps {
  currentTime: number;
  duration: number;
  onSeek: (time: number) => void;
}

export default function SeekBar({ currentTime, duration, onSeek }: SeekBarProps) {
  const handleValueChange = (values: number[]) => {
    onSeek(values[0]);
  };

  return (
    <div className="space-y-2">
      <Slider
        value={[currentTime]}
        max={duration || 100}
        step={0.1}
        onValueChange={handleValueChange}
        className="w-full"
      />
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>
    </div>
  );
}

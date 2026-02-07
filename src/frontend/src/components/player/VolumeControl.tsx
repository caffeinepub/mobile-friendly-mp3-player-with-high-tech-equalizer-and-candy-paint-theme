import { Slider } from '@/components/ui/slider';
import { Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface VolumeControlProps {
  volume: number;
  onVolumeChange: (volume: number) => void;
}

export default function VolumeControl({ volume, onVolumeChange }: VolumeControlProps) {
  const [isMuted, setIsMuted] = useState(false);
  const [previousVolume, setPreviousVolume] = useState(volume);

  const handleToggleMute = () => {
    if (isMuted) {
      onVolumeChange(previousVolume);
      setIsMuted(false);
    } else {
      setPreviousVolume(volume);
      onVolumeChange(0);
      setIsMuted(true);
    }
  };

  const handleVolumeChange = (values: number[]) => {
    const newVolume = values[0];
    onVolumeChange(newVolume);
    if (newVolume === 0) {
      setIsMuted(true);
    } else {
      setIsMuted(false);
    }
  };

  return (
    <div className="flex items-center gap-3 min-w-[200px]">
      <Button
        variant="ghost"
        size="icon"
        onClick={handleToggleMute}
        aria-label={isMuted ? 'Unmute' : 'Mute'}
      >
        {isMuted || volume === 0 ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
      </Button>
      <Slider
        value={[volume]}
        max={1}
        step={0.01}
        onValueChange={handleVolumeChange}
        className="flex-1"
      />
    </div>
  );
}

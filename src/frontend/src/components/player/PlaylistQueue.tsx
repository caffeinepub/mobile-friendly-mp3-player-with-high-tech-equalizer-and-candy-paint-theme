import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Music } from 'lucide-react';
import type { Track } from '../../hooks/useAudioPlayer';

interface PlaylistQueueProps {
  tracks: Track[];
  currentTrackIndex: number;
  onSelectTrack: (index: number) => void;
}

export default function PlaylistQueue({ tracks, currentTrackIndex, onSelectTrack }: PlaylistQueueProps) {
  return (
    <ScrollArea className="h-[300px] w-full rounded-md">
      <div className="space-y-2 pr-4">
        {tracks.map((track, index) => (
          <Button
            key={track.id}
            variant={index === currentTrackIndex ? 'default' : 'ghost'}
            className="w-full justify-start gap-3 h-auto py-3 px-4"
            onClick={() => onSelectTrack(index)}
          >
            <Music className="w-4 h-4 flex-shrink-0" />
            <span className="truncate text-left flex-1">{track.name}</span>
          </Button>
        ))}
      </div>
    </ScrollArea>
  );
}

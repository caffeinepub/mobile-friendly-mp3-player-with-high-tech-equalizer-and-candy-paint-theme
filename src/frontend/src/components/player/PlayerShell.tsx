import { useState } from 'react';
import { useAudioPlayer } from '../../hooks/useAudioPlayer';
import { useEqualizer } from '../../hooks/useEqualizer';
import AppLogo from '../branding/AppLogo';
import FilePickerButton from './FilePickerButton';
import PlaylistQueue from './PlaylistQueue';
import TransportControls from './TransportControls';
import SeekBar from './SeekBar';
import VolumeControl from './VolumeControl';
import EqualizerPanel from '../equalizer/EqualizerPanel';
import SpectrumVisualizer from '../equalizer/SpectrumVisualizer';
import ThemeSwitcher from '../theme/ThemeSwitcher';
import LoginButton from '../auth/LoginButton';
import PreferenceSyncControls from '../preferences/PreferenceSyncControls';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Music2, Sliders } from 'lucide-react';

export default function PlayerShell() {
  const audioPlayer = useAudioPlayer();
  const equalizer = useEqualizer(audioPlayer.audioElement);
  const [activeTab, setActiveTab] = useState<string>('player');

  return (
    <div className="min-h-screen flex flex-col p-4 md:p-6 lg:p-8">
      {/* Header */}
      <header className="flex items-center justify-between mb-6 md:mb-8">
        <div className="flex items-center gap-4">
          <AppLogo />
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            Candy Player
          </h1>
        </div>
        <div className="flex items-center gap-2 md:gap-4">
          <ThemeSwitcher />
          <LoginButton />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col gap-6 max-w-7xl mx-auto w-full">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="player" className="flex items-center gap-2">
              <Music2 className="w-4 h-4" />
              Player
            </TabsTrigger>
            <TabsTrigger value="equalizer" className="flex items-center gap-2">
              <Sliders className="w-4 h-4" />
              Equalizer
            </TabsTrigger>
          </TabsList>

          <TabsContent value="player" className="space-y-6">
            {/* Visualizer */}
            <Card className="candy-glass border-2 border-primary/30 shadow-2xl shadow-primary/20">
              <CardContent className="p-6">
                <SpectrumVisualizer analyser={equalizer.analyser} isPlaying={audioPlayer.isPlaying} />
              </CardContent>
            </Card>

            {/* Now Playing */}
            <Card className="candy-glass border-2 border-primary/30 shadow-2xl shadow-primary/20">
              <CardHeader>
                <CardTitle className="text-center text-xl md:text-2xl">
                  {audioPlayer.currentTrack ? audioPlayer.currentTrack.name : 'No track selected'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <SeekBar
                  currentTime={audioPlayer.currentTime}
                  duration={audioPlayer.duration}
                  onSeek={audioPlayer.seek}
                />
                <TransportControls
                  isPlaying={audioPlayer.isPlaying}
                  onTogglePlayPause={audioPlayer.togglePlayPause}
                  onPrevious={audioPlayer.playPrevious}
                  onNext={audioPlayer.playNext}
                  disabled={audioPlayer.tracks.length === 0}
                />
                <div className="flex items-center justify-between gap-4">
                  <FilePickerButton onFilesSelected={audioPlayer.addTracks} />
                  <VolumeControl volume={audioPlayer.volume} onVolumeChange={audioPlayer.setVolume} />
                </div>
              </CardContent>
            </Card>

            {/* Playlist */}
            {audioPlayer.tracks.length > 0 && (
              <Card className="candy-glass border-2 border-primary/30 shadow-2xl shadow-primary/20">
                <CardHeader>
                  <CardTitle>Playlist ({audioPlayer.tracks.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  <PlaylistQueue
                    tracks={audioPlayer.tracks}
                    currentTrackIndex={audioPlayer.currentTrackIndex}
                    onSelectTrack={audioPlayer.selectTrack}
                  />
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="equalizer" className="space-y-6">
            <EqualizerPanel
              enabled={equalizer.enabled}
              bands={equalizer.bands}
              onToggleEnabled={equalizer.toggleEnabled}
              onUpdateBandGain={equalizer.updateBandGain}
              onReset={equalizer.resetBands}
            />
          </TabsContent>
        </Tabs>

        {/* Preference Sync */}
        <PreferenceSyncControls />
      </main>

      {/* Footer */}
      <footer className="mt-8 pt-6 border-t border-border/50 text-center text-sm text-muted-foreground">
        <p>
          © 2026. Built with ❤️ using{' '}
          <a
            href="https://caffeine.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-accent transition-colors underline"
          >
            caffeine.ai
          </a>
        </p>
      </footer>
    </div>
  );
}

import { useState, useRef, useEffect, useCallback } from 'react';
import { useLocalPreferences } from './useLocalPreferences';

export interface Track {
  id: string;
  file: File;
  name: string;
  duration: number;
}

export function useAudioPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const { preferences, updatePreferences } = useLocalPreferences();
  const [volume, setVolumeState] = useState(preferences.volume);

  // Initialize audio element
  useEffect(() => {
    const audio = new Audio();
    audio.volume = volume;
    audioRef.current = audio;

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleDurationChange = () => setDuration(audio.duration);
    const handleEnded = () => {
      setIsPlaying(false);
      playNext();
    };
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('durationchange', handleDurationChange);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('durationchange', handleDurationChange);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.pause();
      audio.src = '';
    };
  }, []);

  const addTracks = useCallback((files: File[]) => {
    const newTracks: Track[] = files.map((file) => ({
      id: `${file.name}-${Date.now()}-${Math.random()}`,
      file,
      name: file.name.replace(/\.mp3$/i, ''),
      duration: 0,
    }));
    setTracks((prev) => [...prev, ...newTracks]);
    if (currentTrackIndex === -1 && newTracks.length > 0) {
      setCurrentTrackIndex(0);
    }
  }, [currentTrackIndex]);

  const loadTrack = useCallback((index: number) => {
    if (!audioRef.current || index < 0 || index >= tracks.length) return;
    
    const track = tracks[index];
    const url = URL.createObjectURL(track.file);
    audioRef.current.src = url;
    audioRef.current.load();
    setCurrentTrackIndex(index);
    setCurrentTime(0);
  }, [tracks]);

  const play = useCallback(async () => {
    if (!audioRef.current) return;
    try {
      await audioRef.current.play();
    } catch (error) {
      console.error('Playback failed:', error);
    }
  }, []);

  const pause = useCallback(() => {
    if (!audioRef.current) return;
    audioRef.current.pause();
  }, []);

  const togglePlayPause = useCallback(() => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  }, [isPlaying, play, pause]);

  const playNext = useCallback(() => {
    if (tracks.length === 0) return;
    const nextIndex = (currentTrackIndex + 1) % tracks.length;
    loadTrack(nextIndex);
    play();
  }, [currentTrackIndex, tracks.length, loadTrack, play]);

  const playPrevious = useCallback(() => {
    if (tracks.length === 0) return;
    const prevIndex = currentTrackIndex - 1 < 0 ? tracks.length - 1 : currentTrackIndex - 1;
    loadTrack(prevIndex);
    play();
  }, [currentTrackIndex, tracks.length, loadTrack, play]);

  const seek = useCallback((time: number) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = time;
    setCurrentTime(time);
  }, []);

  const setVolume = useCallback((vol: number) => {
    if (!audioRef.current) return;
    const clampedVolume = Math.max(0, Math.min(1, vol));
    audioRef.current.volume = clampedVolume;
    setVolumeState(clampedVolume);
    updatePreferences({ volume: clampedVolume });
  }, [updatePreferences]);

  const selectTrack = useCallback((index: number) => {
    loadTrack(index);
    play();
  }, [loadTrack, play]);

  const currentTrack = currentTrackIndex >= 0 ? tracks[currentTrackIndex] : null;

  return {
    audioElement: audioRef.current,
    tracks,
    currentTrack,
    currentTrackIndex,
    isPlaying,
    currentTime,
    duration,
    volume,
    addTracks,
    togglePlayPause,
    playNext,
    playPrevious,
    seek,
    setVolume,
    selectTrack,
  };
}

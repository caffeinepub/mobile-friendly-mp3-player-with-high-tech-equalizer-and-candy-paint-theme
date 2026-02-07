import { useState, useEffect, useRef, useCallback } from 'react';
import { useLocalPreferences } from './useLocalPreferences';

export interface EqualizerBand {
  frequency: number;
  gain: number;
  label: string;
}

const DEFAULT_BANDS: EqualizerBand[] = [
  { frequency: 60, gain: 0, label: '60Hz' },
  { frequency: 170, gain: 0, label: '170Hz' },
  { frequency: 310, gain: 0, label: '310Hz' },
  { frequency: 600, gain: 0, label: '600Hz' },
  { frequency: 1000, gain: 0, label: '1kHz' },
  { frequency: 3000, gain: 0, label: '3kHz' },
  { frequency: 6000, gain: 0, label: '6kHz' },
  { frequency: 12000, gain: 0, label: '12kHz' },
  { frequency: 14000, gain: 0, label: '14kHz' },
  { frequency: 16000, gain: 0, label: '16kHz' },
];

export function useEqualizer(audioElement: HTMLAudioElement | null) {
  const { preferences, updatePreferences } = useLocalPreferences();
  const [enabled, setEnabled] = useState(preferences.eqEnabled);
  const [bands, setBands] = useState<EqualizerBand[]>(() => {
    if (preferences.eqValues.length === DEFAULT_BANDS.length) {
      return DEFAULT_BANDS.map((band, i) => ({
        ...band,
        gain: preferences.eqValues[i],
      }));
    }
    return DEFAULT_BANDS;
  });

  const audioContextRef = useRef<AudioContext | null>(null);
  const sourceNodeRef = useRef<MediaElementAudioSourceNode | null>(null);
  const filtersRef = useRef<BiquadFilterNode[]>([]);
  const analyserRef = useRef<AnalyserNode | null>(null);

  // Initialize Web Audio API
  useEffect(() => {
    if (!audioElement) return;

    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      const context = new AudioContext();
      audioContextRef.current = context;

      const source = context.createMediaElementSource(audioElement);
      sourceNodeRef.current = source;

      const analyser = context.createAnalyser();
      analyser.fftSize = 256;
      analyserRef.current = analyser;

      // Create filters
      const filters = bands.map((band) => {
        const filter = context.createBiquadFilter();
        filter.type = 'peaking';
        filter.frequency.value = band.frequency;
        filter.Q.value = 1;
        filter.gain.value = band.gain;
        return filter;
      });
      filtersRef.current = filters;

      // Connect nodes
      if (enabled) {
        source.connect(filters[0]);
        for (let i = 0; i < filters.length - 1; i++) {
          filters[i].connect(filters[i + 1]);
        }
        filters[filters.length - 1].connect(analyser);
        analyser.connect(context.destination);
      } else {
        source.connect(analyser);
        analyser.connect(context.destination);
      }

      return () => {
        filters.forEach((filter) => filter.disconnect());
        source.disconnect();
        analyser.disconnect();
      };
    } catch (error) {
      console.error('Failed to initialize Web Audio API:', error);
    }
  }, [audioElement]);

  // Update connections when enabled state changes
  useEffect(() => {
    if (!sourceNodeRef.current || !analyserRef.current || !audioContextRef.current) return;

    try {
      sourceNodeRef.current.disconnect();
      analyserRef.current.disconnect();
      filtersRef.current.forEach((filter) => filter.disconnect());

      if (enabled && filtersRef.current.length > 0) {
        sourceNodeRef.current.connect(filtersRef.current[0]);
        for (let i = 0; i < filtersRef.current.length - 1; i++) {
          filtersRef.current[i].connect(filtersRef.current[i + 1]);
        }
        filtersRef.current[filtersRef.current.length - 1].connect(analyserRef.current);
      } else {
        sourceNodeRef.current.connect(analyserRef.current);
      }
      analyserRef.current.connect(audioContextRef.current.destination);
    } catch (error) {
      console.error('Failed to update audio connections:', error);
    }
  }, [enabled]);

  const toggleEnabled = useCallback(() => {
    setEnabled((prev) => {
      const newEnabled = !prev;
      updatePreferences({ eqEnabled: newEnabled });
      return newEnabled;
    });
  }, [updatePreferences]);

  const updateBandGain = useCallback((index: number, gain: number) => {
    setBands((prev) => {
      const newBands = [...prev];
      newBands[index] = { ...newBands[index], gain };
      
      if (filtersRef.current[index]) {
        filtersRef.current[index].gain.value = gain;
      }

      updatePreferences({ eqValues: newBands.map((b) => b.gain) });
      return newBands;
    });
  }, [updatePreferences]);

  const resetBands = useCallback(() => {
    setBands((prev) => {
      const newBands = prev.map((band) => ({ ...band, gain: 0 }));
      filtersRef.current.forEach((filter) => {
        filter.gain.value = 0;
      });
      updatePreferences({ eqValues: newBands.map((b) => b.gain) });
      return newBands;
    });
  }, [updatePreferences]);

  return {
    enabled,
    bands,
    analyser: analyserRef.current,
    toggleEnabled,
    updateBandGain,
    resetBands,
  };
}

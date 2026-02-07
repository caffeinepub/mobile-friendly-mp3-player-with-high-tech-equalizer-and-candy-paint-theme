import { useState, useCallback, useEffect } from 'react';

export interface LocalPreferences {
  theme: string;
  eqEnabled: boolean;
  eqValues: number[];
  volume: number;
}

const DEFAULT_PREFERENCES: LocalPreferences = {
  theme: 'red-candy',
  eqEnabled: false,
  eqValues: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  volume: 0.7,
};

const STORAGE_KEY = 'mp3-player-preferences';

function loadPreferences(): LocalPreferences {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return { ...DEFAULT_PREFERENCES, ...JSON.parse(stored) };
    }
  } catch (error) {
    console.error('Failed to load preferences:', error);
  }
  return DEFAULT_PREFERENCES;
}

function savePreferences(preferences: LocalPreferences): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
  } catch (error) {
    console.error('Failed to save preferences:', error);
  }
}

export function useLocalPreferences() {
  const [preferences, setPreferences] = useState<LocalPreferences>(loadPreferences);

  const updatePreferences = useCallback((updates: Partial<LocalPreferences>) => {
    setPreferences((prev) => {
      const newPreferences = { ...prev, ...updates };
      savePreferences(newPreferences);
      return newPreferences;
    });
  }, []);

  return {
    preferences,
    updatePreferences,
  };
}

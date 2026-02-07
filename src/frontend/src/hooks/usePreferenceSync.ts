import { useEffect, useCallback } from 'react';
import { useInternetIdentity } from './useInternetIdentity';
import { useGetPreferences, useSavePreferences } from './useQueries';
import { useLocalPreferences } from './useLocalPreferences';
import type { Preferences } from '../backend';

export function usePreferenceSync() {
  const { identity } = useInternetIdentity();
  const { data: remotePreferences, isLoading } = useGetPreferences();
  const { mutateAsync: saveRemote } = useSavePreferences();
  const { preferences: localPreferences, updatePreferences: updateLocal } = useLocalPreferences();

  const isAuthenticated = !!identity;

  // Load remote preferences when authenticated
  useEffect(() => {
    if (isAuthenticated && remotePreferences && !isLoading) {
      updateLocal({
        theme: remotePreferences.theme,
        eqValues: remotePreferences.eqValues.map(Number),
      });
    }
  }, [isAuthenticated, remotePreferences, isLoading]);

  const syncToRemote = useCallback(async () => {
    if (!isAuthenticated) return;

    try {
      const preferences: Preferences = {
        theme: localPreferences.theme,
        eqValues: localPreferences.eqValues.map(BigInt),
      };
      await saveRemote(preferences);
    } catch (error) {
      console.error('Failed to sync preferences:', error);
    }
  }, [isAuthenticated, localPreferences, saveRemote]);

  return {
    isAuthenticated,
    syncToRemote,
    isSyncing: isLoading,
  };
}

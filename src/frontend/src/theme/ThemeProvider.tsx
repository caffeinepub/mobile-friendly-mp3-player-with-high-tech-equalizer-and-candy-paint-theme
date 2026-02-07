import { createContext, useContext, useEffect, ReactNode } from 'react';
import { useLocalPreferences } from '../hooks/useLocalPreferences';
import { getThemeById } from './themes';

interface ThemeContextValue {
  currentTheme: string;
  setTheme: (themeId: string) => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const { preferences, updatePreferences } = useLocalPreferences();

  useEffect(() => {
    const theme = getThemeById(preferences.theme);
    const root = document.documentElement;

    Object.entries(theme.colors).forEach(([key, value]) => {
      const cssVar = `--${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
      root.style.setProperty(cssVar, value);
    });
  }, [preferences.theme]);

  const setTheme = (themeId: string) => {
    updatePreferences({ theme: themeId });
  };

  return (
    <ThemeContext.Provider value={{ currentTheme: preferences.theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}

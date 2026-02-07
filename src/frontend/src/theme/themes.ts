export interface Theme {
  id: string;
  name: string;
  colors: {
    primary: string;
    primaryForeground: string;
    accent: string;
    accentForeground: string;
    background: string;
    foreground: string;
    card: string;
    cardForeground: string;
    muted: string;
    mutedForeground: string;
    border: string;
    ring: string;
  };
}

export const themes: Theme[] = [
  {
    id: 'red-candy',
    name: 'Red Candy',
    colors: {
      primary: '0.55 0.22 12',
      primaryForeground: '0.98 0 0',
      accent: '0.65 0.25 25',
      accentForeground: '0.98 0 0',
      background: '0.12 0.02 12',
      foreground: '0.98 0.01 12',
      card: '0.18 0.04 12',
      cardForeground: '0.98 0.01 12',
      muted: '0.25 0.05 12',
      mutedForeground: '0.70 0.05 12',
      border: '0.30 0.08 12',
      ring: '0.60 0.22 12',
    },
  },
  {
    id: 'blue-ice',
    name: 'Blue Ice',
    colors: {
      primary: '0.55 0.18 240',
      primaryForeground: '0.98 0 0',
      accent: '0.65 0.20 220',
      accentForeground: '0.98 0 0',
      background: '0.12 0.02 240',
      foreground: '0.98 0.01 240',
      card: '0.18 0.04 240',
      cardForeground: '0.98 0.01 240',
      muted: '0.25 0.05 240',
      mutedForeground: '0.70 0.05 240',
      border: '0.30 0.08 240',
      ring: '0.60 0.18 240',
    },
  },
  {
    id: 'purple-dream',
    name: 'Purple Dream',
    colors: {
      primary: '0.55 0.20 280',
      primaryForeground: '0.98 0 0',
      accent: '0.65 0.22 300',
      accentForeground: '0.98 0 0',
      background: '0.12 0.02 280',
      foreground: '0.98 0.01 280',
      card: '0.18 0.04 280',
      cardForeground: '0.98 0.01 280',
      muted: '0.25 0.05 280',
      mutedForeground: '0.70 0.05 280',
      border: '0.30 0.08 280',
      ring: '0.60 0.20 280',
    },
  },
  {
    id: 'green-neon',
    name: 'Green Neon',
    colors: {
      primary: '0.60 0.20 145',
      primaryForeground: '0.98 0 0',
      accent: '0.70 0.22 160',
      accentForeground: '0.98 0 0',
      background: '0.12 0.02 145',
      foreground: '0.98 0.01 145',
      card: '0.18 0.04 145',
      cardForeground: '0.98 0.01 145',
      muted: '0.25 0.05 145',
      mutedForeground: '0.70 0.05 145',
      border: '0.30 0.08 145',
      ring: '0.60 0.20 145',
    },
  },
  {
    id: 'orange-fire',
    name: 'Orange Fire',
    colors: {
      primary: '0.60 0.22 40',
      primaryForeground: '0.98 0 0',
      accent: '0.70 0.24 50',
      accentForeground: '0.98 0 0',
      background: '0.12 0.02 40',
      foreground: '0.98 0.01 40',
      card: '0.18 0.04 40',
      cardForeground: '0.98 0.01 40',
      muted: '0.25 0.05 40',
      mutedForeground: '0.70 0.05 40',
      border: '0.30 0.08 40',
      ring: '0.60 0.22 40',
    },
  },
];

export function getThemeById(id: string): Theme {
  return themes.find((t) => t.id === id) || themes[0];
}

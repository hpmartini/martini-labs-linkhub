export interface Theme {
  name: string;
  isDark: boolean;
  colors: {
    primary: string;
    primaryRgb: string;
    secondary: string;
    secondaryRgb: string;
    background: string;
    backgroundAlt: string;
    text: string;
    textMuted: string;
    glass: string;
    glassHover: string;
    border: string;
    borderHover: string;
  };
  canvas: {
    gridColor: string;
    gridColorRgb: string;
    skyGradient: string[];
    groundColor: string;
    sunGradient: string[];
    mountainColors: string[];
  };
  fonts: {
    heading: string;
    body: string;
  };
}

export const themes: Record<string, Theme> = {
  synthwave: {
    name: 'Synthwave',
    isDark: true,
    colors: {
      primary: '#00ffff',
      primaryRgb: '0, 255, 255',
      secondary: '#ff00ff',
      secondaryRgb: '255, 0, 255',
      background: '#050505',
      backgroundAlt: '#0a0a0a',
      text: '#ffffff',
      textMuted: '#a1a1aa',
      glass: 'rgba(10, 10, 10, 0.6)',
      glassHover: 'rgba(10, 10, 10, 0.8)',
      border: 'rgba(255, 255, 255, 0.1)',
      borderHover: 'rgba(255, 255, 255, 0.3)',
    },
    canvas: {
      gridColor: '#00ffff',
      gridColorRgb: '0, 255, 255',
      skyGradient: ['#120824', '#240b36', '#451055'],
      groundColor: '#08020a',
      sunGradient: ['#ff00ff', '#ffcc00'],
      mountainColors: ['#2d1b4e', '#1a0b2e', '#000000'],
    },
    fonts: {
      heading: 'Orbitron, sans-serif',
      body: 'Inter, sans-serif',
    },
  },

  schwaelmer: {
    name: 'Schwälmer',
    isDark: false,
    colors: {
      primary: '#9B2C2C',
      primaryRgb: '155, 44, 44',
      secondary: '#285E5E',
      secondaryRgb: '40, 94, 94',
      background: '#FAF8F5',
      backgroundAlt: '#FFFFFF',
      text: '#1A1A1A',
      textMuted: '#6B7280',
      glass: 'rgba(255, 255, 255, 0.8)',
      glassHover: 'rgba(255, 255, 255, 0.95)',
      border: 'rgba(0, 0, 0, 0.1)',
      borderHover: 'rgba(0, 0, 0, 0.2)',
    },
    canvas: {
      gridColor: '#285E5E',
      gridColorRgb: '40, 94, 94',
      skyGradient: ['#FAF8F5', '#F5F0E8', '#EDE5D8'],
      groundColor: '#F5F0E8',
      sunGradient: ['#9B2C2C', '#C53030'],
      mountainColors: ['#E8E0D5', '#D6C9B8', '#C4B8A5'],
    },
    fonts: {
      heading: 'Inter, sans-serif',
      body: 'Inter, sans-serif',
    },
  },
};

export const getTheme = (themeName?: string): Theme => {
  const name = themeName || import.meta.env.VITE_THEME || 'synthwave';
  return themes[name] || themes.synthwave;
};

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
    textSecondary: string;
    textMuted: string;
    textLight: string;
    glass: string;
    glassHover: string;
    border: string;
    borderHover: string;
    borderInput: string;
    // Additional accent colors for badges/tags
    accent: string;
    accentRgb: string;
    accentBackground: string;
    accentBorder: string;
    // Button specific
    buttonPrimaryHover: string;
    buttonSecondaryBorder: string;
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
  shadows: {
    card: string;
    cardHover: string;
    button: string;
  };
  borderRadius: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
    full: string;
  };
  transitions: {
    default: string;
    slow: string;
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
      textSecondary: '#e4e4e7',
      textMuted: '#a1a1aa',
      textLight: '#71717a',
      glass: 'rgba(10, 10, 10, 0.6)',
      glassHover: 'rgba(10, 10, 10, 0.8)',
      border: 'rgba(255, 255, 255, 0.1)',
      borderHover: 'rgba(255, 255, 255, 0.3)',
      borderInput: 'rgba(255, 255, 255, 0.2)',
      accent: '#ff00ff',
      accentRgb: '255, 0, 255',
      accentBackground: 'rgba(255, 0, 255, 0.1)',
      accentBorder: 'rgba(255, 0, 255, 0.3)',
      buttonPrimaryHover: '#00cccc',
      buttonSecondaryBorder: 'rgba(255, 0, 255, 0.5)',
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
    shadows: {
      card: '0 0 20px rgba(0, 255, 255, 0.1)',
      cardHover: '0 0 30px rgba(0, 255, 255, 0.2)',
      button: '0 0 15px rgba(0, 255, 255, 0.3)',
    },
    borderRadius: {
      sm: '4px',
      md: '8px',
      lg: '12px',
      xl: '16px',
      full: '9999px',
    },
    transitions: {
      default: 'all 0.15s cubic-bezier(0.4, 0, 0.2, 1)',
      slow: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    },
  },

  schwaelmer: {
    name: 'Schwälmer',
    isDark: false,
    colors: {
      // Primary: Teal - for buttons, CTAs, section labels, active states
      primary: '#2F4F4F',
      primaryRgb: '47, 79, 79',
      // Secondary: Burgundy - for highlighted text, links, submit buttons
      secondary: '#A63333',
      secondaryRgb: '166, 51, 51',
      // Backgrounds
      background: '#FAFAF9',
      backgroundAlt: '#FFFFFF',
      // Text hierarchy
      text: '#0F172A',
      textSecondary: '#1E293B',
      textMuted: '#475569',
      textLight: '#64748B',
      // Glass/card effects
      glass: 'rgba(255, 255, 255, 0.9)',
      glassHover: 'rgba(255, 255, 255, 1)',
      // Borders
      border: '#E2E8F0',
      borderHover: '#CBD5E1',
      borderInput: '#CBD5E1',
      // Accent colors (for tagline badge)
      accent: '#9A3412',
      accentRgb: '154, 52, 18',
      accentBackground: '#FFEDD5',
      accentBorder: '#FED7AA',
      // Button specific
      buttonPrimaryHover: '#1E293B',
      buttonSecondaryBorder: '#E2E8F0',
    },
    canvas: {
      gridColor: '#2F4F4F',
      gridColorRgb: '47, 79, 79',
      skyGradient: ['#FAFAF9', '#F1F5F9', '#E2E8F0'],
      groundColor: '#F1F5F9',
      sunGradient: ['#A63333', '#B91C1C'],
      mountainColors: ['#E2E8F0', '#CBD5E1', '#94A3B8'],
    },
    fonts: {
      heading: 'Inter, sans-serif',
      body: 'Inter, sans-serif',
    },
    shadows: {
      card: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
      cardHover: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
      button: '0 10px 15px -3px rgba(47, 79, 79, 0.2), 0 4px 6px -4px rgba(47, 79, 79, 0.2)',
    },
    borderRadius: {
      sm: '4px',
      md: '8px',
      lg: '12px',
      xl: '16px',
      full: '9999px',
    },
    transitions: {
      default: 'all 0.15s cubic-bezier(0.4, 0, 0.2, 1)',
      slow: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    },
  },
};

export const getTheme = (themeName?: string): Theme => {
  const name = themeName || import.meta.env.VITE_THEME || 'synthwave';
  return themes[name] || themes.synthwave;
};
// Build trigger: 1768569652

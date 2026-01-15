import React, { createContext, useContext, useEffect, ReactNode } from 'react';
import { Theme, getTheme } from './index';

interface ThemeContextType {
  theme: Theme;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const theme = getTheme();

  useEffect(() => {
    // Apply CSS variables to :root
    const root = document.documentElement;

    // Colors
    root.style.setProperty('--color-primary', theme.colors.primary);
    root.style.setProperty('--color-primary-rgb', theme.colors.primaryRgb);
    root.style.setProperty('--color-secondary', theme.colors.secondary);
    root.style.setProperty('--color-secondary-rgb', theme.colors.secondaryRgb);
    root.style.setProperty('--color-background', theme.colors.background);
    root.style.setProperty('--color-background-alt', theme.colors.backgroundAlt);
    root.style.setProperty('--color-text', theme.colors.text);
    root.style.setProperty('--color-text-muted', theme.colors.textMuted);
    root.style.setProperty('--color-glass', theme.colors.glass);
    root.style.setProperty('--color-glass-hover', theme.colors.glassHover);
    root.style.setProperty('--color-border', theme.colors.border);
    root.style.setProperty('--color-border-hover', theme.colors.borderHover);

    // Canvas colors
    root.style.setProperty('--canvas-grid-color', theme.canvas.gridColor);
    root.style.setProperty('--canvas-grid-color-rgb', theme.canvas.gridColorRgb);
    root.style.setProperty('--canvas-ground-color', theme.canvas.groundColor);

    // Fonts
    root.style.setProperty('--font-heading', theme.fonts.heading);
    root.style.setProperty('--font-body', theme.fonts.body);

    // Set background color on body
    document.body.style.backgroundColor = theme.colors.background;
    document.body.style.color = theme.colors.text;

    // Add theme class to body for conditional styling
    document.body.classList.remove('theme-synthwave', 'theme-schwaelmer');
    document.body.classList.add(`theme-${theme.name.toLowerCase()}`);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): Theme => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context.theme;
};

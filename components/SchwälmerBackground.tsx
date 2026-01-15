import React from 'react';
import { useTheme } from '../themes/ThemeContext';

export const SchwälmerBackground: React.FC = () => {
  const theme = useTheme();

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Subtle gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(180deg, ${theme.colors.background} 0%, ${theme.colors.backgroundAlt} 50%, ${theme.colors.background} 100%)`
        }}
      />

      {/* Decorative circles */}
      <div
        className="absolute top-20 right-20 w-96 h-96 rounded-full opacity-[0.03]"
        style={{ backgroundColor: theme.colors.primary }}
      />
      <div
        className="absolute bottom-40 left-10 w-64 h-64 rounded-full opacity-[0.03]"
        style={{ backgroundColor: theme.colors.secondary }}
      />

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(${theme.colors.text} 1px, transparent 1px),
            linear-gradient(90deg, ${theme.colors.text} 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }}
      />
    </div>
  );
};


import React from 'react';
import { useTheme } from '../themes/ThemeContext';

interface ProfileProps {
  name: string;
  title1: string;
  title2: string;
  company: string;
  brand: string;
}

export const Profile: React.FC<ProfileProps> = ({ name, title1, title2, company, brand }) => {
  const theme = useTheme();

  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col items-center text-center animate-fade-in w-full">
      {/* Avatar */}
      <div className="relative group mb-8">
        {/* Glow effect - only for dark theme */}
        {theme.isDark && (
          <div
            className="absolute -inset-1 rounded-full blur-md opacity-60 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"
            style={{
              background: `linear-gradient(to right, ${theme.colors.primary}, ${theme.colors.secondary})`
            }}
          />
        )}
        <div
          className="relative w-32 h-32 rounded-full overflow-hidden"
          style={{
            border: theme.isDark ? '2px solid rgba(255,255,255,0.3)' : '3px solid white',
            backgroundColor: theme.isDark ? 'black' : 'white',
            boxShadow: theme.isDark ? '0 25px 50px -12px rgba(0, 0, 0, 0.5)' : '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)'
          }}
        >
          <img
            src={theme.isDark ? 'images/hape.jpeg' : 'images/hape_schwalm.jpeg'}
            alt={name}
            className={`w-full h-full object-cover ${theme.isDark ? 'grayscale-[0.2] contrast-125' : ''}`}
          />
        </div>

        {/* Message Badge / Contact Link */}
        <a
          href="#contact"
          onClick={scrollToContact}
          className="absolute -top-1 -right-1 flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 z-30 cursor-pointer transform hover:scale-110"
          style={{
            backgroundColor: theme.isDark ? '#18181b' : 'white',
            color: theme.colors.secondary,
            border: `2px solid ${theme.colors.secondary}`,
            boxShadow: theme.isDark
              ? `0 0 10px rgba(${theme.colors.secondaryRgb}, 0.6)`
              : '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
          }}
          title="Send Message"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </a>
      </div>

      {/* Text block */}
      <div className="relative py-2 px-8 rounded-3xl">
        {/* Protective Layer */}
        {theme.isDark && (
          <div className="absolute inset-0 bg-black/60 blur-3xl rounded-full scale-150 pointer-events-none -z-10" />
        )}

        <div className="space-y-2 relative z-10">
          <h1
            className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none"
            style={{
              fontFamily: theme.fonts.heading,
              color: theme.colors.text,
              textShadow: theme.isDark
                ? `0 0 5px ${theme.colors.secondary}, 0 0 10px ${theme.colors.secondary}`
                : 'none'
            }}
          >
            {name}
          </h1>

          <div className="flex flex-col items-center space-y-1">
            <span
              className="font-semibold tracking-[0.2em] uppercase text-xs md:text-sm px-4 py-1 rounded-full"
              style={{
                color: theme.colors.primary,
                backgroundColor: theme.isDark ? 'rgba(0,0,0,0.7)' : `rgba(${theme.colors.primaryRgb}, 0.1)`,
                border: theme.isDark ? `1px solid rgba(${theme.colors.primaryRgb}, 0.1)` : 'none'
              }}
            >
              {title1}
              <br />
              {title2}
            </span>
            <span
              className="font-semibold text-lg md:text-xl"
              style={{ color: theme.colors.textSecondary }}
            >
              {company}
              <br />
              {brand}
            </span>
          </div>
        </div>
      </div>

      {/* Divider - subtle for light theme */}
      <div
        className="w-16 h-0.5 mt-6 rounded-full"
        style={{
          backgroundColor: theme.isDark ? 'transparent' : theme.colors.border,
          background: theme.isDark ? `linear-gradient(to right, transparent, ${theme.colors.primary}, transparent)` : undefined,
          opacity: theme.isDark ? 0.5 : 1
        }}
      />
    </div>
  );
};

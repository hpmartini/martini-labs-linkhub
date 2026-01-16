
import React from 'react';
import { LinkItem } from '../types';
import { useTheme } from '../themes/ThemeContext';

interface SocialIconsProps {
  links: LinkItem[];
}

export const SocialIcons: React.FC<SocialIconsProps> = ({ links }) => {
  const theme = useTheme();

  return (
    <div className="flex flex-wrap justify-center gap-4">
      {links.map((link) => {
        const isPrimary = link.color === 'cyan';
        const accentColor = isPrimary ? theme.colors.primary : theme.colors.secondary;
        const accentRgb = isPrimary ? theme.colors.primaryRgb : theme.colors.secondaryRgb;

        return (
          <a
            key={link.url}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            title={link.label}
            className="group relative p-3 transition-all duration-300 transform hover:-translate-y-1"
            style={{
              borderRadius: theme.borderRadius.full,
              backgroundColor: theme.isDark ? 'rgba(0, 0, 0, 0.3)' : 'white',
              border: `2px solid ${theme.isDark ? `rgba(${accentRgb}, 0.2)` : theme.colors.border}`,
              boxShadow: theme.isDark ? 'none' : theme.shadows.card,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = accentColor;
              e.currentTarget.style.boxShadow = theme.isDark
                ? `0 0 15px rgba(${accentRgb}, 0.3)`
                : theme.shadows.cardHover;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = theme.isDark ? `rgba(${accentRgb}, 0.2)` : theme.colors.border;
              e.currentTarget.style.boxShadow = theme.isDark ? 'none' : theme.shadows.card;
            }}
          >
            <div
              className="relative z-10 transition-colors duration-300"
              style={{ color: theme.isDark ? accentColor : theme.colors.textMuted }}
              onMouseEnter={(e) => e.currentTarget.style.color = accentColor}
              onMouseLeave={(e) => e.currentTarget.style.color = theme.isDark ? accentColor : theme.colors.textMuted}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={link.icon} />
              </svg>
            </div>

            {/* Background Glow - only for dark theme */}
            {theme.isDark && (
              <div
                className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-md"
                style={{ backgroundColor: accentColor }}
              ></div>
            )}
          </a>
        );
      })}
    </div>
  );
};

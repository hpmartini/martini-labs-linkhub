import React from "react";
import { LinkItem } from "../types";
import { useTheme } from "../themes/ThemeContext";
import { ArrowRight } from "lucide-react";

interface LinkCardProps {
  link: LinkItem;
  isProminent?: boolean;
}

export const LinkCard: React.FC<LinkCardProps> = ({ link, isProminent }) => {
  const theme = useTheme();
  const isPrimary = link.color === "cyan";
  const accentColor = isPrimary ? theme.colors.primary : theme.colors.secondary;
  const accentRgb = isPrimary
    ? theme.colors.primaryRgb
    : theme.colors.secondaryRgb;

  const cardBg = theme.isDark ? "glass" : "bg-white";
  const hoverClass = theme.isDark
    ? isPrimary
      ? "hover:neon-border-cyan"
      : "hover:neon-border-pink"
    : "";

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`
        group relative block w-full transform hover:-translate-y-0.5
        ${isProminent ? "p-6 md:p-8" : "p-5"}
        ${cardBg} hover:z-50
      `}
      style={{
        borderRadius: theme.borderRadius.lg,
        border: theme.isDark ? `1px solid rgba(${accentRgb}, 0.1)` : "none",
        boxShadow: theme.shadows.card,
        transition: theme.transitions.slow,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = theme.shadows.cardHover;
        if (theme.isDark) {
          e.currentTarget.style.borderColor = `rgba(${accentRgb}, 0.5)`;
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = theme.shadows.card;
        if (theme.isDark) {
          e.currentTarget.style.borderColor = `rgba(${accentRgb}, 0.1)`;
        }
      }}
    >
      {/* --- POP-UP PREVIEW (Prominent Only) --- */}
      {isProminent && (
        <div className="hidden md:block absolute bottom-[120%] left-1/2 -translate-x-1/2 w-72 pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 z-50">
          {/* Monitor Frame */}
          <div
            className="relative p-1 rounded-lg"
            style={{
              backgroundColor: theme.isDark ? "#050505" : "white",
              border: theme.isDark
                ? `1px solid ${accentColor}`
                : `1px solid ${theme.colors.border}`,
              boxShadow: theme.isDark
                ? `0 0 20px rgba(${accentRgb}, 0.3)`
                : theme.shadows.cardHover,
            }}
          >
            {/* Screen Content */}
            <div
              className="relative rounded overflow-hidden aspect-video"
              style={{
                backgroundColor: theme.isDark ? "#18181b" : "#f5f5f5",
                border: theme.isDark
                  ? "1px solid rgba(255,255,255,0.1)"
                  : `1px solid ${theme.colors.border}`,
              }}
            >
              {/* Loading/Static Placeholder underneath */}
              <div
                className="absolute inset-0 flex items-center justify-center text-xs"
                style={{
                  fontFamily: theme.fonts.heading,
                  color: theme.colors.textMuted,
                }}
              >
                {theme.isDark ? "INITIALIZING..." : "Loading..."}
              </div>

              {/* Live Preview */}
              <img
                src={`https://image.thum.io/get/width/600/crop/800/noanimate/${link.url}`}
                alt="Site Preview"
                className="relative z-10 w-full h-full object-cover opacity-90"
              />

              {/* Scanlines Overlay - only for dark theme */}
              {theme.isDark && (
                <div className="absolute inset-0 z-20 bg-[linear-gradient(rgba(18,16,20,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,6px_100%] opacity-40 pointer-events-none"></div>
              )}

              {/* Screen Glare */}
              <div className="absolute inset-0 z-30 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none"></div>
            </div>

            {/* Monitor Status Bar - only for dark theme */}
            {theme.isDark && (
              <div className="flex justify-between items-center mt-1.5 px-1">
                <span
                  className="text-[9px] tracking-widest"
                  style={{
                    fontFamily: theme.fonts.heading,
                    color: accentColor,
                  }}
                >
                  LIVE FEED :: 128kbps
                </span>
                <div className="flex gap-1">
                  <div
                    className="w-1.5 h-1.5 rounded-full animate-pulse"
                    style={{ backgroundColor: accentColor }}
                  ></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-zinc-800"></div>
                </div>
              </div>
            )}

            {/* Connecting Line/Triangle */}
            <div
              className="absolute left-1/2 -translate-x-1/2 -bottom-2.5 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[10px]"
              style={{
                borderTopColor: theme.isDark
                  ? accentColor
                  : theme.colors.border,
                filter: "drop-shadow(0 4px 4px rgba(0,0,0,0.2))",
              }}
            ></div>
          </div>
        </div>
      )}

      <div className="relative z-30 flex items-center justify-between">
        <div className="flex items-center gap-4 md:gap-6">
          {/* Logo or fallback icon */}
          {link.logo || link.logoDark ? (
            <div
              className="flex items-center justify-center w-12 h-12 backdrop-blur-sm overflow-hidden"
              style={{
                borderRadius: theme.borderRadius.md,
                backgroundColor: theme.isDark
                  ? "rgba(24, 24, 27, 0.8)"
                  : "rgba(255, 255, 255, 0.8)",
                border: `1px solid rgba(${accentRgb}, 0.2)`,
                transition: theme.transitions.default,
              }}
            >
              <img
                src={theme.isDark ? link.logoDark || link.logo : link.logo}
                alt={`${link.label} logo`}
                className="w-8 h-8 object-contain"
              />
            </div>
          ) : (
            link.icon && (
              <div
                className="p-3 backdrop-blur-sm"
                style={{
                  borderRadius: theme.borderRadius.md,
                  backgroundColor: theme.isDark
                    ? "rgba(24, 24, 27, 0.8)"
                    : "rgba(255, 255, 255, 0.8)",
                  border: `1px solid rgba(${accentRgb}, 0.2)`,
                  color: accentColor,
                  transition: theme.transitions.default,
                }}
              >
                <link.icon className="w-6 h-6" strokeWidth={1.5} />
              </div>
            )
          )}
          <div className="flex flex-col">
            <span
              className={`${
                isProminent
                  ? "text-xl md:text-2xl font-bold"
                  : "text-lg font-semibold"
              } tracking-tight`}
              style={{
                fontFamily: theme.fonts.heading,
                color: theme.colors.text,
                transition: theme.transitions.default,
              }}
            >
              {link.label}
            </span>
            <span
              className="text-[10px] tracking-[0.2em] uppercase mt-1 font-medium"
              style={{
                color: theme.colors.textMuted,
                transition: theme.transitions.default,
              }}
            >
              {link.description || "Official Website"}
            </span>
          </div>
        </div>

        <div
          className="p-2 backdrop-blur-xl"
          style={{
            borderRadius: theme.borderRadius.full,
            backgroundColor: theme.isDark
              ? "rgba(0, 0, 0, 0.2)"
              : "rgba(255, 255, 255, 0.8)",
            border: `1px solid rgba(${accentRgb}, 0.1)`,
            color: theme.colors.textMuted,
            transition: theme.transitions.default,
          }}
        >
          <ArrowRight className="h-5 w-5" strokeWidth={2} />
        </div>
      </div>

      {/* Dynamic Glow Layer (Border/Hover effect) */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-10 pointer-events-none z-20"
        style={{
          borderRadius: theme.borderRadius.lg,
          backgroundColor: accentColor,
          transition: theme.transitions.slow,
        }}
      ></div>
      {isProminent && theme.isDark && (
        <div
          className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-[80%] h-[1px] opacity-0 group-hover:opacity-100 blur-[2px] z-20"
          style={{
            backgroundColor: accentColor,
            boxShadow: `0 0 10px ${accentColor}`,
            transition: theme.transitions.slow,
          }}
        ></div>
      )}
    </a>
  );
};

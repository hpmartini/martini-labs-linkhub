import React from "react";
import { useTheme } from "../themes/ThemeContext";
import { SchwalmUnderline } from "./SchwalmUnderline";
import { Download, Mail, Phone } from "lucide-react";


interface ProfileProps {
  name: string;
  title1: string;
}

export const Profile: React.FC<ProfileProps> = ({
  name,
  title1,
}) => {
  const theme = useTheme();

  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex flex-col items-center text-center animate-fade-in w-full">
      {/* Avatar */}
      <div className="relative mb-8 z-50">
        {/* Glow effect - only for dark theme */}
        {theme.isDark && (
          <div
            className="absolute -inset-1 rounded-full blur-md opacity-60"
            style={{
              background: `linear-gradient(to right, ${theme.colors.primary}, ${theme.colors.secondary})`,
            }}
          />
        )}
        <div
          className="relative w-64 h-64 rounded-full shadow-2xl overflow-hidden"
          style={{
            border: theme.isDark
              ? "2px solid rgba(255,255,255,0.3)"
              : "3px solid white",
            backgroundColor: theme.isDark ? "black" : "white",
            boxShadow: theme.isDark
              ? "0 25px 50px -12px rgba(0, 0, 0, 0.5)"
              : "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
          }}
        >
          <img
            src={theme.isDark ? "images/hape_optimized.jpeg" : "images/hape_schwalm_optimized.jpeg"}
            alt={name}
            loading="eager"
            className={`w-full h-full object-cover rounded-full ${
              theme.isDark ? "grayscale-[0.2] contrast-125" : ""
            }`}
          />
        </div>
      </div>

      {/* Text block */}
      <div className="relative py-2 px-8 rounded-3xl w-full">
        {/* Protective Layer */}
        {theme.isDark && (
          <div className="absolute inset-0 bg-black/60 blur-3xl rounded-full scale-150 pointer-events-none -z-10" />
        )}

        <div className="space-y-4 md:space-y-6 relative z-10 flex flex-col items-center">
          <h1
            className={`text-4xl md:text-5xl tracking-tight leading-none ${
              theme.isDark ? "font-black uppercase mb-1" : "font-extrabold mb-2"
            }`}
            style={{
              fontFamily: theme.fonts.heading,
              color: theme.colors.text,
              textShadow: theme.isDark
                ? `0 0 5px ${theme.colors.secondary}, 0 0 10px ${theme.colors.secondary}`
                : "none",
            }}
          >
            <span className="relative inline-block">
              {name}
              {!theme.isDark && (
                <SchwalmUnderline className="absolute -bottom-2 md:-bottom-3 left-0 w-full" />
              )}
            </span>
          </h1>

          <div className="flex flex-col items-center space-y-1 mb-4">
            <span
              className={
                theme.isDark
                  ? "font-semibold tracking-[0.1em] uppercase text-xs md:text-sm px-6 py-2 rounded-full"
                  : "font-bold text-sm md:text-base px-6 py-2 rounded-full"
              }
              style={{
                color: theme.isDark
                  ? theme.colors.primary
                  : theme.colors.accent,
                backgroundColor: theme.isDark
                  ? "rgba(0,0,0,0.7)"
                  : theme.colors.accentBackground,
                border: theme.isDark
                  ? `1px solid rgba(${theme.colors.primaryRgb}, 0.1)`
                  : `1px solid ${theme.colors.accentBorder}`,
              }}
            >
              {title1}
            </span>
          </div>

          {/* Primary Action Buttons (replacing company text) */}
          <div className="flex flex-wrap justify-center gap-3 w-full max-w-lg">
            <button
              onClick={scrollToContact}
              className="flex px-5 py-2.5 rounded-lg text-sm font-bold transition-all transform hover:-translate-y-0.5 items-center justify-center gap-2"
              style={{
                backgroundColor: theme.isDark
                  ? "rgba(236, 72, 153, 0.1)"
                  : "#fdf2f8",
                color: theme.isDark ? "#f472b6" : "#db2777",
                border: `1px solid ${
                  theme.isDark ? "rgba(244, 114, 182, 0.3)" : "#fbcfe8"
                }`,
                boxShadow: theme.isDark
                  ? "0 0 10px rgba(236, 72, 153, 0.2)"
                  : "0 2px 4px rgba(0,0,0,0.05)",
              }}
            >
              <Mail className="w-4 h-4" strokeWidth={2} />
              Kontakt
            </button>

            <a
              href="/images/Hans-Peter Martini.vcf"
              download
              className="flex px-5 py-2.5 rounded-lg text-sm font-bold transition-all transform hover:-translate-y-0.5 items-center justify-center gap-2"
              style={{
                backgroundColor: theme.isDark
                  ? "rgba(6, 182, 212, 0.1)"
                  : "#f0f9ff",
                color: theme.isDark ? "#22d3ee" : "#0284c7",
                border: `1px solid ${
                  theme.isDark ? "rgba(34, 211, 238, 0.3)" : "#bae6fd"
                }`,
                boxShadow: theme.isDark
                  ? "0 0 10px rgba(6, 182, 212, 0.2)"
                  : "0 2px 4px rgba(0,0,0,0.05)",
              }}
            >
              <Download className="w-4 h-4" strokeWidth={2} />
              VCF speichern
            </a>

            <a
              href="tel:+4915678312377"
              className="flex px-5 py-2.5 rounded-lg text-sm font-bold transition-all transform hover:-translate-y-0.5 items-center justify-center gap-2"
              style={{
                backgroundColor: theme.isDark
                  ? "rgba(34, 197, 94, 0.1)"
                  : "#f0fdf4",
                color: theme.isDark ? "#4ade80" : "#16a34a",
                border: `1px solid ${
                  theme.isDark ? "rgba(74, 222, 128, 0.3)" : "#bbf7d0"
                }`,
                boxShadow: theme.isDark
                  ? "0 0 10px rgba(34, 197, 94, 0.2)"
                  : "0 2px 4px rgba(0,0,0,0.05)",
              }}
            >
              <Phone className="w-4 h-4" strokeWidth={2} />
              Anrufen
            </a>
          </div>
        </div>
      </div>

      {/* Divider - subtle for light theme */}
      <div
        className="w-16 h-0.5 mt-8 rounded-full"
        style={{
          backgroundColor: theme.isDark ? "transparent" : theme.colors.border,
          background: theme.isDark
            ? `linear-gradient(to right, transparent, ${theme.colors.primary}, transparent)`
            : undefined,
          opacity: theme.isDark ? 0.5 : 1,
        }}
      />
    </div>
  );
};

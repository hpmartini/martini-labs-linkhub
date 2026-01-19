import React from "react";
import { useTheme } from "../themes/ThemeContext";
import { SchwalmUnderline } from "./SchwalmUnderline";

interface ProfileProps {
  name: string;
  title1: string;
  title2: string;
  company: string;
  brand: string;
}

export const Profile: React.FC<ProfileProps> = ({
  name,
  title1,
  title2,
  company,
  brand,
}) => {
  const theme = useTheme();

  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex flex-col items-center text-center animate-fade-in w-full">
      {/* Avatar */}
      <div className="relative group mb-8 z-50">
        {/* Glow effect - only for dark theme */}
        {theme.isDark && (
          <div
            className="absolute -inset-1 rounded-full blur-md opacity-60 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"
            style={{
              background: `linear-gradient(to right, ${theme.colors.primary}, ${theme.colors.secondary})`,
            }}
          />
        )}
        <div
          className="relative w-64 h-64 rounded-full transition-all duration-500 ease-out transform group-hover:scale-[3] group-hover:z-50 shadow-2xl overflow-hidden"
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
            src={theme.isDark ? "images/hape.jpeg" : "images/hape_schwalm.jpeg"}
            alt={name}
            className={`w-full h-full object-cover rounded-full ${
              theme.isDark ? "grayscale-[0.2] contrast-125" : ""
            }`}
          />

          {/* Hover Actions Overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/60 backdrop-blur-sm">
            <button
              onClick={scrollToContact}
              className="px-3 py-1 text-[8px] font-bold text-white bg-blue-600 rounded-full hover:bg-blue-500 transition-colors shadow-lg transform hover:scale-105"
            >
              Kontakt
            </button>
            <a
              href="/images/Hans-Peter Martini.vcf"
              download
              className="px-3 py-1 text-[8px] font-bold text-slate-800 bg-white rounded-full hover:bg-gray-100 transition-colors shadow-lg transform hover:scale-105 flex items-center gap-1"
            >
              <svg
                className="w-2 h-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              save contact
            </a>
          </div>
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
              {theme.isDark && <br />}
              {theme.isDark ? "" : " "}
              {title2}
            </span>
          </div>

          {/* Primary Action Buttons (replacing company text) */}
          <div className="flex flex-wrap justify-center gap-3 w-full max-w-lg">
            <button
              className="px-5 py-2.5 rounded-lg text-sm font-bold transition-all transform hover:-translate-y-0.5"
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
              onClick={() =>
                document.dispatchEvent(new CustomEvent("toggle-ai-chat"))
              }
            >
              AI Assistant
            </button>

            <a
              href="/images/Hans-Peter Martini.vcf"
              download
              className="px-5 py-2.5 rounded-lg text-sm font-bold transition-all transform hover:-translate-y-0.5 flex items-center gap-2"
              style={{
                backgroundColor: theme.isDark
                  ? "rgba(255, 255, 255, 0.05)"
                  : "#ffffff",
                color: theme.colors.text,
                border: `1px solid ${theme.colors.border}`,
                boxShadow: theme.isDark ? "none" : "0 2px 4px rgba(0,0,0,0.05)",
              }}
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              Kontaktdaten speichern
            </a>

            <button
              onClick={scrollToContact}
              className="px-5 py-2.5 rounded-lg text-sm font-bold transition-all transform hover:-translate-y-0.5"
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
              Kontakt
            </button>
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

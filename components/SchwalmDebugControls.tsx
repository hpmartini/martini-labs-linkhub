import React from "react";
import {
  useTheme,
  useSchwalmControl,
  SchwalmMode,
} from "../themes/ThemeContext";

export const SchwalmDebugControls: React.FC = () => {
  const theme = useTheme();
  const { schwalmMode, setSchwalmMode } = useSchwalmControl();

  if (theme.isDark) return null;

  const modes: SchwalmMode[] = ["background", "badge", "profile", "off"];

  return (
    <div className="fixed bottom-4 left-4 z-50 flex flex-col gap-2 p-4 bg-white/80 backdrop-blur-md rounded-xl shadow-lg border border-slate-200 animate-fade-in">
      <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
        Schwalm Integration Mode
      </div>
      <div className="flex gap-2">
        {modes.map((mode) => (
          <button
            key={mode}
            onClick={() => setSchwalmMode(mode)}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
              schwalmMode === mode
                ? "bg-slate-900 text-white shadow-md"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {mode.charAt(0).toUpperCase() + mode.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
};

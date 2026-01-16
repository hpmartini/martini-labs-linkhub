import React from "react";
import { useTheme } from "../themes/ThemeContext";
import { SchwalmLandscapeSVG } from "./SchwalmLandscapeSVG";

export const SchwälmerBackground: React.FC = () => {
  const theme = useTheme();

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Clean solid background - matching schwaelmer-softwarehaus.de */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: theme.colors.background }}
      />

      {/* The Schwalm Landscape - Bottom Aligned */}
      <div className="absolute bottom-0 left-0 right-0 h-[50vh] text-slate-500 select-none opacity-80">
        <SchwalmLandscapeSVG className="w-full h-full object-cover object-bottom" />
      </div>
    </div>
  );
};

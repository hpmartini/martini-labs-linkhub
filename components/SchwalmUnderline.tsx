import React from "react";
import { useTheme } from "../themes/ThemeContext";

export const SchwalmUnderline: React.FC<{ className?: string }> = ({
  className = "",
}) => {
  const theme = useTheme();

  // Don't render in synthwave mode if not desired, or use neon color
  const color = theme.isDark ? theme.colors.secondary : "#A63333";

  return (
    <svg
      viewBox="0 0 200 9"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`absolute -bottom-2 left-0 w-full h-3 ${className}`}
      preserveAspectRatio="none"
    >
      <path
        d="M2.00025 7.00002C45.3336 3.66668 141.5 -1.49997 198 4.00002"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        style={{
          filter: theme.isDark ? `drop-shadow(0 0 2px ${color})` : "none",
        }}
      />
    </svg>
  );
};

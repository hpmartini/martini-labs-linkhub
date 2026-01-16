import React from "react";

/**
 * A stylized SVG landscape of the Schwalm region (Schwalm-Eder).
 * Features gentle rolling hills, fields, and a distant horizon.
 */
export const SchwalmLandscapeSVG: React.FC<{ className?: string }> = ({
  className,
}) => {
  return (
    <svg
      viewBox="0 0 1440 600"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      preserveAspectRatio="xMidYMax slice"
    >
      <defs>
        <linearGradient
          id="hillGradient1"
          x1="720"
          y1="200"
          x2="720"
          y2="600"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="currentColor" stopOpacity="0.05" />
          <stop offset="1" stopColor="currentColor" stopOpacity="0.2" />
        </linearGradient>
        <linearGradient
          id="hillGradient2"
          x1="720"
          y1="350"
          x2="720"
          y2="600"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="currentColor" stopOpacity="0.1" />
          <stop offset="1" stopColor="currentColor" stopOpacity="0.3" />
        </linearGradient>
        <linearGradient
          id="hillGradient3"
          x1="720"
          y1="450"
          x2="720"
          y2="600"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="currentColor" stopOpacity="0.15" />
          <stop offset="1" stopColor="currentColor" stopOpacity="0.4" />
        </linearGradient>
      </defs>

      {/* Far Background Hills */}
      <path
        d="M0,320 C240,280 480,360 720,320 C960,280 1200,240 1440,280 L1440,600 L0,600 Z"
        fill="url(#hillGradient1)"
      />

      {/* Mid-Ground Hills */}
      <path
        d="M0,420 C300,400 600,460 900,410 C1100,380 1300,430 1440,400 L1440,600 L0,600 Z"
        fill="url(#hillGradient2)"
      />

      {/* Foreground Rolling Field */}
      <path
        d="M0,500 C400,480 800,540 1200,500 C1300,490 1400,495 1440,500 L1440,600 L0,600 Z"
        fill="url(#hillGradient3)"
      />

      {/* Stylized River (Schwalm) Meandering */}
      <path
        d="M-50,600 C100,580 200,590 300,600"
        stroke="currentColor"
        strokeWidth="2"
        strokeOpacity="0.2"
        fill="none"
      />
      <path
        d="M1100,600 C1200,580 1300,590 1490,600"
        stroke="currentColor"
        strokeWidth="2"
        strokeOpacity="0.2"
        fill="none"
      />

      {/* Distant Stylized Trees / Texture (Dots/Lines) */}
      <circle cx="200" cy="300" r="1.5" fill="currentColor" opacity="0.4" />
      <circle cx="210" cy="305" r="1" fill="currentColor" opacity="0.3" />
      <circle cx="800" cy="330" r="1.5" fill="currentColor" opacity="0.4" />
      <circle cx="820" cy="325" r="1" fill="currentColor" opacity="0.3" />
    </svg>
  );
};

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
          <stop stopColor="currentColor" stopOpacity="0.1" />
          <stop offset="1" stopColor="currentColor" stopOpacity="0.3" />
        </linearGradient>
        <linearGradient
          id="hillGradient2"
          x1="720"
          y1="350"
          x2="720"
          y2="600"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="currentColor" stopOpacity="0.2" />
          <stop offset="1" stopColor="currentColor" stopOpacity="0.4" />
        </linearGradient>
        <linearGradient
          id="hillGradient3"
          x1="720"
          y1="450"
          x2="720"
          y2="600"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="currentColor" stopOpacity="0.3" />
          <stop offset="1" stopColor="currentColor" stopOpacity="0.6" />
        </linearGradient>
      </defs>

      {/* Sun / Moon */}
      <circle cx="1200" cy="150" r="60" fill="currentColor" opacity="0.1" />

      {/* Far Background Hills */}
      <path
        d="M0,320 C240,280 480,360 720,320 C960,280 1200,240 1440,280 L1440,600 L0,600 Z"
        fill="url(#hillGradient1)"
      />

      {/* Mid-Ground Hills with Trees */}
      <path
        d="M0,420 C300,400 600,460 900,410 C1100,380 1300,430 1440,400 L1440,600 L0,600 Z"
        fill="url(#hillGradient2)"
      />

      {/* Silhouette Elements on Mid Horizon */}
      <g
        transform="translate(600, 410) scale(0.8)"
        fill="currentColor"
        opacity="0.4"
      >
        {/* Simple Tree Group */}
        <circle cx="10" cy="-10" r="15" />
        <rect x="5" y="-10" width="10" height="20" />
        <circle cx="40" cy="-5" r="12" />
        <rect x="36" y="-5" width="8" height="15" />
      </g>

      {/* Foreground Rolling Field with House */}
      <path
        d="M0,500 C400,480 800,540 1200,500 C1300,490 1400,495 1440,500 L1440,600 L0,600 Z"
        fill="url(#hillGradient3)"
      />

      {/* Timber-Framed House Silhouette (Schematic) */}
      <g transform="translate(1050, 460)" fill="currentColor" opacity="0.5">
        <path d="M0,40 L30,0 L60,40 Z" /> {/* Roof */}
        <rect x="10" y="40" width="40" height="30" /> {/* Body */}
        <rect
          x="25"
          y="55"
          width="10"
          height="15"
          fill="white"
          fillOpacity="0.5"
        />{" "}
        {/* Door */}
        <path d="M65,30 L75,15 L85,30 Z" /> {/* Second smaller roof */}
        <rect x="70" y="30" width="10" height="20" /> {/* Shed */}
      </g>

      {/* Stylized River (Schwalm) Meandering */}
      <path
        d="M-50,600 C100,580 200,590 300,600"
        stroke="currentColor"
        strokeWidth="3"
        strokeOpacity="0.3"
        fill="none"
      />
      <path
        d="M1100,600 C1200,580 1300,590 1490,600"
        stroke="currentColor"
        strokeWidth="3"
        strokeOpacity="0.3"
        fill="none"
      />
    </svg>
  );
};

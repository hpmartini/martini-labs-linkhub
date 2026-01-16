import React from "react";

/**
 * A stylized SVG representation of Schwalm whitework embroidery elements.
 * Features characteristic motifs: hearts, tulips, and circles connected by delicate vines.
 */
export const SchwalmPatternSVG: React.FC<{ className?: string }> = ({
  className,
}) => {
  return (
    <svg
      viewBox="0 0 800 600"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      preserveAspectRatio="xMidYMid slice"
    >
      <g
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.8"
      >
        {/* Central Heart Motif - The core Schwalm symbol */}
        <path d="M400,280 C360,240 320,280 320,320 C320,370 400,440 400,440 C400,440 480,370 480,320 C480,280 440,240 400,280 Z" />

        {/* Inner decorative stitches within the heart */}
        <path
          d="M400,300 C380,280 360,300 360,320 C360,345 400,380 400,380 C400,380 440,345 440,320 C440,300 420,280 400,300 Z"
          strokeWidth="1"
          strokeDasharray="4 4"
        />

        {/* Tulips / Floral Elements extending from the heart */}
        <path d="M320,320 C280,320 240,280 240,240 C240,200 280,180 300,200" />
        <path d="M480,320 C520,320 560,280 560,240 C560,200 520,180 500,200" />

        <path d="M240,240 C220,240 210,220 220,210 C230,200 250,210 240,240" />
        <path d="M560,240 C580,240 590,220 580,210 C570,200 550,210 560,240" />

        {/* Connecting Vines and Leaves */}
        <path d="M400,440 C400,500 360,540 320,540" />
        <path d="M400,440 C400,500 440,540 480,540" />

        {/* Stylized Leaves */}
        <path d="M360,500 C340,490 330,510 350,520" />
        <path d="M440,500 C460,490 470,510 450,520" />

        {/* Circles / Eyelets */}
        <circle cx="400" cy="200" r="15" />
        <circle cx="400" cy="200" r="25" strokeDasharray="2 4" />

        {/* Radiating Lines from the top circle */}
        <path d="M400,160 L400,120" />
        <path d="M430,170 L460,140" />
        <path d="M370,170 L340,140" />

        {/* Decorative Grid Fills (characteristic of Schwalm) */}
        <path
          d="M100,100 L700,100"
          strokeWidth="0.5"
          strokeDasharray="10 20"
          opacity="0.3"
        />
        <path
          d="M100,500 L700,500"
          strokeWidth="0.5"
          strokeDasharray="10 20"
          opacity="0.3"
        />
      </g>
    </svg>
  );
};

import React from "react";

/**
 * A stylized SVG landscape of the Schwalm region (Schwalm-Eder).
 * Features gentle rolling hills, fields, and a distant horizon.
 * Updated with Digital Transformation elements: Nodes, Cloud Sync Icon, Data Streams.
 */
export const SchwalmLandscapeSVG: React.FC<{ className?: string }> = ({
  className,
}) => {
  return (
    <svg
      viewBox="0 0 1440 900"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      preserveAspectRatio="xMidYMax slice"
    >
      <defs>
        {/* Warm Sky Gradient */}
        <linearGradient
          id="sky"
          x1="0"
          y1="0"
          x2="0"
          y2="500"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FDB813" stopOpacity="0.08" />
          <stop offset="1" stopColor="#FFF" stopOpacity="0" />
        </linearGradient>

        {/* Warm Earth Gradients */}
        <linearGradient
          id="hill1"
          x1="720"
          y1="300"
          x2="720"
          y2="800"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#A8A29E" stopOpacity="0.2" />
          <stop offset="1" stopColor="#78716C" stopOpacity="0.3" />
        </linearGradient>

        <linearGradient
          id="hill2"
          x1="720"
          y1="450"
          x2="720"
          y2="800"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#D6D3D1" stopOpacity="0.3" />
          <stop offset="1" stopColor="#A8A29E" stopOpacity="0.5" />
        </linearGradient>

        <linearGradient
          id="hill3"
          x1="720"
          y1="600"
          x2="720"
          y2="800"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#E7E5E4" stopOpacity="0.4" />
          <stop offset="1" stopColor="#D6D3D1" stopOpacity="0.6" />
        </linearGradient>
      </defs>

      {/* Sun - High and visible */}
      <circle cx="1250" cy="250" r="50" fill="#F59E0B" opacity="0.2" />

      {/* 
          DIGITAL NETWORK LAYER 
          Hub: Cloud Icon at (1000, 300)
          Targets: 
            1. Village Farm Barn (Left): (485, 510)
            2. Tractor (Center): (940, 635)
            3. Distant Tractor (Right): (1320, 540)
      */}
      <g stroke="#0EA5E9" strokeWidth="1.5" opacity="0.4" strokeDasharray="6 4">
        <line x1="1000" y1="300" x2="485" y2="510" />
        <line x1="1000" y1="300" x2="940" y2="635" />
        <line x1="1000" y1="300" x2="1320" y2="540" />
      </g>

      {/* Network Endpoints */}
      <circle
        cx="485"
        cy="510"
        r="4"
        fill="#0EA5E9"
        className="animate-pulse"
        opacity="0.6"
      />
      <circle
        cx="940"
        cy="635"
        r="4"
        fill="#0EA5E9"
        className="animate-pulse"
        opacity="0.6"
      />
      <circle
        cx="1320"
        cy="540"
        r="4"
        fill="#0EA5E9"
        className="animate-pulse"
        opacity="0.6"
      />

      {/* Cloud Icon Hub */}
      <g
        transform="translate(970, 275) scale(2.0)"
        fill="#0EA5E9"
        fillOpacity="0.1"
        stroke="#0EA5E9"
        strokeWidth="1"
      >
        <path d="M7,20 L7,18 C7,14 10,11 14,11 C16,11 18,12 19,14 C20,13 22,13 23,14 C26,16 26,20 23,22 L10,22 C8,22 7,21 7,20 Z" />
        <path
          d="M14,18 L16,16 M16,18 L14,20"
          strokeWidth="0.5"
          transform="translate(1,0)"
        />
      </g>
      <text
        x="1040"
        y="310"
        fill="#0EA5E9"
        opacity="0.5"
        fontSize="12"
        fontFamily="monospace"
      >
        SYNC
      </text>

      {/* Floating Binary Data Stream */}
      <g
        fill="#0EA5E9"
        opacity="0.3"
        fontSize="12"
        fontFamily="monospace"
        style={{ userSelect: "none" }}
      >
        <text x="450" y="450">
          10110
        </text>
        <text x="940" y="550">
          01001
        </text>
        <text x="1100" y="450">
          1101
        </text>
      </g>

      {/* Far Background Hills */}
      <path
        d="M0,450 C300,430 600,470 900,450 C1200,430 1440,410 1440,430 L1440,900 L0,900 Z"
        fill="url(#hill1)"
      />

      {/* Forest on Far Hill Right */}
      <g
        transform="translate(1200, 410) scale(0.7)"
        fill="#57534E"
        opacity="0.4"
      >
        <path d="M0,40 L15,0 L30,40 Z" />
        <path d="M20,50 L35,10 L50,50 Z" />
        <path d="M40,45 L55,5 L70,45 Z" />
        <path d="M-15,45 L0,10 L15,45 Z" />
        <path d="M60,40 L75,0 L90,40 Z" />
        <path d="M80,50 L95,15 L110,50 Z" />
      </g>

      {/* Mid-Ground Hills */}
      <path
        d="M0,550 C300,530 600,590 900,550 C1100,520 1300,570 1440,550 L1440,900 L0,900 Z"
        fill="url(#hill2)"
      />

      {/* Village Cluster / Farm (Left) */}
      <g
        transform="translate(100, 530) scale(0.6)"
        fill="#57534E"
        opacity="0.5"
      >
        <rect x="250" y="-60" width="30" height="60" /> {/* Church */}
        <path d="M240,-60 L265,-100 L290,-60 Z" />
        <path d="M0,0 L20,-20 L40,0 L40,25 L0,25 Z" />
        <path d="M50,10 L70,-10 L90,10 L90,35 L50,35 Z" />
        <path d="M100,5 L120,-15 L140,5 L140,30 L100,30 Z" />
        <path d="M160,-10 L180,-30 L200,-10 L200,15 L160,15 Z" />
        {/* Barn (Target) at local coords for x=485 placement */}
        <g transform="translate(640, -20)">
          <rect x="0" y="0" width="60" height="40" />
          <path d="M-10,0 L30,-30 L70,0 Z" />
        </g>
        {/* More houses */}
        <path d="M300,0 L320,-20 L340,0 L340,25 L300,25 Z" />
        <path d="M350,10 L370,-10 L390,10 L390,35 L350,35 Z" />
        <path d="M-40,20 L-30,5 L-20,20 L-20,35 L-40,35 Z" />
      </g>

      {/* Foreground Rolling Field */}
      <path
        d="M0,650 C400,630 800,690 1200,650 C1300,640 1440,645 1440,650 L1440,900 L0,900 Z"
        fill="url(#hill3)"
      />

      {/* Tractor (Center) - Node Target (940, 635) */}
      <g
        transform="translate(930, 630) scale(0.8)"
        fill="#44403C"
        opacity="0.6"
      >
        <circle cx="10" cy="20" r="10" />
        <circle cx="45" cy="25" r="6" />
        <path d="M5,10 L45,15 L45,5 L25,0 L5,10 Z" />
        <rect x="15" y="-15" width="20" height="25" />
        <rect x="45" y="5" width="5" height="15" />
      </g>

      {/* Distant Tractor (Right) - Node Target (1320, 540) */}
      <g
        transform="translate(1310, 540) scale(0.5)"
        fill="#57534E"
        opacity="0.5"
      >
        <circle cx="10" cy="20" r="10" />
        <circle cx="45" cy="25" r="6" />
        <path d="M5,10 L45,15 L45,5 L25,0 L5,10 Z" />
        <rect x="15" y="-15" width="20" height="25" />
      </g>

      {/* Winding Road */}
      <path
        d="M600,550 Q550,600 520,650 T300,900"
        stroke="#FFFFFF"
        strokeWidth="12"
        strokeOpacity="0.4"
        fill="none"
        strokeLinecap="round"
      />

      {/* Field Texture / Furrows */}
      <path
        d="M800,650 Q1000,630 1200,670"
        stroke="#78350F"
        strokeWidth="1"
        strokeOpacity="0.1"
        fill="none"
      />
      <path
        d="M780,670 Q980,650 1180,690"
        stroke="#78350F"
        strokeWidth="1"
        strokeOpacity="0.1"
        fill="none"
      />

      {/* Reference House */}
      <g transform="translate(50, 730) scale(1.1)" fill="#44403C" opacity="0.7">
        <path d="M0,40 L35,0 L70,40 Z" />
        <rect x="10" y="40" width="50" height="30" />
        <rect
          x="30"
          y="55"
          width="10"
          height="15"
          fill="#FEF3C7"
          fillOpacity="0.5"
        />
        <rect x="12" y="42" width="46" height="2" opacity="0.5" />
        <rect x="12" y="55" width="46" height="2" opacity="0.5" />
        <rect x="33" y="42" width="4" height="28" opacity="0.5" />
        <path
          d="M12,42 L58,70"
          stroke="currentColor"
          strokeWidth="2"
          opacity="0.3"
        />
      </g>
    </svg>
  );
};

import React from "react";

interface ClubLogoProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  showText?: boolean;
  lightText?: boolean;
  idPrefix?: string;
}

export const ClubLogo: React.FC<ClubLogoProps> = ({
  size = "md",
  showText = true,
  lightText = false,
  idPrefix = "club-logo",
}) => {
  // Determine pixel sizes for the SVG figure
  const dimensions = {
    xs: { fig: "w-8 h-8", text: "text-[10px]", sub: "text-[6px]" },
    sm: { fig: "w-12 h-12", text: "text-xs", sub: "text-[7px]" },
    md: { fig: "w-20 h-20", text: "text-lg", sub: "text-[9px]" },
    lg: { fig: "w-32 h-32", text: "text-2xl", sub: "text-[11px]" },
    xl: { fig: "w-48 h-48", text: "text-4xl", sub: "text-[14px]" },
  };

  const currentSize = dimensions[size];

  // Colors based on the upload: deep high-contrast gold gradients & rich charcoal borders
  return (
    <div className="flex flex-col items-center justify-center select-none text-center" id={`${idPrefix}_container`}>
      {/* Premium Luxury Logo Vector Emblem */}
      <svg
        className={`${currentSize.fig} transition-transform duration-300 hover:scale-105 active:scale-95`}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        id={`${idPrefix}_svg`}
      >
        <defs>
          {/* Polished Gold Gradient */}
          <linearGradient id={`${idPrefix}-gold-grad`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8a6f27" />
            <stop offset="20%" stopColor="#e5c060" />
            <stop offset="40%" stopColor="#f9e49b" />
            <stop offset="60%" stopColor="#d4af37" />
            <stop offset="80%" stopColor="#f3dd8c" />
            <stop offset="100%" stopColor="#aa842c" />
          </linearGradient>

          {/* Core Dark Mirror Background radial gradient */}
          <radialGradient id={`${idPrefix}-dark-mirror`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#1a1a17" />
            <stop offset="70%" stopColor="#0d0d0c" />
            <stop offset="100%" stopColor="#050505" />
          </radialGradient>

          {/* Delicate metallic stroke gradient */}
          <linearGradient id={`${idPrefix}-stroke-gold`} x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#f3dd8c" />
            <stop offset="50%" stopColor="#7a601e" />
            <stop offset="100%" stopColor="#d4af37" />
          </linearGradient>

          {/* Globe landmass gold gradient */}
          <linearGradient id={`${idPrefix}-land-gold`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#f7e195" />
            <stop offset="50%" stopColor="#d4af37" />
            <stop offset="100%" stopColor="#967727" />
          </linearGradient>
        </defs>

        {/* 1. CROWN AT THE TOP (Sits elegantly over the circular clock) */}
        {/* Crown Base Band */}
        <path
          d="M 42 21 C 45 22.5 55 22.5 58 21 L 57 23.5 C 55 24.5 45 24.5 43 23.5 Z"
          fill={`url(#${idPrefix}-gold-grad)`}
          stroke="#111"
          strokeWidth="0.3"
        />
        {/* 5-Peak Imperial Crown Structure */}
        <path
          d="M 42.5 22.5 L 39 14.5 C 39.5 13.5 41.5 13.5 42 14.5 L 45.5 20 C 47 18 48.5 11 50 8 C 51.5 11 53 18 54.5 20 L 58 14.5 C 58.5 13.5 60.5 13.5 61 14.5 L 57.5 22.5 C 55 24 45 24 42.5 22.5 Z"
          fill={`url(#${idPrefix}-gold-grad)`}
          stroke="#2c220a"
          strokeWidth="0.2"
        />
        {/* Five Spheres on top of the Peaks */}
        <circle cx="50" cy="8" r="1.3" fill={`url(#${idPrefix}-gold-grad)`} stroke="#111" strokeWidth="0.15" />
        <circle cx="42" cy="14.5" r="1.0" fill={`url(#${idPrefix}-gold-grad)`} stroke="#111" strokeWidth="0.15" />
        <circle cx="58" cy="14.5" r="1.0" fill={`url(#${idPrefix}-gold-grad)`} stroke="#111" strokeWidth="0.15" />
        <circle cx="39" cy="14.5" r="0.6" fill={`url(#${idPrefix}-gold-grad)`} />
        <circle cx="61" cy="14.5" r="0.6" fill={`url(#${idPrefix}-gold-grad)`} />

        {/* 2. DOUBLE CIRCULAR DIAL / CLOCK SHIELD */}
        {/* Outer Heavy Gold Rim */}
        <circle
          cx="50"
          cy="58"
          r="32"
          fill="none"
          stroke={`url(#${idPrefix}-gold-grad)`}
          strokeWidth="1.6"
        />
        {/* Outer Dark Gap Circle */}
        <circle
          cx="50"
          cy="58"
          r="31.2"
          fill={`url(#${idPrefix}-dark-mirror)`}
          stroke="#1a1a17"
          strokeWidth="0.4"
        />
        {/* Inner Gold Dial Frame */}
        <circle
          cx="50"
          cy="58"
          r="26.3"
          fill="none"
          stroke={`url(#${idPrefix}-gold-grad)`}
          strokeWidth="0.8"
        />

        {/* Roman Numeral Hour Marks (XIII at 12, III at 3, VI at 6, IX at 9) */}
        {/* XIII at top (Note: 12 is XIII in this unique logo design!) */}
        <text
          x="50"
          y="37.5"
          fill={`url(#${idPrefix}-gold-grad)`}
          fontSize="5.2"
          fontFamily="Cinzel, Georgia, serif"
          fontWeight="bold"
          textAnchor="middle"
          letterSpacing="0.1"
          style={{ textShadow: "0px 0.5px 1px rgba(0,0,0,0.8)" }}
        >
          XIII
        </text>

        {/* III on the right */}
        <text
          x="72.5"
          y="60"
          fill={`url(#${idPrefix}-gold-grad)`}
          fontSize="5.2"
          fontFamily="Cinzel, Georgia, serif"
          fontWeight="bold"
          textAnchor="middle"
          style={{ textShadow: "0px 0.5px 1px rgba(0,0,0,0.8)" }}
        >
          III
        </text>

        {/* VI at the bottom */}
        <text
          x="50"
          y="81"
          fill={`url(#${idPrefix}-gold-grad)`}
          fontSize="5.2"
          fontFamily="Cinzel, Georgia, serif"
          fontWeight="bold"
          textAnchor="middle"
          style={{ textShadow: "0px 0.5px 1px rgba(0,0,0,0.8)" }}
        >
          VI
        </text>

        {/* IX on the left */}
        <text
          x="27.5"
          y="60"
          fill={`url(#${idPrefix}-gold-grad)`}
          fontSize="5.2"
          fontFamily="Cinzel, Georgia, serif"
          fontWeight="bold"
          textAnchor="middle"
          style={{ textShadow: "0px 0.5px 1px rgba(0,0,0,0.8)" }}
        >
          IX
        </text>

        {/* Intermediate Tick Marks */}
        <line x1="39" y1="39" x2="41" y2="41" stroke={`url(#${idPrefix}-gold-grad)`} strokeWidth="0.6" />
        <line x1="61" y1="39" x2="59" y2="41" stroke={`url(#${idPrefix}-gold-grad)`} strokeWidth="0.6" />
        <line x1="61" y1="77" x2="59" y2="75" stroke={`url(#${idPrefix}-gold-grad)`} strokeWidth="0.6" />
        <line x1="39" y1="77" x2="41" y2="75" stroke={`url(#${idPrefix}-gold-grad)`} strokeWidth="0.6" />

        {/* 3. DYNAMIC WORLD MAP GLOBE IN THE CENTER */}
        <g id="globe-graphics">
          {/* Globe Base Sphere Shadow */}
          <circle cx="50" cy="58" r="21" fill="#0c0c0b" />
          
          {/* Subtle grid lines */}
          <ellipse cx="50" cy="58" rx="21" ry="8" stroke="#332a15" strokeWidth="0.2" fill="none" />
          <ellipse cx="50" cy="58" rx="8" ry="21" stroke="#332a15" strokeWidth="0.2" fill="none" />
          <ellipse cx="50" cy="58" rx="16" ry="21" stroke="#252011" strokeWidth="0.15" fill="none" />
          <line x1="29" y1="58" x2="71" y2="58" stroke="#332a15" strokeWidth="0.2" />

          {/* High-fidelity Vector representation of the continents in gold (focusing on the Americas/Atlantic as pictured) */}
          <g fill={`url(#${idPrefix}-land-gold)`}>
            {/* North America */}
            <path d="M 33 42 C 32 43, 34 45, 36 44 C 38 43, 40 40, 43 40 C 46 40, 48 37, 51 38 C 53 39, 53 41, 55 42 C 57 43, 58 45, 59 43 C 58 40, 56 38, 55 36 C 54 34, 52 35, 49 35 C 47 34, 46 32, 49 30 C 51 28, 55 31, 57 29 C 55 27, 48 29, 44 29 C 40 29, 39 31, 35 33 C 32 35, 29 37, 31 39 Z" opacity="0.95" />
            <path d="M 52 30 C 54 28, 58 29, 59 31 C 60 33, 56 34, 55 32 Z" /> {/* Greenland */}
            
            {/* Caribbean & Central America */}
            <path d="M 43 45 C 44 47, 45 49, 48 48 C 50 47, 51 45, 53 47 Z" />
            
            {/* South America */}
            <path d="M 48 49 C 51 51, 54 52, 57 53 C 60 54, 62 56, 61 59 C 60 62, 57 65, 55 68 C 53 71, 51 76, 49 78 C 48 77, 48 74, 47 70 C 46 66, 43 61, 42 58 C 41 55, 43 51, 46 50 Z" opacity="0.95" />

            {/* West Africa portion visible on right */}
            <path d="M 68 47 C 69 49, 71 52, 71 55 C 70 58, 68 62, 69 64 C 70 65, 71 63, 71 60 C 71 56, 70 53, 69 49 Z" opacity="0.6" />
            
            {/* Elegant connection lines between London/Europe & Americas */}
            <path d="M 58 36 Q 48 42 43 45" stroke="#fcf3cf" strokeWidth="0.15" strokeDasharray="0.5 0.5" fill="none" className="opacity-40" />
            <path d="M 59 31 Q 50 38 57 53" stroke="#fcf3cf" strokeWidth="0.15" strokeDasharray="0.5 0.5" fill="none" className="opacity-40" />
          </g>

          {/* Golden highlight gradient on the globe edge */}
          <circle cx="50" cy="58" r="21" fill="none" stroke={`url(#${idPrefix}-stroke-gold)`} strokeWidth="0.3" className="opacity-45" />
        </g>
      </svg>

      {/* 4. BRAND NAME & SUBTITLE */}
      {showText && (
        <div className="mt-3" id={`${idPrefix}_lettering`}>
          <h1
            className={`font-serif tracking-[0.22em] uppercase leading-tight font-extrabold text-transparent bg-clip-text bg-gradient-to-r ${
              lightText 
                ? "from-stone-200 via-amber-100 to-stone-300" 
                : "from-amber-600 via-yellow-400 to-amber-700 hover:from-yellow-400 hover:to-amber-500"
            } ${currentSize.text} transition-all duration-300`}
            style={{ textShadow: "0px 1px 3px rgba(0,0,0,0.6)" }}
          >
            KYLYVNYK
          </h1>
          
          {/* Double Lines and Club subtitle */}
          <div className="flex items-center justify-center gap-1.5 mt-1 sm:mt-1.5 opacity-80">
            <div className="h-[1px] w-6 sm:w-10 bg-gradient-to-r from-transparent to-[#d4af37]" />
            <span
              className={`font-sans tracking-[0.34em] uppercase text-stone-300 font-bold block ${currentSize.sub}`}
            >
              BUSINESS CLUB
            </span>
            <div className="h-[1px] w-6 sm:w-10 bg-gradient-to-l from-transparent to-[#d4af37]" />
          </div>
        </div>
      )}
    </div>
  );
};

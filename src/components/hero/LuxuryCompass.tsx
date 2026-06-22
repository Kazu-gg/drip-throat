"use client";

/** Fashion-house compass — static frame + 60s rotating concentric rings */
export function LuxuryCompass({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 420 420"
      fill="none"
      className={`pointer-events-none select-none ${className}`}
      aria-hidden
    >
      <defs>
        <linearGradient id="compass-gold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E2C663" />
          <stop offset="50%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#B8962E" />
        </linearGradient>
      </defs>

      {/* Fixed outer frame */}
      <circle
        cx="210"
        cy="210"
        r="198"
        stroke="url(#compass-gold)"
        strokeWidth="0.35"
        opacity="0.12"
      />
      <circle cx="210" cy="210" r="188" stroke="#D4AF37" strokeWidth="0.25" opacity="0.08" />

      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
        <line
          key={`tick-${deg}`}
          x1="210"
          y1="18"
          x2="210"
          y2="32"
          stroke="#D4AF37"
          strokeWidth="0.5"
          opacity="0.15"
          transform={`rotate(${deg} 210 210)`}
        />
      ))}

      <text
        x="210"
        y="48"
        textAnchor="middle"
        fill="#D4AF37"
        opacity="0.2"
        fontSize="9"
        letterSpacing="0.35em"
        fontFamily="serif"
      >
        N
      </text>

      {/* Rotating structure — 60s, opacity 0.08 */}
      <g
        className="luxury-compass-spin origin-center"
        style={{ transformBox: "fill-box", transformOrigin: "center" }}
        opacity="0.08"
      >
        <circle cx="210" cy="210" r="165" stroke="url(#compass-gold)" strokeWidth="0.4" />
        <circle cx="210" cy="210" r="140" stroke="#D4AF37" strokeWidth="0.3" strokeDasharray="2 8" />
        <circle cx="210" cy="210" r="115" stroke="#D4AF37" strokeWidth="0.25" />
        <circle cx="210" cy="210" r="90" stroke="#D4AF37" strokeWidth="0.2" strokeDasharray="1 6" />

        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
          <line
            key={`inner-${deg}`}
            x1="210"
            y1="45"
            x2="210"
            y2="58"
            stroke="#D4AF37"
            strokeWidth="0.35"
            transform={`rotate(${deg} 210 210)`}
          />
        ))}

        {/* Compass rose */}
        <path
          d="M210 75 L218 210 L210 195 L202 210 Z M210 345 L218 210 L210 225 L202 210 Z M75 210 L210 218 L195 210 L210 202 Z M345 210 L210 218 L225 210 L210 202 Z"
          fill="#D4AF37"
          fillOpacity="0.35"
          stroke="#D4AF37"
          strokeWidth="0.3"
        />
        <circle cx="210" cy="210" r="6" fill="#D4AF37" fillOpacity="0.5" />
      </g>

      {/* Inner static crosshair */}
      <path d="M210 120v180M120 210h180" stroke="#D4AF37" strokeWidth="0.2" opacity="0.06" />
    </svg>
  );
}

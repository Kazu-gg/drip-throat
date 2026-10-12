type HeroOrnamentProps = {
  className?: string;
};

/** Subtle gold frame behind hero wordmark */
export function HeroOrnament({ className = "h-48 w-48 sm:h-64 sm:w-64" }: HeroOrnamentProps) {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      className={className}
      aria-hidden
    >
      <circle cx="100" cy="100" r="88" stroke="#A8B38A" strokeWidth="0.5" opacity="0.2" />
      <circle cx="100" cy="100" r="72" stroke="#A8B38A" strokeWidth="0.5" opacity="0.12" />
      <path
        d="M100 18v12M100 170v12M18 100h12M170 100h12"
        stroke="#A8B38A"
        strokeWidth="0.75"
        opacity="0.25"
      />
      <path
        d="M40 40l8 8M152 40l-8 8M40 160l8-8M152 160l-8-8"
        stroke="#A8B38A"
        strokeWidth="0.75"
        opacity="0.2"
      />
      <path
        d="M70 100h60M100 70v60"
        stroke="#A8B38A"
        strokeWidth="0.35"
        opacity="0.15"
      />
      <path
        d="M100 52l6 10-6 4-6-4 6-10z"
        fill="#A8B38A"
        fillOpacity="0.08"
        stroke="#A8B38A"
        strokeWidth="0.5"
        strokeOpacity="0.3"
      />
    </svg>
  );
}

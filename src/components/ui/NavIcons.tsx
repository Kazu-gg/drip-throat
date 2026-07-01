type NavIconProps = {
  className?: string;
  filled?: boolean;
};

const defaultClass = "h-[18px] w-[18px] shrink-0";

const stroke = {
  fill: "none" as const,
  stroke: "currentColor",
  strokeWidth: 1.25,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  vectorEffect: "non-scaling-stroke" as const,
};

const heartPath =
  "M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5";

export function NavIconSearch({ className = defaultClass }: NavIconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path d="m21 21-4.34-4.34" {...stroke} />
      <circle cx="11" cy="11" r="8" {...stroke} />
    </svg>
  );
}

export function NavIconUser({ className = defaultClass }: NavIconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" {...stroke} />
      <circle cx="12" cy="7" r="4" {...stroke} />
    </svg>
  );
}

export function NavIconHeart({ className = defaultClass, filled = false }: NavIconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        d={heartPath}
        fill={filled ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth={filled ? 0 : 2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function NavIconBag({ className = defaultClass }: NavIconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path d="M16 10a4 4 0 0 1-8 0" {...stroke} />
      <path d="M3.103 6.034h17.794" {...stroke} />
      <path
        d="M3.4 5.467a2 2 0 0 0-.4 1.2V20a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6.667a2 2 0 0 0-.4-1.2l-2-2.667A2 2 0 0 0 17 2H7a2 2 0 0 0-1.6.8z"
        {...stroke}
      />
    </svg>
  );
}

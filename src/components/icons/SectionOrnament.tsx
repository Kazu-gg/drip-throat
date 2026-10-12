type SectionOrnamentProps = {
  className?: string;
};

/** Gold divider with center diamond motif */
export function SectionOrnament({ className = "mx-auto mt-6 w-48" }: SectionOrnamentProps) {
  return (
    <svg viewBox="0 0 192 12" fill="none" className={className} aria-hidden>
      <path d="M0 6h76" stroke="#A8B38A" strokeWidth="1" opacity="0.15" />
      <path d="M116 6h76" stroke="#A8B38A" strokeWidth="1" opacity="0.15" />
      <path d="M80 6h32" stroke="#A8B38A" strokeWidth="1" opacity="0.45" />
      <path
        d="M96 2l4 4-4 4-4-4 4-4z"
        stroke="#A8B38A"
        strokeWidth="0.75"
        fill="#A8B38A"
        fillOpacity="0.12"
      />
    </svg>
  );
}

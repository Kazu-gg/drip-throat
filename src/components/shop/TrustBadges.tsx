"use client";

const DEFAULT_BADGES = [
  { id: "secure", label: "Secure Payment" },
  { id: "quality", label: "Quality Product" },
  { id: "oversized", label: "Oversized Fit" },
  { id: "exchange", label: "Easy Exchange" },
] as const;

type TrustBadgesProps = {
  showOversized?: boolean;
  className?: string;
};

export function TrustBadges({
  showOversized = true,
  className = "",
}: TrustBadgesProps) {
  const badges = DEFAULT_BADGES.filter(
    (b) => showOversized || b.id !== "oversized"
  );

  return (
    <ul
      className={`grid grid-cols-2 gap-2 sm:grid-cols-4 ${className}`}
      data-testid="product_trust_badges"
    >
      {badges.map((badge) => (
        <li
          key={badge.id}
          className="flex items-center gap-2 border border-[var(--border-subtle)] px-3 py-2.5 font-body text-[10px] tracking-[0.14em] text-[var(--campaign-text)]/70 uppercase"
          data-testid={`product_trust_${badge.id}_badge`}
        >
          <span className="text-gold" aria-hidden>
            ✓
          </span>
          {badge.label}
        </li>
      ))}
    </ul>
  );
}

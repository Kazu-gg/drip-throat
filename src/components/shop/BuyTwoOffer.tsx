"use client";

import type { BuyTwoProgress } from "@/lib/cart-pricing";
import { formatInr } from "@/lib/commerce-config";

type BuyTwoOfferProps = {
  progress: BuyTwoProgress;
  className?: string;
};

export function BuyTwoOffer({ progress, className = "" }: BuyTwoOfferProps) {
  if (!progress.enabled) return null;

  const pct = Math.min(
    (progress.eligibleQuantity / progress.requiredQuantity) * 100,
    100
  );

  return (
    <div
      className={`border border-gold/30 bg-gold/5 px-4 py-3 ${className}`}
      data-testid="buy_two_offer"
      role="status"
      aria-live="polite"
    >
      <p className="font-body text-[11px] tracking-[0.28em] text-gold uppercase">
        {progress.title}
      </p>
      <p className="mt-1 font-body text-sm text-[var(--campaign-text)]/80">
        {progress.subtitle}
      </p>
      <p className="mt-2 font-body text-xs text-[var(--campaign-text)]/55">
        {progress.message}
      </p>
      <div
        className="mt-3 h-1 w-full overflow-hidden bg-[var(--campaign-text)]/10"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(pct)}
        aria-label="Buy 2 offer progress"
        data-testid="buy_two_progress_bar"
      >
        <div className="h-full bg-gold transition-[width] duration-300" style={{ width: `${pct}%` }} />
      </div>
      {progress.unlocked ? (
        <p className="mt-2 font-body text-xs text-gold" data-testid="buy_two_savings">
          Saving {formatInr(progress.discount)}
        </p>
      ) : null}
    </div>
  );
}

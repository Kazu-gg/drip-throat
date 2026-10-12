"use client";

import { formatInr } from "@/lib/commerce-config";
import type { FreeShippingProgress } from "@/lib/cart-pricing";

type FreeShippingProgressBarProps = {
  progress: FreeShippingProgress;
  className?: string;
  compact?: boolean;
};

export function FreeShippingProgressBar({
  progress,
  className = "",
  compact = false,
}: FreeShippingProgressBarProps) {
  const { unlocked, empty, message, progressPercent, threshold } = progress;

  return (
    <div
      className={`free-ship-progress ${className}`}
      data-testid="free_shipping_progress"
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      <p
        className={`font-body ${
          compact ? "text-[11px]" : "text-xs sm:text-sm"
        } tracking-wide ${
          unlocked
            ? "text-gold"
            : "text-[var(--campaign-text)]/70"
        }`}
        data-testid="free_shipping_message"
      >
        {message}
      </p>
      {!empty && threshold > 0 ? (
        <div
          className="mt-2 h-1.5 w-full overflow-hidden bg-[var(--campaign-text)]/10"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(progressPercent)}
          aria-label={`Free delivery progress ${Math.round(progressPercent)} percent`}
          data-testid="free_shipping_bar"
        >
          <div
            className="h-full bg-gold transition-[width] duration-300 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      ) : null}
      {!empty && !unlocked && threshold > 0 ? (
        <p className="mt-1.5 font-body text-[10px] tracking-[0.2em] text-[var(--campaign-text)]/35 uppercase">
          Free above {formatInr(threshold)}
        </p>
      ) : null}
    </div>
  );
}

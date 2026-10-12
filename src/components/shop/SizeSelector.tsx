"use client";

type SizeSelectorProps = {
  sizes: string[];
  value: string | null;
  onChange: (size: string) => void;
  stockBySize?: Record<string, number>;
  disabled?: boolean;
  error?: string | null;
  testIdPrefix?: string;
};

export function SizeSelector({
  sizes,
  value,
  onChange,
  stockBySize,
  disabled = false,
  error = null,
  testIdPrefix = "product",
}: SizeSelectorProps) {
  return (
    <div data-testid={`${testIdPrefix}_size_selector`}>
      <div className="flex items-center justify-between">
        <p className="shop-filter-heading" id={`${testIdPrefix}-size-label`}>
          Size
        </p>
        {value ? (
          <span className="font-body text-[10px] tracking-[0.2em] text-[var(--campaign-text)]/40 uppercase">
            Selected: {value}
          </span>
        ) : (
          <span className="font-body text-[10px] tracking-[0.2em] text-gold/80 uppercase">
            Select a size
          </span>
        )}
      </div>
      <div
        className="mt-3 flex flex-wrap gap-2"
        role="group"
        aria-labelledby={`${testIdPrefix}-size-label`}
      >
        {sizes.map((size) => {
          const stock = stockBySize?.[size];
          const outOfStock = typeof stock === "number" && stock <= 0;
          const isActive = value === size;
          return (
            <button
              key={size}
              type="button"
              disabled={disabled || outOfStock}
              onClick={() => onChange(size)}
              data-testid={`${testIdPrefix}_size_${size.toLowerCase().replace(/\s+/g, "_")}_button`}
              className={`shop-size-btn min-h-11 min-w-11 ${isActive ? "is-active" : ""} ${
                outOfStock ? "opacity-35 line-through" : ""
              }`}
              aria-pressed={isActive}
              aria-disabled={outOfStock}
            >
              {size}
            </button>
          );
        })}
      </div>
      {error ? (
        <p
          className="mt-2 font-body text-xs text-red-400"
          role="alert"
          data-testid={`${testIdPrefix}_size_error`}
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}

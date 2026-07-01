"use client";

import type { ShopFilters } from "@/lib/shop";
import { FILTER_COLORS, FILTER_MATERIALS, FILTER_OCCASIONS } from "@/lib/shop";
import { collections, type Collection, type MainCategoryId } from "@/lib/categories";

type FilterSidebarProps = {
  filters: ShopFilters;
  onChange: (next: Partial<ShopFilters>) => void;
  maxPrice: number;
  parentId?: MainCategoryId;
  filterCategories?: Collection[];
  availableColors?: string[];
  availableMaterials?: string[];
};

export function FilterSidebar({
  filters,
  onChange,
  maxPrice,
  parentId,
  filterCategories,
  availableColors,
  availableMaterials,
}: FilterSidebarProps) {
  const categories =
    filterCategories ??
    (parentId
      ? collections.filter((c) => c.parentId === parentId)
      : collections.slice(0, 8));

  const colorOptions = availableColors?.length
    ? availableColors
    : FILTER_COLORS.map((c) => c.id);
  const materialOptions = availableMaterials?.length
    ? availableMaterials
    : [...FILTER_MATERIALS];
  const useColorSwatches = !availableColors?.length;

  return (
    <aside className="shop-filter-sidebar space-y-8" aria-label="Filters">
      <div>
        <h3 className="shop-filter-heading">Category</h3>
        <ul className="mt-3 space-y-2">
          <li>
            <button
              type="button"
              onClick={() => onChange({ category: undefined })}
              className={`shop-filter-link ${!filters.category ? "is-active" : ""}`}
            >
              All
            </button>
          </li>
          {categories.map((c) => (
            <li key={c.id}>
              <button
                type="button"
                onClick={() => onChange({ category: c.id })}
                className={`shop-filter-link ${filters.category === c.id ? "is-active" : ""}`}
              >
                {c.name}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="shop-filter-heading">Color</h3>
        {useColorSwatches ? (
          <div className="mt-3 flex flex-wrap gap-2">
            {FILTER_COLORS.map((c) => {
              const active = filters.colors.includes(c.id);
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() =>
                    onChange({
                      colors: active
                        ? filters.colors.filter((x) => x !== c.id)
                        : [...filters.colors, c.id],
                    })
                  }
                  className={`h-7 w-7 rounded-full border-2 transition-transform ${
                    active ? "scale-110 border-gold" : "border-transparent"
                  }`}
                  style={{ backgroundColor: c.hex }}
                  aria-label={c.label}
                  aria-pressed={active}
                />
              );
            })}
          </div>
        ) : (
          <ul className="mt-3 space-y-2">
            {colorOptions.map((c) => (
              <li key={c}>
                <label className="flex cursor-pointer items-center gap-2 font-body text-xs text-[var(--campaign-text)]/60 capitalize">
                  <input
                    type="checkbox"
                    checked={filters.colors.includes(c)}
                    onChange={() =>
                      onChange({
                        colors: filters.colors.includes(c)
                          ? filters.colors.filter((x) => x !== c)
                          : [...filters.colors, c],
                      })
                    }
                    className="accent-[var(--gold)]"
                  />
                  {c}
                </label>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div>
        <h3 className="shop-filter-heading">Material</h3>
        <ul className="mt-3 space-y-2">
          {materialOptions.map((m) => (
            <li key={m}>
              <label className="flex cursor-pointer items-center gap-2 font-body text-xs text-[var(--campaign-text)]/60">
                <input
                  type="checkbox"
                  checked={filters.materials.includes(m)}
                  onChange={() =>
                    onChange({
                      materials: filters.materials.includes(m)
                        ? filters.materials.filter((x) => x !== m)
                        : [...filters.materials, m],
                    })
                  }
                  className="accent-[var(--gold)]"
                />
                {m}
              </label>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="shop-filter-heading">Occasion</h3>
        <ul className="mt-3 space-y-2">
          {FILTER_OCCASIONS.map((o) => (
            <li key={o}>
              <label className="flex cursor-pointer items-center gap-2 font-body text-xs text-[var(--campaign-text)]/60">
                <input
                  type="checkbox"
                  checked={filters.occasions.includes(o)}
                  onChange={() =>
                    onChange({
                      occasions: filters.occasions.includes(o)
                        ? filters.occasions.filter((x) => x !== o)
                        : [...filters.occasions, o],
                    })
                  }
                  className="accent-[var(--gold)]"
                />
                {o}
              </label>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

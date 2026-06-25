"use client";

import { useMemo, useState } from "react";
import { products } from "@/lib/products";
import { parseMainCategoryId, type MainCategoryId } from "@/lib/categories";
import type { CategoryLandingId } from "@/lib/category-landing";
import { getLandingFilterCategories } from "@/lib/category-landing";
import {
  DEFAULT_FILTERS,
  filterProducts,
  type ShopFilters,
} from "@/lib/shop";
import { FilterSidebar } from "@/components/shop/FilterSidebar";
import { ProductCard } from "@/components/shop/ProductCard";

type ShopCatalogProps = {
  title: string;
  subtitle?: string;
  initialParent?: string;
  initialCategory?: string;
  parentId?: MainCategoryId;
  landingId?: CategoryLandingId;
  productCollectionIds?: string[];
};

const MAX_PRICE = 50000;

export function ShopCatalog({
  title,
  subtitle,
  initialParent,
  initialCategory,
  parentId,
  landingId,
  productCollectionIds,
}: ShopCatalogProps) {
  const [filters, setFilters] = useState<ShopFilters>({
    ...DEFAULT_FILTERS,
    parent: initialParent ? parseMainCategoryId(initialParent) : undefined,
    category: initialCategory,
    collectionIds: productCollectionIds,
    maxPrice: MAX_PRICE,
  });
  const [mobileFilters, setMobileFilters] = useState(false);

  const filtered = useMemo(() => filterProducts(products, filters), [filters]);

  const update = (next: Partial<ShopFilters>) =>
    setFilters((f) => ({ ...f, ...next }));

  const filterCategories = landingId
    ? getLandingFilterCategories(landingId)
    : undefined;

  return (
    <div className="mx-auto max-w-7xl section-padding !pt-8">
      <header className="mb-10 border-b border-[var(--border-subtle)] pb-8">
        <p className="font-body text-[10px] tracking-[0.4em] text-gold uppercase">Shop</p>
        <h1 className="mt-2 font-display text-3xl font-light tracking-wide text-[var(--campaign-text)] sm:text-4xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-3 max-w-2xl font-body text-sm text-[var(--campaign-text)]/50">
            {subtitle}
          </p>
        )}
      </header>

      <div className="mb-6 flex items-center justify-between gap-4">
        <p className="font-body text-xs text-[var(--campaign-text)]/45">
          {filtered.length} {filtered.length === 1 ? "piece" : "pieces"}
        </p>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setMobileFilters(true)}
            className="shop-btn-outline px-4 py-2 font-body text-[10px] tracking-[0.2em] uppercase lg:hidden"
          >
            Filters
          </button>
          <select
            value={filters.sort}
            onChange={(e) =>
              update({ sort: e.target.value as ShopFilters["sort"] })
            }
            className="border border-[var(--border-subtle)] bg-[var(--surface)] px-3 py-2 font-body text-[10px] tracking-[0.15em] text-[var(--campaign-text)] uppercase"
            aria-label="Sort products"
          >
            <option value="newest">Newest</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>
      </div>

      <div className="grid gap-10 lg:grid-cols-[240px_1fr]">
        <div className="hidden lg:block">
          <FilterSidebar
            filters={filters}
            onChange={update}
            maxPrice={MAX_PRICE}
            parentId={parentId ?? filters.parent}
            filterCategories={filterCategories}
          />
        </div>

        {mobileFilters && (
          <div className="fixed inset-0 z-50 bg-black/60 lg:hidden" role="dialog">
            <div className="absolute inset-y-0 left-0 w-[min(100%,320px)] overflow-y-auto bg-[var(--campaign-bg)] p-6">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="font-body text-xs tracking-[0.3em] uppercase">Filters</h2>
                <button type="button" onClick={() => setMobileFilters(false)} aria-label="Close">
                  ✕
                </button>
              </div>
              <FilterSidebar
                filters={filters}
                onChange={update}
                maxPrice={MAX_PRICE}
                parentId={parentId ?? filters.parent}
              />
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 xl:grid-cols-4">
          {filtered.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}

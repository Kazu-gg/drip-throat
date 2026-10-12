"use client";

import { useEffect, useMemo, useState } from "react";
import { parseMainCategoryId, type MainCategoryId } from "@/lib/categories";
import type { CategoryLandingId } from "@/lib/category-landing";
import { getLandingFilterCategories } from "@/lib/category-landing";
import type { Product } from "@/lib/products";
import {
  DEFAULT_FILTERS,
  filterProducts,
  getFilterOptionsFromProducts,
  type ShopFilters,
} from "@/lib/shop";
import { dbProductsToProducts } from "@/lib/supabase/mappers/product";
import { fetchAllProducts } from "@/lib/supabase/queries/products";
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
  initialProducts?: Product[];
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
  initialProducts,
}: ShopCatalogProps) {
  const [products, setProducts] = useState<Product[]>(initialProducts ?? []);
  const [loading, setLoading] = useState(!initialProducts);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<ShopFilters>({
    ...DEFAULT_FILTERS,
    parent: initialParent ? parseMainCategoryId(initialParent) : undefined,
    category: initialCategory,
    collectionIds: productCollectionIds,
    maxPrice: MAX_PRICE,
  });
  const [mobileFilters, setMobileFilters] = useState(false);

  useEffect(() => {
    if (initialProducts) return;

    let cancelled = false;
    setLoading(true);
    setError(null);

    fetchAllProducts()
      .then((dbProducts) => {
        if (cancelled) return;
        setProducts(dbProductsToProducts(dbProducts));
        setLoading(false);
      })
      .catch((err) => {
        if (cancelled) return;
        console.error("[ShopCatalog] fetch failed:", err);
        setError("Failed to load products. Please refresh.");
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [initialProducts]);

  const filtered = useMemo(
    () => filterProducts(products, filters),
    [products, filters]
  );

  const { colors: availableColors, materials: availableMaterials } = useMemo(
    () => getFilterOptionsFromProducts(products),
    [products]
  );

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
        <label className="mt-6 block max-w-md">
          <span className="sr-only">Search products</span>
          <input
            type="search"
            value={filters.search}
            onChange={(e) => update({ search: e.target.value })}
            placeholder="Search name, category, keywords…"
            data-testid="shop_search_input"
            className="w-full border border-[var(--border-subtle)] bg-[var(--surface)] px-4 py-3 font-body text-sm text-[var(--campaign-text)] placeholder:text-[var(--campaign-text)]/35 focus:border-gold/40 focus:outline-none"
          />
        </label>
      </header>

      <div className="mb-6 flex items-center justify-between gap-4">
        <p className="font-body text-xs text-[var(--campaign-text)]/45">
          {loading ? "Loading…" : `${filtered.length} ${filtered.length === 1 ? "piece" : "pieces"}`}
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
            disabled={loading}
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
            availableColors={availableColors}
            availableMaterials={availableMaterials}
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
                filterCategories={filterCategories}
                availableColors={availableColors}
                availableMaterials={availableMaterials}
              />
            </div>
          </div>
        )}

        {loading && (
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 xl:grid-cols-4 lg:col-start-2">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="aspect-[3/4] animate-pulse rounded-sm bg-[var(--surface)]"
              />
            ))}
          </div>
        )}

        {error && !loading && (
          <div className="py-16 text-center font-body text-sm text-[var(--campaign-text)]/50 lg:col-start-2">
            <p>{error}</p>
            <button
              type="button"
              className="shop-btn-outline mt-6 px-6 py-2 font-body text-[10px] tracking-[0.2em] uppercase"
              onClick={() => window.location.reload()}
            >
              Retry
            </button>
          </div>
        )}

        {!loading && !error && filtered.length === 0 && (
          <div className="py-16 text-center font-body text-sm text-[var(--campaign-text)]/50 lg:col-start-2">
            <p>No products match your filters.</p>
            <button
              type="button"
              className="shop-btn-outline mt-6 px-6 py-2 font-body text-[10px] tracking-[0.2em] uppercase"
              onClick={() =>
                setFilters({
                  ...DEFAULT_FILTERS,
                  maxPrice: MAX_PRICE,
                  collectionIds: productCollectionIds,
                })
              }
            >
              Clear filters
            </button>
          </div>
        )}

        {!loading && !error && filtered.length > 0 && (
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 xl:grid-cols-4 lg:col-start-2">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

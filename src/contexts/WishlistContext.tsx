"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { createClient } from "@/lib/supabase/client";
import { toSlug } from "@/lib/supabase/queries/products";
import { getProductBySlug, type Product } from "@/lib/products";

type WishlistContextValue = {
  slugs: string[];
  wishlistProducts: Product[];
  toggle: (slug: string, productId?: string) => void;
  has: (slug: string) => boolean;
  loading: boolean;
  productsLoading: boolean;
  resolveProduct: (slug: string) => Product | undefined;
};

const WishlistContext = createContext<WishlistContextValue | null>(null);
const STORAGE_KEY = "dripthroat-wishlist";

type WishlistProductRow = {
  id: string;
  name: string;
  sku: string | null;
};

function slugFromProduct(p: WishlistProductRow): string {
  return p.sku ? toSlug(p.sku) : toSlug(p.name);
}

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [slugs, setSlugs] = useState<string[]>([]);
  const [slugToId, setSlugToId] = useState<Record<string, string>>({});
  const [productCache, setProductCache] = useState<Record<string, Product>>({});
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();
    if (!supabase) {
      setLoading(false);
      return;
    }

    void supabase.auth.getSession().then(({ data }) => {
      setUserId(data.session?.user.id ?? null);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUserId(session?.user.id ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (userId) {
      const supabase = createClient();
      if (!supabase) {
        setLoading(false);
        return;
      }

      setLoading(true);
      void supabase
        .from("wishlists")
        .select("product_id, products(id, name, sku)")
        .eq("user_id", userId)
        .eq("item_type", "product")
        .then(({ data, error }) => {
          if (error) {
            console.error("[Wishlist] fetch failed:", error);
            setLoading(false);
            return;
          }

          const loadedSlugs: string[] = [];
          const map: Record<string, string> = {};

          for (const row of data ?? []) {
            const raw = row.products as WishlistProductRow | WishlistProductRow[] | null;
            const p = Array.isArray(raw) ? raw[0] : raw;
            if (!p?.id) continue;

            const slug = slugFromProduct(p);
            loadedSlugs.push(slug);
            map[slug] = p.id;
          }

          setSlugs(loadedSlugs);
          setSlugToId(map);
          setLoading(false);
        });
    } else {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) setSlugs(JSON.parse(raw) as string[]);
      } catch {
        /* ignore */
      }
      setSlugToId({});
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    if (!userId) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(slugs));
    }
  }, [slugs, userId]);

  useEffect(() => {
    const uncached = slugs.filter((slug) => !productCache[slug]);
    if (!uncached.length) return;

    let cancelled = false;

    void import("@/lib/supabase/queries/products").then(({ fetchProductBySlug }) =>
      import("@/lib/supabase/mappers/product").then(({ dbProductToProduct }) => {
        Promise.all(uncached.map((slug) => fetchProductBySlug(slug))).then((results) => {
          if (cancelled) return;

          const entries: Record<string, Product> = {};
          results.forEach((db, i) => {
            if (db) entries[uncached[i]] = dbProductToProduct(db);
          });

          if (Object.keys(entries).length) {
            setProductCache((prev) => ({ ...prev, ...entries }));
          }
        });
      })
    );

    return () => {
      cancelled = true;
    };
  }, [slugs, productCache]);

  const toggle = useCallback(
    async (slug: string, productId?: string) => {
      const isWishlisted = slugs.includes(slug);

      setSlugs((prev) =>
        isWishlisted ? prev.filter((s) => s !== slug) : [...prev, slug]
      );

      const supabase = createClient();
      if (!userId || !supabase) return;

      let id = productId ?? slugToId[slug];

      if (!id) {
        const { fetchProductBySlug } = await import("@/lib/supabase/queries/products");
        const db = await fetchProductBySlug(slug);
        if (!db) return;
        id = db.id;
        setSlugToId((prev) => ({ ...prev, [slug]: id! }));
      }

      if (isWishlisted) {
        const { error } = await supabase
          .from("wishlists")
          .delete()
          .eq("user_id", userId)
          .eq("product_id", id)
          .eq("item_type", "product");

        if (error) console.error("[Wishlist] delete failed:", error);
      } else {
        const { error } = await supabase.from("wishlists").insert({
          user_id: userId,
          product_id: id,
          item_type: "product",
        });

        if (error) {
          console.error("[Wishlist] insert failed:", error);
          setSlugs((prev) => prev.filter((s) => s !== slug));
        }
      }
    },
    [slugs, userId, slugToId]
  );

  const has = useCallback((slug: string) => slugs.includes(slug), [slugs]);

  const resolveProduct = useCallback(
    (slug: string) => productCache[slug] ?? getProductBySlug(slug),
    [productCache]
  );

  const wishlistProducts = useMemo(
    () =>
      slugs
        .map((slug) => resolveProduct(slug))
        .filter((product): product is Product => !!product),
    [slugs, resolveProduct]
  );

  const productsLoading = useMemo(
    () =>
      slugs.length > 0 &&
      slugs.some((slug) => !productCache[slug] && !getProductBySlug(slug)),
    [slugs, productCache]
  );

  const value = useMemo(
    () => ({
      slugs,
      wishlistProducts,
      toggle,
      has,
      loading,
      productsLoading,
      resolveProduct,
    }),
    [slugs, wishlistProducts, toggle, has, loading, productsLoading, resolveProduct]
  );

  return (
    <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
}

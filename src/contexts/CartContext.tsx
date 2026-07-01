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
import { getProductBySlug, type Product } from "@/lib/products";

import { calculatePlatformFee } from "@/lib/platform-fees";

export type CartLine = {
  slug: string;
  quantity: number;
  size?: string;
  color?: string;
};

type CartContextValue = {
  lines: CartLine[];
  count: number;
  platformFee: number;
  /** @deprecated Use platformFee — product prices are not charged */
  subtotal: number;
  addItem: (slug: string, opts?: { size?: string; color?: string }) => void;
  removeItem: (slug: string) => void;
  setQuantity: (slug: string, quantity: number) => void;
  clear: () => void;
  resolveProduct: (slug: string) => Product | undefined;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "chevelle-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [productCache, setProductCache] = useState<Record<string, Product>>({});

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setLines(JSON.parse(raw) as CartLine[]);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  }, [lines]);

  useEffect(() => {
    const uncached = lines.map((l) => l.slug).filter((s) => !productCache[s]);
    if (!uncached.length) return;

    import("@/lib/supabase/queries/products").then(({ fetchProductBySlug }) =>
      import("@/lib/supabase/mappers/product").then(({ dbProductToProduct }) => {
        Promise.all(uncached.map((slug) => fetchProductBySlug(slug))).then((results) => {
          const entries: Record<string, Product> = {};
          results.forEach((db, i) => {
            if (db) entries[uncached[i]] = dbProductToProduct(db);
          });
          setProductCache((prev) => ({ ...prev, ...entries }));
        });
      })
    );
  }, [lines]);

  const addItem = useCallback(
    (slug: string, opts?: { size?: string; color?: string }) => {
      setLines((prev) => {
        const existing = prev.find((l) => l.slug === slug);
        if (existing) {
          return prev.map((l) =>
            l.slug === slug ? { ...l, quantity: l.quantity + 1 } : l
          );
        }
        return [...prev, { slug, quantity: 1, ...opts }];
      });
    },
    []
  );

  const removeItem = useCallback((slug: string) => {
    setLines((prev) => prev.filter((l) => l.slug !== slug));
  }, []);

  const setQuantity = useCallback((slug: string, quantity: number) => {
    if (quantity < 1) {
      setLines((prev) => prev.filter((l) => l.slug !== slug));
      return;
    }
    setLines((prev) =>
      prev.map((l) => (l.slug === slug ? { ...l, quantity } : l))
    );
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const resolveProduct = useCallback(
    (slug: string) => productCache[slug] ?? getProductBySlug(slug),
    [productCache]
  );

  const count = useMemo(
    () => lines.reduce((sum, l) => sum + l.quantity, 0),
    [lines]
  );

  const platformFee = useMemo(() => calculatePlatformFee(count), [count]);

  const value = useMemo(
    () => ({
      lines,
      count,
      platformFee,
      subtotal: platformFee,
      addItem,
      removeItem,
      setQuantity,
      clear,
      resolveProduct,
    }),
    [lines, count, platformFee, addItem, removeItem, setQuantity, clear, resolveProduct]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

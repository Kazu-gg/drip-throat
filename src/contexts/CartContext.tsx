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

export type CartLine = {
  slug: string;
  quantity: number;
  size?: string;
  color?: string;
};

type CartContextValue = {
  lines: CartLine[];
  count: number;
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
    (slug: string) => getProductBySlug(slug),
    []
  );

  const count = useMemo(
    () => lines.reduce((sum, l) => sum + l.quantity, 0),
    [lines]
  );

  const subtotal = useMemo(
    () =>
      lines.reduce((sum, l) => {
        const p = getProductBySlug(l.slug);
        return sum + (p?.price ?? 0) * l.quantity;
      }, 0),
    [lines]
  );

  const value = useMemo(
    () => ({
      lines,
      count,
      subtotal,
      addItem,
      removeItem,
      setQuantity,
      clear,
      resolveProduct,
    }),
    [lines, count, subtotal, addItem, removeItem, setQuantity, clear, resolveProduct]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

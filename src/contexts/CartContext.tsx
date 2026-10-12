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
import { cartLineKey, type CartLine } from "@/lib/cart-types";
import {
  calculateCartTotals,
  type CartTotals,
} from "@/lib/cart-pricing";
import {
  getClientCommerceConfig,
  type CommerceConfig,
} from "@/lib/commerce-config";

export type { CartLine };

type CartContextValue = {
  lines: CartLine[];
  count: number;
  /** Merchandise subtotal after sale prices, before offers */
  merchandiseSubtotal: number;
  /** Final payable total after offers/coupons/shipping */
  total: number;
  totals: CartTotals;
  couponCode: string | null;
  setCouponCode: (code: string | null) => void;
  drawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  addItem: (
    slug: string,
    opts?: { size?: string; color?: string; quantity?: number; openDrawer?: boolean }
  ) => void;
  removeItem: (slug: string, opts?: { size?: string; color?: string }) => void;
  setQuantity: (
    slug: string,
    quantity: number,
    opts?: { size?: string; color?: string }
  ) => void;
  clear: () => void;
  resolveProduct: (slug: string) => Product | undefined;
  commerceConfig: CommerceConfig;
  refreshCommerceConfig: () => void;
  /** @deprecated Prefer totals.total — kept for gradual migration */
  platformFee: number;
  /** @deprecated Prefer merchandiseSubtotal / totals */
  subtotal: number;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "dripthroat-cart";
const COUPON_KEY = "dripthroat-coupon";

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [productCache, setProductCache] = useState<Record<string, Product>>({});
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [couponCode, setCouponCodeState] = useState<string | null>(null);
  const [commerceConfig, setCommerceConfig] = useState<CommerceConfig>(() =>
    getClientCommerceConfig()
  );

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setLines(JSON.parse(raw) as CartLine[]);
      const coupon = localStorage.getItem(COUPON_KEY);
      if (coupon) setCouponCodeState(coupon);
      setCommerceConfig(getClientCommerceConfig());
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  }, [lines]);

  useEffect(() => {
    if (couponCode) localStorage.setItem(COUPON_KEY, couponCode);
    else localStorage.removeItem(COUPON_KEY);
  }, [couponCode]);

  useEffect(() => {
    const uncached = lines.map((l) => l.slug).filter((s) => !productCache[s]);
    if (!uncached.length) return;

    import("@/lib/supabase/queries/products").then(({ fetchProductBySlug }) =>
      import("@/lib/supabase/mappers/product").then(({ dbProductToProduct }) => {
        Promise.all(uncached.map((slug) => fetchProductBySlug(slug))).then(
          (results) => {
            const entries: Record<string, Product> = {};
            results.forEach((db, i) => {
              if (db) entries[uncached[i]] = dbProductToProduct(db);
            });
            setProductCache((prev) => ({ ...prev, ...entries }));
          }
        );
      })
    );
  }, [lines, productCache]);

  const refreshCommerceConfig = useCallback(() => {
    setCommerceConfig(getClientCommerceConfig());
  }, []);

  const setCouponCode = useCallback((code: string | null) => {
    setCouponCodeState(code ? code.trim().toUpperCase() : null);
  }, []);

  const openDrawer = useCallback(() => setDrawerOpen(true), []);
  const closeDrawer = useCallback(() => setDrawerOpen(false), []);

  const addItem = useCallback(
    (
      slug: string,
      opts?: {
        size?: string;
        color?: string;
        quantity?: number;
        openDrawer?: boolean;
      }
    ) => {
      const qty = opts?.quantity ?? 1;
      const nextLine: CartLine = {
        slug,
        quantity: qty,
        size: opts?.size,
        color: opts?.color,
      };
      const key = cartLineKey(nextLine);

      setLines((prev) => {
        const existing = prev.find((l) => cartLineKey(l) === key);
        if (existing) {
          return prev.map((l) =>
            cartLineKey(l) === key
              ? { ...l, quantity: l.quantity + qty }
              : l
          );
        }
        return [...prev, nextLine];
      });

      if (opts?.openDrawer !== false) {
        setDrawerOpen(true);
      }
    },
    []
  );

  const removeItem = useCallback(
    (slug: string, opts?: { size?: string; color?: string }) => {
      const key = cartLineKey({ slug, size: opts?.size, color: opts?.color });
      setLines((prev) => {
        if (opts?.size !== undefined || opts?.color !== undefined) {
          return prev.filter((l) => cartLineKey(l) !== key);
        }
        return prev.filter((l) => l.slug !== slug);
      });
    },
    []
  );

  const setQuantity = useCallback(
    (
      slug: string,
      quantity: number,
      opts?: { size?: string; color?: string }
    ) => {
      const key = cartLineKey({ slug, size: opts?.size, color: opts?.color });
      if (quantity < 1) {
        setLines((prev) => prev.filter((l) => cartLineKey(l) !== key));
        return;
      }
      setLines((prev) =>
        prev.map((l) =>
          cartLineKey(l) === key ? { ...l, quantity } : l
        )
      );
    },
    []
  );

  const clear = useCallback(() => setLines([]), []);

  const resolveProduct = useCallback(
    (slug: string) => productCache[slug] ?? getProductBySlug(slug),
    [productCache]
  );

  const count = useMemo(
    () => lines.reduce((sum, l) => sum + l.quantity, 0),
    [lines]
  );

  const totals = useMemo(
    () =>
      calculateCartTotals(lines, resolveProduct, {
        config: commerceConfig,
        couponCode,
      }),
    [lines, resolveProduct, commerceConfig, couponCode]
  );

  const value = useMemo(
    () => ({
      lines,
      count,
      merchandiseSubtotal: totals.merchandiseSubtotal,
      total: totals.total,
      totals,
      couponCode,
      setCouponCode,
      drawerOpen,
      openDrawer,
      closeDrawer,
      addItem,
      removeItem,
      setQuantity,
      clear,
      resolveProduct,
      commerceConfig,
      refreshCommerceConfig,
      platformFee: totals.total,
      subtotal: totals.merchandiseSubtotal,
    }),
    [
      lines,
      count,
      totals,
      couponCode,
      setCouponCode,
      drawerOpen,
      openDrawer,
      closeDrawer,
      addItem,
      removeItem,
      setQuantity,
      clear,
      resolveProduct,
      commerceConfig,
      refreshCommerceConfig,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

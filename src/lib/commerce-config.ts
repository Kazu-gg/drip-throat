/**
 * Central commerce / marketing configuration.
 * Prefer env overrides so ops can tune without code changes.
 * Admin UI reads/writes a local override key when live CMS is unavailable.
 */

export const COMMERCE_STORAGE_KEY = "dripthroat-commerce-config";

export type BuyTwoOfferConfig = {
  enabled: boolean;
  /** Display label, e.g. "BUY 2 & SAVE" */
  title: string;
  /** Short line, e.g. "2 TEES FOR ₹999" */
  subtitle: string;
  /** Bundle price for exactly `requiredQuantity` eligible units */
  bundlePrice: number;
  requiredQuantity: number;
  /**
   * Empty = all in-stock products are eligible.
   * Otherwise match by product slug.
   */
  eligibleSlugs: string[];
};

export type PromoPopupConfig = {
  enabled: boolean;
  title: string;
  description: string;
  discountAmount: number;
  minOrderValue: number;
  ctaLabel: string;
  ctaHref: string;
  /** Days before showing again after dismiss */
  dismissDays: number;
};

export type CouponConfig = {
  code: string;
  type: "flat" | "percent";
  value: number;
  minOrderValue: number;
  enabled: boolean;
};

export type CommerceConfig = {
  freeShippingThreshold: number;
  buyTwo: BuyTwoOfferConfig;
  promoPopup: PromoPopupConfig;
  coupons: CouponConfig[];
  homepageFeaturedSlugs: string[];
};

export const DEFAULT_COMMERCE_CONFIG: CommerceConfig = {
  freeShippingThreshold: Number(
    process.env.NEXT_PUBLIC_FREE_SHIPPING_THRESHOLD ?? 499
  ),
  buyTwo: {
    enabled: process.env.NEXT_PUBLIC_BUY_TWO_ENABLED !== "false",
    title: process.env.NEXT_PUBLIC_BUY_TWO_TITLE ?? "BUY 2 & SAVE",
    subtitle: process.env.NEXT_PUBLIC_BUY_TWO_SUBTITLE ?? "2 TEES FOR ₹999",
    bundlePrice: Number(process.env.NEXT_PUBLIC_BUY_TWO_PRICE ?? 999),
    requiredQuantity: Number(process.env.NEXT_PUBLIC_BUY_TWO_QTY ?? 2),
    eligibleSlugs: (process.env.NEXT_PUBLIC_BUY_TWO_SLUGS ??
      "oversized-cotton-tee,essential-black-tee")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean),
  },
  promoPopup: {
    enabled: process.env.NEXT_PUBLIC_PROMO_POPUP_ENABLED !== "false",
    title: process.env.NEXT_PUBLIC_PROMO_POPUP_TITLE ?? "GET ₹100 OFF",
    description:
      process.env.NEXT_PUBLIC_PROMO_POPUP_DESC ??
      "On orders above ₹999. Use code DRIP100 at checkout.",
    discountAmount: Number(process.env.NEXT_PUBLIC_PROMO_POPUP_DISCOUNT ?? 100),
    minOrderValue: Number(process.env.NEXT_PUBLIC_PROMO_POPUP_MIN ?? 999),
    ctaLabel: "SHOP NOW",
    ctaHref: "/products",
    dismissDays: Number(process.env.NEXT_PUBLIC_PROMO_POPUP_DISMISS_DAYS ?? 7),
  },
  coupons: [
    {
      code: "DRIP100",
      type: "flat",
      value: 100,
      minOrderValue: 999,
      enabled: true,
    },
  ],
  homepageFeaturedSlugs: [],
};

function mergeConfig(partial: Partial<CommerceConfig> | null): CommerceConfig {
  if (!partial) return DEFAULT_COMMERCE_CONFIG;
  return {
    ...DEFAULT_COMMERCE_CONFIG,
    ...partial,
    buyTwo: { ...DEFAULT_COMMERCE_CONFIG.buyTwo, ...partial.buyTwo },
    promoPopup: { ...DEFAULT_COMMERCE_CONFIG.promoPopup, ...partial.promoPopup },
    coupons: partial.coupons ?? DEFAULT_COMMERCE_CONFIG.coupons,
  };
}

/** Server-safe defaults (no localStorage). */
export function getCommerceConfig(): CommerceConfig {
  return DEFAULT_COMMERCE_CONFIG;
}

/** Client: merge local admin overrides if present. */
export function getClientCommerceConfig(): CommerceConfig {
  if (typeof window === "undefined") return DEFAULT_COMMERCE_CONFIG;
  try {
    const raw = localStorage.getItem(COMMERCE_STORAGE_KEY);
    if (!raw) return DEFAULT_COMMERCE_CONFIG;
    return mergeConfig(JSON.parse(raw) as Partial<CommerceConfig>);
  } catch {
    return DEFAULT_COMMERCE_CONFIG;
  }
}

export function saveClientCommerceConfig(config: CommerceConfig) {
  if (typeof window === "undefined") return;
  localStorage.setItem(COMMERCE_STORAGE_KEY, JSON.stringify(config));
}

export function formatInr(amount: number): string {
  const rounded = Math.max(0, Math.round(amount));
  return `₹${rounded.toLocaleString("en-IN")}`;
}

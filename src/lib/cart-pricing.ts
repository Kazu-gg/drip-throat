import type { CartLine } from "@/lib/cart-types";
import type { Product } from "@/lib/products";
import {
  type BuyTwoOfferConfig,
  type CommerceConfig,
  type CouponConfig,
  formatInr,
  getCommerceConfig,
} from "@/lib/commerce-config";

export type ResolvedCartLine = CartLine & {
  product: Product;
  unitPrice: number;
  lineTotal: number;
};

export type FreeShippingProgress = {
  threshold: number;
  subtotal: number;
  remaining: number;
  progressPercent: number;
  unlocked: boolean;
  empty: boolean;
  message: string;
};

export type BuyTwoProgress = {
  enabled: boolean;
  title: string;
  subtitle: string;
  eligibleQuantity: number;
  requiredQuantity: number;
  remaining: number;
  unlocked: boolean;
  discount: number;
  message: string;
};

export type CartTotals = {
  merchandiseSubtotal: number;
  buyTwoDiscount: number;
  couponDiscount: number;
  discountTotal: number;
  shipping: number;
  freeShipping: FreeShippingProgress;
  buyTwo: BuyTwoProgress;
  total: number;
  appliedCoupon: CouponConfig | null;
  couponError: string | null;
};

export function getEffectiveUnitPrice(product: Product): number {
  if (typeof product.salePrice === "number" && product.salePrice > 0) {
    return product.salePrice;
  }
  return product.price;
}

export function resolveCartLines(
  lines: CartLine[],
  resolveProduct: (slug: string) => Product | undefined
): ResolvedCartLine[] {
  return lines
    .map((line) => {
      const product = resolveProduct(line.slug);
      if (!product) return null;
      const unitPrice = getEffectiveUnitPrice(product);
      return {
        ...line,
        product,
        unitPrice,
        lineTotal: unitPrice * line.quantity,
      };
    })
    .filter((l): l is ResolvedCartLine => l !== null);
}

export function merchandiseSubtotal(resolved: ResolvedCartLine[]): number {
  return resolved.reduce((sum, line) => sum + line.lineTotal, 0);
}

export function calculateFreeShippingProgress(
  cartSubtotal: number,
  threshold = getCommerceConfig().freeShippingThreshold
): FreeShippingProgress {
  const empty = cartSubtotal <= 0;
  const safeThreshold = Math.max(0, threshold);

  if (safeThreshold === 0) {
    return {
      threshold: 0,
      subtotal: cartSubtotal,
      remaining: 0,
      progressPercent: empty ? 0 : 100,
      unlocked: !empty,
      empty,
      message: empty
        ? "Add items to unlock free delivery"
        : "🎉 FREE DELIVERY UNLOCKED",
    };
  }

  const remaining = Math.max(safeThreshold - cartSubtotal, 0);
  const progressPercent = Math.min((cartSubtotal / safeThreshold) * 100, 100);
  const unlocked = cartSubtotal >= safeThreshold && !empty;

  return {
    threshold: safeThreshold,
    subtotal: cartSubtotal,
    remaining,
    progressPercent,
    unlocked,
    empty,
    message: empty
      ? `Free delivery on orders above ${formatInr(safeThreshold)}`
      : unlocked
        ? "🎉 FREE DELIVERY UNLOCKED"
        : `You’re ${formatInr(remaining)} away from FREE DELIVERY 🚚`,
  };
}

function isBuyTwoEligible(product: Product, offer: BuyTwoOfferConfig): boolean {
  if (!offer.enabled) return false;
  if (offer.eligibleSlugs.length === 0) return true;
  return offer.eligibleSlugs.includes(product.slug);
}

export function calculateBuyTwoProgress(
  resolved: ResolvedCartLine[],
  offer: BuyTwoOfferConfig = getCommerceConfig().buyTwo
): BuyTwoProgress {
  const required = Math.max(1, offer.requiredQuantity);
  const eligibleQuantity = resolved.reduce((sum, line) => {
    return isBuyTwoEligible(line.product, offer)
      ? sum + line.quantity
      : sum;
  }, 0);

  const unlocked = offer.enabled && eligibleQuantity >= required;
  const remaining = Math.max(required - eligibleQuantity, 0);

  let discount = 0;
  if (unlocked) {
    const eligibleLines = resolved.filter((l) =>
      isBuyTwoEligible(l.product, offer)
    );
    // Apply one bundle: take the `required` cheapest eligible units
    const unitPrices: number[] = [];
    eligibleLines.forEach((line) => {
      for (let i = 0; i < line.quantity; i += 1) {
        unitPrices.push(line.unitPrice);
      }
    });
    unitPrices.sort((a, b) => a - b);
    const bundleUnits = unitPrices.slice(0, required);
    const bundleRetail = bundleUnits.reduce((s, p) => s + p, 0);
    discount = Math.max(0, bundleRetail - offer.bundlePrice);
  }

  const message = !offer.enabled
    ? ""
    : unlocked
      ? `${offer.subtitle} applied — you saved ${formatInr(discount)}`
      : eligibleQuantity === 0
        ? `${offer.title}: ${offer.subtitle}`
        : `Add ${remaining} more eligible item${remaining === 1 ? "" : "s"} for ${offer.subtitle}`;

  return {
    enabled: offer.enabled,
    title: offer.title,
    subtitle: offer.subtitle,
    eligibleQuantity,
    requiredQuantity: required,
    remaining,
    unlocked,
    discount,
    message,
  };
}

export function findCoupon(
  code: string | null | undefined,
  coupons: CouponConfig[] = getCommerceConfig().coupons
): CouponConfig | null {
  if (!code) return null;
  const normalized = code.trim().toUpperCase();
  return (
    coupons.find((c) => c.enabled && c.code.toUpperCase() === normalized) ??
    null
  );
}

export function calculateCouponDiscount(
  subtotalAfterOffers: number,
  coupon: CouponConfig | null
): { discount: number; error: string | null } {
  if (!coupon) return { discount: 0, error: null };
  if (subtotalAfterOffers < coupon.minOrderValue) {
    return {
      discount: 0,
      error: `Coupon requires orders above ${formatInr(coupon.minOrderValue)}`,
    };
  }
  if (coupon.type === "percent") {
    return {
      discount: Math.min(
        subtotalAfterOffers,
        Math.round((subtotalAfterOffers * coupon.value) / 100)
      ),
      error: null,
    };
  }
  return {
    discount: Math.min(subtotalAfterOffers, coupon.value),
    error: null,
  };
}

export function calculateCartTotals(
  lines: CartLine[],
  resolveProduct: (slug: string) => Product | undefined,
  options?: {
    config?: CommerceConfig;
    couponCode?: string | null;
  }
): CartTotals {
  const config = options?.config ?? getCommerceConfig();
  const resolved = resolveCartLines(lines, resolveProduct);
  const merchandise = merchandiseSubtotal(resolved);
  const buyTwo = calculateBuyTwoProgress(resolved, config.buyTwo);
  const afterBuyTwo = Math.max(0, merchandise - buyTwo.discount);

  const appliedCoupon = findCoupon(options?.couponCode, config.coupons);
  const { discount: couponDiscount, error: couponError } =
    calculateCouponDiscount(afterBuyTwo, appliedCoupon);

  const afterDiscounts = Math.max(0, afterBuyTwo - couponDiscount);
  const freeShipping = calculateFreeShippingProgress(
    afterDiscounts,
    config.freeShippingThreshold
  );
  const shipping = freeShipping.unlocked || freeShipping.empty ? 0 : 0;
  // When below threshold and threshold > 0, still free in current ops model
  // unless you later introduce paid shipping. Remaining amount drives UX only.
  // If paid shipping is introduced, set shipping = unlocked ? 0 : SHIPPING_RATE.

  return {
    merchandiseSubtotal: merchandise,
    buyTwoDiscount: buyTwo.discount,
    couponDiscount,
    discountTotal: buyTwo.discount + couponDiscount,
    shipping,
    freeShipping,
    buyTwo,
    total: afterDiscounts + shipping,
    appliedCoupon: couponError ? null : appliedCoupon,
    couponError,
  };
}

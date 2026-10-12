"use client";

import { useState } from "react";
import Link from "next/link";
import { SeoImage } from "@/components/seo/SeoImage";
import { NavIconHeart } from "@/components/ui/NavIcons";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { FreeShippingProgressBar } from "@/components/shop/FreeShippingProgressBar";
import { BuyTwoOffer } from "@/components/shop/BuyTwoOffer";
import { getEffectiveUnitPrice } from "@/lib/cart-pricing";
import { formatInr } from "@/lib/commerce-config";
import { cartLineKey } from "@/lib/cart-types";
import { FILTER_COLORS } from "@/lib/shop";
import { AUTH_ROUTES, LEGAL_ROUTES } from "@/lib/routes";
import { getProductSizes } from "@/lib/products";

type CartTab = "bag" | "favourites";

function colorHex(colorId?: string) {
  if (!colorId) return "#1a1a1a";
  return FILTER_COLORS.find((c) => c.id === colorId)?.hex ?? "#1a1a1a";
}

function sizeLabel(size?: string) {
  if (!size) return "—";
  if (size.length <= 3) return size;
  return size.charAt(0);
}

function CartTabs({
  active,
  onChange,
}: {
  active: CartTab;
  onChange: (tab: CartTab) => void;
}) {
  return (
    <div className="flex items-center gap-8 border-b border-[var(--border-subtle)]">
      <button
        type="button"
        onClick={() => onChange("bag")}
        data-testid="cart_tab_bag_button"
        className={`pb-4 font-body text-[11px] tracking-[0.28em] uppercase transition-colors ${
          active === "bag"
            ? "font-semibold text-[var(--campaign-text)]"
            : "text-[var(--campaign-text)]/35 hover:text-[var(--campaign-text)]/60"
        }`}
      >
        Shopping Bag
      </button>
      <button
        type="button"
        onClick={() => onChange("favourites")}
        data-testid="cart_tab_favourites_button"
        className={`flex items-center gap-2 pb-4 font-body text-[11px] tracking-[0.28em] uppercase transition-colors ${
          active === "favourites"
            ? "font-semibold text-[var(--campaign-text)]"
            : "text-[var(--campaign-text)]/35 hover:text-[var(--campaign-text)]/60"
        }`}
      >
        Favourites
        <NavIconHeart className="h-3.5 w-3.5" filled={active === "favourites"} />
      </button>
    </div>
  );
}

function OrderSummaryPanel({
  termsAccepted,
  onTermsChange,
}: {
  termsAccepted: boolean;
  onTermsChange: (value: boolean) => void;
}) {
  const { totals, couponCode, setCouponCode } = useCart();
  const [couponInput, setCouponInput] = useState(couponCode ?? "");

  return (
    <aside className="cart-summary lg:sticky lg:top-28" data-testid="cart_order_summary">
      <h2 className="cart-summary-title">Order Summary</h2>

      <div className="mb-5">
        <FreeShippingProgressBar progress={totals.freeShipping} compact />
      </div>

      {totals.buyTwo.enabled ? (
        <div className="mb-5">
          <BuyTwoOffer progress={totals.buyTwo} />
        </div>
      ) : null}

      <dl className="cart-summary-lines">
        <div className="cart-summary-row">
          <dt>Subtotal</dt>
          <dd data-testid="cart_subtotal">{formatInr(totals.merchandiseSubtotal)}</dd>
        </div>
        {totals.buyTwoDiscount > 0 ? (
          <div className="cart-summary-row">
            <dt>Buy 2 offer</dt>
            <dd data-testid="cart_buy_two_discount">−{formatInr(totals.buyTwoDiscount)}</dd>
          </div>
        ) : null}
        {totals.couponDiscount > 0 ? (
          <div className="cart-summary-row">
            <dt>Coupon</dt>
            <dd data-testid="cart_coupon_discount">−{formatInr(totals.couponDiscount)}</dd>
          </div>
        ) : null}
        <div className="cart-summary-row">
          <dt>Shipping</dt>
          <dd data-testid="cart_shipping">
            {totals.freeShipping.unlocked || totals.freeShipping.empty
              ? "FREE"
              : formatInr(totals.shipping)}
          </dd>
        </div>
      </dl>

      <form
        className="mt-4 flex gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          setCouponCode(couponInput.trim() || null);
        }}
      >
        <input
          data-testid="cart_coupon_input"
          value={couponInput}
          onChange={(e) => setCouponInput(e.target.value)}
          placeholder="Coupon code"
          className="min-w-0 flex-1 border border-[var(--border-subtle)] bg-transparent px-3 py-2.5 font-body text-xs text-[var(--campaign-text)] placeholder:text-[var(--campaign-text)]/30 focus:border-gold/40 focus:outline-none"
        />
        <button
          type="submit"
          data-testid="cart_coupon_apply_button"
          className="border border-gold px-3 py-2.5 font-body text-[10px] tracking-[0.18em] text-gold uppercase"
        >
          Apply
        </button>
      </form>
      {totals.couponError ? (
        <p className="mt-2 font-body text-xs text-red-400" role="alert" data-testid="cart_coupon_error">
          {totals.couponError}
        </p>
      ) : null}
      {totals.appliedCoupon ? (
        <p className="mt-2 font-body text-xs text-gold" data-testid="cart_coupon_applied">
          Applied {totals.appliedCoupon.code}
        </p>
      ) : null}

      <div className="cart-summary-total">
        <span>Total due</span>
        <span data-testid="cart_total">{formatInr(totals.total)}</span>
      </div>

      <label className="cart-terms">
        <input
          type="checkbox"
          checked={termsAccepted}
          onChange={(e) => onTermsChange(e.target.checked)}
          className="cart-terms-checkbox"
          data-testid="cart_terms_checkbox"
        />
        <span>
          I agree to the{" "}
          <Link href={LEGAL_ROUTES.terms} className="cart-terms-link">
            Terms and Conditions
          </Link>
        </span>
      </label>

      {termsAccepted ? (
        <Link href={AUTH_ROUTES.checkout} className="cart-continue-btn" data-testid="cart_checkout_button">
          Continue
        </Link>
      ) : (
        <button type="button" disabled className="cart-continue-btn is-disabled" data-testid="cart_checkout_button_disabled">
          Continue
        </button>
      )}
    </aside>
  );
}

function CartLineItem({
  slug,
  quantity,
  size,
  color,
}: {
  slug: string;
  quantity: number;
  size?: string;
  color?: string;
}) {
  const { setQuantity, removeItem, resolveProduct } = useCart();
  const { has, toggle } = useWishlist();
  const product = resolveProduct(slug);

  if (!product) return null;

  const wished = has(slug);
  const subtitle = [product.fabric, product.category].filter(Boolean).join(" · ") || product.category;
  const unit = getEffectiveUnitPrice(product);
  const key = cartLineKey({ slug, size, color });

  return (
    <article className="cart-line" data-testid={`cart_line_${key}`}>
      <div className="cart-line-media">
        <div className="cart-line-image-wrap">
          <Link href={`/products/${product.slug}`} className="cart-line-image">
            <SeoImage
              src={product.image.src}
              alt={product.image.alt}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 40vw, 200px"
            />
          </Link>
          <button
            type="button"
            onClick={() => toggle(slug, product.id)}
            className={`cart-line-wish ${wished ? "is-active" : ""}`}
            aria-label={wished ? "Remove from favourites" : "Add to favourites"}
            aria-pressed={wished}
          >
            <NavIconHeart className="h-3.5 w-3.5" filled={wished} />
          </button>
        </div>

        <div className="cart-line-controls">
          <button
            type="button"
            onClick={() => removeItem(slug, { size, color })}
            className="cart-line-control-btn"
            aria-label={`Remove ${product.name}`}
            data-testid={`cart_line_remove_${key}`}
          >
            ×
          </button>
          <span className="cart-line-size">{sizeLabel(size)}</span>
          <span
            className="cart-line-swatch"
            style={{ backgroundColor: colorHex(color) }}
            title={color ?? "Color"}
            aria-hidden
          />
          <div className="cart-qty-stack">
            <button
              type="button"
              onClick={() => setQuantity(slug, quantity + 1, { size, color })}
              className="cart-qty-btn"
              aria-label="Increase quantity"
              data-testid={`cart_line_qty_inc_${key}`}
            >
              +
            </button>
            <span className="cart-qty-value">{quantity}</span>
            <button
              type="button"
              onClick={() => setQuantity(slug, quantity - 1, { size, color })}
              className="cart-qty-btn"
              aria-label="Decrease quantity"
              data-testid={`cart_line_qty_dec_${key}`}
            >
              −
            </button>
          </div>
          <p className="font-body text-xs text-gold">{formatInr(unit * quantity)}</p>
        </div>
      </div>

      <div className="cart-line-meta">
        <div className="min-w-0">
          <p className="cart-line-category">{subtitle}</p>
          <Link href={`/products/${product.slug}`} className="cart-line-name">
            {product.name}
          </Link>
        </div>
      </div>
    </article>
  );
}

function FavouriteItem({ slug, onMovedToBag }: { slug: string; onMovedToBag?: () => void }) {
  const { addItem } = useCart();
  const { toggle, resolveProduct } = useWishlist();
  const product = resolveProduct(slug);

  if (!product) return null;

  const subtitle = [product.fabric, product.category].filter(Boolean).join(" · ") || product.category;
  const sizes = getProductSizes(product);

  return (
    <article className="cart-line">
      <div className="cart-line-media">
        <div className="cart-line-image-wrap">
          <Link href={`/products/${product.slug}`} className="cart-line-image">
            <SeoImage
              src={product.image.src}
              alt={product.image.alt}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 40vw, 200px"
            />
          </Link>
          <button
            type="button"
            onClick={() => toggle(slug, product.id)}
            className="cart-line-wish is-active"
            aria-label="Remove from favourites"
          >
            <NavIconHeart className="h-3.5 w-3.5" filled />
          </button>
        </div>

        <div className="cart-line-controls">
          <button
            type="button"
            onClick={() => toggle(slug, product.id)}
            className="cart-line-control-btn"
            aria-label="Remove from favourites"
          >
            ×
          </button>
          <button
            type="button"
            onClick={() => {
              addItem(slug, { size: sizes[0], openDrawer: true });
              onMovedToBag?.();
            }}
            className="cart-line-add"
            aria-label="Add to bag"
          >
            +
          </button>
        </div>
      </div>

      <div className="cart-line-meta">
        <div className="min-w-0">
          <p className="cart-line-category">{subtitle}</p>
          <Link href={`/products/${product.slug}`} className="cart-line-name">
            {product.name}
          </Link>
        </div>
      </div>
    </article>
  );
}

function EmptyBag() {
  return (
    <div className="flex flex-col items-center py-20 text-center" data-testid="cart_empty">
      <p className="font-body text-sm text-[var(--campaign-text)]/50">Your bag is empty.</p>
      <Link href="/products" className="cart-continue-btn mt-8 px-12 py-3.5">
        Shop New In
      </Link>
    </div>
  );
}

function EmptyFavourites() {
  return (
    <div className="flex flex-col items-center py-20 text-center">
      <p className="font-body text-sm text-[var(--campaign-text)]/50">No favourites saved yet.</p>
      <Link href="/products" className="cart-continue-btn mt-8 px-12 py-3.5">
        Explore Collection
      </Link>
    </div>
  );
}

export function CartView() {
  const [tab, setTab] = useState<CartTab>("bag");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const { lines } = useCart();
  const { slugs: wishlistSlugs, productsLoading } = useWishlist();

  const showSummary = tab === "bag" && lines.length > 0;

  return (
    <div className="mx-auto max-w-7xl section-padding" data-testid="cart_page">
      <CartTabs active={tab} onChange={setTab} />

      <div
        className={`mt-10 grid gap-10 lg:gap-14 ${
          showSummary ? "lg:grid-cols-[1fr_300px] xl:grid-cols-[1fr_320px]" : ""
        }`}
      >
        <div className="min-w-0">
          {tab === "bag" ? (
            lines.length === 0 ? (
              <EmptyBag />
            ) : (
              <ul className="cart-lines">
                {lines.map((line) => (
                  <li key={cartLineKey(line)}>
                    <CartLineItem
                      slug={line.slug}
                      quantity={line.quantity}
                      size={line.size}
                      color={line.color}
                    />
                  </li>
                ))}
              </ul>
            )
          ) : productsLoading ? (
            <p className="py-16 text-center font-body text-sm tracking-[0.15em] text-[var(--campaign-text)]/40 uppercase">
              Loading favourites…
            </p>
          ) : wishlistSlugs.length === 0 ? (
            <EmptyFavourites />
          ) : (
            <ul className="cart-lines">
              {wishlistSlugs.map((slug) => (
                <li key={slug}>
                  <FavouriteItem slug={slug} onMovedToBag={() => setTab("bag")} />
                </li>
              ))}
            </ul>
          )}
        </div>

        {showSummary ? (
          <OrderSummaryPanel
            termsAccepted={termsAccepted}
            onTermsChange={setTermsAccepted}
          />
        ) : null}
      </div>
    </div>
  );
}

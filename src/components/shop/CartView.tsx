"use client";

import { useState } from "react";
import Link from "next/link";
import { SeoImage } from "@/components/seo/SeoImage";
import { NavIconHeart } from "@/components/ui/NavIcons";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { formatPlatformFee, platformFeeLineLabel } from "@/lib/platform-fees";
import { FILTER_COLORS } from "@/lib/shop";
import { AUTH_ROUTES, LEGAL_ROUTES } from "@/lib/routes";

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
  itemCount,
  platformFee,
  termsAccepted,
  onTermsChange,
}: {
  itemCount: number;
  platformFee: number;
  termsAccepted: boolean;
  onTermsChange: (value: boolean) => void;
}) {
  return (
    <aside className="cart-summary lg:sticky lg:top-28">
      <h2 className="cart-summary-title">Order Summary</h2>

      <dl className="cart-summary-lines">
        <div className="cart-summary-row">
          <dt>{platformFeeLineLabel(itemCount)}</dt>
          <dd>{formatPlatformFee(platformFee)}</dd>
        </div>
      </dl>

      <div className="cart-summary-total">
        <span>Total due</span>
        <span>{formatPlatformFee(platformFee)}</span>
      </div>

      <p className="mt-4 font-body text-[11px] leading-relaxed text-[var(--campaign-text)]/40">
        Chevellè charges a platform fee only. Product prices are settled directly with the
        boutique.
      </p>

      <label className="cart-terms">
        <input
          type="checkbox"
          checked={termsAccepted}
          onChange={(e) => onTermsChange(e.target.checked)}
          className="cart-terms-checkbox"
        />
        <span>
          I agree to the{" "}
          <Link href={LEGAL_ROUTES.terms} className="cart-terms-link">
            Terms and Conditions
          </Link>
        </span>
      </label>

      {termsAccepted ? (
        <Link href={AUTH_ROUTES.checkout} className="cart-continue-btn">
          Continue
        </Link>
      ) : (
        <button type="button" disabled className="cart-continue-btn is-disabled">
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
            onClick={() => removeItem(slug)}
            className="cart-line-control-btn"
            aria-label={`Remove ${product.name}`}
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
              onClick={() => setQuantity(slug, quantity + 1)}
              className="cart-qty-btn"
              aria-label="Increase quantity"
            >
              +
            </button>
            <span className="cart-qty-value">{quantity}</span>
            <button
              type="button"
              onClick={() => setQuantity(slug, quantity - 1)}
              className="cart-qty-btn"
              aria-label="Decrease quantity"
            >
              −
            </button>
          </div>
          <Link
            href={`/products/${product.slug}`}
            className="cart-line-edit"
            aria-label="Edit item options"
          >
            ↻
          </Link>
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
              addItem(slug);
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
    <div className="flex flex-col items-center py-20 text-center">
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
  const { lines, count, platformFee } = useCart();
  const { slugs: wishlistSlugs, productsLoading } = useWishlist();

  const showSummary = tab === "bag" && lines.length > 0;

  return (
    <div className="mx-auto max-w-7xl section-padding">
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
                  <li key={line.slug}>
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
            itemCount={count}
            platformFee={platformFee}
            termsAccepted={termsAccepted}
            onTermsChange={setTermsAccepted}
          />
        ) : null}
      </div>
    </div>
  );
}

"use client";

import { useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import { SeoImage } from "@/components/seo/SeoImage";
import { useCart } from "@/contexts/CartContext";
import { FreeShippingProgressBar } from "@/components/shop/FreeShippingProgressBar";
import { BuyTwoOffer } from "@/components/shop/BuyTwoOffer";
import { ProductRecommendations } from "@/components/shop/ProductRecommendations";
import { formatInr } from "@/lib/commerce-config";
import { cartLineKey } from "@/lib/cart-types";
import { products as allProducts } from "@/lib/products";
import { AUTH_ROUTES } from "@/lib/routes";

export function CartDrawer() {
  const {
    lines,
    count,
    totals,
    drawerOpen,
    closeDrawer,
    setQuantity,
    removeItem,
    resolveProduct,
  } = useCart();
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!drawerOpen) return;
    const previous = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeDrawer();
    };
    document.addEventListener("keydown", onKey);
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
      previous?.focus?.();
    };
  }, [drawerOpen, closeDrawer]);

  const recommendations = useMemo(() => {
    const inCart = new Set(lines.map((l) => l.slug));
    const related = lines
      .flatMap((l) => resolveProduct(l.slug)?.relatedSlugs ?? [])
      .map((slug) => resolveProduct(slug) ?? allProducts.find((p) => p.slug === slug))
      .filter((p): p is (typeof allProducts)[number] => Boolean(p) && !inCart.has(p!.slug));

    const unique = new Map(related.map((p) => [p.slug, p]));
    if (unique.size < 3) {
      allProducts
        .filter((p) => p.featured || p.oversizedFit)
        .forEach((p) => {
          if (!inCart.has(p.slug) && !unique.has(p.slug)) unique.set(p.slug, p);
        });
    }
    return Array.from(unique.values()).slice(0, 3);
  }, [lines, resolveProduct]);

  if (!drawerOpen) return null;

  return (
    <div className="fixed inset-0 z-[80]" data-testid="cart_drawer_root">
      <button
        type="button"
        className="absolute inset-0 bg-black/60"
        aria-label="Close cart"
        data-testid="cart_drawer_backdrop"
        onClick={closeDrawer}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-drawer-title"
        data-testid="cart_drawer"
        className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-[var(--campaign-bg)] text-[var(--campaign-text)] shadow-2xl"
      >
        <div className="flex items-center justify-between border-b border-[var(--border-subtle)] px-5 py-4">
          <h2
            id="cart-drawer-title"
            className="font-body text-[12px] tracking-[0.3em] uppercase"
            data-testid="cart_drawer_title"
          >
            Your Cart {count > 0 ? `(${count})` : ""}
          </h2>
          <button
            ref={closeRef}
            type="button"
            onClick={closeDrawer}
            data-testid="cart_drawer_close_button"
            className="min-h-11 min-w-11 font-body text-lg text-[var(--campaign-text)]/60 hover:text-gold"
            aria-label="Close cart drawer"
          >
            ×
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {lines.length === 0 ? (
            <p
              className="py-10 text-center font-body text-sm text-[var(--campaign-text)]/45"
              data-testid="cart_drawer_empty"
            >
              Your cart is empty.
            </p>
          ) : (
            <ul className="space-y-4" data-testid="cart_drawer_items">
              {lines.map((line) => {
                const product = resolveProduct(line.slug);
                if (!product) return null;
                const key = cartLineKey(line);
                const unit =
                  typeof product.salePrice === "number" && product.salePrice > 0
                    ? product.salePrice
                    : product.price;
                return (
                  <li
                    key={key}
                    className="flex gap-3 border-b border-[var(--border-subtle)] pb-4"
                    data-testid={`cart_drawer_item_${key}`}
                  >
                    <div className="relative h-24 w-20 shrink-0 overflow-hidden bg-[var(--surface)]">
                      <SeoImage
                        src={product.image.src}
                        alt={product.image.alt}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-body text-sm text-[var(--campaign-text)]">
                        {product.name}
                      </p>
                      {line.size ? (
                        <p className="mt-1 font-body text-[11px] text-[var(--campaign-text)]/45">
                          Size: {line.size}
                        </p>
                      ) : null}
                      <p className="mt-1 font-body text-sm text-gold">
                        {formatInr(unit * line.quantity)}
                      </p>
                      <div className="mt-3 flex items-center gap-3">
                        <div className="flex items-center border border-[var(--border-subtle)]">
                          <button
                            type="button"
                            data-testid={`cart_drawer_qty_dec_${key}`}
                            className="min-h-10 min-w-10 text-sm"
                            aria-label="Decrease quantity"
                            onClick={() =>
                              setQuantity(line.slug, line.quantity - 1, {
                                size: line.size,
                                color: line.color,
                              })
                            }
                          >
                            −
                          </button>
                          <span className="min-w-8 text-center font-body text-xs">
                            {line.quantity}
                          </span>
                          <button
                            type="button"
                            data-testid={`cart_drawer_qty_inc_${key}`}
                            className="min-h-10 min-w-10 text-sm"
                            aria-label="Increase quantity"
                            onClick={() =>
                              setQuantity(line.slug, line.quantity + 1, {
                                size: line.size,
                                color: line.color,
                              })
                            }
                          >
                            +
                          </button>
                        </div>
                        <button
                          type="button"
                          data-testid={`cart_drawer_remove_${key}`}
                          className="font-body text-[10px] tracking-[0.2em] text-[var(--campaign-text)]/40 uppercase hover:text-gold"
                          onClick={() =>
                            removeItem(line.slug, {
                              size: line.size,
                              color: line.color,
                            })
                          }
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}

          <div className="mt-6">
            <FreeShippingProgressBar progress={totals.freeShipping} compact />
          </div>

          {totals.buyTwo.enabled ? (
            <div className="mt-4">
              <BuyTwoOffer progress={totals.buyTwo} />
            </div>
          ) : null}

          {recommendations.length > 0 ? (
            <div className="mt-8">
              <ProductRecommendations products={recommendations} />
            </div>
          ) : null}
        </div>

        <div className="border-t border-[var(--border-subtle)] px-5 py-4">
          <div className="flex items-center justify-between font-body text-sm">
            <span>Total</span>
            <span className="text-gold" data-testid="cart_drawer_total">
              {formatInr(totals.total)}
            </span>
          </div>
          <div className="mt-4 flex flex-col gap-2.5">
            <Link
              href={AUTH_ROUTES.checkout}
              onClick={closeDrawer}
              data-testid="cart_drawer_checkout_button"
              className="shop-btn-primary !flex w-full items-center justify-center py-3.5 text-center font-medium"
            >
              Checkout
            </Link>
            <Link
              href="/cart"
              onClick={closeDrawer}
              data-testid="cart_drawer_view_cart_button"
              className="shop-btn-outline !flex w-full items-center justify-center py-3.5 text-center font-medium"
            >
              View Cart
            </Link>
          </div>
        </div>
      </div>
      <div className="sr-only" aria-live="polite" data-testid="cart_drawer_live_region">
        {drawerOpen && count > 0 ? "Added to cart" : ""}
        {totals.freeShipping.unlocked ? "Free delivery unlocked" : ""}
      </div>
    </div>
  );
}

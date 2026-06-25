"use client";

import Link from "next/link";
import { SeoImage } from "@/components/seo/SeoImage";
import { useCart } from "@/contexts/CartContext";
import { formatInr } from "@/lib/shop";
import { AUTH_ROUTES } from "@/lib/routes";

export function CartView() {
  const { lines, setQuantity, removeItem, subtotal, resolveProduct } = useCart();

  if (lines.length === 0) {
    return (
      <div className="mx-auto max-w-lg py-20 text-center">
        <p className="font-body text-sm text-[var(--campaign-text)]/50">Your bag is empty.</p>
        <Link href="/products" className="shop-btn-primary mt-8 inline-flex px-10 py-3.5">
          Shop New In
        </Link>
      </div>
    );
  }

  const shipping = subtotal >= 9999 ? 0 : 199;
  const taxes = Math.round(subtotal * 0.05);
  const total = subtotal + shipping + taxes;

  return (
    <div className="mx-auto grid max-w-7xl gap-12 section-padding lg:grid-cols-[1fr_360px]">
      <div>
        <h2 className="shop-filter-heading mb-6">Products</h2>
        <ul className="divide-y divide-[var(--border-subtle)]">
          {lines.map((line) => {
            const product = resolveProduct(line.slug);
            if (!product) return null;
            return (
              <li key={line.slug} className="flex gap-5 py-6">
                <div className="relative h-28 w-24 shrink-0 overflow-hidden bg-[var(--surface)]">
                  <SeoImage
                    src={product.image.src}
                    alt={product.image.alt}
                    fill
                    className="object-cover"
                    sizes="96px"
                  />
                </div>
                <div className="flex flex-1 flex-col justify-between">
                  <div>
                    <Link
                      href={`/products/${product.slug}`}
                      className="font-body text-[11px] tracking-[0.2em] text-[var(--campaign-text)] uppercase hover:text-gold"
                    >
                      {product.name}
                    </Link>
                    <p className="mt-1 font-display text-gold">{product.priceDisplay}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center border border-[var(--border-subtle)]">
                      <button
                        type="button"
                        onClick={() => setQuantity(line.slug, line.quantity - 1)}
                        className="px-3 py-1.5 text-gold"
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <span className="min-w-[2rem] text-center font-body text-sm">
                        {line.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => setQuantity(line.slug, line.quantity + 1)}
                        className="px-3 py-1.5 text-gold"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItem(line.slug)}
                      className="font-body text-[10px] tracking-[0.2em] text-[var(--campaign-text)]/40 uppercase hover:text-gold"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      <aside className="shop-order-summary h-fit p-6">
        <h2 className="shop-filter-heading mb-6">Order Summary</h2>
        <dl className="space-y-3 font-body text-sm">
          <div className="flex justify-between text-[var(--campaign-text)]/60">
            <dt>Subtotal</dt>
            <dd>{formatInr(subtotal)}</dd>
          </div>
          <div className="flex justify-between text-[var(--campaign-text)]/60">
            <dt>Shipping</dt>
            <dd>{shipping === 0 ? "Complimentary" : formatInr(shipping)}</dd>
          </div>
          <div className="flex justify-between text-[var(--campaign-text)]/60">
            <dt>Taxes</dt>
            <dd>{formatInr(taxes)}</dd>
          </div>
          <div className="flex justify-between border-t border-[var(--border-subtle)] pt-4 font-display text-lg text-gold">
            <dt>Total</dt>
            <dd>{formatInr(total)}</dd>
          </div>
        </dl>
        <input
          type="text"
          placeholder="Apply coupon"
          className="mt-6 w-full border border-[var(--border-subtle)] bg-transparent px-4 py-3 font-body text-sm placeholder-[var(--campaign-text)]/30"
        />
        <Link href={AUTH_ROUTES.checkout} className="shop-btn-primary mt-6 block py-4 text-center">
          Proceed to Checkout
        </Link>
      </aside>
    </div>
  );
}

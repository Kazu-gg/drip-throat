"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SeoImage } from "@/components/seo/SeoImage";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { NavIconHeart } from "@/components/ui/NavIcons";
import { AUTH_ROUTES } from "@/lib/routes";
import { PLATFORM_FEE_PER_ITEM } from "@/lib/platform-fees";
import type { Product } from "@/lib/products";

const SIZES = ["Free Size", "S", "M", "L", "XL"] as const;
const COLORS = [
  { id: "gold", hex: "#D4AF37", label: "Gold" },
  { id: "noir", hex: "#1a1a1a", label: "Noir" },
  { id: "ivory", hex: "#F8F0EB", label: "Ivory" },
];

export function ProductDetailView({
  product,
  collectionName,
  collectionHref,
}: {
  product: Product;
  collectionName?: string;
  collectionHref?: string;
}) {
  const [size, setSize] = useState<string>("Free Size");
  const [color, setColor] = useState(COLORS[0].id);
  const { addItem } = useCart();
  const { has, toggle } = useWishlist();
  const router = useRouter();
  const wished = has(product.slug);

  const addToCart = () => {
    addItem(product.slug, { size, color });
    router.push("/cart");
  };

  const buyNow = () => {
    addItem(product.slug, { size, color });
    router.push(AUTH_ROUTES.checkout);
  };

  return (
    <div className="mx-auto grid max-w-7xl gap-12 section-padding lg:grid-cols-2 lg:gap-16">
      <div>
        <div className="relative aspect-[3/4] overflow-hidden bg-[var(--surface)]">
          <SeoImage
            src={product.image.src}
            alt={product.image.alt}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
        <div className="mt-3 grid grid-cols-4 gap-2">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className={`relative aspect-square overflow-hidden border ${
                i === 0 ? "border-gold" : "border-[var(--border-subtle)]"
              }`}
            >
              <SeoImage
                src={product.image.src}
                alt=""
                fill
                className="object-cover opacity-90"
                sizes="120px"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col">
        {collectionName && collectionHref && (
          <Link
            href={collectionHref}
            className="font-body text-[10px] tracking-[0.35em] text-gold uppercase"
          >
            {collectionName}
          </Link>
        )}
        <h1 className="mt-3 font-display text-3xl font-light tracking-wide text-[var(--campaign-text)] sm:text-4xl">
          {product.name}
        </h1>
        <p className="mt-4 font-body text-sm text-[var(--campaign-text)]/50">
          Platform fee of ₹{PLATFORM_FEE_PER_ITEM} per item applies at checkout
        </p>
        <p className="mt-2 font-body text-sm text-gold/70">★★★★★ 4.9</p>

        <div className="mt-8">
          <p className="shop-filter-heading">Color</p>
          <div className="mt-3 flex gap-2">
            {COLORS.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setColor(c.id)}
                className={`h-8 w-8 rounded-full border-2 ${
                  color === c.id ? "border-gold" : "border-transparent"
                }`}
                style={{ backgroundColor: c.hex }}
                aria-label={c.label}
                aria-pressed={color === c.id}
              />
            ))}
          </div>
        </div>

        <div className="mt-6">
          <p className="shop-filter-heading">Size</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {SIZES.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSize(s)}
                className={`shop-size-btn ${size === s ? "is-active" : ""}`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <button type="button" onClick={addToCart} className="shop-btn-outline flex-1 py-4">
            Add to Cart
          </button>
          <button type="button" onClick={buyNow} className="shop-btn-primary flex-1 py-4">
            Buy Now
          </button>
        </div>

        <button
          type="button"
          onClick={() => toggle(product.slug, product.id)}
          className="mt-4 self-center inline-flex items-center justify-center gap-2.5 font-body text-[10px] tracking-[0.25em] text-gold uppercase transition-opacity hover:opacity-80"
          aria-pressed={wished}
        >
          <NavIconHeart className="h-4 w-4" filled={wished} />
          {wished ? "Saved to Wishlist" : "Add to Wishlist"}
        </button>

        <div className="mt-10 space-y-2 border-t border-[var(--border-subtle)] pt-8 font-body text-sm text-[var(--campaign-text)]/55">
          <p>• Premium curated piece with signature Chevellè finishing</p>
          <p>• Platform fee only at checkout — product price settled with the boutique</p>
          <p>• Secure payment via Razorpay — UPI, cards, net banking</p>
          <p>• Complimentary luxury packaging on every order</p>
          <p>• Easy returns within 7 days of delivery</p>
        </div>
      </div>
    </div>
  );
}

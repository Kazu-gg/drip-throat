"use client";

import Link from "next/link";
import { SeoImage } from "@/components/seo/SeoImage";
import { useWishlist } from "@/contexts/WishlistContext";
import { NavIconHeart } from "@/components/ui/NavIcons";
import type { Product } from "@/lib/products";

export function ProductCard({ product }: { product: Product }) {
  const { has, toggle } = useWishlist();
  const wished = has(product.slug);

  return (
    <article className="shop-product-card group">
      <Link href={`/products/${product.slug}`} className="block">
        <div className="relative aspect-[3/4] overflow-hidden bg-[var(--surface)]">
          <SeoImage
            src={product.image.src}
            alt={product.image.alt}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              toggle(product.slug, product.id);
            }}
            className={`absolute top-3 right-3 flex h-8 w-8 items-center justify-center border transition-colors ${
              wished
                ? "border-gold bg-gold text-black"
                : "border-[var(--border-subtle)] bg-black/40 text-gold backdrop-blur-sm hover:border-gold"
            }`}
            aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
            aria-pressed={wished}
          >
            <NavIconHeart className="h-4 w-4" filled={wished} />
          </button>
        </div>
        <h3 className="mt-4 font-body text-[11px] tracking-[0.22em] text-[var(--campaign-text)] uppercase transition-colors group-hover:text-gold">
          {product.name}
        </h3>
      </Link>
    </article>
  );
}

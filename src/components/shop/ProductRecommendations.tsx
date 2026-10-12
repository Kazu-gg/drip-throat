"use client";

import Link from "next/link";
import { SeoImage } from "@/components/seo/SeoImage";
import { useCart } from "@/contexts/CartContext";
import { getEffectiveUnitPrice } from "@/lib/cart-pricing";
import { formatInr } from "@/lib/commerce-config";
import { getProductSizes, type Product } from "@/lib/products";

type ProductRecommendationsProps = {
  products: Product[];
  title?: string;
  onAdded?: () => void;
};

export function ProductRecommendations({
  products,
  title = "You may also like",
  onAdded,
}: ProductRecommendationsProps) {
  const { addItem } = useCart();

  if (!products.length) return null;

  return (
    <section data-testid="cart_recommendations" aria-label={title}>
      <h3 className="font-body text-[11px] tracking-[0.28em] text-gold uppercase">
        {title}
      </h3>
      <ul className="mt-4 space-y-3">
        {products.slice(0, 3).map((product) => {
          const price = getEffectiveUnitPrice(product);
          const sizes = getProductSizes(product);
          const defaultSize = sizes[0];
          return (
            <li
              key={product.slug}
              className="flex items-center gap-3"
              data-testid={`cart_reco_${product.slug}`}
            >
              <Link
                href={`/products/${product.slug}`}
                className="relative h-16 w-14 shrink-0 overflow-hidden bg-[var(--surface)]"
              >
                <SeoImage
                  src={product.image.src}
                  alt={product.image.alt}
                  fill
                  className="object-cover"
                  sizes="56px"
                />
              </Link>
              <div className="min-w-0 flex-1">
                <Link
                  href={`/products/${product.slug}`}
                  className="block truncate font-body text-xs tracking-wide text-[var(--campaign-text)]"
                >
                  {product.name}
                </Link>
                <p className="mt-0.5 font-body text-xs text-gold">
                  {formatInr(price)}
                </p>
              </div>
              <button
                type="button"
                data-testid={`cart_reco_${product.slug}_add_button`}
                className="shrink-0 border border-gold px-3 py-2 font-body text-[10px] tracking-[0.2em] text-gold uppercase transition-colors hover:bg-gold hover:text-black"
                onClick={() => {
                  addItem(product.slug, {
                    size: defaultSize,
                    openDrawer: true,
                  });
                  onAdded?.();
                }}
              >
                Add
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

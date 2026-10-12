"use client";

import Link from "next/link";
import { SeoImage } from "@/components/seo/SeoImage";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { NavIconHeart } from "@/components/ui/NavIcons";
import { getEffectiveUnitPrice } from "@/lib/cart-pricing";
import { formatInr } from "@/lib/commerce-config";
import { getProductSizes, type Product } from "@/lib/products";

type ProductCardProps = {
  product: Product;
  showQuickAdd?: boolean;
};

export function ProductCard({ product, showQuickAdd = true }: ProductCardProps) {
  const { has, toggle } = useWishlist();
  const { addItem } = useCart();
  const wished = has(product.slug);
  const sizes = getProductSizes(product);
  const unit = getEffectiveUnitPrice(product);
  const onSale =
    typeof product.salePrice === "number" &&
    product.salePrice > 0 &&
    product.salePrice < product.price;
  const outOfStock = product.inStock === false;

  return (
    <article
      className="shop-product-card group"
      data-testid={`product_card_${product.slug}`}
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-[var(--surface)]">
        <Link href={`/products/${product.slug}`} className="absolute inset-0">
          <SeoImage
            src={product.image.src}
            alt={product.image.alt}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
        </Link>
        {product.oversizedFit ? (
          <span
            className="pointer-events-none absolute top-3 left-3 bg-black/55 px-2 py-1 font-body text-[9px] tracking-[0.18em] text-gold uppercase backdrop-blur-sm"
            data-testid={`product_card_${product.slug}_oversized_badge`}
          >
            Oversized
          </span>
        ) : null}
        <button
          type="button"
          data-testid={`product_card_${product.slug}_wishlist_button`}
          onClick={() => toggle(product.slug, product.id)}
          className={`absolute top-3 right-3 flex h-10 w-10 items-center justify-center border transition-colors ${
            wished
              ? "border-gold bg-gold text-black"
              : "border-[var(--border-subtle)] bg-black/40 text-gold backdrop-blur-sm hover:border-gold"
          }`}
          aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
          aria-pressed={wished}
        >
          <NavIconHeart className="h-4 w-4" filled={wished} />
        </button>
        {outOfStock ? (
          <span className="absolute inset-x-0 bottom-0 bg-black/70 py-2 text-center font-body text-[10px] tracking-[0.2em] text-white uppercase">
            Out of stock
          </span>
        ) : null}
      </div>

      <div className="mt-3 space-y-1.5">
        <Link href={`/products/${product.slug}`}>
          <h3
            className="font-body text-[11px] tracking-[0.18em] text-[var(--campaign-text)] uppercase transition-colors group-hover:text-gold"
            data-testid={`product_card_${product.slug}_name`}
          >
            {product.name}
          </h3>
        </Link>
        <p className="font-body text-sm" data-testid={`product_card_${product.slug}_price`}>
          {onSale ? (
            <>
              <span className="text-gold">{formatInr(unit)}</span>
              <span className="ml-2 text-[var(--campaign-text)]/35 line-through">
                {formatInr(product.price)}
              </span>
            </>
          ) : (
            <span className="text-[var(--campaign-text)]/80">{formatInr(unit)}</span>
          )}
        </p>
        <p
          className="font-body text-[10px] tracking-[0.16em] text-[var(--campaign-text)]/40 uppercase"
          data-testid={`product_card_${product.slug}_sizes`}
        >
          {sizes.join(" · ")}
        </p>
        {showQuickAdd && !outOfStock ? (
          <button
            type="button"
            data-testid={`product_card_${product.slug}_quick_add_button`}
            className="mt-2 w-full border border-[var(--border-subtle)] py-2.5 font-body text-[10px] tracking-[0.22em] text-[var(--campaign-text)]/70 uppercase transition-colors hover:border-gold hover:text-gold"
            onClick={() =>
              addItem(product.slug, {
                size: sizes[0],
                openDrawer: true,
              })
            }
          >
            Quick Add
          </button>
        ) : null}
      </div>
    </article>
  );
}

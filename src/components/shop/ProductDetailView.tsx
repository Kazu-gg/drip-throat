"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SeoImage } from "@/components/seo/SeoImage";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { NavIconHeart } from "@/components/ui/NavIcons";
import { SizeSelector } from "@/components/shop/SizeSelector";
import { FAQAccordion } from "@/components/shop/FAQAccordion";
import { TrustBadges } from "@/components/shop/TrustBadges";
import { ReviewSection } from "@/components/shop/ReviewSection";
import { getEffectiveUnitPrice } from "@/lib/cart-pricing";
import { formatInr } from "@/lib/commerce-config";
import {
  getProductFaq,
  getProductSizes,
  type Product,
} from "@/lib/products";
import { AUTH_ROUTES } from "@/lib/routes";

export function ProductDetailView({
  product,
  collectionName,
  collectionHref,
}: {
  product: Product;
  collectionName?: string;
  collectionHref?: string;
}) {
  const sizes = getProductSizes(product);
  const gallery = useMemo(() => {
    const images = product.gallery?.length
      ? product.gallery
      : [product.image, product.image, product.image, product.image];
    return images.slice(0, 4);
  }, [product]);

  const [activeImage, setActiveImage] = useState(0);
  const [size, setSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [sizeError, setSizeError] = useState<string | null>(null);
  const { addItem } = useCart();
  const { has, toggle } = useWishlist();
  const router = useRouter();
  const wished = has(product.slug);

  const unit = getEffectiveUnitPrice(product);
  const onSale =
    typeof product.salePrice === "number" &&
    product.salePrice > 0 &&
    product.salePrice < product.price;
  const outOfStock = product.inStock === false;
  const sizeOut =
    size && product.stockBySize
      ? (product.stockBySize[size] ?? 1) <= 0
      : false;

  const requireSize = () => {
    if (!size) {
      setSizeError("Please select a size");
      return false;
    }
    if (sizeOut) {
      setSizeError("This size is out of stock");
      return false;
    }
    setSizeError(null);
    return true;
  };

  const addToCart = () => {
    if (outOfStock) return;
    if (!requireSize()) return;
    addItem(product.slug, {
      size: size!,
      quantity,
      openDrawer: true,
    });
  };

  const buyNow = () => {
    if (outOfStock) return;
    if (!requireSize()) return;
    addItem(product.slug, {
      size: size!,
      quantity,
      openDrawer: false,
    });
    router.push(AUTH_ROUTES.checkout);
  };

  return (
    <div className="mx-auto grid max-w-7xl gap-10 section-padding lg:grid-cols-2 lg:gap-16">
      <div>
        <div className="relative aspect-[3/4] overflow-hidden bg-[var(--surface)]" data-testid="product_gallery_main">
          <SeoImage
            src={gallery[activeImage]?.src ?? product.image.src}
            alt={gallery[activeImage]?.alt ?? product.image.alt}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          {product.oversizedFit ? (
            <span className="absolute top-4 left-4 bg-black/60 px-3 py-1.5 font-body text-[10px] tracking-[0.22em] text-gold uppercase backdrop-blur-sm">
              Oversized Fit
            </span>
          ) : null}
        </div>
        <div className="mt-3 grid grid-cols-4 gap-2" data-testid="product_gallery_thumbs">
          {gallery.map((img, i) => (
            <button
              key={`${img.src}-${i}`}
              type="button"
              data-testid={`product_gallery_thumb_${i}`}
              onClick={() => setActiveImage(i)}
              className={`relative aspect-square overflow-hidden border ${
                i === activeImage ? "border-gold" : "border-[var(--border-subtle)]"
              }`}
              aria-label={`View image ${i + 1}`}
              aria-pressed={i === activeImage}
            >
              <SeoImage
                src={img.src}
                alt=""
                fill
                className="object-cover opacity-90"
                sizes="120px"
              />
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col pb-24 lg:pb-0">
        {collectionName && collectionHref ? (
          <Link
            href={collectionHref}
            className="font-body text-[10px] tracking-[0.35em] text-gold uppercase"
          >
            {collectionName}
          </Link>
        ) : null}
        <h1
          className="mt-3 font-display text-3xl font-light tracking-wide text-[var(--campaign-text)] sm:text-4xl"
          data-testid="product_name"
        >
          {product.name}
        </h1>

        <p className="mt-4 font-body text-xl" data-testid="product_price">
          {onSale ? (
            <>
              <span className="text-gold">{formatInr(unit)}</span>
              <span className="ml-3 text-base text-[var(--campaign-text)]/35 line-through">
                {formatInr(product.price)}
              </span>
            </>
          ) : (
            <span className="text-[var(--campaign-text)]">{formatInr(unit)}</span>
          )}
        </p>

        {outOfStock ? (
          <p className="mt-3 font-body text-sm text-red-400" data-testid="product_out_of_stock">
            Currently out of stock
          </p>
        ) : null}

        <div className="mt-8">
          <SizeSelector
            sizes={sizes}
            value={size}
            onChange={(next) => {
              setSize(next);
              setSizeError(null);
            }}
            stockBySize={product.stockBySize}
            disabled={outOfStock}
            error={sizeError}
          />
        </div>

        <div className="mt-6">
          <p className="shop-filter-heading" id="product-qty-label">
            Quantity
          </p>
          <div className="mt-3 inline-flex items-center border border-[var(--border-subtle)]" role="group" aria-labelledby="product-qty-label">
            <button
              type="button"
              data-testid="product_qty_dec_button"
              className="min-h-11 min-w-11"
              aria-label="Decrease quantity"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            >
              −
            </button>
            <span className="min-w-10 text-center font-body text-sm" data-testid="product_qty_value">
              {quantity}
            </span>
            <button
              type="button"
              data-testid="product_qty_inc_button"
              className="min-h-11 min-w-11"
              aria-label="Increase quantity"
              onClick={() => setQuantity((q) => q + 1)}
            >
              +
            </button>
          </div>
        </div>

        <div className="mt-8 hidden flex-col gap-3 sm:flex-row lg:flex">
          <button
            type="button"
            onClick={addToCart}
            disabled={outOfStock}
            data-testid="product_add_to_cart_button"
            className="shop-btn-outline flex-1 py-4 disabled:opacity-40"
          >
            Add to Cart
          </button>
          <button
            type="button"
            onClick={buyNow}
            disabled={outOfStock}
            data-testid="product_buy_now_button"
            className="shop-btn-primary flex-1 py-4 disabled:opacity-40"
          >
            Buy Now
          </button>
        </div>

        <button
          type="button"
          onClick={() => toggle(product.slug, product.id)}
          data-testid="product_wishlist_button"
          className="mt-4 self-center inline-flex items-center justify-center gap-2.5 font-body text-[10px] tracking-[0.25em] text-gold uppercase transition-opacity hover:opacity-80"
          aria-pressed={wished}
        >
          <NavIconHeart className="h-4 w-4" filled={wished} />
          {wished ? "Saved to Wishlist" : "Add to Wishlist"}
        </button>

        <div className="mt-8">
          <TrustBadges showOversized={product.oversizedFit !== false} />
        </div>

        <div className="mt-8 space-y-4 border-t border-[var(--border-subtle)] pt-8 font-body text-sm leading-relaxed text-[var(--campaign-text)]/60">
          <div>
            <h2 className="font-body text-[11px] tracking-[0.24em] text-gold uppercase">
              Description
            </h2>
            <p className="mt-2" data-testid="product_description">
              {product.description}
            </p>
          </div>
          {product.fabric ? (
            <div>
              <h2 className="font-body text-[11px] tracking-[0.24em] text-gold uppercase">
                Fabric
              </h2>
              <p className="mt-2" data-testid="product_fabric">
                {product.fabric}
              </p>
            </div>
          ) : null}
          <div>
            <h2 className="font-body text-[11px] tracking-[0.24em] text-gold uppercase">
              Shipping
            </h2>
            <p className="mt-2" data-testid="product_shipping_info">
              {product.shippingInfo ??
                "Orders typically ship within 1–2 business days. Delivery across India usually takes 3–7 business days."}
            </p>
          </div>
          <div>
            <h2 className="font-body text-[11px] tracking-[0.24em] text-gold uppercase">
              Exchange
            </h2>
            <p className="mt-2" data-testid="product_exchange_info">
              {product.exchangeInfo ??
                "Easy size exchanges on unused items with original tags. See our Exchange Policy for full details."}
            </p>
          </div>
          {product.sizeGuide || true ? (
            <div>
              <h2 className="font-body text-[11px] tracking-[0.24em] text-gold uppercase">
                Size guide
              </h2>
              <p className="mt-2" data-testid="product_size_guide">
                {product.sizeGuide ??
                  "Use the size chart above. Between sizes? Size up for a more oversized streetwear fit."}
              </p>
            </div>
          ) : null}
        </div>

        <FAQAccordion items={getProductFaq(product)} />
        <ReviewSection product={product} />
      </div>

      {/* Sticky mobile ATC */}
      <div
        className="fixed inset-x-0 bottom-0 z-40 border-t border-[var(--border-subtle)] bg-[var(--campaign-bg)]/95 p-3 backdrop-blur-md lg:hidden"
        data-testid="product_sticky_cta"
      >
        <div className="mx-auto flex max-w-7xl gap-2">
          <button
            type="button"
            onClick={addToCart}
            disabled={outOfStock}
            data-testid="product_sticky_add_to_cart_button"
            className="shop-btn-outline flex-1 py-3.5 disabled:opacity-40"
          >
            Add to Cart
          </button>
          <button
            type="button"
            onClick={buyNow}
            disabled={outOfStock}
            data-testid="product_sticky_buy_now_button"
            className="shop-btn-primary flex-1 py-3.5 disabled:opacity-40"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}

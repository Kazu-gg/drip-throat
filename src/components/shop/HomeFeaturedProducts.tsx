import { products } from "@/lib/products";
import { ProductCard } from "@/components/shop/ProductCard";
import Link from "next/link";

export function HomeFeaturedProducts() {
  const featured = [
    ...products.filter((p) => p.featured),
    ...products.filter((p) => !p.featured),
  ].slice(0, 6);

  return (
    <section
      className="section-padding border-t border-[var(--border-subtle)]"
      data-testid="home_latest_drop_section"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex items-end justify-between gap-4">
          <div>
            <p className="font-body text-[10px] tracking-[0.4em] text-gold uppercase">
              Latest Drop
            </p>
            <h2 className="mt-2 font-display text-3xl font-light text-[var(--campaign-text)]">
              Best Sellers
            </h2>
          </div>
          <Link
            href="/products"
            className="font-body text-[10px] tracking-[0.28em] text-gold uppercase hover:text-gold-light"
            data-testid="home_view_all_products_link"
          >
            View All →
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-4 md:grid-cols-3 lg:grid-cols-3">
          {featured.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

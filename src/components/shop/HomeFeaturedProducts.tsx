import { products } from "@/lib/products";
import { ProductCard } from "@/components/shop/ProductCard";
import Link from "next/link";

export function HomeFeaturedProducts() {
  const featured = products.slice(0, 4);

  return (
    <section className="section-padding border-t border-[var(--border-subtle)]">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex items-end justify-between gap-4">
          <div>
            <p className="font-body text-[10px] tracking-[0.4em] text-gold uppercase">New In</p>
            <h2 className="mt-2 font-display text-3xl font-light text-[var(--campaign-text)]">
              Best Sellers
            </h2>
          </div>
          <Link
            href="/products"
            className="font-body text-[10px] tracking-[0.28em] text-gold uppercase hover:text-gold-light"
          >
            View All →
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4">
          {featured.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

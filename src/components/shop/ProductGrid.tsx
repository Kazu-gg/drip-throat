import { ProductCard } from "@/components/shop/ProductCard";
import type { Product } from "@/lib/products";

type ProductGridProps = {
  products: Product[];
  emptyMessage?: string;
  loading?: boolean;
  testId?: string;
};

export function ProductGrid({
  products,
  emptyMessage = "No products match your filters.",
  loading = false,
  testId = "product_grid",
}: ProductGridProps) {
  if (loading) {
    return (
      <div
        className="grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-5 lg:grid-cols-3"
        data-testid={`${testId}_loading`}
        aria-busy="true"
      >
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="animate-pulse"
            data-testid={`${testId}_skeleton_${i}`}
          >
            <div className="aspect-[3/4] bg-[var(--surface)]" />
            <div className="mt-3 h-3 w-2/3 bg-[var(--surface)]" />
            <div className="mt-2 h-3 w-1/3 bg-[var(--surface)]" />
          </div>
        ))}
      </div>
    );
  }

  if (!products.length) {
    return (
      <p
        className="py-16 text-center font-body text-sm text-[var(--campaign-text)]/45"
        data-testid={`${testId}_empty`}
      >
        {emptyMessage}
      </p>
    );
  }

  return (
    <div
      className="grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-5 lg:grid-cols-3"
      data-testid={testId}
    >
      {products.map((product) => (
        <ProductCard key={product.slug} product={product} />
      ))}
    </div>
  );
}

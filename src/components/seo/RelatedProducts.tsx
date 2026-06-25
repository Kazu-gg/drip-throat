import { getRelatedProducts, type Product } from "@/lib/products";
import { ProductCard } from "@/components/shop/ProductCard";

type RelatedProductsProps = {
  products: Product[];
  title?: string;
};

export function RelatedProducts({
  products,
  title = "You May Also Like",
}: RelatedProductsProps) {
  if (products.length === 0) return null;

  return (
    <section aria-labelledby="related-products-heading" className="mt-20">
      <h2
        id="related-products-heading"
        className="mb-10 font-display text-2xl font-light text-[var(--campaign-text)] sm:text-3xl"
      >
        {title}
      </h2>
      <div className="grid grid-cols-2 gap-6 md:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </section>
  );
}

export function RelatedProductsBySlugs({
  slugs,
  title,
}: {
  slugs: string[];
  title?: string;
}) {
  return <RelatedProducts products={getRelatedProducts(slugs)} title={title} />;
}

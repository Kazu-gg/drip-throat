import Link from "next/link";
import { getRelatedProducts, type Product } from "@/lib/products";
import { SeoImage } from "@/components/seo/SeoImage";

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
        className="mb-10 font-display text-2xl font-light text-white sm:text-3xl"
      >
        {title}
      </h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <article key={product.slug} className="group">
            <Link href={`/products/${product.slug}`} className="block">
              <div className="relative aspect-[3/4] overflow-hidden bg-black-card">
                <SeoImage
                  src={product.image.src}
                  alt={product.image.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, 33vw"
                />
              </div>
              <h3 className="mt-4 font-display text-lg text-white transition-colors group-hover:text-gold">
                {product.name}
              </h3>
              <p className="font-body text-sm text-gold/80">{product.priceDisplay}</p>
            </Link>
          </article>
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

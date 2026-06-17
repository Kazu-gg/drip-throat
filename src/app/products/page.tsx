import type { Metadata } from "next";
import Link from "next/link";
import { products } from "@/lib/products";
import {
  buildMetadata,
  PAGE_TITLES,
  META_DESCRIPTIONS,
  OG_DEFAULTS,
} from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/structured-data";
import { StructuredData } from "@/components/seo/StructuredData";
import { SeoImage } from "@/components/seo/SeoImage";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = buildMetadata({
  title: PAGE_TITLES.products,
  description: META_DESCRIPTIONS.products,
  path: "/products",
  ogTitle: OG_DEFAULTS.title,
  ogDescription: OG_DEFAULTS.description,
});

export default function ProductsPage() {
  return (
    <>
      <StructuredData
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Products", path: "/products" },
        ])}
      />
      <Navbar />
      <main className="min-h-screen pt-28 pb-20">
        <div className="section-padding !py-0">
          <header className="mx-auto mb-16 max-w-4xl text-center">
            <p className="mb-3 font-accent text-xs tracking-[0.35em] text-gold uppercase">
              Bestsellers
            </p>
            <h1 className="font-display text-4xl font-light tracking-wide text-white sm:text-5xl">
              Premium Luxury Fashion
            </h1>
            <p className="mx-auto mt-6 max-w-2xl font-body text-base leading-relaxed text-white/50">
              Shop Chevellè bestsellers across Women, Men &amp; Accessories —
              curated luxury fashion with secure checkout and order tracking.
            </p>
          </header>

          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <article key={product.slug} className="group">
                <Link href={`/products/${product.slug}`}>
                  <div className="relative aspect-[3/4] overflow-hidden bg-black-card">
                    <SeoImage
                      src={product.image.src}
                      alt={product.image.alt}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, 33vw"
                    />
                  </div>
                  <h2 className="mt-5 font-display text-xl font-light text-white group-hover:text-gold">
                    {product.name}
                  </h2>
                  <p className="mt-1 font-body text-sm text-white/40">
                    {product.category}
                  </p>
                  <p className="mt-2 font-body text-gold/80">
                    {product.priceDisplay}
                  </p>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

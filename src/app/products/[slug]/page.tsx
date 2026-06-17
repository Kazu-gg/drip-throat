import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  products,
  getProductBySlug,
  getRelatedProducts,
} from "@/lib/products";
import {
  buildMetadata,
  productTitle,
  metaDescription,
  OG_DEFAULTS,
} from "@/lib/seo";
import {
  productSchema,
  breadcrumbSchema,
} from "@/lib/structured-data";
import { StructuredData } from "@/components/seo/StructuredData";
import { SeoImage } from "@/components/seo/SeoImage";
import { RelatedProducts } from "@/components/seo/RelatedProducts";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BuyButton } from "@/components/auth/BuyButton";
import { getCollectionBySlug } from "@/lib/data";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};

  return buildMetadata({
    title: productTitle(product.name),
    description: metaDescription(product.seoDescription),
    path: `/products/${product.slug}`,
    keywords: product.seoKeywords,
    ogImage: product.image.src,
    ogTitle: OG_DEFAULTS.title,
    ogDescription: metaDescription(product.seoDescription),
  });
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const collection = getCollectionBySlug(product.collectionId);
  const related = getRelatedProducts(product.relatedSlugs);

  return (
    <>
      <StructuredData
        data={[
          productSchema(product),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Products", path: "/products" },
            ...(collection
              ? [
                  {
                    name: collection.name,
                    path: `/collections/${collection.id}`,
                  },
                ]
              : []),
            { name: product.name, path: `/products/${product.slug}` },
          ]),
        ]}
      />
      <Navbar />
      <main className="min-h-screen pt-28">
        <article className="section-padding !pt-8">
          <div className="mx-auto max-w-7xl">
            <nav aria-label="Breadcrumb" className="mb-8">
              <ol className="flex flex-wrap items-center gap-2 font-body text-xs tracking-wider text-white/40">
                <li>
                  <Link href="/" className="hover:text-gold">Home</Link>
                </li>
                <li aria-hidden>/</li>
                <li>
                  <Link href="/products" className="hover:text-gold">Products</Link>
                </li>
                {collection && (
                  <>
                    <li aria-hidden>/</li>
                    <li>
                      <Link
                        href={`/collections/${collection.id}`}
                        className="hover:text-gold"
                      >
                        {collection.name}
                      </Link>
                    </li>
                  </>
                )}
                <li aria-hidden>/</li>
                <li className="text-gold">{product.name}</li>
              </ol>
            </nav>

            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
              <div className="relative aspect-[3/4] overflow-hidden bg-black-card">
                <SeoImage
                  src={product.image.src}
                  alt={product.image.alt}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>

              <div>
                <p className="mb-2 font-body text-xs tracking-[0.3em] text-gold uppercase">
                  {product.category}
                </p>
                <h1 className="font-display text-3xl font-light tracking-wide text-white sm:text-4xl md:text-5xl">
                  {product.name}
                </h1>
                <p className="mt-4 font-body text-2xl text-gold">
                  {product.priceDisplay}
                </p>
                <p className="mt-8 font-body text-base leading-relaxed text-white/55">
                  {product.description}
                </p>
                <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                  <BuyButton productSlug={product.slug} />
                  {collection && (
                    <Link
                      href={`/collections/${collection.id}`}
                      className="border border-white/15 px-10 py-4 text-center font-body text-xs tracking-[0.2em] text-white/60 uppercase transition-colors hover:border-gold/40 hover:text-gold"
                    >
                      View {collection.name}
                    </Link>
                  )}
                </div>
              </div>
            </div>

            <RelatedProducts products={related} />
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}

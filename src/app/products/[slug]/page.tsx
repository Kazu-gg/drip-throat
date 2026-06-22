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
import { RelatedProducts } from "@/components/seo/RelatedProducts";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ProductExhibit } from "@/components/experience/ProductExhibit";
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
      <main className="min-h-screen bg-black">
        <div className="section-padding !pb-0 !pt-28">
          <div className="mx-auto max-w-7xl">
            <nav aria-label="Breadcrumb" className="mb-4">
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
          </div>
        </div>

        <ProductExhibit
          product={product}
          collectionName={collection?.name}
          collectionHref={
            collection ? `/collections/${collection.id}` : undefined
          }
          related={
            <div className="section-padding border-t border-white/5">
              <RelatedProducts products={related} />
            </div>
          }
        />
      </main>
      <Footer />
    </>
  );
}

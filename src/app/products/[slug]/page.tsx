import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getProductBySlug,
  getRelatedProducts,
  type Product,
} from "@/lib/products";
import { buildMetadata, productTitle, metaDescription } from "@/lib/seo";
import { productSchema, breadcrumbSchema } from "@/lib/structured-data";
import { StructuredData } from "@/components/seo/StructuredData";
import { RelatedProducts } from "@/components/seo/RelatedProducts";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ProductDetailView } from "@/components/shop/ProductDetailView";
import { getCollectionBySlug } from "@/lib/data";
import { fetchProductBySlug } from "@/lib/supabase/queries/products";
import { dbProductToProduct } from "@/lib/supabase/mappers/product";

type PageProps = { params: Promise<{ slug: string }> };

async function resolveProduct(slug: string): Promise<Product | null> {
  const db = await fetchProductBySlug(slug);
  if (db) return dbProductToProduct(db);
  return getProductBySlug(slug) ?? null;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await resolveProduct(slug);
  if (!product) return {};

  const title = product.seoTitle || productTitle(product.name);

  return buildMetadata({
    title,
    description: metaDescription(product.seoDescription),
    path: `/products/${product.slug}`,
    keywords: product.seoKeywords,
    ogImage: product.image.src,
    ogTitle: title,
    ogDescription: metaDescription(product.seoDescription),
  });
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = await resolveProduct(slug);
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
              ? [{ name: collection.name, path: `/collections/${collection.id}` }]
              : []),
            { name: product.name, path: `/products/${product.slug}` },
          ]),
        ]}
      />
      <Navbar />
      <main className="min-h-screen bg-[var(--campaign-bg)] pt-24 pb-20">
        <ProductDetailView
          product={product}
          collectionName={collection?.name}
          collectionHref={collection ? `/collections/${collection.id}` : undefined}
        />
        <div className="mx-auto max-w-7xl section-padding border-t border-[var(--border-subtle)]">
          <RelatedProducts products={related} />
        </div>
      </main>
      <Footer />
    </>
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  collections,
  getCollectionBySlug,
  getCollectionMetadata,
} from "@/lib/data";
import { getProductsByCollection } from "@/lib/products";
import {
  collectionPageSchema,
  breadcrumbSchema,
} from "@/lib/structured-data";
import { StructuredData } from "@/components/seo/StructuredData";
import { SeoImage } from "@/components/seo/SeoImage";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return collections.map((c) => ({ slug: c.id }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const collection = getCollectionBySlug(slug);
  if (!collection) return {};
  return getCollectionMetadata(collection);
}

export default async function CollectionPage({ params }: PageProps) {
  const { slug } = await params;
  const collection = getCollectionBySlug(slug);
  if (!collection) notFound();

  const collectionProducts = getProductsByCollection(collection.id);
  const otherCollections = collections.filter((c) => c.id !== collection.id);

  return (
    <>
      <StructuredData
        data={[
          collectionPageSchema({
            id: collection.id,
            name: collection.name,
            seoDescription: collection.seoDescription,
            image: collection.image,
            keywords: [...collection.seoKeywords],
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Collections", path: "/collections" },
            { name: collection.name, path: `/collections/${collection.id}` },
          ]),
        ]}
      />
      <Navbar />
      <main className="min-h-screen pt-28">
        <article>
          <header className="relative flex min-h-[50vh] items-end overflow-hidden">
            <SeoImage
              src={collection.image}
              alt={collection.imageAlt}
              fill
              priority
              className="object-cover opacity-40"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30" />
            <div className="section-padding relative z-10 w-full">
              <nav aria-label="Breadcrumb" className="mb-6">
                <ol className="flex flex-wrap items-center gap-2 font-body text-xs tracking-wider text-white/40">
                  <li>
                    <Link href="/" className="hover:text-gold">Home</Link>
                  </li>
                  <li aria-hidden>/</li>
                  <li>
                    <Link href="/collections" className="hover:text-gold">
                      Collections
                    </Link>
                  </li>
                  <li aria-hidden>/</li>
                  <li className="text-gold">{collection.name}</li>
                </ol>
              </nav>
              <p className="mb-2 font-accent text-xs tracking-[0.35em] text-gold uppercase">
                {collection.subtitle}
              </p>
              <h1 className="font-display text-4xl font-light tracking-wide text-white sm:text-5xl md:text-6xl">
                {collection.name}
              </h1>
            </div>
          </header>

          <div className="section-padding">
            <div className="mx-auto max-w-3xl">
              <p className="font-body text-base leading-relaxed text-white/55 sm:text-lg">
                {collection.longDescription}
              </p>
              <p className="mt-6 font-body text-sm leading-relaxed text-white/40">
                {collection.seoDescription}
              </p>
            </div>

            {collectionProducts.length > 0 && (
              <section className="mt-20" aria-labelledby="collection-products">
                <h2
                  id="collection-products"
                  className="mb-10 font-display text-2xl font-light text-white sm:text-3xl"
                >
                  Shop {collection.name}
                </h2>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {collectionProducts.map((product) => (
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
                        <h3 className="mt-4 font-display text-lg text-white group-hover:text-gold">
                          {product.name}
                        </h3>
                        <p className="font-body text-sm text-gold/80">
                          {product.priceDisplay}
                        </p>
                      </Link>
                    </article>
                  ))}
                </div>
              </section>
            )}

            <section className="mt-20" aria-labelledby="other-collections">
              <h2
                id="other-collections"
                className="mb-10 font-display text-2xl font-light text-white"
              >
                Explore More Collections
              </h2>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
                {otherCollections.map((item) => (
                  <Link
                    key={item.id}
                    href={`/collections/${item.id}`}
                    className="group border border-white/5 p-4 text-center transition-colors hover:border-gold/30"
                  >
                    <span className="font-body text-xs tracking-wider text-white/50 uppercase group-hover:text-gold">
                      {item.name}
                    </span>
                  </Link>
                ))}
              </div>
              <div className="mt-10">
                <Link
                  href="/blog"
                  className="font-body text-sm text-white/40 transition-colors hover:text-gold"
                >
                  Read our luxury fashion guides →
                </Link>
              </div>
            </section>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}

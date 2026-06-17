import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  collections,
  getCollectionBySlug,
  getCollectionMetadata,
  getMainCategoryForCollection,
  getSubcategoriesByParent,
} from "@/lib/data";
import { getProductsByCollection } from "@/lib/products";
import {
  collectionPageSchema,
  breadcrumbSchema,
} from "@/lib/structured-data";
import { StructuredData } from "@/components/seo/StructuredData";
import { SeoImage } from "@/components/seo/SeoImage";
import { CategoryIcon } from "@/components/ui/CategoryIcon";
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

  const parent = getMainCategoryForCollection(collection);
  const siblingCategories = getSubcategoriesByParent(collection.parentId).filter(
    (c) => c.id !== collection.id
  );
  const collectionProducts = getProductsByCollection(collection.id);

  return (
    <>
      <StructuredData
        data={[
          collectionPageSchema({
            id: collection.id,
            name: collection.name,
            seoDescription: collection.seoDescription,
            keywords: [...collection.seoKeywords],
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Collections", path: "/collections" },
            ...(parent
              ? [{ name: parent.name, path: `/collections#${parent.id}` }]
              : []),
            { name: collection.name, path: `/collections/${collection.id}` },
          ]),
        ]}
      />
      <Navbar />
      <main className="min-h-screen pt-28">
        <article>
          <header className="relative flex min-h-[45vh] items-end overflow-hidden border-b border-white/5">
            <div className="absolute inset-0 bg-gradient-to-b from-black-charcoal via-black to-black" />
            <div
              className="absolute inset-0 opacity-40"
              style={{
                background:
                  "radial-gradient(ellipse at 50% 20%, rgba(212,175,55,0.12) 0%, transparent 60%)",
              }}
            />
            <div className="section-padding relative z-10 flex w-full flex-col items-center pb-12 text-center">
              <nav aria-label="Breadcrumb" className="mb-8 w-full text-left">
                <ol className="flex flex-wrap items-center gap-2 font-body text-xs tracking-wider text-white/40">
                  <li>
                    <Link href="/" className="hover:text-gold">
                      Home
                    </Link>
                  </li>
                  <li aria-hidden>/</li>
                  <li>
                    <Link href="/collections" className="hover:text-gold">
                      Collections
                    </Link>
                  </li>
                  {parent && (
                    <>
                      <li aria-hidden>/</li>
                      <li className="text-white/50">{parent.name}</li>
                    </>
                  )}
                  <li aria-hidden>/</li>
                  <li className="text-gold">{collection.name}</li>
                </ol>
              </nav>
              <div className="mb-6 text-gold/70">
                <CategoryIcon id={collection.icon} className="h-20 w-20" />
              </div>
              <p className="mb-2 font-body text-xs tracking-[0.35em] text-gold uppercase">
                {collection.subtitle}
              </p>
              <h1 className="font-display text-4xl font-light tracking-wide text-white sm:text-5xl md:text-6xl">
                {collection.name}
              </h1>
              {parent && (
                <p className="mt-3 font-body text-sm tracking-[0.2em] text-white/35 uppercase">
                  {parent.name}
                </p>
              )}
            </div>
          </header>

          <div className="section-padding">
            <div className="mx-auto max-w-3xl text-center">
              <p className="font-body text-base leading-relaxed text-white/55 sm:text-lg">
                {collection.longDescription}
              </p>
            </div>

            {collectionProducts.length > 0 && (
              <section className="mt-20" aria-labelledby="collection-products">
                <h2
                  id="collection-products"
                  className="mb-10 text-center font-display text-2xl font-light text-white sm:text-3xl"
                >
                  Shop {collection.name}
                </h2>
                <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
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

            <section className="mt-20" aria-labelledby="sibling-categories">
              <h2
                id="sibling-categories"
                className="mb-10 text-center font-display text-2xl font-light text-white"
              >
                More in {parent?.name ?? "Collections"}
              </h2>
              <div className="mx-auto grid max-w-4xl grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
                {siblingCategories.map((item) => (
                  <Link
                    key={item.id}
                    href={`/collections/${item.id}`}
                    className="group flex flex-col items-center border border-white/5 p-4 transition-colors hover:border-gold/30"
                  >
                    <CategoryIcon
                      id={item.icon}
                      className="mb-3 h-8 w-8 text-gold/50 group-hover:text-gold"
                    />
                    <span className="text-center font-body text-[10px] tracking-wider text-white/50 uppercase group-hover:text-gold">
                      {item.name}
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}

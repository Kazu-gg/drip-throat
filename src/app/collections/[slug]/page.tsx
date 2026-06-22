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
import { getCollectionWorld } from "@/lib/collection-worlds";
import {
  collectionPageSchema,
  breadcrumbSchema,
} from "@/lib/structured-data";
import { StructuredData } from "@/components/seo/StructuredData";
import { SeoImage } from "@/components/seo/SeoImage";
import { CategoryIcon } from "@/components/ui/CategoryIcon";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CollectionWorld } from "@/components/experience/CollectionWorld";

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
  const world = getCollectionWorld(slug);

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
      <CollectionWorld slug={slug}>
        <Navbar />
        <main className="min-h-screen pt-28">
          <article>
            <header className="relative flex min-h-[55vh] items-end overflow-hidden border-b border-white/5">
              <div
                className="absolute inset-0 opacity-50"
                style={{
                  background: `radial-gradient(ellipse at 50% 20%, ${world.glow} 0%, transparent 60%)`,
                }}
              />
              <div className="section-padding relative z-10 flex w-full flex-col items-center pb-12 text-center">
                <nav aria-label="Breadcrumb" className="mb-8 w-full text-left">
                  <ol className="flex flex-wrap items-center gap-2 font-body text-xs tracking-wider text-white/40">
                    <li>
                      <Link href="/" className="hover:text-[var(--world-accent)]">
                        Home
                      </Link>
                    </li>
                    <li aria-hidden>/</li>
                    <li>
                      <Link href="/collections" className="hover:text-[var(--world-accent)]">
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
                    <li style={{ color: world.accent }}>{collection.name}</li>
                  </ol>
                </nav>
                <div className="mb-6" style={{ color: world.accent }}>
                  <CategoryIcon id={collection.icon} className="h-20 w-20" />
                </div>
                <p
                  className="mb-2 font-body text-xs tracking-[0.35em] uppercase"
                  style={{ color: world.accent }}
                >
                  {world.tagline}
                </p>
                <h1 className="font-display text-4xl font-light tracking-wide sm:text-5xl md:text-6xl">
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
                    className="mb-10 text-center font-display text-2xl font-light sm:text-3xl"
                  >
                    The Edit
                  </h2>
                  <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {collectionProducts.map((product) => (
                      <article key={product.slug} className="group">
                        <Link
                          href={`/products/${product.slug}`}
                          data-cursor="view"
                        >
                          <div className="relative aspect-[3/4] overflow-hidden bg-black-card">
                            <SeoImage
                              src={product.image.src}
                              alt={product.image.alt}
                              fill
                              className="object-cover transition-transform duration-[1.2s] ease-luxury group-hover:scale-105"
                              sizes="(max-width: 640px) 100vw, 33vw"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                            <span
                              className="absolute bottom-6 left-6 font-body text-[10px] tracking-[0.3em] uppercase opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                              style={{ color: world.accent }}
                            >
                              View Exhibit
                            </span>
                          </div>
                          <h3 className="mt-4 font-display text-lg transition-colors duration-500 group-hover:text-[var(--world-accent)]">
                            {product.name}
                          </h3>
                          <p
                            className="font-body text-sm"
                            style={{ color: `${world.accent}cc` }}
                          >
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
                  className="mb-10 text-center font-display text-2xl font-light"
                >
                  More Worlds in {parent?.name ?? "Collections"}
                </h2>
                <div className="mx-auto grid max-w-4xl grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
                  {siblingCategories.map((item) => (
                    <Link
                      key={item.id}
                      href={`/collections/${item.id}`}
                      data-cursor="enter"
                      className="group flex flex-col items-center border border-white/5 p-4 transition-colors hover:border-[var(--world-accent)]/30"
                    >
                      <CategoryIcon
                        id={item.icon}
                        className="mb-3 h-8 w-8 text-white/40 transition-colors group-hover:text-[var(--world-accent)]"
                      />
                      <span className="text-center font-body text-[10px] tracking-wider text-white/50 uppercase transition-colors group-hover:text-[var(--world-accent)]">
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
      </CollectionWorld>
    </>
  );
}

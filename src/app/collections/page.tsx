import type { Metadata } from "next";
import Link from "next/link";
import { collections } from "@/lib/data";
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
  title: PAGE_TITLES.collections,
  description: META_DESCRIPTIONS.collections,
  path: "/collections",
  ogTitle: OG_DEFAULTS.title,
  ogDescription: OG_DEFAULTS.description,
});

export default function CollectionsPage() {
  return (
    <>
      <StructuredData
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Collections", path: "/collections" },
        ])}
      />
      <Navbar />
      <main className="min-h-screen pt-28 pb-20">
        <div className="section-padding !py-0">
          <header className="mx-auto mb-16 max-w-4xl text-center">
            <p className="mb-3 font-accent text-xs tracking-[0.35em] text-gold uppercase">
              Shop by Category
            </p>
            <h1 className="font-display text-4xl font-light tracking-wide text-white sm:text-5xl md:text-6xl">
              Women&apos;s Fashion Collection
            </h1>
            <p className="mx-auto mt-6 max-w-2xl font-body text-base leading-relaxed text-white/50">
              Explore Chevellè&apos;s premium luxury fashion — designer sarees,
              lehengas, co-ord sets, kurtis, suits and western wear curated for
              modern Indian women.
            </p>
          </header>

          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {collections.map((collection) => (
              <article key={collection.id}>
                <Link
                  href={`/collections/${collection.id}`}
                  className="group gold-border-glow block overflow-hidden"
                >
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <SeoImage
                      src={collection.image}
                      alt={collection.imageAlt}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                    <div className="absolute right-0 bottom-0 left-0 p-6">
                      <p className="mb-1 font-body text-[10px] tracking-[0.3em] text-gold/70 uppercase">
                        {collection.subtitle}
                      </p>
                      <h2 className="font-display text-2xl font-light text-white">
                        {collection.name}
                      </h2>
                    </div>
                  </div>
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

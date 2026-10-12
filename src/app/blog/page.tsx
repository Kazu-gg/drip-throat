import type { Metadata } from "next";
import Link from "next/link";
import { blogPosts } from "@/lib/blog";
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
  title: PAGE_TITLES.blog,
  description: META_DESCRIPTIONS.blog,
  path: "/blog",
  ogTitle: OG_DEFAULTS.title,
  ogDescription: OG_DEFAULTS.description,
});

export default function BlogPage() {
  return (
    <>
      <StructuredData
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
        ])}
      />
      <Navbar />
      <main className="min-h-screen pt-28 pb-20">
        <div className="section-padding !py-0">
          <header className="mx-auto mb-16 max-w-4xl text-center">
            <p className="mb-3 font-accent text-xs tracking-[0.35em] text-gold uppercase">
              Fashion Journal
            </p>
            <h1 className="font-display text-4xl font-light tracking-wide text-white sm:text-5xl">
              Luxury Fashion Insights
            </h1>
            <p className="mx-auto mt-6 max-w-2xl font-body text-base leading-relaxed text-white/50">
              Expert guides on saree trends, co-ord styling, wedding ethnic wear,
              and building a premium wardrobe — from Dripthroat, India&apos;s
              luxury fashion house.
            </p>
          </header>

          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 md:grid-cols-2">
            {blogPosts.map((post) => (
              <article key={post.slug} className="group">
                <Link href={`/blog/${post.slug}`} className="block">
                  <div className="relative mb-6 aspect-[3/2] overflow-hidden bg-black-card">
                    <SeoImage
                      src={post.image.src}
                      alt={post.image.alt}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  <p className="mb-2 font-body text-[10px] tracking-[0.25em] text-gold/70 uppercase">
                    {post.category} · {post.readTime}
                  </p>
                  <h2 className="font-display text-2xl font-light text-white transition-colors group-hover:text-gold">
                    {post.title}
                  </h2>
                  <p className="mt-3 font-body text-sm leading-relaxed text-white/45">
                    {post.excerpt}
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

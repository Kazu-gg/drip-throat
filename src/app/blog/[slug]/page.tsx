import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts, getBlogPost, getBlogMeta } from "@/lib/blog";
import {
  buildMetadata,
  OG_DEFAULTS,
  metaDescription,
} from "@/lib/seo";
import { blogPostingSchema, breadcrumbSchema } from "@/lib/structured-data";
import { StructuredData } from "@/components/seo/StructuredData";
import { SeoImage } from "@/components/seo/SeoImage";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};

  const meta = getBlogMeta(post);
  return buildMetadata({
    title: meta.title,
    description: meta.description,
    path: `/blog/${post.slug}`,
    keywords: meta.keywords,
    ogImage: post.image.src,
    ogTitle: OG_DEFAULTS.title,
    ogDescription: metaDescription(post.excerpt),
    type: "article",
    publishedTime: post.publishedAt,
  });
}

export default async function BlogArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const otherPosts = blogPosts.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <>
      <StructuredData
        data={[
          blogPostingSchema(post),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: post.title, path: `/blog/${post.slug}` },
          ]),
        ]}
      />
      <Navbar />
      <main className="min-h-screen pt-28 pb-20">
        <article className="section-padding !pt-8">
          <div className="mx-auto max-w-3xl">
            <nav aria-label="Breadcrumb" className="mb-8">
              <ol className="flex flex-wrap items-center gap-2 font-body text-xs text-white/40">
                <li><Link href="/" className="hover:text-gold">Home</Link></li>
                <li aria-hidden>/</li>
                <li><Link href="/blog" className="hover:text-gold">Blog</Link></li>
                <li aria-hidden>/</li>
                <li className="text-gold">{post.category}</li>
              </ol>
            </nav>

            <header>
              <p className="mb-4 font-body text-xs tracking-[0.25em] text-gold uppercase">
                {post.category} · {post.readTime} ·{" "}
                {new Date(post.publishedAt).toLocaleDateString("en-IN", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <h1 className="font-display text-3xl font-light leading-tight text-white sm:text-4xl md:text-5xl">
                {post.title}
              </h1>
              <p className="mt-6 font-body text-lg leading-relaxed text-white/50">
                {post.excerpt}
              </p>
            </header>

            <div className="relative my-12 aspect-[3/2] overflow-hidden bg-black-card">
              <SeoImage
                src={post.image.src}
                alt={post.image.alt}
                fill
                priority
                className="object-cover"
                sizes="768px"
              />
            </div>

            <div className="prose-luxury space-y-6">
              {post.content.map((paragraph, i) => (
                <p
                  key={i}
                  className="font-body text-base leading-relaxed text-white/60"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="mt-16 border-t border-white/10 pt-12">
              <h2 className="mb-8 font-display text-2xl font-light text-white">
                More From Chevellè
              </h2>
              <ul className="space-y-4">
                {otherPosts.map((related) => (
                  <li key={related.slug}>
                    <Link
                      href={`/blog/${related.slug}`}
                      className="font-body text-sm text-white/50 transition-colors hover:text-gold"
                    >
                      {related.title} →
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  href="/collections"
                  className="border border-gold/30 px-8 py-3 font-body text-xs tracking-[0.15em] text-gold uppercase hover:bg-gold/10"
                >
                  Shop Collections
                </Link>
                <Link
                  href="/products"
                  className="border border-white/15 px-8 py-3 font-body text-xs tracking-[0.15em] text-white/50 uppercase hover:text-gold"
                >
                  View Products
                </Link>
              </div>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}

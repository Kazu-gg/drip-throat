import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { collections } from "@/lib/data";
import { products } from "@/lib/products";
import { blogPosts } from "@/lib/blog";
import { fetchProductSitemapEntries } from "@/lib/supabase/queries/products";

export const revalidate = 3600;

const LANDING_PAGES = ["women", "men", "unisex", "accessories"] as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = SITE_URL.replace(/\/$/, "");

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return [{ url: base, lastModified: new Date() }];
  }

  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: base, lastModified: now, changeFrequency: "daily", priority: 1 },
    {
      url: `${base}/collections`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.95,
    },
    {
      url: `${base}/products`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.95,
    },
    {
      url: `${base}/download`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${base}/faq`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${base}/privacy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${base}/terms`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${base}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  const landingPages = LANDING_PAGES.map((id) => ({
    url: `${base}/collections/${id}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  const collectionPages = collections.map((c) => ({
    url: `${base}/collections/${c.id}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  const dbProducts = await fetchProductSitemapEntries();
  const slugToDate = new Map<string, Date>();

  for (const p of products) {
    slugToDate.set(p.slug, now);
  }

  for (const entry of dbProducts) {
    const date = entry.lastModified ? new Date(entry.lastModified) : now;
    const existing = slugToDate.get(entry.slug);
    if (!existing || date > existing) {
      slugToDate.set(entry.slug, date);
    }
  }

  const productPages: MetadataRoute.Sitemap = [...slugToDate.entries()].map(
    ([slug, lastModified]) => ({
      url: `${base}/products/${slug}`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })
  );

  const blogPages = blogPosts.map((post) => ({
    url: `${base}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  return [
    ...staticPages,
    ...landingPages,
    ...collectionPages,
    ...productPages,
    ...blogPages,
  ];
}

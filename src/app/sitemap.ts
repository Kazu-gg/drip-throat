import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { collections } from "@/lib/data";
import { blogPosts } from "@/lib/blog";
import { fetchAllProducts, toSlug } from "@/lib/supabase/queries/products";

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
      url: `${base}/shipping`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${base}/returns`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${base}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
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

  let productPages: MetadataRoute.Sitemap = [];

  try {
    const dbProducts = await fetchAllProducts(500);
    const seen = new Set<string>();

    productPages = dbProducts.flatMap((product) => {
      const slug = product.sku ? toSlug(product.sku) : toSlug(product.name);
      if (!slug || seen.has(slug)) return [];
      seen.add(slug);
      return [
        {
          url: `${base}/products/${slug}`,
          lastModified: now,
          changeFrequency: "weekly" as const,
          priority: 0.8,
        },
      ];
    });
  } catch (error) {
    console.error("[sitemap] failed to fetch products:", error);
  }

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

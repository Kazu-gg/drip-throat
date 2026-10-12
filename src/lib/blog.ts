import { metaDescription, blogTitle } from "@/lib/seo";
import { sareeTrendsContent } from "@/lib/blog/saree-trends-content";
import { coordSetsContent } from "@/lib/blog/coord-sets-content";
import { weddingEthnicContent } from "@/lib/blog/wedding-ethnic-content";
import { luxuryFashionGuideContent } from "@/lib/blog/luxury-fashion-guide-content";

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  seoDescription: string;
  seoKeywords: string[];
  category: string;
  publishedAt: string;
  readTime: string;
  image: {
    src: string;
    alt: string;
    fileName: string;
    width: number;
    height: number;
  };
  content: string[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "top-luxury-saree-trends-india",
    title: "Top Luxury Saree Trends In India",
    excerpt:
      "From tissue silks to heritage weaves — discover the saree trends defining luxury fashion in India this season.",
    seoDescription:
      "Explore 2026 luxury saree trends in India — tissue silk, heritage weaves & designer drapes. Expert style guide from Dripthroat premium fashion.",
    seoKeywords: [
      "luxury saree trends",
      "designer sarees India",
      "premium sarees online",
      "luxury ethnic wear India",
      "Indian fashion",
    ],
    category: "Sarees",
    publishedAt: "2026-01-15",
    readTime: "12 min read",
    image: {
      src: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&q=80",
      alt: "Luxury designer saree trends in India by Dripthroat fashion",
      fileName: "luxury-saree-trends-india-dripthroat.webp",
      width: 800,
      height: 1067,
    },
    content: sareeTrendsContent,
  },
  {
    slug: "how-to-style-co-ord-sets",
    title: "How To Style Co-Ord Sets",
    excerpt:
      "Master the art of styling premium co-ord sets for every occasion — from casual brunches to evening soirées.",
    seoDescription:
      "Learn how to style luxury co-ord sets for women — brunch, office & party looks. Premium fashion styling tips from Dripthroat, India's co-ord experts.",
    seoKeywords: [
      "how to style co-ord sets",
      "luxury co-ord sets",
      "trendy co-ord sets women",
      "Indian fashion",
      "luxury ethnic wear India",
    ],
    category: "Styling",
    publishedAt: "2026-02-01",
    readTime: "12 min read",
    image: {
      src: "https://images.unsplash.com/photo-1583391733956-6c78276477e1?w=800&q=80",
      alt: "How to style premium co-ord sets for women by Dripthroat",
      fileName: "style-co-ord-sets-dripthroat.webp",
      width: 800,
      height: 1067,
    },
    content: coordSetsContent,
  },
  {
    slug: "best-ethnic-wear-for-weddings",
    title: "Best Ethnic Wear For Weddings",
    excerpt:
      "Your complete guide to choosing premium ethnic wear for Indian weddings — from lehengas to sarees and suits.",
    seoDescription:
      "Best ethnic wear for Indian weddings — lehengas, sarees & suits guide. Premium wedding fashion tips from Dripthroat luxury women's clothing India.",
    seoKeywords: [
      "ethnic wear for weddings",
      "wedding lehenga India",
      "premium ethnic wear",
      "luxury ethnic wear India",
      "Indian fashion",
    ],
    category: "Weddings",
    publishedAt: "2026-02-20",
    readTime: "13 min read",
    image: {
      src: "https://images.unsplash.com/photo-1519657674789-98e3c6e43b4a?w=800&q=80",
      alt: "Best premium ethnic wear for Indian weddings by Dripthroat",
      fileName: "ethnic-wear-weddings-dripthroat.webp",
      width: 800,
      height: 1067,
    },
    content: weddingEthnicContent,
  },
  {
    slug: "luxury-fashion-guide-india",
    title: "Luxury Fashion Guide India",
    excerpt:
      "Everything you need to know about building a premium wardrobe with curated luxury fashion in India.",
    seoDescription:
      "Complete luxury fashion guide for India — build a premium wardrobe with designer ethnic & western wear. Expert tips from Dripthroat fashion house.",
    seoKeywords: [
      "luxury fashion India",
      "luxury women's fashion",
      "premium fashion store India",
      "Indian fashion",
      "Dripthroat",
    ],
    category: "Guide",
    publishedAt: "2026-03-01",
    readTime: "13 min read",
    image: {
      src: "https://images.unsplash.com/photo-1536766768598-e09213fdcf22?w=800&q=80",
      alt: "Luxury fashion guide for women in India by Dripthroat",
      fileName: "luxury-fashion-guide-dripthroat.webp",
      width: 800,
      height: 1067,
    },
    content: luxuryFashionGuideContent,
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getBlogMeta(post: BlogPost) {
  return {
    title: blogTitle(post.title),
    description: metaDescription(post.seoDescription),
    keywords: post.seoKeywords,
  };
}

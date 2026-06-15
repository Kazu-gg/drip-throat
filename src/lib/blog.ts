import { metaDescription, blogTitle } from "@/lib/seo";

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
      "Explore 2026 luxury saree trends in India — tissue silk, heritage weaves & designer drapes. Expert style guide from Chevellè premium fashion.",
    seoKeywords: [
      "luxury saree trends",
      "designer sarees India",
      "saree fashion 2026",
      "premium ethnic wear",
    ],
    category: "Sarees",
    publishedAt: "2026-01-15",
    readTime: "6 min read",
    image: {
      src: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1200&q=80&fm=webp",
      alt: "Luxury designer saree trends in India by Chevellè fashion",
      fileName: "luxury-saree-trends-india-chevelle.webp",
      width: 1200,
      height: 800,
    },
    content: [
      "Luxury saree fashion in India is experiencing a renaissance. Modern women are gravitating toward pieces that honour heritage craftsmanship while embracing contemporary silhouettes and unexpected colour palettes.",
      "Tissue silk sarees with subtle metallic sheens dominate evening wear, while handloom cotton-silk blends are redefining everyday luxury. Chevellè curates each piece to reflect these evolving tastes.",
      "Heritage weaves — Kanjivaram, Banarasi, and Paithani — remain timeless investments. The key trend is pairing traditional drapes with minimalist blouses and statement jewellery for a modern aesthetic.",
      "For festive seasons, jewel tones — emerald, ruby, and sapphire — paired with intricate zari work continue to command attention at weddings and celebrations across India.",
      "Shop Chevellè's designer saree collection to discover pieces that embody these trends with uncompromising quality and curated elegance.",
    ],
  },
  {
    slug: "how-to-style-co-ord-sets",
    title: "How To Style Co-Ord Sets",
    excerpt:
      "Master the art of styling premium co-ord sets for every occasion — from casual brunches to evening soirées.",
    seoDescription:
      "Learn how to style luxury co-ord sets for women — brunch, office & party looks. Premium fashion styling tips from Chevellè, India's co-ord experts.",
    seoKeywords: [
      "how to style co-ord sets",
      "luxury co-ord sets",
      "trendy co-ord sets women",
      "co-ord outfit ideas",
    ],
    category: "Styling",
    publishedAt: "2026-02-01",
    readTime: "5 min read",
    image: {
      src: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=1200&q=80&fm=webp",
      alt: "How to style premium co-ord sets for women by Chevellè",
      fileName: "style-co-ord-sets-chevelle.webp",
      width: 1200,
      height: 800,
    },
    content: [
      "Co-ord sets have become the cornerstone of modern Indian women's fashion. Their versatility makes them ideal for women who value both elegance and efficiency in their wardrobe.",
      "For daytime elegance, pair a neutral co-ord set with minimal gold jewellery and strappy sandals. Chevellè's champagne and ivory sets are perfect for brunches and art gallery visits.",
      "Elevate your co-ord for evening events by adding statement earrings, a structured clutch, and heeled mules. A bold lip colour transforms the same set from casual to cocktail-ready.",
      "Layering is key for transitional weather — drape a sheer dupatta or lightweight jacket over your co-ord for added dimension without compromising the clean lines.",
      "Explore Chevellè's premium co-ord collection for perfectly matched sets crafted in luxury fabrics designed for the modern generation.",
    ],
  },
  {
    slug: "best-ethnic-wear-for-weddings",
    title: "Best Ethnic Wear For Weddings",
    excerpt:
      "Your complete guide to choosing premium ethnic wear for Indian weddings — from lehengas to sarees and suits.",
    seoDescription:
      "Best ethnic wear for Indian weddings — lehengas, sarees & suits guide. Premium wedding fashion tips from Chevellè luxury women's clothing India.",
    seoKeywords: [
      "ethnic wear for weddings",
      "wedding lehenga India",
      "premium ethnic wear",
      "women's ethnic wear online",
    ],
    category: "Weddings",
    publishedAt: "2026-02-20",
    readTime: "7 min read",
    image: {
      src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80&fm=webp",
      alt: "Best premium ethnic wear for Indian weddings by Chevellè",
      fileName: "ethnic-wear-weddings-chevelle.webp",
      width: 1200,
      height: 800,
    },
    content: [
      "Indian weddings demand fashion that matches the grandeur of the occasion. Choosing the right ethnic wear is an art that balances tradition, personal style, and uncompromising quality.",
      "For the bride's inner circle, lehengas remain the gold standard. Look for premium embroidery, structured can-cans, and breathable linings — hallmarks of Chevellè's luxury lehenga collection.",
      "Sarees offer timeless elegance for wedding functions. Silk sarees with zari borders are ideal for sangeet and reception nights, while lighter georgette drapes suit mehendi ceremonies.",
      "Anarkali suits provide graceful movement for daytime functions. Their flowing silhouettes photograph beautifully and offer comfort through long celebration hours.",
      "Chevellè curates wedding-ready ethnic wear across every category — ensuring you look impeccable at every function with premium fashion delivered to your doorstep.",
    ],
  },
  {
    slug: "luxury-fashion-guide-india",
    title: "Luxury Fashion Guide",
    excerpt:
      "Everything you need to know about building a premium wardrobe with curated luxury fashion in India.",
    seoDescription:
      "Complete luxury fashion guide for India — build a premium wardrobe with designer ethnic & western wear. Expert tips from Chevellè fashion house.",
    seoKeywords: [
      "luxury fashion India",
      "luxury women's fashion",
      "premium fashion store India",
      "women's clothing India",
    ],
    category: "Guide",
    publishedAt: "2026-03-01",
    readTime: "8 min read",
    image: {
      src: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&q=80&fm=webp",
      alt: "Luxury fashion guide for women in India by Chevellè",
      fileName: "luxury-fashion-guide-chevelle.webp",
      width: 1200,
      height: 800,
    },
    content: [
      "Luxury fashion in India has evolved beyond logos and labels. Today's discerning woman seeks curated collections, exceptional craftsmanship, and brands that understand both heritage and modernity.",
      "Start with foundation pieces — a premium silk saree, a versatile lehenga, and a well-tailored co-ord set. These form the backbone of a wardrobe that transitions across occasions effortlessly.",
      "Fabric quality is non-negotiable in luxury fashion. Natural fibres — silk, cotton-silk, and fine georgette — offer superior drape, breathability, and longevity compared to synthetic alternatives.",
      "Invest in brands that offer end-to-end luxury experiences: curated collections, secure payments, fast delivery, and hassle-free exchanges. Chevellè embodies this complete premium fashion promise.",
      "Whether you prefer ethnic elegance or contemporary western wear, Chevellè's collections are designed for the modern generation who refuse to compromise on style, quality, or convenience.",
    ],
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

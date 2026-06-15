export type ProductImage = {
  src: string;
  alt: string;
  fileName: string;
  width: number;
  height: number;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: string;
  collectionId: string;
  price: number;
  priceDisplay: string;
  description: string;
  seoDescription: string;
  seoKeywords: string[];
  image: ProductImage;
  relatedSlugs: string[];
};

export const products: Product[] = [
  {
    id: "1",
    slug: "midnight-silk-saree",
    name: "Midnight Silk Saree",
    category: "Sarees",
    collectionId: "sarees",
    price: 12999,
    priceDisplay: "₹12,999",
    description:
      "A masterpiece of midnight silk with handwoven zari borders. This designer saree embodies understated luxury — perfect for evening galas, receptions, and festive celebrations.",
    seoDescription:
      "Shop the Midnight Silk Saree by Chevellè — a luxury designer saree with handwoven zari borders. Premium silk ethnic wear with fast delivery across India.",
    seoKeywords: [
      "designer sarees online",
      "silk saree",
      "luxury saree India",
      "buy sarees online India",
    ],
    image: {
      src: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&q=80&fm=webp",
      alt: "Luxury midnight silk designer saree with zari border by Chevellè",
      fileName: "midnight-silk-saree-chevelle.webp",
      width: 800,
      height: 1067,
    },
    relatedSlugs: ["royal-embroidered-lehenga", "golden-zari-kurti"],
  },
  {
    id: "2",
    slug: "royal-embroidered-lehenga",
    name: "Royal Embroidered Lehenga",
    category: "Lehengas",
    collectionId: "lehengas",
    price: 24999,
    priceDisplay: "₹24,999",
    description:
      "Regal embroidery meets contemporary silhouette in this bridal-ready lehenga. Crafted with premium fabric and intricate threadwork for weddings and grand celebrations.",
    seoDescription:
      "Royal Embroidered Lehenga by Chevellè — luxury bridal lehenga with intricate embroidery. Designer ethnic wear for weddings. Premium fashion delivered across India.",
    seoKeywords: [
      "designer lehengas",
      "bridal lehenga online",
      "luxury lehenga India",
      "wedding lehenga",
    ],
    image: {
      src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80&fm=webp",
      alt: "Luxury royal embroidered bridal lehenga by Chevellè",
      fileName: "royal-embroidered-lehenga-chevelle.webp",
      width: 800,
      height: 1067,
    },
    relatedSlugs: ["midnight-silk-saree", "ivory-anarkali-suit"],
  },
  {
    id: "3",
    slug: "ivory-anarkali-suit",
    name: "Ivory Anarkali Suit",
    category: "Suits",
    collectionId: "suits",
    price: 8499,
    priceDisplay: "₹8,499",
    description:
      "Flowing ivory anarkali with delicate embellishments. A timeless ethnic suit that transitions effortlessly from festive gatherings to formal celebrations.",
    seoDescription:
      "Ivory Anarkali Suit by Chevellè — premium women's ethnic suit with elegant embellishments. Luxury festive wear for weddings & celebrations across India.",
    seoKeywords: [
      "anarkali suit online",
      "women suits India",
      "premium ethnic wear",
      "festive suit women",
    ],
    image: {
      src: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80&fm=webp",
      alt: "Premium ivory anarkali ethnic suit by Chevellè",
      fileName: "ivory-anarkali-suit-chevelle.webp",
      width: 800,
      height: 1067,
    },
    relatedSlugs: ["royal-embroidered-lehenga", "champagne-co-ord-set"],
  },
  {
    id: "4",
    slug: "champagne-co-ord-set",
    name: "Champagne Co-Ord Set",
    category: "Co-Ord Sets",
    collectionId: "co-ord",
    price: 6999,
    priceDisplay: "₹6,999",
    description:
      "Effortlessly chic champagne co-ord set in premium fabric. The perfect luxury matching outfit for brunches, parties, and modern Indian fashion moments.",
    seoDescription:
      "Champagne Co-Ord Set by Chevellè — trendy premium co-ord set for women. Luxury matching outfit for parties & casual elegance. Fast delivery India.",
    seoKeywords: [
      "luxury co-ord sets",
      "trendy co-ord sets",
      "women co-ord India",
      "premium matching outfit",
    ],
    image: {
      src: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&q=80&fm=webp",
      alt: "Premium champagne co-ord set for women by Chevellè",
      fileName: "champagne-co-ord-set-chevelle.webp",
      width: 800,
      height: 1067,
    },
    relatedSlugs: ["golden-zari-kurti", "emerald-evening-gown"],
  },
  {
    id: "5",
    slug: "emerald-evening-gown",
    name: "Emerald Evening Gown",
    category: "Western Wear",
    collectionId: "western",
    price: 15999,
    priceDisplay: "₹15,999",
    description:
      "Striking emerald evening gown with a refined silhouette. Contemporary western luxury for cocktail evenings, galas, and statement-making occasions.",
    seoDescription:
      "Emerald Evening Gown by Chevellè — luxury western wear for women. Premium designer dress for parties & galas. Women's fashion online with India delivery.",
    seoKeywords: [
      "luxury women's fashion",
      "evening gown India",
      "designer dress online",
      "western wear women",
    ],
    image: {
      src: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=800&q=80&fm=webp",
      alt: "Luxury emerald evening gown western wear by Chevellè",
      fileName: "emerald-evening-gown-chevelle.webp",
      width: 800,
      height: 1067,
    },
    relatedSlugs: ["champagne-co-ord-set", "midnight-silk-saree"],
  },
  {
    id: "6",
    slug: "golden-zari-kurti",
    name: "Golden Zari Kurti",
    category: "Kurtis",
    collectionId: "kurti",
    price: 4999,
    priceDisplay: "₹4,999",
    description:
      "Golden zari kurti blending festive opulence with everyday wearability. Premium kurti craftsmanship for celebrations, office elegance, and daily luxury.",
    seoDescription:
      "Golden Zari Kurti by Chevellè — premium designer kurti with golden zari work. Luxury ethnic kurti for festive & everyday wear. Shop women's fashion India.",
    seoKeywords: [
      "premium kurtis",
      "designer kurti online",
      "ethnic kurti India",
      "luxury kurti women",
    ],
    image: {
      src: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&q=80&fm=webp",
      alt: "Premium golden zari designer kurti by Chevellè",
      fileName: "golden-zari-kurti-chevelle.webp",
      width: 800,
      height: 1067,
    },
    relatedSlugs: ["midnight-silk-saree", "champagne-co-ord-set"],
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCollection(collectionId: string): Product[] {
  return products.filter((p) => p.collectionId === collectionId);
}

export function getRelatedProducts(slugs: string[]): Product[] {
  return slugs
    .map((slug) => getProductBySlug(slug))
    .filter((p): p is Product => p !== undefined);
}

/** Backward-compatible bestsellers shape for carousel */
export const bestsellers = products.map((p) => ({
  id: Number(p.id),
  slug: p.slug,
  name: p.name,
  category: p.category,
  price: p.priceDisplay,
  image: p.image.src,
  imageAlt: p.image.alt,
  imageWidth: p.image.width,
  imageHeight: p.image.height,
}));

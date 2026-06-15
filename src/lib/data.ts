import {
  PAGE_TITLES,
  metaDescription,
  collectionMetadata,
  META_DESCRIPTIONS,
} from "@/lib/seo";

export const collections = [
  {
    id: "sarees",
    name: "Sarees",
    subtitle: "Timeless Drapes",
    image:
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&q=80&fm=webp",
    imageAlt:
      "Luxury designer saree collection — premium silk ethnic wear by Chevellè",
    imageFileName: "designer-sarees-collection-chevelle.webp",
    imageWidth: 800,
    imageHeight: 1067,
    seoTitle: PAGE_TITLES.sarees,
    seoDescription: metaDescription(
      "Shop designer sarees online at Chevellè. Premium silk, wedding & festive sarees — luxury ethnic wear curated for the modern woman. Fast delivery across India."
    ),
    seoKeywords: [
      "Designer Sarees Online",
      "Buy Sarees Online India",
      "Premium Ethnic Wear",
      "silk sarees",
      "wedding sarees",
    ],
    longDescription:
      "Explore Chevellè's curated saree collection — from timeless silk drapes to contemporary designer pieces. Each saree is handpicked for premium fabric, exquisite craftsmanship, and effortless elegance.",
  },
  {
    id: "lehengas",
    name: "Lehengas",
    subtitle: "Regal Silhouettes",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80&fm=webp",
    imageAlt:
      "Luxury lehenga collection — designer bridal and party lehengas by Chevellè",
    imageFileName: "luxury-lehengas-collection-chevelle.webp",
    imageWidth: 800,
    imageHeight: 1067,
    seoTitle: PAGE_TITLES.lehengas,
    seoDescription: metaDescription(
      "Discover luxury lehengas at Chevellè — designer bridal lehengas, embroidered party wear & festive collections. Premium women's ethnic fashion delivered across India."
    ),
    seoKeywords: [
      "Designer Lehengas",
      "Luxury Fashion India",
      "bridal lehenga",
      "wedding lehenga online",
    ],
    longDescription:
      "Chevellè's lehenga collection embodies regal Indian craftsmanship. From bridal masterpieces to festive party lehengas, every piece features premium fabrics and intricate embroidery.",
  },
  {
    id: "suits",
    name: "Suits",
    subtitle: "Tailored Grace",
    image:
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80&fm=webp",
    imageAlt:
      "Premium women's ethnic suits — anarkali and designer suits by Chevellè",
    imageFileName: "premium-womens-suits-chevelle.webp",
    imageWidth: 800,
    imageHeight: 1067,
    seoTitle: PAGE_TITLES.suits,
    seoDescription: metaDescription(
      "Shop premium women's suits at Chevellè — anarkali suits, palazzo sets & designer ethnic wear for weddings and festivals. Luxury fashion with India-wide delivery."
    ),
    seoKeywords: [
      "Women's Ethnic Wear Online",
      "anarkali suits",
      "premium ethnic wear",
      "women suits India",
    ],
    longDescription:
      "Discover tailored grace with Chevellè's suit collection. From flowing anarkalis to structured palazzo sets, our designer suits blend traditional artistry with contemporary silhouettes.",
  },
  {
    id: "co-ord",
    name: "Co-Ord Sets",
    subtitle: "Effortless Harmony",
    image:
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&q=80&fm=webp",
    imageAlt:
      "Premium co-ord sets for women — luxury matching outfits by Chevellè",
    imageFileName: "premium-co-ord-sets-chevelle.webp",
    imageWidth: 800,
    imageHeight: 1067,
    seoTitle: PAGE_TITLES["co-ord"],
    seoDescription: metaDescription(
      "Shop premium co-ord sets for women at Chevellè. Luxury matching outfits for parties, brunches & everyday elegance. Trendy women's fashion with fast India delivery."
    ),
    seoKeywords: [
      "Luxury Co-Ord Sets",
      "Trendy Co-Ord Sets",
      "women co-ord India",
      "premium matching outfits",
    ],
    longDescription:
      "Chevellè co-ord sets deliver effortless harmony — perfectly matched pieces designed for the modern wardrobe with premium fabrics and refined cuts.",
  },
  {
    id: "kurti",
    name: "Kurti Collection",
    subtitle: "Everyday Elegance",
    image:
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&q=80&fm=webp",
    imageAlt:
      "Premium designer kurti collection — luxury ethnic kurtis by Chevellè",
    imageFileName: "premium-kurtis-collection-chevelle.webp",
    imageWidth: 800,
    imageHeight: 1067,
    seoTitle: PAGE_TITLES.kurti,
    seoDescription: metaDescription(
      "Buy premium kurtis online at Chevellè. Designer cotton, silk & embroidered kurtis for everyday elegance and festive occasions. Luxury women's clothing India."
    ),
    seoKeywords: [
      "Premium Kurtis",
      "designer kurtis online",
      "ethnic kurtis India",
      "women's clothing India",
    ],
    longDescription:
      "Elevate everyday dressing with Chevellè's kurti collection — from understated cotton elegance to richly embroidered festive pieces curated for quality and style.",
  },
  {
    id: "western",
    name: "Western Wear",
    subtitle: "Modern Couture",
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80&fm=webp",
    imageAlt:
      "Luxury western wear for women — premium dresses and gowns by Chevellè",
    imageFileName: "luxury-western-wear-chevelle.webp",
    imageWidth: 800,
    imageHeight: 1067,
    seoTitle: PAGE_TITLES.western,
    seoDescription: metaDescription(
      "Shop luxury western wear at Chevellè — designer dresses, evening gowns & contemporary fashion for women. Premium clothing with secure checkout & India delivery."
    ),
    seoKeywords: [
      "Luxury Women's Fashion",
      "western wear women",
      "designer dresses India",
      "Women's Fashion Online",
    ],
    longDescription:
      "Chevellè western wear brings modern couture to your wardrobe — designer dresses, evening gowns, and contemporary pieces for women who appreciate global luxury fashion.",
  },
] as const;

export type Collection = (typeof collections)[number];

export function getCollectionBySlug(slug: string): Collection | undefined {
  return collections.find((c) => c.id === slug);
}

export function getCollectionMetadata(collection: Collection) {
  return collectionMetadata(
    collection.id as keyof typeof PAGE_TITLES,
    collection.seoDescription,
    [...collection.seoKeywords],
    collection.image
  );
}

export { META_DESCRIPTIONS };

export const features = [
  {
    icon: "diamond",
    title: "Premium Quality",
    description:
      "Handpicked fabrics and meticulous craftsmanship in every piece.",
  },
  {
    icon: "sparkle",
    title: "Curated Collections",
    description:
      "Expertly selected styles that define contemporary luxury.",
  },
  {
    icon: "truck",
    title: "Fast Delivery",
    description:
      "Express shipping to bring elegance to your doorstep swiftly.",
  },
  {
    icon: "shield",
    title: "Secure Payments",
    description:
      "Bank-grade encryption for every transaction you make.",
  },
  {
    icon: "refresh",
    title: "Easy Exchange",
    description:
      "Hassle-free exchanges within 7 days — swap for the perfect fit or style, no questions asked.",
  },
  {
    icon: "headset",
    title: "Customer Support",
    description:
      "Dedicated concierge service available around the clock.",
  },
];

export { bestsellers } from "@/lib/products";

export const reviews = [
  {
    id: 1,
    name: "Priya Sharma",
    location: "Mumbai",
    rating: 5,
    text: "The quality exceeded my expectations. Every piece feels like it belongs in a luxury boutique. Chevellè has redefined online fashion for me.",
  },
  {
    id: 2,
    name: "Ananya Reddy",
    location: "Hyderabad",
    rating: 5,
    text: "From packaging to the fabric — everything screams premium. The lehenga I ordered for my sister's wedding was absolutely stunning.",
  },
  {
    id: 3,
    name: "Meera Kapoor",
    location: "Delhi",
    rating: 5,
    text: "Finally, a brand that understands luxury Indian fashion. Fast delivery, beautiful curation, and impeccable customer service.",
  },
  {
    id: 4,
    name: "Sneha Iyer",
    location: "Bangalore",
    rating: 5,
    text: "The attention to detail is remarkable. I've shopped from many brands, but Chevellè stands in a league of its own.",
  },
];

export const instagramPosts = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=500&q=80&fm=webp",
    alt: "Chevellè luxury saree fashion inspiration on Instagram",
    likes: "2.4k",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&q=80&fm=webp",
    alt: "Designer lehenga style inspiration by Chevellè",
    likes: "1.8k",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&q=80&fm=webp",
    alt: "Premium ethnic suit fashion by Chevellè India",
    likes: "3.1k",
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&q=80&fm=webp",
    alt: "Luxury western wear fashion inspiration Chevellè",
    likes: "2.7k",
  },
  {
    id: 5,
    image:
      "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=500&q=80&fm=webp",
    alt: "Evening gown luxury fashion by Chevellè",
    likes: "1.9k",
  },
  {
    id: 6,
    image:
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500&q=80&fm=webp",
    alt: "Premium co-ord set outfit inspiration Chevellè",
    likes: "2.2k",
  },
];

export const appBenefits = [
  { title: "Faster Shopping", description: "One-tap checkout experience" },
  { title: "Order Tracking", description: "Real-time delivery updates" },
  { title: "Wishlist", description: "Save your favorites forever" },
  { title: "Exclusive Launches", description: "Early access to new drops" },
];

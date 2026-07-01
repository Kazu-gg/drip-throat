import { optimizedDimensions, optimizedSrc } from "@/lib/site-images";

export type ProductImage = {
  src: string;
  alt: string;
  fileName: string;
  width: number;
  height: number;
};

function productImage(
  slug: string,
  fallback: string,
  alt: string,
  fileName: string,
  fallbackWidth: number,
  fallbackHeight: number
): ProductImage {
  const dims = optimizedDimensions(`product:${slug}`);
  return {
    src: optimizedSrc(`product:${slug}`, fallback),
    alt,
    fileName,
    width: dims?.width ?? fallbackWidth,
    height: dims?.height ?? fallbackHeight,
  };
}

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
  color?: string | null;
  fabric?: string | null;
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
    image: productImage(
      "midnight-silk-saree",
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&q=80&fm=webp",
      "Luxury midnight silk designer saree with zari border by Chevellè",
      "midnight-silk-saree-chevelle.webp",
      800,
      1067
    ),
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
    image: productImage(
      "royal-embroidered-lehenga",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80&fm=webp",
      "Luxury royal embroidered bridal lehenga by Chevellè",
      "royal-embroidered-lehenga-chevelle.webp",
      800,
      1067
    ),
    relatedSlugs: ["midnight-silk-saree", "ivory-anarkali-suit"],
  },
  {
    id: "3",
    slug: "ivory-anarkali-suit",
    name: "Ivory Anarkali Suit",
    category: "Suit",
    collectionId: "suit",
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
    image: productImage(
      "ivory-anarkali-suit",
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80&fm=webp",
      "Premium ivory anarkali ethnic suit by Chevellè",
      "ivory-anarkali-suit-chevelle.webp",
      800,
      1067
    ),
    relatedSlugs: ["royal-embroidered-lehenga", "champagne-co-ord-set"],
  },
  {
    id: "4",
    slug: "champagne-co-ord-set",
    name: "Champagne Co-Ord Set",
    category: "Co-ord Set",
    collectionId: "co-ord-set",
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
    image: productImage(
      "champagne-co-ord-set",
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&q=80&fm=webp",
      "Premium champagne co-ord set for women by Chevellè",
      "champagne-co-ord-set-chevelle.webp",
      800,
      1067
    ),
    relatedSlugs: ["golden-zari-kurti", "ivory-silk-shirt"],
  },
  {
    id: "5",
    slug: "ivory-silk-shirt",
    name: "Ivory Silk Shirt",
    category: "Shirts / T-Shirt",
    collectionId: "shirts-tshirt",
    price: 3999,
    priceDisplay: "₹3,999",
    description:
      "Refined ivory silk shirt with a relaxed premium fit. A contemporary essential for brunches, travel, and elevated everyday dressing.",
    seoDescription:
      "Ivory Silk Shirt by Chevellè — premium women's shirt with silk finish. Luxury tops for everyday elegance. Shop women's fashion India.",
    seoKeywords: [
      "women shirts online",
      "premium shirts women",
      "silk shirt India",
      "women tops luxury",
    ],
    image: productImage(
      "ivory-silk-shirt",
      "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=800&q=80&fm=webp",
      "Premium ivory silk shirt for women by Chevellè",
      "ivory-silk-shirt-chevelle.webp",
      800,
      1067
    ),
    relatedSlugs: ["champagne-co-ord-set", "midnight-silk-saree"],
  },
  {
    id: "6",
    slug: "golden-zari-kurti",
    name: "Golden Zari Kurti",
    category: "Kurti / Corset",
    collectionId: "kurti-corset",
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
    image: productImage(
      "golden-zari-kurti",
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&q=80&fm=webp",
      "Premium golden zari designer kurti by Chevellè",
      "golden-zari-kurti-chevelle.webp",
      800,
      1067
    ),
    relatedSlugs: ["midnight-silk-saree", "champagne-co-ord-set"],
  },
  {
    id: "7",
    slug: "emerald-festive-kurta",
    name: "Emerald Festive Kurta",
    category: "Kurtas",
    collectionId: "kurtas",
    price: 5999,
    priceDisplay: "₹5,999",
    description:
      "Rich emerald kurta with refined tailoring for weddings, pujas, and evening celebrations. Premium fabric with a structured yet comfortable fit.",
    seoDescription:
      "Emerald Festive Kurta by Chevellè — designer men's kurta for weddings and festive occasions. Premium ethnic menswear India.",
    seoKeywords: ["men kurta online", "festive kurta men", "designer kurta India"],
    image: productImage(
      "emerald-festive-kurta",
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&q=80&fm=webp",
      "Emerald festive kurta for men by Chevellè",
      "emerald-festive-kurta-chevelle.webp",
      800,
      1067
    ),
    relatedSlugs: ["onyx-nehru-jacket", "charcoal-formal-shirt"],
  },
  {
    id: "8",
    slug: "onyx-nehru-jacket",
    name: "Onyx Nehru Jacket",
    category: "Jackets",
    collectionId: "jackets",
    price: 7499,
    priceDisplay: "₹7,499",
    description:
      "Statement nehru jacket in deep onyx with a clean mandarin collar. Layer over kurtas or shirts for polished festive and formal looks.",
    seoDescription:
      "Onyx Nehru Jacket by Chevellè — premium men's jacket for weddings and celebrations. Luxury menswear India.",
    seoKeywords: ["nehru jacket men", "men jacket online", "festive jacket India"],
    image: productImage(
      "onyx-nehru-jacket",
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80&fm=webp",
      "Onyx nehru jacket for men by Chevellè",
      "onyx-nehru-jacket-chevelle.webp",
      800,
      1067
    ),
    relatedSlugs: ["emerald-festive-kurta", "indigo-slim-jeans"],
  },
  {
    id: "9",
    slug: "charcoal-formal-shirt",
    name: "Charcoal Formal Shirt",
    category: "Shirts",
    collectionId: "men-shirts",
    price: 3499,
    priceDisplay: "₹3,499",
    description:
      "Crisp charcoal shirt cut for boardroom polish and evening ease. Premium cotton with a tailored silhouette.",
    seoDescription:
      "Charcoal Formal Shirt by Chevellè — premium men's shirt for work and occasions. Shop luxury menswear India.",
    seoKeywords: ["men formal shirt", "premium shirt men", "office wear men India"],
    image: productImage(
      "charcoal-formal-shirt",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80&fm=webp",
      "Charcoal formal shirt for men by Chevellè",
      "charcoal-formal-shirt-chevelle.webp",
      800,
      1067
    ),
    relatedSlugs: ["tailored-charcoal-trousers", "essential-black-tee"],
  },
  {
    id: "10",
    slug: "essential-black-tee",
    name: "Essential Black Tee",
    category: "T-Shirts",
    collectionId: "men-tshirts",
    price: 1999,
    priceDisplay: "₹1,999",
    description:
      "Elevated everyday tee in premium cotton with a refined fit. A Chevellè essential for off-duty luxury.",
    seoDescription:
      "Essential Black Tee by Chevellè — premium men's t-shirt. Luxury basics for everyday style India.",
    seoKeywords: ["men t-shirt premium", "black tee men", "luxury basics men"],
    image: productImage(
      "essential-black-tee",
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80&fm=webp",
      "Essential black t-shirt for men by Chevellè",
      "essential-black-tee-chevelle.webp",
      800,
      1067
    ),
    relatedSlugs: ["indigo-slim-jeans", "charcoal-formal-shirt"],
  },
  {
    id: "11",
    slug: "indigo-slim-jeans",
    name: "Indigo Slim Jeans",
    category: "Jeans",
    collectionId: "jeans",
    price: 4499,
    priceDisplay: "₹4,499",
    description:
      "Deep indigo denim with a modern slim cut. Versatile luxury denim for casual days and smart off-duty dressing.",
    seoDescription:
      "Indigo Slim Jeans by Chevellè — premium men's denim. Designer jeans with fast delivery across India.",
    seoKeywords: ["men jeans online", "slim jeans men", "premium denim India"],
    image: productImage(
      "indigo-slim-jeans",
      "https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&q=80&fm=webp",
      "Indigo slim jeans for men by Chevellè",
      "indigo-slim-jeans-chevelle.webp",
      800,
      1067
    ),
    relatedSlugs: ["essential-black-tee", "onyx-nehru-jacket"],
  },
  {
    id: "12",
    slug: "tailored-charcoal-trousers",
    name: "Tailored Charcoal Trousers",
    category: "Pants",
    collectionId: "pants",
    price: 4999,
    priceDisplay: "₹4,999",
    description:
      "Impeccably tailored charcoal trousers with a clean drape. From formal gatherings to refined everyday wear.",
    seoDescription:
      "Tailored Charcoal Trousers by Chevellè — premium men's trousers. Luxury formal pants India.",
    seoKeywords: ["men trousers online", "formal pants men", "tailored trousers India"],
    image: productImage(
      "tailored-charcoal-trousers",
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800&q=80&fm=webp",
      "Tailored charcoal trousers for men by Chevellè",
      "tailored-charcoal-trousers-chevelle.webp",
      800,
      1067
    ),
    relatedSlugs: ["charcoal-formal-shirt", "emerald-festive-kurta"],
  },
  {
    id: "13",
    slug: "studio-crossbody-bag",
    name: "Studio Crossbody Bag",
    category: "Handbags",
    collectionId: "handbags",
    price: 5499,
    priceDisplay: "₹5,499",
    description:
      "Compact crossbody in structured leather — an everyday unisex carry with clean lines and premium hardware.",
    seoDescription:
      "Studio Crossbody Bag by Chevellè — unisex luxury handbag. Premium bags for everyday style India.",
    seoKeywords: ["crossbody bag unisex", "luxury handbag India", "designer bag online"],
    image: productImage(
      "studio-crossbody-bag",
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=80&fm=webp",
      "Studio crossbody bag by Chevellè",
      "studio-crossbody-bag-chevelle.webp",
      800,
      1067
    ),
    relatedSlugs: ["classic-aviator-shades", "noir-leather-wallet"],
  },
  {
    id: "14",
    slug: "classic-aviator-shades",
    name: "Classic Aviator Shades",
    category: "Sunglasses",
    collectionId: "sunglasses",
    price: 2999,
    priceDisplay: "₹2,999",
    description:
      "Timeless aviator frames with UV protection — unisex eyewear for city days, travel, and off-duty polish.",
    seoDescription:
      "Classic Aviator Shades by Chevellè — unisex designer sunglasses. Luxury eyewear India.",
    seoKeywords: ["aviator sunglasses unisex", "designer sunglasses India"],
    image: productImage(
      "classic-aviator-shades",
      "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=800&q=80&fm=webp",
      "Classic aviator sunglasses by Chevellè",
      "classic-aviator-shades-chevelle.webp",
      800,
      1067
    ),
    relatedSlugs: ["studio-crossbody-bag", "minimal-gold-chain"],
  },
  {
    id: "15",
    slug: "noir-leather-wallet",
    name: "Noir Leather Wallet",
    category: "Wallets",
    collectionId: "wallets",
    price: 2499,
    priceDisplay: "₹2,499",
    description:
      "Slim leather wallet in deep noir — a unisex everyday essential with refined stitching and card slots.",
    seoDescription:
      "Noir Leather Wallet by Chevellè — premium unisex wallet. Luxury leather goods India.",
    seoKeywords: ["leather wallet unisex", "premium wallet India"],
    image: productImage(
      "noir-leather-wallet",
      "https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&q=80&fm=webp",
      "Noir leather wallet by Chevellè",
      "noir-leather-wallet-chevelle.webp",
      800,
      1067
    ),
    relatedSlugs: ["classic-aviator-shades", "essential-black-tee"],
  },
  {
    id: "16",
    slug: "minimal-gold-chain",
    name: "Minimal Gold Chain",
    category: "Jewellery",
    collectionId: "jewellery",
    price: 3999,
    priceDisplay: "₹3,999",
    description:
      "Delicate gold-tone chain with a minimal clasp — unisex jewellery for layering or wearing solo.",
    seoDescription:
      "Minimal Gold Chain by Chevellè — unisex fine jewellery. Luxury accessories India.",
    seoKeywords: ["gold chain unisex", "minimal jewellery India", "designer chain online"],
    image: productImage(
      "minimal-gold-chain",
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80&fm=webp",
      "Minimal gold chain by Chevellè",
      "minimal-gold-chain-chevelle.webp",
      800,
      1067
    ),
    relatedSlugs: ["minimal-gold-chain", "classic-aviator-shades"],
  },
  {
    id: "17",
    slug: "oversized-cotton-tee",
    name: "Oversized Cotton Tee",
    category: "Shirts / T-Shirt",
    collectionId: "shirts-tshirt",
    price: 2199,
    priceDisplay: "₹2,199",
    description:
      "Relaxed oversized cotton tee with a soft drape — an easy unisex staple that pairs with denim, co-ords, and layered looks.",
    seoDescription:
      "Oversized Cotton Tee by Chevellè — women's & unisex everyday tee. Premium cotton tops India.",
    seoKeywords: ["oversized tee women", "unisex t-shirt", "cotton tee India"],
    image: productImage(
      "oversized-cotton-tee",
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80&fm=webp",
      "Oversized cotton tee by Chevellè",
      "oversized-cotton-tee-chevelle.webp",
      800,
      1067
    ),
    relatedSlugs: ["essential-black-tee", "champagne-co-ord-set"],
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

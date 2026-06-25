import { optimizedSrc } from "@/lib/site-images";

const FALLBACK = {
  sarees: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&q=80",
  lehengas: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80",
  "kurti-corset":
    "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80&fm=webp",
  "co-ord-set": "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800&q=80",
  suit: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=800&q=80",
  "shirts-tshirt": "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80",
  kurtas: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&q=80",
  "men-shirts": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
  "men-tshirts": "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80",
  jeans: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&q=80",
  pants: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800&q=80",
  jackets: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80",
  handbags: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=80",
  jewellery: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80",
  watches: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80",
  sunglasses:
    "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=800&q=80&fm=webp",
  wallets: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&q=80",
  belts: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80",
  unisex: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=80",
} as const;

/** Editorial imagery for category cards — uses optimized uploads when available */
export const categoryImages: Record<string, { src: string; alt: string }> = {
  sarees: {
    src: optimizedSrc("category:sarees", FALLBACK.sarees),
    alt: "Luxury silk saree drape",
  },
  lehengas: {
    src: optimizedSrc("category:lehengas", FALLBACK.lehengas),
    alt: "Embroidered lehenga for celebrations",
  },
  "kurti-corset": {
    src: optimizedSrc("category:kurti-corset", FALLBACK["kurti-corset"]),
    alt: "Women kurti set styling",
  },
  "co-ord-set": {
    src: optimizedSrc("category:co-ord-set", FALLBACK["co-ord-set"]),
    alt: "Premium co-ord outfit",
  },
  suit: {
    src: optimizedSrc("category:suit", FALLBACK.suit),
    alt: "Anarkali salwar suit",
  },
  "shirts-tshirt": {
    src: optimizedSrc("category:shirts-tshirt", FALLBACK["shirts-tshirt"]),
    alt: "Women shirts and tops",
  },
  kurtas: {
    src: optimizedSrc("category:kurtas", FALLBACK.kurtas),
    alt: "Man in premium ethnic kurta",
  },
  "men-shirts": {
    src: optimizedSrc("category:men-shirts", FALLBACK["men-shirts"]),
    alt: "Man in premium formal shirt",
  },
  "men-tshirts": {
    src: optimizedSrc("category:men-tshirts", FALLBACK["men-tshirts"]),
    alt: "Men's essential t-shirt",
  },
  jeans: {
    src: optimizedSrc("category:jeans", FALLBACK.jeans),
    alt: "Premium denim jeans",
  },
  pants: {
    src: optimizedSrc("category:pants", FALLBACK.pants),
    alt: "Tailored men's trousers",
  },
  jackets: {
    src: optimizedSrc("category:jackets", FALLBACK.jackets),
    alt: "Men's nehru jacket layering",
  },
  handbags: {
    src: optimizedSrc("category:handbags", FALLBACK.handbags),
    alt: "Luxury designer handbag",
  },
  jewellery: {
    src: optimizedSrc("category:jewellery", FALLBACK.jewellery),
    alt: "Fine gold jewellery",
  },
  watches: {
    src: optimizedSrc("category:watches", FALLBACK.watches),
    alt: "Luxury wristwatch",
  },
  sunglasses: {
    src: optimizedSrc("category:sunglasses", FALLBACK.sunglasses),
    alt: "Designer sunglasses",
  },
  wallets: {
    src: optimizedSrc("category:wallets", FALLBACK.wallets),
    alt: "Leather wallet",
  },
  belts: {
    src: optimizedSrc("category:belts", FALLBACK.belts),
    alt: "Leather belt accessory",
  },
  unisex: {
    src: optimizedSrc("category:unisex", FALLBACK.unisex),
    alt: "Chevellè unisex fashion",
  },
};

export function getCategoryImage(slug: string) {
  return categoryImages[slug];
}

/** Editorial imagery for category cards — Unsplash, same CDN as product/hero assets */
export const categoryImages: Record<string, { src: string; alt: string }> = {
  sarees: {
    src: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&q=80",
    alt: "Luxury silk saree drape",
  },
  lehengas: {
    src: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80",
    alt: "Embroidered lehenga for celebrations",
  },
  "kurti-corset": {
    src: "https://images.unsplash.com/photo-1583391734529-41e9444d2d02?w=800&q=80",
    alt: "Women kurti set styling",
  },
  "co-ord-set": {
    src: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800&q=80",
    alt: "Premium co-ord outfit",
  },
  suit: {
    src: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=800&q=80",
    alt: "Anarkali salwar suit",
  },
  "shirts-tshirt": {
    src: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80",
    alt: "Women shirts and tops",
  },
  kurtas: {
    src: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&q=80",
    alt: "Men kurta ethnic wear",
  },
  "men-shirts": {
    src: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80",
    alt: "Premium men's formal shirt",
  },
  "men-tshirts": {
    src: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80",
    alt: "Men's essential t-shirt",
  },
  jeans: {
    src: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&q=80",
    alt: "Premium denim jeans",
  },
  pants: {
    src: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800&q=80",
    alt: "Tailored men's trousers",
  },
  jackets: {
    src: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80",
    alt: "Men's nehru jacket layering",
  },
  handbags: {
    src: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=80",
    alt: "Luxury designer handbag",
  },
  jewellery: {
    src: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80",
    alt: "Fine gold jewellery",
  },
  watches: {
    src: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80",
    alt: "Luxury wristwatch",
  },
  sunglasses: {
    src: "https://images.unsplash.com/photo-1572635196233-39b4df4c0a0c?w=800&q=80",
    alt: "Designer sunglasses",
  },
  wallets: {
    src: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&q=80",
    alt: "Leather wallet",
  },
  belts: {
    src: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80",
    alt: "Leather belt accessory",
  },
};

export function getCategoryImage(slug: string) {
  return categoryImages[slug];
}

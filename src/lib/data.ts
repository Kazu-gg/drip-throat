import { collectionMetadata, META_DESCRIPTIONS, PAGE_TITLES } from "@/lib/seo";
import type { Collection } from "@/lib/categories";

export {
  mainCategories,
  subcategories,
  collections,
  getMainCategory,
  getSubcategoriesByParent,
  getCollectionBySlug,
  getMainCategoryForCollection,
} from "@/lib/categories";

export type {
  MainCategoryId,
  MainCategory,
  Subcategory,
  Collection,
} from "@/lib/categories";

export function getCollectionMetadata(collection: Collection) {
  return collectionMetadata(
    collection.id as keyof typeof PAGE_TITLES,
    collection.seoDescription,
    [...collection.seoKeywords]
  );
}

export { META_DESCRIPTIONS };

export const features = [
  {
    icon: "sparkle",
    title: "Curated Luxury Fashion",
    description:
      "Premium luxury fashion, curated for weddings, festivals, and everyday elegance.",
  },
  {
    icon: "shield",
    title: "Secure Checkout",
    description:
      "Pay your way — UPI, cards, or cash on delivery. Powered by Razorpay.",
  },
  {
    icon: "truck",
    title: "Order Tracking",
    description:
      "Track every order from confirmation to delivery in the Dripthroat app.",
  },
  {
    icon: "package",
    title: "Premium Shopping Experience",
    description:
      "Luxury packaging, verified orders, and concierge support at every step.",
  },
];

export { bestsellers } from "@/lib/products";

export const reviews = [
  {
    id: 1,
    name: "Priya Sharma",
    location: "Mumbai",
    rating: 5,
    text: "The quality exceeded my expectations. Every piece feels like it belongs in a luxury boutique. Dripthroat has redefined online fashion for me.",
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
    text: "The attention to detail is remarkable. I've shopped from many brands, but Dripthroat stands in a league of its own.",
  },
];

export const instagramPosts = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=500&q=80&fm=webp",
    alt: "Dripthroat luxury saree fashion inspiration on Instagram",
    likes: "2.4k",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&q=80&fm=webp",
    alt: "Lehenga style inspiration by Dripthroat",
    likes: "1.8k",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&q=80&fm=webp",
    alt: "Premium ethnic suit fashion by Dripthroat India",
    likes: "3.1k",
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=500&q=80&fm=webp",
    alt: "Men's kurta fashion inspiration Dripthroat",
    likes: "2.7k",
  },
  {
    id: 5,
    image:
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&q=80&fm=webp",
    alt: "Luxury handbag accessory by Dripthroat",
    likes: "1.9k",
  },
  {
    id: 6,
    image:
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500&q=80&fm=webp",
    alt: "Premium co-ord set outfit inspiration Dripthroat",
    likes: "2.2k",
  },
];

export const appBenefits = [
  { title: "Browse", description: "Women, Men & Accessories — as in the app" },
  { title: "Product", description: "Curated pieces with premium detail" },
  { title: "Cart", description: "Save favourites and build your edit" },
  { title: "Checkout", description: "UPI, cards, or COD — pay your way" },
  { title: "Track", description: "Real-time updates from order to doorstep" },
];

export const curatedEdits = [
  {
    id: "new-arrivals" as const,
    name: "New Arrivals",
    subtitle: "Fresh from the atelier",
    href: "/products",
    icon: "new-arrivals" as const,
  },
  {
    id: "best-sellers" as const,
    name: "Best Sellers",
    subtitle: "Most loved pieces",
    href: "/products",
    icon: "best-sellers" as const,
  },
  {
    id: "trending" as const,
    name: "Trending",
    subtitle: "What India is wearing now",
    href: "/collections",
    icon: "trending" as const,
  },
  {
    id: "wedding-edit" as const,
    name: "Wedding Edit",
    subtitle: "Celebration wear",
    href: "/collections/lehengas",
    icon: "wedding-edit" as const,
  },
  {
    id: "festive-edit" as const,
    name: "Festive Edit",
    subtitle: "Diwali, Navratri & more",
    href: "/collections/sarees",
    icon: "festive-edit" as const,
  },
];

export const trustItems = [
  {
    icon: "razorpay",
    title: "Secure Payments",
    description: "Bank-grade encryption via Razorpay — UPI, cards & COD accepted.",
  },
  {
    icon: "verified",
    title: "Verified Orders",
    description: "Every order confirmed and tracked from warehouse to your door.",
  },
  {
    icon: "support",
    title: "Customer Support",
    description: "Dedicated concierge team ready to assist with orders and styling.",
  },
] as const;

export const faqItems = [
  {
    question: "What is Dripthroat India?",
    answer:
      "Dripthroat India (dripthroat.in) is a curated luxury fashion brand offering designer sarees, lehengas, kurtas, co-ords, and accessories for women and men — with secure online checkout and order tracking.",
  },
  {
    question: "What is Dripthroat?",
    answer:
      "Dripthroat is a curated luxury fashion brand in India — shop Women, Men & Accessories with the same category structure as the Dripthroat app.",
  },
  {
    question: "Does Dripthroat deliver across India?",
    answer:
      "Yes. Dripthroat offers fast, reliable delivery to cities and towns across India. Track your order in real time through our website or mobile app.",
  },
  {
    question: "Where can I buy designer sarees online in India?",
    answer:
      "Shop designer sarees online at Dripthroat — India's premium fashion destination for luxury silk sarees, wedding sarees, and festive ethnic wear with secure checkout.",
  },
  {
    question: "What are the best luxury co-ord sets for women?",
    answer:
      "Dripthroat offers premium co-ord sets crafted in luxury fabrics with perfectly matched silhouettes — ideal for parties, brunches, and modern Indian fashion.",
  },
  {
    question: "Is Dripthroat good for wedding ethnic wear?",
    answer:
      "Absolutely. Dripthroat curates lehengas, sarees, and salwar suits for weddings and celebrations with premium fabrics and craftsmanship.",
  },
  {
    question: "How do I shop at Dripthroat?",
    answer:
      "Browse dripthroat.in by Women, Men & Accessories — or download the Dripthroat app when available for a refined mobile experience.",
  },
] as const;

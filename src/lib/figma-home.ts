import { getCategoryImage } from "@/lib/category-images";

export const FIGMA_SECTIONS = [
  { id: "intro", num: "01", label: "Intro" },
  { id: "explore", num: "02", label: "Explore" },
  { id: "worlds", num: "03", label: "Worlds" },
  { id: "signature", num: "04", label: "Signature" },
  { id: "values", num: "05", label: "Values" },
  { id: "experience", num: "06", label: "Experience" },
  { id: "app", num: "07", label: "App" },
] as const;

export const CHOOSE_WORLDS = [
  {
    num: "01",
    slug: "sarees",
    gender: "women",
    title: "The Crimson World",
    subtitle: "Sarees",
    description:
      "Silk drapes, zari borders, and wedding-ready elegance woven for every grand occasion.",
    tint: "#8B1538",
    glow: "rgba(139,21,56,0.45)",
  },
  {
    num: "02",
    slug: "kurtas",
    gender: "men",
    title: "The Emerald World",
    subtitle: "Kurtas",
    description:
      "Festive tailoring and refined ethnic silhouettes for celebrations and evening soirées.",
    tint: "#2D6A4F",
    glow: "rgba(45,106,79,0.45)",
  },
  {
    num: "03",
    slug: "lehengas",
    gender: "women",
    title: "The Royal World",
    subtitle: "Lehengas",
    description:
      "Embroidered celebration pieces crafted for brides, bridesmaids, and festive nights.",
    tint: "#6B21A8",
    glow: "rgba(107,33,168,0.45)",
  },
  {
    num: "04",
    slug: "men-shirts",
    gender: "men",
    title: "The Onyx World",
    subtitle: "Shirts",
    description:
      "Crisp formal lines and modern luxury tailoring for boardroom polish and evening ease.",
    tint: "#1C1C22",
    glow: "rgba(192,192,200,0.25)",
  },
] as const;

export const FIGMA_STATS = [
  { value: "500+", label: "Designs", icon: "floral" },
  { value: "100+", label: "Boutiques", icon: "building" },
  { value: "PREMIUM", label: "Packaging", icon: "box" },
  { value: "EASY", label: "Returns", icon: "return" },
] as const;

export const APP_BENEFITS = [
  "Early access to new collections",
  "Exclusive app-only drops",
  "Order tracking in real time",
  "Saved wishlists & faster checkout",
] as const;

export const SIGNATURE_SLIDES = [
  {
    id: "sarees",
    title: "The Signature Saree Collection",
    description:
      "Handpicked silk drapes woven for weddings, galas, and moments that demand timeless Indian luxury.",
    slug: "sarees",
  },
  {
    id: "lehengas",
    title: "The Royal Lehenga Edit",
    description:
      "Embroidered celebration pieces crafted for brides, bridesmaids, and every festive soirée.",
    slug: "lehengas",
  },
  {
    id: "kurti-corset",
    title: "The Kurti Atelier",
    description:
      "Structured ethnic silhouettes for the modern wardrobe — refined, versatile, unmistakably Chevellè.",
    slug: "kurti-corset",
  },
  {
    id: "co-ord-set",
    title: "The Co-Ord Capsule",
    description:
      "Perfectly matched sets for brunches, parties, and effortless day-to-night transitions.",
    slug: "co-ord-set",
  },
] as const;

export function figmaImage(slug: string, fallbackAlt: string) {
  const entry = getCategoryImage(slug);
  return {
    src: entry?.src ?? "/images/hero/main.webp",
    alt: entry?.alt ?? fallbackAlt,
  };
}

export const HERO_IMAGE = {
  src: "/images/hero/main.webp",
  alt: "Chevellè luxury fashion editorial",
};

export const HERO_FALLBACK =
  "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1920&q=85";

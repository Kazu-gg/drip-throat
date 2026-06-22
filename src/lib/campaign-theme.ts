import type { MainCategoryId } from "@/lib/categories";
import { getCategoryImage } from "@/lib/category-images";

export type CampaignTheme = {
  id: string;
  name: string;
  slug: string;
  palette: string;
  bg: string;
  accent: string;
  secondary: string;
  glow: string;
  particle: string;
  text: string;
  image: string;
  alt: string;
  parentId: MainCategoryId;
};

export const DEFAULT_THEME_ID = "noir";

export const noirTheme: CampaignTheme = {
  id: "noir",
  name: "Chevellè",
  slug: "",
  palette: "Noir & Gold",
  bg: "#050505",
  accent: "#D4AF37",
  secondary: "#E2C663",
  glow: "rgba(212,175,55,0.14)",
  particle: "#D4AF37",
  text: "#F5F5F5",
  image:
    "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1920&q=80",
  alt: "Chevellè luxury fashion editorial",
  parentId: "women",
};

function img(slug: string, fallbackAlt: string) {
  const entry = getCategoryImage(slug);
  return {
    image: entry?.src ?? noirTheme.image,
    alt: entry?.alt ?? fallbackAlt,
  };
}

function theme(
  id: string,
  name: string,
  slug: string,
  palette: string,
  colors: Pick<CampaignTheme, "bg" | "accent" | "secondary" | "glow" | "particle" | "text">,
  parentId: MainCategoryId,
  alt: string
): CampaignTheme {
  const { image, alt: imageAlt } = img(slug, alt);
  return { id, name, slug, palette, ...colors, image, alt: imageAlt, parentId };
}

export const womenCollections: CampaignTheme[] = [
  theme("sarees", "Sarees", "sarees", "Burgundy & Gold", {
    bg: "#140808",
    accent: "#D4AF37",
    secondary: "#8B1538",
    glow: "rgba(139,21,56,0.22)",
    particle: "#C41E3A",
    text: "#FAF0F0",
  }, "women", "Luxury silk saree"),
  theme("lehengas", "Lehengas", "lehengas", "Royal Purple & Gold", {
    bg: "#0C0618",
    accent: "#D4AF37",
    secondary: "#6B21A8",
    glow: "rgba(107,33,168,0.22)",
    particle: "#9333EA",
    text: "#F5F0FA",
  }, "women", "Royal embroidered lehenga"),
  theme("kurti-corset", "Kurti Sets", "kurti-corset", "Emerald & Gold", {
    bg: "#040A08",
    accent: "#D4AF37",
    secondary: "#2D6A4F",
    glow: "rgba(45,106,79,0.22)",
    particle: "#34D399",
    text: "#F0FAF5",
  }, "women", "Emerald kurti set"),
  theme("co-ord-set", "Co-Ord Sets", "co-ord-set", "Champagne & Ivory", {
    bg: "#100F0C",
    accent: "#C9A962",
    secondary: "#F5F0E8",
    glow: "rgba(201,169,98,0.18)",
    particle: "#E2C663",
    text: "#F5F0E8",
  }, "women", "Champagne co-ord set"),
  theme("shirts-tshirt", "Western Wear", "shirts-tshirt", "Black & Platinum", {
    bg: "#030303",
    accent: "#C0C0C8",
    secondary: "#E8E8EC",
    glow: "rgba(192,192,200,0.14)",
    particle: "#A8A8B0",
    text: "#F0F0F2",
  }, "women", "Women shirts and tops"),
];

export const menCollections: CampaignTheme[] = [
  theme("kurtas", "Kurtas", "kurtas", "Emerald & Gold", {
    bg: "#040A08",
    accent: "#D4AF37",
    secondary: "#2D6A4F",
    glow: "rgba(45,106,79,0.22)",
    particle: "#34D399",
    text: "#F0FAF5",
  }, "men", "Men kurta ethnic wear"),
  theme("men-shirts", "Shirts", "men-shirts", "Black & Platinum", {
    bg: "#030303",
    accent: "#C0C0C8",
    secondary: "#E8E8EC",
    glow: "rgba(192,192,200,0.14)",
    particle: "#A8A8B0",
    text: "#F0F0F2",
  }, "men", "Premium men's formal shirt"),
  theme("men-tshirts", "T-Shirts", "men-tshirts", "Charcoal & Silver", {
    bg: "#080808",
    accent: "#B8B8C0",
    secondary: "#D0D0D8",
    glow: "rgba(184,184,192,0.12)",
    particle: "#9CA3AF",
    text: "#F3F4F6",
  }, "men", "Men's essential t-shirt"),
  theme("jeans", "Jeans", "jeans", "Indigo & Gold", {
    bg: "#060810",
    accent: "#D4AF37",
    secondary: "#1E3A5F",
    glow: "rgba(30,58,95,0.22)",
    particle: "#3B82F6",
    text: "#EFF6FF",
  }, "men", "Premium denim jeans"),
  theme("jackets", "Nehru Jackets", "jackets", "Burgundy & Gold", {
    bg: "#120608",
    accent: "#D4AF37",
    secondary: "#8B1538",
    glow: "rgba(139,21,56,0.2)",
    particle: "#C41E3A",
    text: "#FAF0F0",
  }, "men", "Men's nehru jacket"),
];

export const accessoriesCollections: CampaignTheme[] = [
  theme("handbags", "Handbags", "handbags", "Champagne & Gold", {
    bg: "#100F0C",
    accent: "#C9A962",
    secondary: "#F5F0E8",
    glow: "rgba(201,169,98,0.18)",
    particle: "#E2C663",
    text: "#F5F0E8",
  }, "accessories", "Luxury designer handbag"),
  theme("jewellery", "Jewellery", "jewellery", "Royal Purple & Gold", {
    bg: "#0C0618",
    accent: "#D4AF37",
    secondary: "#6B21A8",
    glow: "rgba(107,33,168,0.22)",
    particle: "#9333EA",
    text: "#F5F0FA",
  }, "accessories", "Fine gold jewellery"),
  theme("watches", "Watches", "watches", "Black & Platinum", {
    bg: "#030303",
    accent: "#C0C0C8",
    secondary: "#E8E8EC",
    glow: "rgba(192,192,200,0.12)",
    particle: "#A8A8B0",
    text: "#F0F0F2",
  }, "accessories", "Luxury wristwatch"),
  theme("sunglasses", "Sunglasses", "sunglasses", "Noir & Gold", {
    bg: "#050505",
    accent: "#D4AF37",
    secondary: "#E2C663",
    glow: "rgba(212,175,55,0.14)",
    particle: "#D4AF37",
    text: "#F5F5F5",
  }, "accessories", "Designer sunglasses"),
  theme("wallets", "Wallets", "wallets", "Ivory & Champagne", {
    bg: "#0E0C0A",
    accent: "#C9A962",
    secondary: "#F5F0E8",
    glow: "rgba(245,240,232,0.1)",
    particle: "#E2C663",
    text: "#FAF8F5",
  }, "accessories", "Leather wallet"),
];

export const campaignCollectionsByCategory: Record<MainCategoryId, CampaignTheme[]> = {
  women: womenCollections,
  men: menCollections,
  accessories: accessoriesCollections,
};

/** @deprecated use campaignCollectionsByCategory */
export const campaignCollections = womenCollections;

const allCollections = [
  ...womenCollections,
  ...menCollections,
  ...accessoriesCollections,
];

export function getCampaignCollections(parentId: MainCategoryId): CampaignTheme[] {
  return campaignCollectionsByCategory[parentId];
}

export function getCampaignTheme(id: string): CampaignTheme {
  return allCollections.find((c) => c.id === id) ?? noirTheme;
}

export function applyCampaignTheme(theme: CampaignTheme) {
  const root = document.documentElement;
  root.style.setProperty("--campaign-bg", theme.bg);
  root.style.setProperty("--campaign-accent", theme.accent);
  root.style.setProperty("--campaign-secondary", theme.secondary);
  root.style.setProperty("--campaign-glow", theme.glow);
  root.style.setProperty("--campaign-particle", theme.particle);
  root.style.setProperty("--campaign-text", theme.text);
}

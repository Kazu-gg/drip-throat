import type { MainCategoryId } from "@/lib/categories";
import type { CampaignTheme } from "@/lib/campaign-theme";
import { getCategoryImage } from "@/lib/category-images";

export const SHOWCASE_EASE = [0.22, 1, 0.36, 1] as const;
export const SHOWCASE_DURATION = 0.8;

export type ShowcaseCollection = CampaignTheme & {
  heroImage: string;
  tagline: string;
};

function resolveImage(slug: string, fallback: string) {
  const thumb = getCategoryImage(slug);
  const base = thumb?.src ?? fallback;
  // Single source — card and full-screen bg use the same asset (higher res)
  return base.replace(/w=\d+/, "w=1600").replace(/q=\d+/, "q=85");
}

function showcase(
  id: string,
  name: string,
  slug: string,
  palette: string,
  colors: Pick<
    CampaignTheme,
    "bg" | "accent" | "secondary" | "glow" | "particle" | "text"
  >,
  parentId: MainCategoryId,
  alt: string,
  tagline: string
): ShowcaseCollection {
  const thumb = getCategoryImage(slug);
  const image = resolveImage(slug, thumb?.src ?? "");
  return {
    id,
    name,
    slug,
    palette,
    ...colors,
    image,
    heroImage: image,
    alt: thumb?.alt ?? alt,
    parentId,
    tagline,
  };
}

/** Women — featured editorial worlds */
export const womenShowcaseCollections: ShowcaseCollection[] = [
  showcase(
    "sarees",
    "Sarees",
    "sarees",
    "Burgundy & Gold",
    {
      bg: "#140808",
      accent: "#A8B38A",
      secondary: "#8B1538",
      glow: "rgba(139,21,56,0.28)",
      particle: "#A8B38A",
      text: "#FAF0F0",
    },
    "women",
    "Luxury bridal saree editorial",
    "Silk woven for the grandest occasions"
  ),
  showcase(
    "lehengas",
    "Lehengas",
    "lehengas",
    "Royal Purple & Gold",
    {
      bg: "#0C0618",
      accent: "#A8B38A",
      secondary: "#6B21A8",
      glow: "rgba(107,33,168,0.28)",
      particle: "#A8B38A",
      text: "#F5F0FA",
    },
    "women",
    "Elegant lehenga editorial",
    "Regal embroidery, timeless celebration"
  ),
  showcase(
    "co-ord-set",
    "Co-Ord Sets",
    "co-ord-set",
    "Emerald & Gold",
    {
      bg: "#040A08",
      accent: "#A8B38A",
      secondary: "#2D6A4F",
      glow: "rgba(45,106,79,0.28)",
      particle: "#34D399",
      text: "#F0FAF5",
    },
    "women",
    "Modern luxury co-ord fashion",
    "Contemporary silhouettes, effortless poise"
  ),
  showcase(
    "kurti-corset",
    "Kurtis",
    "kurti-corset",
    "Champagne & Gold",
    {
      bg: "#100F0C",
      accent: "#C9A962",
      secondary: "#F5F0E8",
      glow: "rgba(201,169,98,0.22)",
      particle: "#B6C38E",
      text: "#F5F0E8",
    },
    "women",
    "Premium ethnic kurti wear",
    "Refined craft for everyday elegance"
  ),
];

export const menShowcaseCollections: ShowcaseCollection[] = [
  showcase(
    "kurtas",
    "Kurtas",
    "kurtas",
    "Emerald & Gold",
    {
      bg: "#040A08",
      accent: "#A8B38A",
      secondary: "#2D6A4F",
      glow: "rgba(45,106,79,0.28)",
      particle: "#34D399",
      text: "#F0FAF5",
    },
    "men",
    "Men kurta ethnic wear",
    "Festive tailoring, timeless grace"
  ),
  showcase(
    "men-shirts",
    "Shirts",
    "men-shirts",
    "Noir & Platinum",
    {
      bg: "#030303",
      accent: "#C0C0C8",
      secondary: "#E8E8EC",
      glow: "rgba(192,192,200,0.18)",
      particle: "#A8B38A",
      text: "#F0F0F2",
    },
    "men",
    "Premium men's formal shirt",
    "Crisp lines for boardroom and soirée"
  ),
  showcase(
    "men-tshirts",
    "T-Shirts",
    "men-tshirts",
    "Charcoal & Silver",
    {
      bg: "#080808",
      accent: "#B8B8C0",
      secondary: "#D0D0D8",
      glow: "rgba(184,184,192,0.16)",
      particle: "#A8B38A",
      text: "#F3F4F6",
    },
    "men",
    "Men's essential t-shirt",
    "Elevated essentials, understated luxury"
  ),
  showcase(
    "jeans",
    "Jeans",
    "jeans",
    "Indigo & Gold",
    {
      bg: "#060810",
      accent: "#A8B38A",
      secondary: "#1E3A5F",
      glow: "rgba(30,58,95,0.26)",
      particle: "#A8B38A",
      text: "#EFF6FF",
    },
    "men",
    "Premium denim jeans",
    "Denim refined for the modern gentleman"
  ),
  showcase(
    "jackets",
    "Nehru Jackets",
    "jackets",
    "Burgundy & Gold",
    {
      bg: "#120608",
      accent: "#A8B38A",
      secondary: "#8B1538",
      glow: "rgba(139,21,56,0.24)",
      particle: "#A8B38A",
      text: "#FAF0F0",
    },
    "men",
    "Men's nehru jacket",
    "Layered distinction for every celebration"
  ),
];

export const accessoriesShowcaseCollections: ShowcaseCollection[] = [
  showcase(
    "handbags",
    "Handbags",
    "handbags",
    "Champagne & Gold",
    {
      bg: "#100F0C",
      accent: "#C9A962",
      secondary: "#F5F0E8",
      glow: "rgba(201,169,98,0.22)",
      particle: "#B6C38E",
      text: "#F5F0E8",
    },
    "accessories",
    "Luxury designer handbag",
    "Carry elegance wherever the evening leads"
  ),
  showcase(
    "jewellery",
    "Jewellery",
    "jewellery",
    "Royal Purple & Gold",
    {
      bg: "#0C0618",
      accent: "#A8B38A",
      secondary: "#6B21A8",
      glow: "rgba(107,33,168,0.26)",
      particle: "#A8B38A",
      text: "#F5F0FA",
    },
    "accessories",
    "Fine gold jewellery",
    "Statement pieces that complete the narrative"
  ),
  showcase(
    "watches",
    "Watches",
    "watches",
    "Noir & Platinum",
    {
      bg: "#030303",
      accent: "#C0C0C8",
      secondary: "#E8E8EC",
      glow: "rgba(192,192,200,0.16)",
      particle: "#A8B38A",
      text: "#F0F0F2",
    },
    "accessories",
    "Luxury wristwatch",
    "Time told with quiet precision"
  ),
  showcase(
    "sunglasses",
    "Sunglasses",
    "sunglasses",
    "Olive & Sage",
    {
      bg: "#12150a",
      accent: "#A8B38A",
      secondary: "#1A1610",
      glow: "rgba(168,179,138,0.2)",
      particle: "#A8B38A",
      text: "#F5F5F5",
    },
    "accessories",
    "Designer sunglasses",
    "Frames sculpted for sun-drenched glamour"
  ),
  showcase(
    "wallets",
    "Wallets",
    "wallets",
    "Ivory & Champagne",
    {
      bg: "#0E0C0A",
      accent: "#C9A962",
      secondary: "#F5F0E8",
      glow: "rgba(245,240,232,0.14)",
      particle: "#B6C38E",
      text: "#FAF8F5",
    },
    "accessories",
    "Leather wallet",
    "Everyday carry, impeccably crafted"
  ),
];

const showcaseByCategory: Record<MainCategoryId, ShowcaseCollection[]> = {
  women: womenShowcaseCollections,
  men: menShowcaseCollections,
  accessories: accessoriesShowcaseCollections,
};

/** @deprecated use getShowcaseCollections */
export const showcaseCollections = womenShowcaseCollections;

export function getShowcaseCollections(
  parentId: MainCategoryId
): ShowcaseCollection[] {
  return showcaseByCategory[parentId];
}

export function getShowcaseCollection(
  id: string,
  parentId?: MainCategoryId
): ShowcaseCollection {
  const pools = parentId
    ? [showcaseByCategory[parentId]]
    : Object.values(showcaseByCategory);
  for (const pool of pools) {
    const found = pool.find((c) => c.id === id);
    if (found) return found;
  }
  return womenShowcaseCollections[0];
}

export const allShowcaseHeroUrls = [
  ...womenShowcaseCollections,
  ...menShowcaseCollections,
  ...accessoriesShowcaseCollections,
].map((c) => c.image);

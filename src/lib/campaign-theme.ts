import type { MainCategoryId } from "@/lib/categories";
import { getCategoryImage } from "@/lib/category-images";
import { womenShowcaseCollections, menShowcaseCollections, accessoriesShowcaseCollections } from "@/lib/showcase-collections";

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

/** Shared olive & sage palette — sampled from Dripthroat mockup */
export const GOLD_BLACK: Pick<
  CampaignTheme,
  "bg" | "accent" | "secondary" | "glow" | "particle" | "text" | "palette"
> = {
  palette: "Olive & Sage",
  bg: "#12150a",
  accent: "#A8B38A",
  secondary: "#1A1F10",
  glow: "rgba(168,179,138,0.18)",
  particle: "#A8B38A",
  text: "#D4CEBE",
};

export const DEFAULT_THEME_ID = "noir";

export const noirTheme: CampaignTheme = {
  id: "noir",
  name: "Dripthroat",
  slug: "",
  ...GOLD_BLACK,
  image:
    "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1920&q=80",
  alt: "Dripthroat luxury fashion editorial",
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
  parentId: MainCategoryId,
  alt: string
): CampaignTheme {
  const { image, alt: imageAlt } = img(slug, alt);
  return {
    id,
    name,
    slug,
    ...GOLD_BLACK,
    image,
    alt: imageAlt,
    parentId,
  };
}

export const womenCollections: CampaignTheme[] = [
  ...womenShowcaseCollections,
  theme("shirts-tshirt", "Western Wear", "shirts-tshirt", "women", "Women shirts and tops"),
];

export const menCollections: CampaignTheme[] = [...menShowcaseCollections];

export const accessoriesCollections: CampaignTheme[] = [...accessoriesShowcaseCollections];

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

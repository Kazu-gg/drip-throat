import type { MainCategoryId } from "@/lib/categories";
import { getCampaignCollections } from "@/lib/campaign-theme";
import { products } from "@/lib/products";

export type RunwayIntroPanel = {
  type: "intro";
  title: string;
  subtitle: string;
  body: string;
};

export type RunwayLookPanel = {
  type: "look";
  key: string;
  href: string;
  name: string;
  category: string;
  image: string;
  alt: string;
};

export type RunwayPanel = RunwayIntroPanel | RunwayLookPanel;

const intros: Record<MainCategoryId, RunwayIntroPanel> = {
  women: {
    type: "intro",
    title: "The Runway",
    subtitle: "Walk the Collection",
    body: "Vertical scroll becomes horizontal motion — like front row at Paris, reimagined for India.",
  },
  men: {
    type: "intro",
    title: "The Runway",
    subtitle: "Men's Edit",
    body: "Tailored silhouettes and refined ethnic wear — scroll through the men's collection like a private show.",
  },
  accessories: {
    type: "intro",
    title: "The Runway",
    subtitle: "Finishing Touches",
    body: "Handbags, jewellery, watches, and more — the details that complete every look.",
  },
};

export function getRunwayPanels(categoryId: MainCategoryId): RunwayPanel[] {
  const intro = intros[categoryId];

  if (categoryId === "women") {
    const looks: RunwayLookPanel[] = products.slice(0, 4).map((p) => ({
      type: "look",
      key: p.slug,
      href: `/products/${p.slug}`,
      name: p.name,
      category: p.category,
      image: p.image.src,
      alt: p.image.alt,
    }));
    return [intro, ...looks];
  }

  const looks: RunwayLookPanel[] = getCampaignCollections(categoryId)
    .slice(0, 4)
    .map((c) => ({
      type: "look",
      key: c.id,
      href: `/collections/${c.slug}`,
      name: c.name,
      category: c.palette,
      image: c.image,
      alt: c.alt,
    }));

  return [intro, ...looks];
}

import { optimizedSrc } from "@/lib/site-images";

/**
 * Homepage Explore Our Worlds cards — same pattern as unisex:
 * portrait at public/images/collections/<gender>/main.webp
 * (page banners live in public/images/collections/<gender>/hero/)
 */
export const WORLD_CARD_PATHS = {
  women: "/images/collections/women/main.webp",
  men: "/images/collections/men/main.webp",
  unisex: "/images/collections/unisex/main.webp",
} as const;

const WORLD_CARD_KEYS: Record<keyof typeof WORLD_CARD_PATHS, string> = {
  women: "category-card:women",
  men: "category-card:men",
  unisex: "category:unisex",
};

export type WorldCardId = keyof typeof WORLD_CARD_PATHS;

export function getWorldCardImage(id: string, label: string) {
  const cardId = id as WorldCardId;
  const publicPath = WORLD_CARD_PATHS[cardId];
  const manifestKey = WORLD_CARD_KEYS[cardId];
  if (!publicPath || !manifestKey) return null;

  const src = optimizedSrc(manifestKey, publicPath);
  if (!src) return null;

  return {
    src,
    alt: `${label} collection`,
  };
}

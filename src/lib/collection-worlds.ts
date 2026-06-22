export type CollectionWorld = {
  id: string;
  name: string;
  tagline: string;
  bg: string;
  accent: string;
  accentMuted: string;
  glow: string;
  text: string;
};

import {
  campaignCollections,
  campaignCollectionsByCategory,
  noirTheme,
  type CampaignTheme,
} from "@/lib/campaign-theme";

function toWorld(theme: CampaignTheme): CollectionWorld {
  return {
    id: theme.id,
    name: theme.name,
    tagline: theme.palette,
    bg: theme.bg,
    accent: theme.accent,
    accentMuted: theme.glow,
    glow: theme.glow,
    text: theme.text,
  };
}

const worlds: Record<string, CollectionWorld> = Object.fromEntries(
  [
    ...campaignCollectionsByCategory.women,
    ...campaignCollectionsByCategory.men,
    ...campaignCollectionsByCategory.accessories,
  ].map((c) => [c.id, toWorld(c)])
);

const defaultWorld: CollectionWorld = toWorld(noirTheme);

export function getCollectionWorld(slug: string): CollectionWorld {
  return worlds[slug] ?? defaultWorld;
}

export const featuredWorlds = campaignCollectionsByCategory.women.map(toWorld);

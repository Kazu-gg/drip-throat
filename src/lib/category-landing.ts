import type { MainCategoryId } from "@/lib/categories";
import { collections, getCollectionBySlug, getMainCategory } from "@/lib/categories";
import { getCategoryImage } from "@/lib/category-images";
import { optimizedSrc } from "@/lib/site-images";

export type CategoryLandingId = MainCategoryId | "unisex";

export type CategoryLandingConfig = {
  /** Fallback category card image if no dedicated hero upload exists */
  heroFallbackSlug: string;
  tint: string;
  eyebrow: string;
};

export const CATEGORY_LANDING: Record<MainCategoryId, CategoryLandingConfig> = {
  women: {
    heroFallbackSlug: "sarees",
    tint: "#8B1538",
    eyebrow: "Women's World",
  },
  men: {
    heroFallbackSlug: "jackets",
    tint: "#2D6A4F",
    eyebrow: "Men's World",
  },
  accessories: {
    heroFallbackSlug: "jewellery",
    tint: "#1C1C22",
    eyebrow: "Accessories",
  },
};

export const UNISEX_LANDING = {
  heroFallbackSlug: "unisex",
  tint: "#6B21A8",
  eyebrow: "Unisex World",
  name: "Unisex",
  description:
    "Shirts for her and him, everyday tees, denim, jackets & co-ords — relaxed pieces made to be shared, styled, and worn by anyone.",
  subcategorySlugs: [
    "shirts-tshirt",
    "men-shirts",
    "men-tshirts",
    "jeans",
    "jackets",
    "co-ord-set",
  ] as const,
};

function landingHeroImage(landingId: CategoryLandingId, fallbackSlug: string, alt: string) {
  const fallback = getCategoryImage(fallbackSlug)?.src ?? "";
  return {
    src: optimizedSrc(`category-hero:${landingId}`, fallback),
    alt,
  };
}

export function isMainCategoryId(value: string | undefined): value is MainCategoryId {
  return value === "women" || value === "men" || value === "accessories";
}

export function isCategoryLandingId(value: string | undefined): value is CategoryLandingId {
  return isMainCategoryId(value) || value === "unisex";
}

export function getCategoryLanding(landingId: CategoryLandingId) {
  if (landingId === "unisex") {
    const hero = landingHeroImage("unisex", UNISEX_LANDING.heroFallbackSlug, UNISEX_LANDING.name);
    return {
      ...UNISEX_LANDING,
      imageSrc: hero.src,
      imageAlt: hero.alt,
    };
  }

  const main = getMainCategory(landingId);
  const config = CATEGORY_LANDING[landingId];
  const hero = landingHeroImage(
    landingId,
    config.heroFallbackSlug,
    `${main?.name ?? landingId} collection hero`
  );
  return {
    ...config,
    name: main?.name ?? landingId,
    description: main?.description ?? "",
    imageSrc: hero.src,
    imageAlt: hero.alt,
  };
}

export function getLandingTint(landingId: CategoryLandingId) {
  return landingId === "unisex"
    ? UNISEX_LANDING.tint
    : CATEGORY_LANDING[landingId].tint;
}

export function getLandingSubcategories(landingId: CategoryLandingId) {
  if (landingId === "unisex") {
    return UNISEX_LANDING.subcategorySlugs
      .map((id) => getCollectionBySlug(id))
      .filter((c): c is NonNullable<typeof c> => c != null);
  }
  return collections.filter((c) => c.parentId === landingId);
}

export function getLandingProductCollectionIds(landingId: CategoryLandingId): string[] {
  if (landingId === "unisex") {
    return [...UNISEX_LANDING.subcategorySlugs];
  }
  return collections.filter((c) => c.parentId === landingId).map((c) => c.id);
}

export function getLandingFilterCategories(landingId: CategoryLandingId) {
  return getLandingSubcategories(landingId);
}

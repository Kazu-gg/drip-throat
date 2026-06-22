import { PAGE_TITLES, metaDescription } from "@/lib/seo";

export type MainCategoryId = "women" | "men" | "accessories";

export type CategoryIconId =
  | "saree"
  | "lehenga"
  | "kurti-corset"
  | "coord"
  | "suit"
  | "womens-shirt"
  | "kurta"
  | "mens-shirt"
  | "tshirt"
  | "jeans"
  | "pants"
  | "jacket"
  | "handbag"
  | "jewellery"
  | "watch"
  | "sunglasses"
  | "wallet"
  | "belt";

export type MainCategory = {
  id: MainCategoryId;
  name: string;
  description: string;
};

export type Subcategory = {
  id: string;
  parentId: MainCategoryId;
  name: string;
  subtitle: string;
  icon: CategoryIconId;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string[];
  longDescription: string;
};

export const mainCategories: MainCategory[] = [
  {
    id: "women",
    name: "Women",
    description: "Sarees, lehengas, kurtis, co-ords, suits & more.",
  },
  {
    id: "men",
    name: "Men",
    description: "Kurtas, shirts, denim, trousers & nehru jackets.",
  },
  {
    id: "accessories",
    name: "Accessories",
    description: "Handbags, jewellery, watches, sunglasses & more.",
  },
];

function sub(
  id: keyof typeof PAGE_TITLES,
  parentId: MainCategoryId,
  name: string,
  subtitle: string,
  icon: CategoryIconId,
  desc: string,
  keywords: string[]
): Subcategory {
  return {
    id,
    parentId,
    name,
    subtitle,
    icon,
    seoTitle: PAGE_TITLES[id],
    seoDescription: metaDescription(desc),
    seoKeywords: keywords,
    longDescription: desc,
  };
}

export const subcategories: Subcategory[] = [
  sub(
    "sarees",
    "women",
    "Sarees",
    "Timeless drapes",
    "saree",
    "Explore Chevellè sarees — curated silk and designer drapes for weddings, festivals, and refined everyday elegance.",
    ["Sarees", "designer sarees online", "premium ethnic wear"]
  ),
  sub(
    "lehengas",
    "women",
    "Lehengas",
    "Regal silhouettes",
    "lehenga",
    "Chevellè lehengas — handpicked pieces for celebrations, weddings, and festive occasions.",
    ["Lehengas", "luxury lehenga India", "festive wear"]
  ),
  sub(
    "kurti-corset",
    "women",
    "Kurti / Corset",
    "Kurti Sets",
    "kurti-corset",
    "Kurti sets and corset styles — structured ethnic elegance curated for the modern wardrobe.",
    ["Kurti Sets", "kurti corset", "ethnic kurtis India"]
  ),
  sub(
    "co-ord-set",
    "women",
    "Co-ord Set",
    "Co-ord Sets",
    "coord",
    "Premium co-ord sets — perfectly matched pieces for parties, brunches, and effortless style.",
    ["Co-ord Sets", "women co-ord India", "matching outfits"]
  ),
  sub(
    "suit",
    "women",
    "Suit",
    "Salwar Suits",
    "suit",
    "Salwar suits and anarkali sets — tailored grace for weddings, festivals, and formal gatherings.",
    ["Salwar Suits", "women suits India", "anarkali suits"]
  ),
  sub(
    "shirts-tshirt",
    "women",
    "Shirts / T-Shirt",
    "Shirts + T-Shirts",
    "womens-shirt",
    "Women's shirts and t-shirts — contemporary essentials with a premium Chevellè finish.",
    ["Women Shirts", "women t-shirts India", "premium tops"]
  ),
  sub(
    "kurtas",
    "men",
    "Kurtas",
    "Festive & everyday",
    "kurta",
    "Men's kurtas — refined ethnic tailoring for weddings, festivals, and elevated daily wear.",
    ["Men Kurtas", "designer kurta men", "mens ethnic wear"]
  ),
  sub(
    "men-shirts",
    "men",
    "Shirts",
    "Formal & casual",
    "mens-shirt",
    "Premium men's shirts — crisp tailoring for work, occasions, and weekend elegance.",
    ["Men Shirts", "formal shirts men", "premium menswear"]
  ),
  sub(
    "men-tshirts",
    "men",
    "T-Shirts",
    "Essential basics",
    "tshirt",
    "Men's t-shirts — quality fabrics and refined fits for everyday luxury.",
    ["Men T-Shirts", "premium t-shirts men", "casual menswear"]
  ),
  sub(
    "jeans",
    "men",
    "Jeans",
    "Denim essentials",
    "jeans",
    "Men's jeans — premium denim cuts curated for comfort and contemporary style.",
    ["Men Jeans", "premium denim India", "designer jeans men"]
  ),
  sub(
    "pants",
    "men",
    "Pants",
    "Trousers",
    "pants",
    "Men's trousers — tailored pants for formal, festive, and smart-casual looks.",
    ["Men Trousers", "formal pants men", "mens pants India"]
  ),
  sub(
    "jackets",
    "men",
    "Jackets",
    "Nehru Jackets",
    "jacket",
    "Nehru jackets and layered outerwear — signature menswear for celebrations and events.",
    ["Nehru Jackets", "men jackets India", "festive menswear"]
  ),
  sub(
    "handbags",
    "accessories",
    "Handbags",
    "Carry in style",
    "handbag",
    "Luxury handbags — curated clutches, totes, and evening bags to complete every look.",
    ["Handbags", "luxury bags India", "designer handbags"]
  ),
  sub(
    "jewellery",
    "accessories",
    "Jewellery",
    "Finishing touches",
    "jewellery",
    "Fine jewellery — earrings, necklaces, and statement pieces curated for Indian luxury.",
    ["Jewellery", "luxury jewellery India", "designer jewellery"]
  ),
  sub(
    "watches",
    "accessories",
    "Watches",
    "Timeless detail",
    "watch",
    "Watches — refined timepieces and fashion watches for everyday and occasion wear.",
    ["Watches", "luxury watches India", "fashion watches"]
  ),
  sub(
    "sunglasses",
    "accessories",
    "Sunglasses",
    "Sun-ready style",
    "sunglasses",
    "Sunglasses — premium frames for travel, city days, and elevated everyday style.",
    ["Sunglasses", "designer sunglasses India", "luxury eyewear"]
  ),
  sub(
    "wallets",
    "accessories",
    "Wallets",
    "Everyday luxury",
    "wallet",
    "Wallets — leather and premium finishes for a polished everyday carry.",
    ["Wallets", "leather wallets men", "premium wallets India"]
  ),
  sub(
    "belts",
    "accessories",
    "Belts",
    "Refined accents",
    "belt",
    "Belts — classic leather and statement buckles to elevate any outfit.",
    ["Belts", "leather belts men", "designer belts India"]
  ),
];

/** Flat list used for routes, sitemap, and collection pages */
export type Collection = Subcategory & {
  imageAlt: string;
};

export const collections: Collection[] = subcategories.map((cat) => ({
  ...cat,
  imageAlt: `${cat.name} — ${cat.subtitle} by Chevellè`,
}));

export function getMainCategory(id: MainCategoryId): MainCategory | undefined {
  return mainCategories.find((c) => c.id === id);
}

export const SHOP_CATEGORY_PARAM = "category";

export function parseMainCategoryId(value: string | null): MainCategoryId {
  if (value === "men" || value === "accessories" || value === "women") {
    return value;
  }
  return "women";
}

export function getSubcategoriesByParent(parentId: MainCategoryId): Subcategory[] {
  return subcategories.filter((c) => c.parentId === parentId);
}

export function getCollectionBySlug(slug: string): Collection | undefined {
  return collections.find((c) => c.id === slug);
}

export function getMainCategoryForCollection(
  collection: Collection
): MainCategory | undefined {
  return getMainCategory(collection.parentId);
}

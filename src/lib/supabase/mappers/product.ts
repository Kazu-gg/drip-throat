import type { Product, ProductImage } from "@/lib/products";
import { DEFAULT_PRODUCT_SIZES } from "@/lib/products";
import type { DbProduct } from "@/lib/supabase/queries/products";
import { toSlug } from "@/lib/supabase/queries/products";

const DB_TO_WEBSITE_SLUG: Record<string, string> = {
  "women-sarees": "sarees",
  "women-lehengas": "lehengas",
  "women-salwar-suits": "suit",
  "women-kurti-sets": "kurti-corset",
  "women-co-ord-sets": "co-ord-set",
  "women-shirts": "shirts-tshirt",
  "women-t-shirts": "shirts-tshirt",
  "men-kurtas": "kurtas",
  "men-shirts": "men-shirts",
  "men-t-shirts": "men-tshirts",
  "men-jeans": "jeans",
  "men-trousers": "pants",
  "men-nehru-jackets": "jackets",
  "accessories-handbags": "handbags",
  "accessories-jewellery": "jewellery",
  "accessories-watches": "watches",
  "accessories-wallets": "wallets",
  "accessories-belts": "belts",
  "accessories-sunglasses": "sunglasses",
};

function mapCollection(db: DbProduct): string {
  const categoryRow = Array.isArray(db.categories) ? db.categories[0] : db.categories;
  const dbSlug = categoryRow?.slug ?? db.collection ?? "";
  return DB_TO_WEBSITE_SLUG[dbSlug] ?? db.collection ?? "all";
}

function mapCategory(product: DbProduct): string {
  const category = product.categories;
  const categoryRow = Array.isArray(category) ? category[0] : category;
  const parent = categoryRow?.parent;
  const parentName = Array.isArray(parent) ? parent[0]?.name : parent?.name;
  return categoryRow?.name ?? parentName ?? "Uncategorized";
}

function mapImage(db: DbProduct): ProductImage {
  const isBase64 = db.image_url?.startsWith("data:");
  const src = !db.image_url || isBase64 ? "/images/placeholder.jpg" : db.image_url;
  return {
    src,
    alt: db.name,
    fileName: src.split("/").pop() ?? db.name,
    width: 800,
    height: 1000,
  };
}

function mapPriceDisplay(price: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
}

export function dbProductToProduct(db: DbProduct): Product {
  const slug = db.sku ? toSlug(db.sku) : toSlug(db.name);

  return {
    id: db.id,
    slug,
    name: db.name,
    category: mapCategory(db),
    collectionId: mapCollection(db),
    price: db.price,
    priceDisplay: mapPriceDisplay(db.price),
    description: db.description ?? "",
    seoDescription: db.description ?? `${db.name} — Dripthroat`,
    seoKeywords: [
      db.name,
      mapCategory(db),
      db.fabric,
      db.color,
      "Indian ethnic wear",
      "Dripthroat",
    ].filter((k): k is string => Boolean(k)),
    image: mapImage(db),
    relatedSlugs: [],
    color: db.color,
    fabric: db.fabric,
    inStock: db.in_stock,
    sizes: [...DEFAULT_PRODUCT_SIZES],
  };
}

export function dbProductsToProducts(dbProducts: DbProduct[]): Product[] {
  const products = dbProducts.map(dbProductToProduct);

  return products.map((product, index) => {
    const relatedSlugs = products
      .filter((p) => p.collectionId === product.collectionId && p.id !== product.id)
      .slice(0, 2)
      .map((p) => p.slug);

    if (relatedSlugs.length === 0) {
      const fallback = products
        .filter((_, i) => i !== index)
        .slice(0, 2)
        .map((p) => p.slug);
      return { ...product, relatedSlugs: fallback };
    }

    return { ...product, relatedSlugs };
  });
}

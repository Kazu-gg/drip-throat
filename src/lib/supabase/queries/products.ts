// Ported from drippy-project/src/lib/catalog-search.ts
// Falls back to static catalog when Supabase env is not configured (mock/dev).

import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { products as staticProducts, type Product } from "@/lib/products";
import { isSupabaseConfigured } from "@/lib/auth";

export type DbProduct = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  image_url: string | null;
  store_id: string;
  in_stock: boolean;
  variants: unknown;
  collection: string | null;
  fabric: string | null;
  color: string | null;
  category_id: string | null;
  sku: string | null;
  categories?: {
    id?: string;
    name?: string;
    slug?: string;
    parent?: { name?: string; slug?: string } | { name?: string; slug?: string }[] | null;
  } | null;
};

const PRODUCT_SELECT =
  "id, name, description, price, image_url, store_id, in_stock, variants, collection, fabric, color, category_id, sku, categories(id, name, slug, parent:parent_id(name, slug))";

const CATEGORY_SELECT = "id, name, slug, parent_id";

/** Website slug → DB slug(s). Some website slugs map to multiple curated categories. */
const SLUG_MAP: Record<string, string> = {
  sarees: "women-sarees",
  lehengas: "women-lehengas",
  "kurti-corset": "women-kurti-sets",
  "co-ord-set": "women-co-ord-sets",
  suit: "women-salwar-suits",
  "shirts-tshirt": "women-shirts",
  kurtas: "men-kurtas",
  "men-shirts": "men-shirts",
  "men-tshirts": "men-t-shirts",
  jeans: "men-jeans",
  pants: "men-trousers",
  jackets: "men-nehru-jackets",
  handbags: "accessories-handbags",
  wallets: "accessories-wallets",
  jewellery: "accessories-jewellery",
  watches: "accessories-watches",
  belts: "accessories-belts",
  sunglasses: "accessories-sunglasses",
};

const COMPOSITE_SLUG_MAP: Record<string, string[]> = {
  "shirts-tshirt": ["women-shirts", "women-t-shirts"],
};

let supabaseSingleton: SupabaseClient | null | undefined;

function getSupabase(): SupabaseClient | null {
  if (supabaseSingleton !== undefined) return supabaseSingleton;
  if (!isSupabaseConfigured()) {
    supabaseSingleton = null;
    return null;
  }
  supabaseSingleton = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  return supabaseSingleton;
}

function isMockCatalog(): boolean {
  return (
    process.env.NEXT_PUBLIC_USE_MOCK === "true" || !isSupabaseConfigured()
  );
}

export function toSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function toDbSlug(websiteSlug: string): string {
  return SLUG_MAP[websiteSlug] ?? websiteSlug;
}

export function toDbSlugs(websiteSlug: string): string[] {
  return COMPOSITE_SLUG_MAP[websiteSlug] ?? [toDbSlug(websiteSlug)];
}

function productToDb(p: Product): DbProduct {
  return {
    id: p.id,
    name: p.name,
    description: p.description,
    price: p.price,
    image_url: p.image.src,
    store_id: "mock-store",
    in_stock: true,
    variants: null,
    collection: p.collectionId,
    fabric: p.fabric ?? null,
    color: p.color ?? null,
    category_id: p.collectionId,
    sku: p.slug,
    categories: {
      id: p.collectionId,
      name: p.category,
      slug: p.collectionId,
      parent: null,
    },
  };
}

function mockAllProducts(limit = 200): DbProduct[] {
  return staticProducts.slice(0, limit).map(productToDb);
}

function mapRow(row: Record<string, unknown>): DbProduct {
  const category = row.categories as DbProduct["categories"];
  const categoryRow = Array.isArray(category) ? category[0] : category;
  const parent = categoryRow?.parent;
  const parentName = Array.isArray(parent) ? parent[0]?.name : parent?.name;
  const parentSlug = Array.isArray(parent) ? parent[0]?.slug : parent?.slug;

  return {
    id: row.id as string,
    name: row.name as string,
    description: (row.description as string | null) ?? null,
    price: Number(row.price),
    image_url: (row.image_url as string | null) ?? null,
    store_id: row.store_id as string,
    in_stock: row.in_stock as boolean,
    variants: row.variants,
    collection: (row.collection as string | null) ?? null,
    fabric: (row.fabric as string | null) ?? null,
    color: (row.color as string | null) ?? null,
    category_id:
      (categoryRow?.id as string | undefined) ??
      (row.category_id as string | null) ??
      null,
    sku: (row.sku as string | null) ?? null,
    categories: categoryRow
      ? {
          id: categoryRow.id,
          name: categoryRow.name,
          slug: categoryRow.slug,
          parent: parentName ? { name: parentName, slug: parentSlug } : null,
        }
      : null,
  };
}

async function categoryIdsFromCategoryRow(
  supabase: SupabaseClient,
  catData: { id: string; parent_id: string | null } | null,
  catError: unknown
): Promise<string[]> {
  if (catError || !catData) return [];

  if (!catData.parent_id) {
    const { data: children } = await supabase
      .from("categories")
      .select("id")
      .eq("parent_id", catData.id);
    const categoryIds = (children ?? []).map((c: { id: string }) => c.id);
    return categoryIds.length ? categoryIds : [catData.id];
  }

  return [catData.id];
}

async function categoryIdsForDbSlug(
  supabase: SupabaseClient,
  dbSlug: string
): Promise<string[]> {
  const { data: catData, error: catError } = await supabase
    .from("categories")
    .select(CATEGORY_SELECT)
    .eq("slug", dbSlug)
    .limit(1)
    .maybeSingle();

  return categoryIdsFromCategoryRow(supabase, catData, catError);
}

/** Fetch all products for the shop catalog */
export async function fetchAllProducts(limit = 200): Promise<DbProduct[]> {
  if (isMockCatalog()) return mockAllProducts(limit);

  const supabase = getSupabase()!;
  const { data, error } = await supabase
    .from("products")
    .select(PRODUCT_SELECT)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) throw error;
  return (data ?? []).map((row) => mapRow(row as Record<string, unknown>));
}

/** Fetch products by DB category slug (e.g. "women-sarees") */
export async function fetchProductsByCategorySlug(
  dbSlug: string,
  limit = 80
): Promise<DbProduct[]> {
  if (isMockCatalog()) {
    const websiteSlug =
      Object.entries(SLUG_MAP).find(([, v]) => v === dbSlug)?.[0] ?? dbSlug;
    return mockAllProducts(limit).filter(
      (p) => p.collection === websiteSlug || p.sku === websiteSlug
    );
  }

  const supabase = getSupabase()!;
  const { data: catData, error: catError } = await supabase
    .from("categories")
    .select(CATEGORY_SELECT)
    .eq("slug", dbSlug)
    .limit(1)
    .maybeSingle();

  console.log("[products] slug:", dbSlug, "category found:", catData, "error:", catError);

  const categoryIds = await categoryIdsFromCategoryRow(supabase, catData, catError);
  if (!categoryIds.length) return [];

  const { data, error } = await supabase
    .from("products")
    .select(PRODUCT_SELECT)
    .in("category_id", categoryIds)
    .order("created_at", { ascending: false })
    .limit(limit);

  console.log("[products] categoryIds:", categoryIds, "data:", data, "error:", error);

  if (error) throw error;
  return (data ?? []).map((row) => mapRow(row as Record<string, unknown>));
}

/** Fetch products for a website collection slug (handles composite mappings) */
export async function fetchProductsForWebsiteSlug(
  websiteSlug: string,
  limit = 80
): Promise<DbProduct[]> {
  if (isMockCatalog()) {
    return mockAllProducts(limit).filter((p) => p.collection === websiteSlug);
  }

  const supabase = getSupabase()!;
  const dbSlugs = toDbSlugs(websiteSlug);
  if (dbSlugs.length === 1) {
    return fetchProductsByCategorySlug(dbSlugs[0], limit);
  }

  const categoryIds: string[] = [];

  for (const dbSlug of dbSlugs) {
    const ids = await categoryIdsForDbSlug(supabase, dbSlug);
    categoryIds.push(...ids);
  }

  const uniqueCategoryIds = [...new Set(categoryIds)];
  if (!uniqueCategoryIds.length) return [];

  const { data, error } = await supabase
    .from("products")
    .select(PRODUCT_SELECT)
    .in("category_id", uniqueCategoryIds)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) throw error;
  return (data ?? []).map((row) => mapRow(row as Record<string, unknown>));
}

/** Fetch products by collection key (e.g. "new_arrivals", "bridal") */
export async function fetchProductsByCollection(
  collection: string,
  limit = 60
): Promise<DbProduct[]> {
  if (isMockCatalog()) {
    return mockAllProducts(limit).filter((p) => p.collection === collection);
  }

  const supabase = getSupabase()!;
  const { data, error } = await supabase
    .from("products")
    .select(PRODUCT_SELECT)
    .eq("collection", collection)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) throw error;
  return (data ?? []).map((row) => mapRow(row as Record<string, unknown>));
}

/** Fetch a single product by its derived slug or UUID */
export async function fetchProductBySlug(slug: string): Promise<DbProduct | null> {
  if (isMockCatalog()) {
    const match = staticProducts.find(
      (p) => p.slug === slug || p.id === slug || toSlug(p.name) === slug
    );
    return match ? productToDb(match) : null;
  }

  const supabase = getSupabase()!;
  const uuidPattern =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

  if (uuidPattern.test(slug)) {
    const { data } = await supabase
      .from("products")
      .select(PRODUCT_SELECT)
      .eq("id", slug)
      .maybeSingle();
    return data ? mapRow(data as Record<string, unknown>) : null;
  }

  const { data: bySku } = await supabase
    .from("products")
    .select(PRODUCT_SELECT)
    .ilike("sku", slug)
    .limit(1);

  if (bySku?.[0]) return mapRow(bySku[0] as Record<string, unknown>);

  const { data: all } = await supabase.from("products").select(PRODUCT_SELECT).limit(500);

  const match = (all ?? []).find(
    (row) => toSlug((row as Record<string, unknown>).name as string) === slug
  );

  return match ? mapRow(match as Record<string, unknown>) : null;
}

/** Search products by text */
export async function searchProducts(query: string): Promise<DbProduct[]> {
  if (isMockCatalog()) {
    const q = query.toLowerCase();
    return mockAllProducts().filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        (p.description ?? "").toLowerCase().includes(q) ||
        (p.fabric ?? "").toLowerCase().includes(q) ||
        (p.color ?? "").toLowerCase().includes(q)
    );
  }

  const supabase = getSupabase()!;
  const pattern = `%${query}%`;

  const [byName, byDesc, byFabric, byColor] = await Promise.all([
    supabase.from("products").select(PRODUCT_SELECT).ilike("name", pattern).limit(40),
    supabase.from("products").select(PRODUCT_SELECT).ilike("description", pattern).limit(20),
    supabase.from("products").select(PRODUCT_SELECT).ilike("fabric", pattern).limit(20),
    supabase.from("products").select(PRODUCT_SELECT).ilike("color", pattern).limit(20),
  ]);

  const productMap = new Map<string, DbProduct>();
  for (const res of [byName, byDesc, byFabric, byColor]) {
    if (res.error) throw res.error;
    for (const row of res.data ?? []) {
      const p = mapRow(row as Record<string, unknown>);
      productMap.set(p.id, p);
    }
  }

  return [...productMap.values()];
}

export type ProductSitemapEntry = {
  slug: string;
  lastModified: string | null;
};

/** Lightweight product list for sitemap generation (crawler discovery). */
export async function fetchProductSitemapEntries(
  limit = 500
): Promise<ProductSitemapEntry[]> {
  if (isMockCatalog()) {
    return mockAllProducts(limit).map((p) => ({
      slug: p.sku ? toSlug(p.sku) : toSlug(p.name),
      lastModified: null,
    }));
  }

  const supabase = getSupabase()!;
  const { data, error } = await supabase
    .from("products")
    .select("name, sku, updated_at, created_at")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("[sitemap] failed to fetch products:", error);
    return [];
  }

  const seen = new Set<string>();
  const entries: ProductSitemapEntry[] = [];

  for (const row of data ?? []) {
    const slug = row.sku ? toSlug(row.sku) : toSlug(row.name as string);
    if (!slug || seen.has(slug)) continue;
    seen.add(slug);
    entries.push({
      slug,
      lastModified: (row.updated_at ?? row.created_at) as string | null,
    });
  }

  return entries;
}

import type { Product } from "@/lib/products";
import { collections, type MainCategoryId } from "@/lib/categories";
import { optimizedSrc } from "@/lib/site-images";

export const ORDER_STATUSES = [
  "placed",
  "accepted",
  "packed",
  "out_for_delivery",
  "delivered",
] as const;

export type OrderStatus = (typeof ORDER_STATUSES)[number];

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  placed: "Order Placed",
  accepted: "Processing",
  packed: "Packed",
  out_for_delivery: "Out for Delivery",
  delivered: "Delivered",
};

export const PAYMENT_METHODS = [
  { id: "upi", label: "UPI" },
  { id: "card", label: "Credit / Debit Card" },
  { id: "netbanking", label: "Net Banking" },
  { id: "cod", label: "Cash on Delivery" },
] as const;

export const FILTER_COLORS = [
  { id: "gold", label: "Gold", hex: "#D4AF37" },
  { id: "crimson", label: "Crimson", hex: "#8B1538" },
  { id: "emerald", label: "Emerald", hex: "#2D6A4F" },
  { id: "ivory", label: "Ivory", hex: "#F8F0EB" },
  { id: "noir", label: "Noir", hex: "#1a1a1a" },
] as const;

export const FILTER_MATERIALS = ["Silk", "Velvet", "Cotton", "Linen", "Georgette"] as const;
export const FILTER_OCCASIONS = ["Wedding", "Festive", "Casual", "Formal", "Party"] as const;

export type ShopFilters = {
  category?: string;
  parent?: MainCategoryId;
  collectionIds?: string[];
  minPrice: number;
  maxPrice: number;
  colors: string[];
  materials: string[];
  occasions: string[];
  sort: "newest" | "price-asc" | "price-desc";
};

export const DEFAULT_FILTERS: ShopFilters = {
  minPrice: 0,
  maxPrice: 50000,
  colors: [],
  materials: [],
  occasions: [],
  sort: "newest",
};

export function formatInr(amount: number) {
  return `₹${amount.toLocaleString("en-IN")}`;
}

export function filterProducts(products: Product[], filters: ShopFilters): Product[] {
  let result = [...products];

  if (filters.category) {
    result = result.filter(
      (p) => p.collectionId === filters.category || p.category.toLowerCase() === filters.category
    );
  }

  if (filters.collectionIds?.length) {
    result = result.filter((p) => filters.collectionIds!.includes(p.collectionId));
  } else if (filters.parent) {
    const ids = collections
      .filter((c) => c.parentId === filters.parent)
      .map((c) => c.id);
    result = result.filter((p) => ids.includes(p.collectionId));
  }

  result = result.filter(
    (p) => p.price >= filters.minPrice && p.price <= filters.maxPrice
  );

  if (filters.sort === "price-asc") result.sort((a, b) => a.price - b.price);
  if (filters.sort === "price-desc") result.sort((a, b) => b.price - a.price);

  return result;
}

export const COLLECTION_EDITS = [
  {
    id: "royal-edit",
    title: "The Royal Edit",
    subtitle: "Regal silhouettes for celebration",
    href: "/collections/lehengas",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80",
  },
  {
    id: "midnight-glam",
    title: "Midnight Glam",
    subtitle: "Evening elegance in silk and zari",
    href: "/collections/sarees",
    image: optimizedSrc(
      "category:sarees",
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&q=80"
    ),
  },
  {
    id: "emerald-heritage",
    title: "Emerald Heritage",
    subtitle: "Festive kurta tailoring",
    href: "/collections/kurtas",
    image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&q=80",
  },
] as const;

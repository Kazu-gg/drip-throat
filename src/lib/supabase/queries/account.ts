"use client";

import { createClient } from "@/lib/supabase/client";
import { calculatePlatformFee, formatPlatformFee } from "@/lib/platform-fees";

export type DbProfile = {
  full_name: string | null;
  phone: string | null;
};

export type DbSavedAddress = {
  id: string;
  label: string;
  address: string;
  house_flat: string | null;
  street_area: string | null;
  landmark: string | null;
  city: string | null;
  state: string | null;
  pincode: string | null;
  is_default: boolean;
};

export type DbOrderItem = {
  quantity: number;
  product_id: string | null;
  products: { image_url: string | null } | { image_url: string | null }[] | null;
};

export type DbOrder = {
  id: string;
  created_at: string;
  status: string;
  fulfillment_status: string | null;
  platform_commission: number | null;
  items: DbOrderItem[] | null;
};

export type AccountOrder = {
  id: string;
  displayId: string;
  date: string;
  itemCount: number;
  platformFeeLabel: string;
  status: "Delivered" | "Shipped" | "Processing" | "Cancelled";
  image: string | null;
};

export type AccountAddress = {
  id: string;
  label: string;
  lines: string[];
  isDefault: boolean;
  icon: string;
};

export type AccountDashboardData = {
  profile: DbProfile | null;
  ordersTotal: number;
  addressesCount: number;
  reviewsCount: number;
  recentOrders: AccountOrder[];
  addresses: AccountAddress[];
};

const PLACEHOLDER_IMAGE =
  "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=200&q=80&fm=webp";

function addressIcon(label: string) {
  const normalized = label.toLowerCase();
  if (normalized.includes("work")) return "💼";
  if (normalized.includes("home")) return "🏠";
  return "📍";
}

export function formatSavedAddressLines(address: DbSavedAddress): string[] {
  if (address.house_flat || address.street_area) {
    const line1 = [address.house_flat, address.street_area, address.landmark]
      .filter(Boolean)
      .join(", ");
    const line2 = [address.city, address.state, address.pincode].filter(Boolean).join(", ");
    return [line1, line2].filter(Boolean);
  }

  return address.address
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean);
}

export function mapOrderStatus(
  status: string,
  fulfillmentStatus: string | null
): AccountOrder["status"] {
  const fulfillment = fulfillmentStatus ?? status;

  if (fulfillment === "delivered" || status === "delivered") return "Delivered";
  if (status === "cancelled" || fulfillment === "cancelled") return "Cancelled";
  if (
    ["shipped", "out_for_delivery", "packed", "accepted", "confirmed"].includes(fulfillment) ||
    status === "out_for_delivery"
  ) {
    return "Shipped";
  }
  return "Processing";
}

function formatOrderDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function orderItemCount(items: DbOrderItem[] | null | undefined) {
  return (items ?? []).reduce((sum, item) => sum + (item.quantity ?? 0), 0);
}

function orderImage(items: DbOrderItem[] | null | undefined) {
  const first = items?.[0];
  if (!first) return PLACEHOLDER_IMAGE;

  const product = Array.isArray(first.products) ? first.products[0] : first.products;
  return product?.image_url ?? PLACEHOLDER_IMAGE;
}

function orderPlatformFeeLabel(order: DbOrder) {
  const itemCount = orderItemCount(order.items);
  if (order.platform_commission != null && order.platform_commission > 0) {
    return formatPlatformFee(order.platform_commission);
  }
  return formatPlatformFee(calculatePlatformFee(itemCount));
}

export function mapOrder(order: DbOrder): AccountOrder {
  return {
    id: order.id,
    displayId: order.id.slice(0, 8).toUpperCase(),
    date: formatOrderDate(order.created_at),
    itemCount: orderItemCount(order.items),
    platformFeeLabel: orderPlatformFeeLabel(order),
    status: mapOrderStatus(order.status, order.fulfillment_status),
    image: orderImage(order.items),
  };
}

function mapAddress(address: DbSavedAddress): AccountAddress {
  return {
    id: address.id,
    label: address.label,
    lines: formatSavedAddressLines(address),
    isDefault: address.is_default,
    icon: addressIcon(address.label),
  };
}

const ORDER_SELECT =
  "id, created_at, status, fulfillment_status, platform_commission, items:order_items(quantity, product_id, products(image_url))";

export async function fetchUserOrders(userId: string, limit?: number) {
  const supabase = createClient();
  if (!supabase) return [] as AccountOrder[];

  let query = supabase
    .from("orders")
    .select(ORDER_SELECT)
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (limit) query = query.limit(limit);

  const { data, error } = await query;
  if (error) {
    console.error("[account] orders fetch failed:", error);
    return [];
  }

  return ((data ?? []) as DbOrder[]).map(mapOrder);
}

export async function fetchAccountDashboard(userId: string): Promise<AccountDashboardData> {
  const supabase = createClient();
  if (!supabase) {
    return {
      profile: null,
      ordersTotal: 0,
      addressesCount: 0,
      reviewsCount: 0,
      recentOrders: [],
      addresses: [],
    };
  }

  const [profileRes, ordersRes, ordersCountRes, addressesRes] = await Promise.all([
    supabase.from("profiles").select("full_name, phone").eq("id", userId).maybeSingle(),
    supabase.from("orders").select(ORDER_SELECT).eq("user_id", userId).order("created_at", { ascending: false }).limit(3),
    supabase
      .from("orders")
      .select("*", { count: "exact", head: true })
      .eq("user_id", userId),
    supabase
      .from("saved_addresses")
      .select(
        "id, label, address, house_flat, street_area, landmark, city, state, pincode, is_default"
      )
      .eq("user_id", userId)
      .order("is_default", { ascending: false })
      .order("created_at", { ascending: true })
      .limit(5),
  ]);

  if (profileRes.error) console.error("[account] profile fetch failed:", profileRes.error);
  if (ordersRes.error) console.error("[account] orders fetch failed:", ordersRes.error);
  if (ordersCountRes.error) {
    console.error("[account] orders count failed:", ordersCountRes.error);
  }
  if (addressesRes.error) {
    console.error("[account] addresses fetch failed:", addressesRes.error);
  }

  const addresses = (addressesRes.data ?? []) as DbSavedAddress[];

  return {
    profile: (profileRes.data as DbProfile | null) ?? null,
    ordersTotal: ordersCountRes.count ?? 0,
    addressesCount: addresses.length,
    reviewsCount: 0,
    recentOrders: ((ordersRes.data ?? []) as DbOrder[]).map(mapOrder),
    addresses: addresses.map(mapAddress),
  };
}

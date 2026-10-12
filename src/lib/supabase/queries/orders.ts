"use client";

import type { CartLine } from "@/lib/cart-types";
import type { Product } from "@/lib/products";
import { dbProductToProduct } from "@/lib/supabase/mappers/product";
import { createClient } from "@/lib/supabase/client";
import { fetchProductBySlug } from "@/lib/supabase/queries/products";
import { FILTER_COLORS } from "@/lib/shop";

const STORE_ID = process.env.NEXT_PUBLIC_CHEVELLE_STORE_ID;

function formatVariantLabel(color?: string, size?: string) {
  const colorLabel = color
    ? (FILTER_COLORS.find((c) => c.id === color)?.label ?? color)
    : null;
  const parts = [colorLabel, size].filter(Boolean);
  return parts.length ? parts.join(" / ") : "";
}

function variantKey(color?: string, size?: string) {
  return `${color ?? "default"}-${size ?? "default"}`;
}

export type PlaceOrderInput = {
  userId: string;
  lines: CartLine[];
  resolveProduct: (slug: string) => Product | undefined;
  /** @deprecated Prefer orderTotal — kept for older callers */
  platformFee?: number;
  orderTotal?: number;
  merchandiseSubtotal?: number;
  discountTotal?: number;
  deliveryCharge?: number;
  customerName: string;
  phone: string;
  address: string;
  area?: string | null;
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
};

export type PlaceOrderResult = {
  orderId: string;
};

export async function placeOrder(input: PlaceOrderInput): Promise<PlaceOrderResult> {
  const supabase = createClient();
  if (!supabase) throw new Error("Database unavailable");
  if (!STORE_ID) throw new Error("Store is not configured");

  if (input.lines.length === 0) throw new Error("Cart is empty");

  const notes = [
    input.razorpayOrderId && input.razorpayPaymentId
      ? `Razorpay: order=${input.razorpayOrderId} payment=${input.razorpayPaymentId}`
      : null,
    input.discountTotal ? `Discounts: ${input.discountTotal}` : null,
    "Source: chevelle-web",
  ]
    .filter(Boolean)
    .join("\n");

  const items = await Promise.all(
    input.lines.map(async (line) => {
      let product = input.resolveProduct(line.slug);
      if (!product) {
        const db = await fetchProductBySlug(line.slug);
        if (db) product = dbProductToProduct(db);
      }
      if (!product) throw new Error(`Product not found: ${line.slug}`);

      const unitPrice =
        typeof product.salePrice === "number" && product.salePrice > 0
          ? product.salePrice
          : product.price;

      const variant = formatVariantLabel(line.color, line.size);
      return {
        product_id: product.id,
        product_name: variant ? `${product.name} (${variant})` : product.name,
        unit_price: unitPrice,
        quantity: line.quantity,
        variant_key: variantKey(line.color, line.size),
      };
    })
  );

  const catalogSubtotal =
    input.merchandiseSubtotal ??
    items.reduce((sum, item) => sum + item.unit_price * item.quantity, 0);
  const delivery = input.deliveryCharge ?? 0;
  const total = input.orderTotal ?? input.platformFee ?? catalogSubtotal + delivery;

  const { data: order, error: orderErr } = await supabase
    .from("orders")
    .insert({
      user_id: input.userId,
      store_id: STORE_ID,
      subtotal: catalogSubtotal,
      delivery_charge: delivery,
      platform_fee: input.platformFee ?? 0,
      total,
      customer_name: input.customerName,
      phone: input.phone,
      address: input.address,
      area: input.area || null,
      notes: notes || null,
    })
    .select("id")
    .single();

  if (orderErr) throw new Error(orderErr.message);

  const { error: itemErr } = await supabase.from("order_items").insert(
    items.map((item) => ({
      order_id: order.id,
      product_id: item.product_id,
      product_name: item.product_name,
      unit_price: item.unit_price,
      quantity: item.quantity,
      variant_key: item.variant_key,
    }))
  );

  if (itemErr) {
    await supabase.from("orders").delete().eq("id", order.id);
    throw new Error(itemErr.message);
  }

  return { orderId: order.id };
}

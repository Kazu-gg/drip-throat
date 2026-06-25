"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/contexts/CartContext";
import { formatInr, PAYMENT_METHODS } from "@/lib/shop";

export function CheckoutView() {
  const { lines, subtotal, resolveProduct } = useCart();
  const router = useRouter();
  const [payment, setPayment] = useState<(typeof PAYMENT_METHODS)[number]["id"]>("upi");

  const shipping = subtotal >= 9999 ? 0 : 199;
  const taxes = Math.round(subtotal * 0.05);
  const savings = 3372;
  const total = subtotal + shipping + taxes;

  if (lines.length === 0) {
    return (
      <p className="py-20 text-center font-body text-sm text-[var(--campaign-text)]/50">
        Your bag is empty.{" "}
        <button type="button" onClick={() => router.push("/products")} className="text-gold">
          Continue shopping
        </button>
      </p>
    );
  }

  return (
    <div className="mx-auto grid max-w-7xl gap-12 section-padding lg:grid-cols-[1fr_360px]">
      <div className="space-y-10">
        <section>
          <h2 className="shop-filter-heading mb-6">Delivery Address</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {["Full Name", "Phone", "Address Line 1", "City", "State", "PIN Code"].map(
              (label) => (
                <label key={label} className="block sm:col-span-2 first:sm:col-span-1">
                  <span className="mb-1.5 block font-body text-[10px] tracking-[0.2em] text-[var(--campaign-text)]/45 uppercase">
                    {label}
                  </span>
                  <input
                    required
                    className="w-full border border-[var(--border-subtle)] bg-[var(--surface)] px-4 py-3 font-body text-sm"
                  />
                </label>
              )
            )}
          </div>
        </section>

        <section>
          <h2 className="shop-filter-heading mb-6">Payment Method</h2>
          <div className="space-y-2">
            {PAYMENT_METHODS.map((m) => (
              <label
                key={m.id}
                className={`flex cursor-pointer items-center gap-3 border px-4 py-4 transition-colors ${
                  payment === m.id
                    ? "border-gold bg-gold/5"
                    : "border-[var(--border-subtle)]"
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value={m.id}
                  checked={payment === m.id}
                  onChange={() => setPayment(m.id)}
                  className="accent-[var(--gold)]"
                />
                <span className="font-body text-sm text-[var(--campaign-text)]">{m.label}</span>
              </label>
            ))}
          </div>
          <p className="mt-4 font-body text-xs text-[var(--campaign-text)]/45">
            Payments secured via Razorpay. Cash on Delivery available on eligible orders.
          </p>
        </section>
      </div>

      <aside className="shop-order-summary h-fit p-6">
        <h2 className="shop-filter-heading mb-6">Order Summary</h2>
        <ul className="mb-6 space-y-3 border-b border-[var(--border-subtle)] pb-6">
          {lines.map((line) => {
            const p = resolveProduct(line.slug);
            if (!p) return null;
            return (
              <li key={line.slug} className="flex justify-between font-body text-xs">
                <span className="text-[var(--campaign-text)]/60">
                  {p.name} × {line.quantity}
                </span>
                <span className="text-gold">{formatInr(p.price * line.quantity)}</span>
              </li>
            );
          })}
        </ul>
        <p className="mb-4 font-body text-xs text-gold/80">
          You saved {formatInr(savings)} on this order
        </p>
        <p className="font-display text-2xl text-gold">{formatInr(total)}</p>
        <button
          type="button"
          onClick={() => router.push("/thank-you")}
          className="shop-btn-primary mt-6 w-full py-4"
        >
          Place Order
        </button>
      </aside>
    </div>
  );
}

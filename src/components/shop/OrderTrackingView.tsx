"use client";

import Link from "next/link";
import { ORDER_STATUSES, ORDER_STATUS_LABELS, type OrderStatus } from "@/lib/shop";

export function OrderTrackingView({ orderId }: { orderId: string }) {
  const activeIndex = 2;
  const active = ORDER_STATUSES[activeIndex] as OrderStatus;

  return (
    <div className="mx-auto max-w-3xl section-padding">
      <p className="font-body text-[10px] tracking-[0.4em] text-gold uppercase">Order Tracking</p>
      <h1 className="mt-2 font-display text-3xl text-[var(--campaign-text)]">{orderId}</h1>
      <p className="mt-2 font-body text-sm text-[var(--campaign-text)]/50">
        Estimated delivery: 18 Jun 2026 · Courier: Chevellè Express
      </p>

      <ol className="mt-12 space-y-0">
        {ORDER_STATUSES.map((status, i) => {
          const done = i <= activeIndex;
          const current = status === active;
          return (
            <li key={status} className="flex gap-4">
              <div className="flex flex-col items-center">
                <span
                  className={`flex h-8 w-8 items-center justify-center rounded-full border text-xs ${
                    done ? "border-gold bg-gold text-black" : "border-[var(--border-subtle)]"
                  }`}
                >
                  {done ? "✓" : i + 1}
                </span>
                {i < ORDER_STATUSES.length - 1 && (
                  <span
                    className={`my-1 h-10 w-px ${done ? "bg-gold" : "bg-[var(--border-subtle)]"}`}
                  />
                )}
              </div>
              <div className="pb-8">
                <p
                  className={`font-body text-sm tracking-wide uppercase ${
                    current ? "text-gold" : "text-[var(--campaign-text)]/55"
                  }`}
                >
                  {ORDER_STATUS_LABELS[status]}
                </p>
              </div>
            </li>
          );
        })}
      </ol>

      <Link href="/account" className="shop-btn-outline inline-flex px-8 py-3">
        Back to Account
      </Link>
    </div>
  );
}

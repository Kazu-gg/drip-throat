"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useWishlist } from "@/contexts/WishlistContext";
import { products } from "@/lib/products";
import { ProductCard } from "@/components/shop/ProductCard";
import { AUTH_ROUTES } from "@/lib/routes";

const TABS = [
  { id: "orders", label: "My Orders" },
  { id: "wishlist", label: "Wishlist" },
  { id: "addresses", label: "Addresses" },
] as const;

const MOCK_ORDERS = [
  { id: "CHV-2401", status: "Processing", total: "₹12,999", date: "12 Jun 2026" },
  { id: "CHV-2388", status: "Delivered", total: "₹24,999", date: "28 May 2026" },
];

export function AccountDashboard() {
  const params = useSearchParams();
  const tab = params.get("tab") ?? "orders";
  const { slugs } = useWishlist();
  const wishlistProducts = products.filter((p) => slugs.includes(p.slug));

  return (
    <div className="mx-auto grid max-w-7xl gap-10 section-padding lg:grid-cols-[220px_1fr]">
      <nav className="space-y-1" aria-label="Account">
        {TABS.map((t) => (
          <Link
            key={t.id}
            href={`/account?tab=${t.id}`}
            className={`block border-l-2 py-3 pl-4 font-body text-[11px] tracking-[0.22em] uppercase transition-colors ${
              tab === t.id
                ? "border-gold text-gold"
                : "border-transparent text-[var(--campaign-text)]/45 hover:text-gold"
            }`}
          >
            {t.label}
          </Link>
        ))}
        <Link
          href={AUTH_ROUTES.login}
          className="block py-3 pl-4 font-body text-[11px] tracking-[0.22em] text-[var(--campaign-text)]/35 uppercase hover:text-gold"
        >
          Sign Out
        </Link>
      </nav>

      <div>
        {tab === "orders" && (
          <>
            <h1 className="font-display text-2xl text-[var(--campaign-text)]">My Orders</h1>
            <ul className="mt-8 divide-y divide-[var(--border-subtle)]">
              {MOCK_ORDERS.map((o) => (
                <li key={o.id} className="flex flex-wrap items-center justify-between gap-4 py-5">
                  <div>
                    <p className="font-body text-[11px] tracking-[0.2em] text-gold">{o.id}</p>
                    <p className="mt-1 font-body text-sm text-[var(--campaign-text)]/55">{o.date}</p>
                  </div>
                  <span className="shop-status-badge">{o.status}</span>
                  <p className="font-display text-gold">{o.total}</p>
                  <Link
                    href={`/orders/${o.id}`}
                    className="font-body text-[10px] tracking-[0.2em] text-[var(--campaign-text)]/45 uppercase hover:text-gold"
                  >
                    Track →
                  </Link>
                </li>
              ))}
            </ul>
          </>
        )}

        {tab === "wishlist" && (
          <>
            <h1 className="font-display text-2xl text-[var(--campaign-text)]">Wishlist</h1>
            <div className="mt-8 grid grid-cols-2 gap-6 md:grid-cols-3">
              {wishlistProducts.length ? (
                wishlistProducts.map((p) => <ProductCard key={p.slug} product={p} />)
              ) : (
                <p className="col-span-full font-body text-sm text-[var(--campaign-text)]/45">
                  No saved pieces yet.
                </p>
              )}
            </div>
          </>
        )}

        {tab === "addresses" && (
          <>
            <h1 className="font-display text-2xl text-[var(--campaign-text)]">Saved Addresses</h1>
            <p className="mt-6 font-body text-sm text-[var(--campaign-text)]/50">
              Address book is available at checkout. Sign in to save delivery details.
            </p>
          </>
        )}
      </div>
    </div>
  );
}

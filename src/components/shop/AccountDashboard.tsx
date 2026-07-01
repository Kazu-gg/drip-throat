"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { SeoImage } from "@/components/seo/SeoImage";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { useAccountDashboard } from "@/hooks/useAccountDashboard";
import { PLATFORM_FEE_PER_ITEM } from "@/lib/platform-fees";
import { AUTH_ROUTES, SHOP_ROUTES } from "@/lib/routes";
import { SectionOrnament } from "@/components/icons/SectionOrnament";
import type { AccountOrder } from "@/lib/supabase/queries/account";

function statusClass(status: AccountOrder["status"]) {
  if (status === "Delivered") return "account-badge account-badge--success";
  if (status === "Shipped") return "account-badge account-badge--info";
  if (status === "Cancelled") return "account-badge account-badge--cancelled";
  return "account-badge account-badge--pending";
}

function profileInitials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

function AccountIcon({ children }: { children: React.ReactNode }) {
  return (
    <span className="account-stat-icon" aria-hidden>
      {children}
    </span>
  );
}

function formatPhone(phone: string | null | undefined) {
  if (!phone?.trim()) return "+91 —";
  return phone.trim();
}

export function AccountDashboard() {
  const { user, signOut, ready } = useAuth();
  const { addItem } = useCart();
  const router = useRouter();
  const {
    wishlistProducts,
    loading: wishlistLoading,
    productsLoading,
  } = useWishlist();
  const { data: account, loading: accountLoading } = useAccountDashboard(user?.id, ready);

  const displayName =
    account.profile?.full_name ??
    (user?.user_metadata?.full_name as string | undefined) ??
    user?.email?.split("@")[0] ??
    "Guest";
  const email = user?.email ?? "—";
  const phone = formatPhone(account.profile?.phone ?? (user?.user_metadata?.phone as string));
  const verified = Boolean(user?.email_confirmed_at);
  const wishlistCount = wishlistProducts.length;
  const latestOrder = account.recentOrders[0];

  return (
    <div className="account-dashboard">
      <header className="account-header">
        <p className="shop-filter-heading">Account</p>
        <h2 className="account-page-title">My Account</h2>
        <SectionOrnament className="mt-5 w-40" />
      </header>

      <div className="account-top-grid">
        <section className="account-card account-profile">
          <div className="account-profile-main">
            <div className="account-avatar" aria-hidden>
              {profileInitials(displayName) || "C"}
            </div>
            <div>
              <p className="account-profile-name">{displayName}</p>
              <p className="account-profile-meta">{email}</p>
              <p className="account-profile-meta">{phone}</p>
              {verified ? (
                <span className="account-verified">
                  <span aria-hidden>✓</span> Verified
                </span>
              ) : null}
            </div>
          </div>
          <button type="button" className="account-btn-outline">
            Edit Profile
          </button>
        </section>

        <section className="account-card account-stats">
          <div className="account-stat">
            <AccountIcon>🛍</AccountIcon>
            <p className="account-stat-value">
              {accountLoading ? "—" : account.ordersTotal}
            </p>
            <p className="account-stat-label">Orders Total</p>
          </div>
          <div className="account-stat">
            <AccountIcon>♥</AccountIcon>
            <p className="account-stat-value">{wishlistCount}</p>
            <p className="account-stat-label">Wishlist Items</p>
          </div>
          <div className="account-stat">
            <AccountIcon>📍</AccountIcon>
            <p className="account-stat-value">
              {accountLoading ? "—" : account.addressesCount}
            </p>
            <p className="account-stat-label">Addresses Saved</p>
          </div>
          <div className="account-stat">
            <AccountIcon>★</AccountIcon>
            <p className="account-stat-value">
              {accountLoading ? "—" : account.reviewsCount}
            </p>
            <p className="account-stat-label">Reviews Given</p>
          </div>
        </section>
      </div>

      <section className="account-card account-quick-actions">
        <h2 className="account-section-title">Quick Actions</h2>
        <div className="account-actions-row">
          {latestOrder ? (
            <Link href={`/orders/${latestOrder.id}`} className="account-action">
              <span aria-hidden>📦</span>
              Track Order
            </Link>
          ) : (
            <span className="account-action account-action--disabled">
              <span aria-hidden>📦</span>
              Track Order
            </span>
          )}
          <Link href={SHOP_ROUTES.cart} className="account-action">
            <span aria-hidden>↻</span>
            Reorder
          </Link>
          <Link href={AUTH_ROUTES.checkout} className="account-action">
            <span aria-hidden>📍</span>
            Manage Addresses
          </Link>
          <Link href={AUTH_ROUTES.checkout} className="account-action">
            <span aria-hidden>💳</span>
            Payment Methods
          </Link>
        </div>
      </section>

      <div className="account-middle-grid">
        <section className="account-card">
          <div className="account-card-header">
            <h2 className="account-section-title">Recent Orders</h2>
            {account.ordersTotal > 0 ? (
              <Link href="/orders" className="account-link">
                View All Orders →
              </Link>
            ) : null}
          </div>

          {accountLoading ? (
            <p className="account-loading">Loading orders…</p>
          ) : account.recentOrders.length === 0 ? (
            <p className="account-empty">No orders yet. Your purchases will appear here.</p>
          ) : (
            <ul className="account-order-list">
              {account.recentOrders.map((order) => (
                <li key={order.id}>
                  <Link href={`/orders/${order.id}`} className="account-order-row">
                    <div className="account-order-thumb">
                      <SeoImage
                        src={order.image ?? ""}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="56px"
                      />
                    </div>
                    <div className="account-order-body">
                      <p className="account-order-id">Order #{order.displayId}</p>
                      <p className="account-order-meta">
                        {order.date} · {order.itemCount}{" "}
                        {order.itemCount === 1 ? "item" : "items"}
                      </p>
                      <p className="account-order-fee">
                        Platform fee {order.platformFeeLabel}
                      </p>
                    </div>
                    <span className={statusClass(order.status)}>{order.status}</span>
                    <span className="account-order-chevron" aria-hidden>
                      ›
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}

          {account.ordersTotal > account.recentOrders.length ? (
            <Link href="/orders" className="account-card-footer-link">
              View All Orders →
            </Link>
          ) : null}
        </section>

        <section className="account-card">
          <div className="account-card-header">
            <h2 className="account-section-title">Addresses</h2>
            {account.addressesCount > 0 ? (
              <Link href={AUTH_ROUTES.checkout} className="account-link">
                Manage Addresses →
              </Link>
            ) : null}
          </div>

          {accountLoading ? (
            <p className="account-loading">Loading addresses…</p>
          ) : account.addresses.length === 0 ? (
            <p className="account-empty">
              No saved addresses yet. Add one during checkout.
            </p>
          ) : (
            <ul className="account-address-list">
              {account.addresses.map((address) => (
                <li key={address.id} className="account-address-row">
                  <span className="account-address-icon" aria-hidden>
                    {address.icon}
                  </span>
                  <div className="account-address-body">
                    <div className="account-address-title-row">
                      <p className="account-address-label">{address.label}</p>
                      {address.isDefault ? (
                        <span className="account-badge account-badge--default">Default</span>
                      ) : null}
                    </div>
                    {address.lines.map((line) => (
                      <p key={line} className="account-address-line">
                        {line}
                      </p>
                    ))}
                  </div>
                  <button type="button" className="account-menu-btn" aria-label="Address options">
                    ⋯
                  </button>
                </li>
              ))}
            </ul>
          )}

          {account.addressesCount > 0 ? (
            <Link href={AUTH_ROUTES.checkout} className="account-card-footer-link">
              View All Addresses →
            </Link>
          ) : null}
        </section>
      </div>

      <section className="account-card">
        <div className="account-card-header">
          <h2 className="account-section-title">Wishlist</h2>
          {wishlistCount > 0 ? (
            <Link href="/account?tab=wishlist" className="account-link">
              View Wishlist →
            </Link>
          ) : null}
        </div>

        {wishlistLoading || productsLoading ? (
          <p className="account-loading">Loading wishlist…</p>
        ) : wishlistProducts.length === 0 ? (
          <p className="account-empty">No saved pieces yet. Explore the collection to start.</p>
        ) : (
          <div className="account-wishlist-track">
            {wishlistProducts.map((product) => (
              <article key={product.slug} className="account-wishlist-card">
                <Link href={`/products/${product.slug}`} className="account-wishlist-image">
                  <SeoImage
                    src={product.image.src}
                    alt={product.image.alt}
                    fill
                    className="object-cover"
                    sizes="220px"
                  />
                </Link>
                <p className="account-wishlist-name">{product.name}</p>
                <p className="account-wishlist-fee">₹{PLATFORM_FEE_PER_ITEM} platform fee</p>
                <button
                  type="button"
                  onClick={() => {
                    addItem(product.slug);
                    router.push(SHOP_ROUTES.cart);
                  }}
                  className="account-wishlist-cta"
                >
                  Add to Bag
                </button>
              </article>
            ))}
          </div>
        )}
      </section>

      <div className="account-signout-row">
        <button type="button" onClick={() => void signOut()} className="account-signout">
          Sign Out
        </button>
      </div>
    </div>
  );
}

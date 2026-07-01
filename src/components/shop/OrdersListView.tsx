"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { SeoImage } from "@/components/seo/SeoImage";
import { useAuth } from "@/contexts/AuthContext";
import { fetchUserOrders, type AccountOrder } from "@/lib/supabase/queries/account";

function statusClass(status: AccountOrder["status"]) {
  if (status === "Delivered") return "account-badge account-badge--success";
  if (status === "Shipped") return "account-badge account-badge--info";
  if (status === "Cancelled") return "account-badge account-badge--cancelled";
  return "account-badge account-badge--pending";
}

export function OrdersListView() {
  const { user, ready } = useAuth();
  const [orders, setOrders] = useState<AccountOrder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!ready || !user?.id) {
      setLoading(false);
      return;
    }

    void fetchUserOrders(user.id)
      .then(setOrders)
      .finally(() => setLoading(false));
  }, [user?.id, ready]);

  return (
    <div className="account-dashboard">
      <header className="account-header">
        <p className="shop-filter-heading">Account</p>
        <h2 className="account-page-title">All Orders</h2>
        <Link href="/account" className="account-link mt-4 inline-block">
          ← Back to account
        </Link>
      </header>

      <section className="account-card">
        {loading ? (
          <p className="account-loading">Loading orders…</p>
        ) : orders.length === 0 ? (
          <p className="account-empty">No orders yet.</p>
        ) : (
          <ul className="account-order-list">
            {orders.map((order) => (
              <li key={order.id}>
                <Link href={`/orders/${order.id}`} className="account-order-row">
                  <div className="account-order-thumb">
                    {order.image ? (
                      <SeoImage
                        src={order.image}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="56px"
                      />
                    ) : null}
                  </div>
                  <div className="account-order-body">
                    <p className="account-order-id">Order #{order.displayId}</p>
                    <p className="account-order-meta">
                      {order.date} · {order.itemCount}{" "}
                      {order.itemCount === 1 ? "item" : "items"}
                    </p>
                    <p className="account-order-fee">Platform fee {order.platformFeeLabel}</p>
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
      </section>
    </div>
  );
}

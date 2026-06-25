import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { buildMetadata } from "@/lib/seo";
import { SHOP_ROUTES } from "@/lib/routes";
import { formatInr } from "@/lib/shop";

export const metadata: Metadata = buildMetadata({
  title: "Admin | Chevellè",
  description: "Chevellè admin dashboard.",
  path: SHOP_ROUTES.admin,
  noIndex: true,
});

const STATS = [
  { label: "Total Orders", value: "1,240", delta: "+12%" },
  { label: "Total Revenue", value: formatInr(2478900), delta: "+8%" },
  { label: "Total Customers", value: "3,842", delta: "+5%" },
  { label: "Total Products", value: "186", delta: "+2%" },
];

export default function AdminPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[var(--campaign-bg)] pt-24 pb-20">
        <div className="mx-auto grid max-w-7xl gap-10 section-padding lg:grid-cols-[200px_1fr]">
          <aside className="hidden space-y-2 lg:block">
            {["Overview", "Orders", "Products", "Customers"].map((item, i) => (
              <p
                key={item}
                className={`py-2 pl-3 font-body text-[10px] tracking-[0.22em] uppercase ${
                  i === 0 ? "border-l-2 border-gold text-gold" : "text-[var(--campaign-text)]/40"
                }`}
              >
                {item}
              </p>
            ))}
          </aside>

          <div>
            <h1 className="font-display text-3xl text-[var(--campaign-text)]">Overview</h1>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {STATS.map((s) => (
                <div key={s.label} className="shop-order-summary p-5">
                  <p className="font-body text-[10px] tracking-[0.2em] text-[var(--campaign-text)]/45 uppercase">
                    {s.label}
                  </p>
                  <p className="mt-3 font-display text-2xl text-gold">{s.value}</p>
                  <p className="mt-1 font-body text-xs text-gold/70">{s.delta}</p>
                </div>
              ))}
            </div>

            <div className="shop-order-summary mt-8 p-6">
              <h2 className="shop-filter-heading mb-4">Sales Overview</h2>
              <div className="flex h-40 items-end gap-2">
                {[40, 55, 48, 70, 62, 80, 74].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 bg-gold/80"
                    style={{ height: `${h}%` }}
                    aria-hidden
                  />
                ))}
              </div>
            </div>

            <div className="shop-order-summary mt-8 overflow-x-auto">
              <table className="w-full min-w-[560px] text-left font-body text-sm">
                <thead>
                  <tr className="border-b border-[var(--border-subtle)] text-[10px] tracking-[0.2em] text-gold uppercase">
                    <th className="p-4">Order ID</th>
                    <th className="p-4">Customer</th>
                    <th className="p-4">Total</th>
                    <th className="p-4">Status</th>
                  </tr>
                </thead>
                <tbody className="text-[var(--campaign-text)]/60">
                  <tr className="border-b border-[var(--border-subtle)]">
                    <td className="p-4">CHV-2401</td>
                    <td className="p-4">A. Sharma</td>
                    <td className="p-4 text-gold">₹12,999</td>
                    <td className="p-4">Processing</td>
                  </tr>
                  <tr>
                    <td className="p-4">CHV-2388</td>
                    <td className="p-4">R. Mehta</td>
                    <td className="p-4 text-gold">₹24,999</td>
                    <td className="p-4">Delivered</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

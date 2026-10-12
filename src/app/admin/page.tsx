import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AdminCommercePanel } from "@/components/shop/AdminCommercePanel";
import { buildMetadata } from "@/lib/seo";
import { SHOP_ROUTES } from "@/lib/routes";
import { formatInr } from "@/lib/shop";

export const metadata: Metadata = buildMetadata({
  title: "Admin | Dripthroat",
  description: "Dripthroat admin dashboard.",
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
      <main className="min-h-screen bg-[var(--campaign-bg)] pt-24 pb-20" data-testid="admin_page">
        <div className="mx-auto grid max-w-7xl gap-10 section-padding lg:grid-cols-[200px_1fr]">
          <aside className="hidden space-y-2 lg:block">
            {["Overview", "Orders", "Products", "Marketing", "Customers"].map((item) => (
              <p
                key={item}
                className={`py-2 pl-3 font-body text-[10px] tracking-[0.22em] uppercase ${
                  item === "Overview" || item === "Marketing"
                    ? "border-l-2 border-gold text-gold"
                    : "text-[var(--campaign-text)]/40"
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

            <AdminCommercePanel />

            <div className="shop-order-summary mt-8 p-6">
              <h2 className="shop-filter-heading mb-4">Products</h2>
              <p className="font-body text-sm text-[var(--campaign-text)]/50">
                Product CRUD (name, price, sale price, images, stock, sizes, category, description,
                fabric, FAQ, featured, SEO) is managed via the existing Supabase catalog. Use mock
                catalog fields in src/lib/products.ts for local preview, or connect the live store
                admin when credentials are available.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

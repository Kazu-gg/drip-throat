import type { Metadata } from "next";
import { Suspense } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AccountDashboard } from "@/components/shop/AccountDashboard";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "My Account | Chevellè",
  description: "Manage your Chevellè orders, wishlist, and saved addresses.",
  path: "/account",
  noIndex: true,
});

export default function AccountPage() {
  return (
    <>
      <Navbar />
      <main className="account-page relative min-h-screen overflow-hidden bg-[var(--campaign-bg)] pt-24 pb-20">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-80"
          style={{
            background:
              "radial-gradient(ellipse at 50% 0%, rgba(212,175,55,0.08) 0%, transparent 70%)",
          }}
          aria-hidden
        />
        <Suspense fallback={null}>
          <AccountDashboard />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}

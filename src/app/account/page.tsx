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
      <main className="min-h-screen bg-[var(--campaign-bg)] pt-24 pb-20">
        <Suspense fallback={null}>
          <AccountDashboard />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}

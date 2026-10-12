import type { Metadata } from "next";
import { Suspense } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { OrdersListView } from "@/components/shop/OrdersListView";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Your Orders | Dripthroat",
  description: "View your Dripthroat order history.",
  path: "/orders",
  noIndex: true,
});

export default function OrdersPage() {
  return (
    <>
      <Navbar />
      <main className="account-page relative min-h-screen overflow-hidden bg-[var(--campaign-bg)] pt-24 pb-20">
        <Suspense fallback={null}>
          <OrdersListView />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}

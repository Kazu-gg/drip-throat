import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CartView } from "@/components/shop/CartView";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Your Bag | Chevellè",
  description: "Review your Chevellè bag and proceed to secure checkout.",
  path: "/cart",
  noIndex: true,
});

export default function CartPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[var(--campaign-bg)] pt-24 pb-20">
        <CartView />
      </main>
      <Footer />
    </>
  );
}

import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CheckoutView } from "@/components/shop/CheckoutView";
import { buildMetadata, PAGE_TITLES, metaDescription } from "@/lib/seo";
import { AUTH_ROUTES } from "@/lib/routes";

export const metadata: Metadata = buildMetadata({
  title: PAGE_TITLES.checkout,
  description: metaDescription(
    "Secure checkout for Chevellè — delivery address, Razorpay payment, and Cash on Delivery."
  ),
  path: AUTH_ROUTES.checkout,
  noIndex: true,
});

export default function CheckoutPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[var(--campaign-bg)] pt-24 pb-20">
        <CheckoutView />
      </main>
      <Footer />
    </>
  );
}

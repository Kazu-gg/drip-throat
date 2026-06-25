import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CategoryLandingPage } from "@/components/shop/CategoryLandingPage";
import { buildMetadata } from "@/lib/seo";
import { UNISEX_LANDING } from "@/lib/category-landing";

export const metadata: Metadata = buildMetadata({
  title: `Unisex | Collections | Chevellè`,
  description: UNISEX_LANDING.description,
  path: "/collections/unisex",
});

export default function UnisexCollectionsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[var(--campaign-bg)] pb-20 pt-0">
        <CategoryLandingPage landingId="unisex" />
      </main>
      <Footer />
    </>
  );
}

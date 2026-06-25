import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ShopCatalog } from "@/components/shop/ShopCatalog";
import { buildMetadata, PAGE_TITLES, META_DESCRIPTIONS } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: PAGE_TITLES.products,
  description: META_DESCRIPTIONS.products,
  path: "/products",
});

export default function ProductsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[var(--campaign-bg)] pt-24 pb-20">
        <ShopCatalog title="New In" subtitle="Curated luxury pieces across women, men, and accessories." />
      </main>
      <Footer />
    </>
  );
}

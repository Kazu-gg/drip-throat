import type { Metadata } from "next";
import { Suspense } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ShopCatalog } from "@/components/shop/ShopCatalog";
import { CollectionsGrid } from "@/components/shop/CollectionsGrid";
import { CategoryLandingPage } from "@/components/shop/CategoryLandingPage";
import { buildMetadata, PAGE_TITLES, META_DESCRIPTIONS } from "@/lib/seo";
import { isCategoryLandingId } from "@/lib/category-landing";

export const metadata: Metadata = buildMetadata({
  title: PAGE_TITLES.collections,
  description: META_DESCRIPTIONS.collections,
  path: "/collections",
});

type PageProps = { searchParams: Promise<{ category?: string }> };

export default async function CollectionsPage({ searchParams }: PageProps) {
  const { category } = await searchParams;
  const landingId = isCategoryLandingId(category) ? category : undefined;

  return (
    <>
      <Navbar />
      <main className={`min-h-screen bg-[var(--campaign-bg)] pb-20 ${landingId ? "pt-0" : "pt-24"}`}>
        {landingId ? (
          <CategoryLandingPage landingId={landingId} />
        ) : (
          <>
            <CollectionsGrid />
            <Suspense fallback={null}>
              <ShopCatalog
                title="All Collections"
                subtitle="Filter by category, price, and occasion."
              />
            </Suspense>
          </>
        )}
      </main>
      <Footer />
    </>
  );
}

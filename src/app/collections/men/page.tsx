import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CategoryLandingPage } from "@/components/shop/CategoryLandingPage";
import { buildMetadata } from "@/lib/seo";
import { getMainCategory } from "@/lib/categories";

const main = getMainCategory("men")!;

export const metadata: Metadata = buildMetadata({
  title: `Men | Collections | Chevellè`,
  description: main.description,
  path: "/collections/men",
});

export default function MenCollectionsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[var(--campaign-bg)] pb-20 pt-0">
        <CategoryLandingPage landingId="men" />
      </main>
      <Footer />
    </>
  );
}

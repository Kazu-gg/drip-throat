import type { Metadata } from "next";
import {
  buildMetadata,
  PAGE_TITLES,
  META_DESCRIPTIONS,
  OG_DEFAULTS,
} from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/structured-data";
import { StructuredData } from "@/components/seo/StructuredData";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FeaturedCollections } from "@/components/sections/FeaturedCollections";

export const metadata: Metadata = buildMetadata({
  title: PAGE_TITLES.collections,
  description: META_DESCRIPTIONS.collections,
  path: "/collections",
  ogTitle: OG_DEFAULTS.title,
  ogDescription: OG_DEFAULTS.description,
});

export default function CollectionsPage() {
  return (
    <>
      <StructuredData
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Collections", path: "/collections" },
        ])}
      />
      <Navbar />
      <main className="min-h-screen bg-black pt-28 pb-20">
        <FeaturedCollections />
      </main>
      <Footer />
    </>
  );
}

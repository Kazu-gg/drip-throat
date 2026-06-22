import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CampaignExperience } from "@/components/campaign/CampaignExperience";
import { StructuredData } from "@/components/seo/StructuredData";
import { homePageSchemas } from "@/lib/structured-data";

export default function Home() {
  return (
    <>
      <StructuredData data={homePageSchemas()} />
      <Navbar />
      <main id="main-content" className="relative bg-[var(--campaign-bg,#050505)] text-[var(--campaign-text,#f5f5f5)] transition-colors duration-1000">
        <CampaignExperience />
      </main>
      <Footer />
    </>
  );
}

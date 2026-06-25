import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FigmaHomeExperience } from "@/components/figma/FigmaHomeExperience";
import { StructuredData } from "@/components/seo/StructuredData";
import { homePageSchemas } from "@/lib/structured-data";

export default function Home() {
  return (
    <>
      <StructuredData data={homePageSchemas()} />
      <Navbar />
      <main id="main-content" className="relative bg-black text-white">
        <FigmaHomeExperience />
      </main>
      <Footer />
    </>
  );
}

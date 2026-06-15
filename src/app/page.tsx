import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { FeaturedCollections } from "@/components/sections/FeaturedCollections";
import { WhyChevelle } from "@/components/sections/WhyChevelle";
import { Bestsellers } from "@/components/sections/Bestsellers";
import { AppPromo } from "@/components/sections/AppPromo";
import { CustomerReviews } from "@/components/sections/CustomerReviews";
import { InstagramWall } from "@/components/sections/InstagramWall";
import { Newsletter } from "@/components/sections/Newsletter";
import { FAQ } from "@/components/sections/FAQ";
import { StructuredData } from "@/components/seo/StructuredData";
import { homePageSchemas } from "@/lib/structured-data";

export default function Home() {
  return (
    <>
      <StructuredData data={homePageSchemas()} />
      <Navbar />
      <main id="main-content">
        <Hero />
        <FeaturedCollections />
        <WhyChevelle />
        <Bestsellers />
        <AppPromo />
        <CustomerReviews />
        <InstagramWall />
        <FAQ />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}

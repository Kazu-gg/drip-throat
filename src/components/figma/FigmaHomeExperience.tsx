import { FigmaHero } from "@/components/figma/FigmaHero";
import { ExploreOurWorlds } from "@/components/figma/ExploreOurWorlds";
import { CollectionsGrid } from "@/components/shop/CollectionsGrid";
import { HomeFeaturedProducts } from "@/components/shop/HomeFeaturedProducts";
import { PackagingExperience } from "@/components/figma/PackagingExperience";
import { AppPromo } from "@/components/figma/AppPromo";
import { FAQ } from "@/components/sections/FAQ";

export function FigmaHomeExperience() {
  return (
    <>
      <FigmaHero />
      <ExploreOurWorlds />
      <CollectionsGrid />
      <HomeFeaturedProducts />
      <PackagingExperience />
      <AppPromo />
      <FAQ />
    </>
  );
}

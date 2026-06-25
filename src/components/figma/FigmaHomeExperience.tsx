import { GenderThemeProvider } from "@/contexts/GenderThemeContext";
import { ScrollSpy } from "@/components/figma/ScrollSpy";
import { FigmaHero } from "@/components/figma/FigmaHero";
import { ChooseYourWorld } from "@/components/figma/ChooseYourWorld";
import { GenderSplit } from "@/components/figma/GenderSplit";
import { SignatureCollection } from "@/components/figma/SignatureCollection";
import { WhyChevelleStats } from "@/components/figma/WhyChevelleStats";
import { PackagingExperience } from "@/components/figma/PackagingExperience";
import { AppPromo } from "@/components/figma/AppPromo";

export function FigmaHomeExperience() {
  return (
    <GenderThemeProvider>
      <ScrollSpy />
      <FigmaHero />
      <ChooseYourWorld />
      <GenderSplit />
      <SignatureCollection />
      <WhyChevelleStats />
      <PackagingExperience />
      <AppPromo />
    </GenderThemeProvider>
  );
}

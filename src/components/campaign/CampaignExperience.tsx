"use client";

import { CampaignThemeProvider } from "@/components/campaign/CampaignThemeProvider";
import { AmbientLayer } from "@/components/campaign/AmbientLayer";
import { CinematicHero } from "@/components/campaign/CinematicHero";
import { CollectionUniverse } from "@/components/campaign/CollectionUniverse";
import { FashionRunway } from "@/components/campaign/FashionRunway";
import { InteractiveShowroom } from "@/components/campaign/InteractiveShowroom";
import { FabricReveal } from "@/components/campaign/FabricReveal";
import { LuxuryBestsellers } from "@/components/campaign/LuxuryBestsellers";
import { Storytelling } from "@/components/campaign/Storytelling";
import { ImmersiveLookbook } from "@/components/campaign/ImmersiveLookbook";
import { LuxuryCTA } from "@/components/campaign/LuxuryCTA";

export function CampaignExperience() {
  return (
    <CampaignThemeProvider>
      <AmbientLayer />
      <CinematicHero />
      <CollectionUniverse />
      <FashionRunway />
      <InteractiveShowroom />
      <FabricReveal />
      <LuxuryBestsellers />
      <Storytelling />
      <ImmersiveLookbook />
      <LuxuryCTA />
    </CampaignThemeProvider>
  );
}

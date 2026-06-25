"use client";

import { CampaignThemeProvider } from "@/components/campaign/CampaignThemeProvider";
import { AmbientLayer } from "@/components/campaign/AmbientLayer";
import { CinematicHero } from "@/components/campaign/CinematicHero";
import { CollectionUniverse } from "@/components/campaign/CollectionUniverse";
import { FashionRunway } from "@/components/campaign/FashionRunway";
import { SpotlightCarousel } from "@/components/campaign/SpotlightCarousel";
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
      <SpotlightCarousel />
      <FabricReveal />
      <LuxuryBestsellers />
      <Storytelling />
      <ImmersiveLookbook />
      <LuxuryCTA />
    </CampaignThemeProvider>
  );
}

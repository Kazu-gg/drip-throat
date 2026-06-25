"use client";

import { PremiumCollectionShowcase } from "@/components/campaign/showcase/PremiumCollectionShowcase";
import { MobileCollectionUniverse } from "@/components/campaign/MobileCollectionUniverse";

export function CollectionUniverse() {
  return (
    <>
      <MobileCollectionUniverse />
      <PremiumCollectionShowcase />
    </>
  );
}

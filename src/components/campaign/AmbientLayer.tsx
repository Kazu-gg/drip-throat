"use client";

import { useCampaignTheme } from "@/components/campaign/CampaignThemeProvider";

export function AmbientLayer() {
  const { theme } = useCampaignTheme();

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[1] transition-[background-color] duration-500 ease-out"
      style={{ backgroundColor: theme.bg }}
      aria-hidden
    />
  );
}

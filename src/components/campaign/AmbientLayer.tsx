"use client";

import { motion } from "framer-motion";
import { useCampaignTheme } from "@/components/campaign/CampaignThemeProvider";

export function AmbientLayer() {
  const { theme } = useCampaignTheme();

  return (
    <div className="pointer-events-none fixed inset-0 z-[1]" aria-hidden>
      <motion.div
        className="absolute inset-0"
        animate={{ backgroundColor: theme.bg }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.div
        className="absolute inset-0"
        animate={{
          background: `radial-gradient(ellipse 80% 60% at 50% 20%, ${theme.glow} 0%, transparent 55%)`,
        }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      />
      <div
        className="absolute inset-0 opacity-[0.04] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "180px 180px",
        }}
      />
    </div>
  );
}

"use client";

import dynamic from "next/dynamic";
import { GoogleAnalytics } from "@/components/seo/Analytics";
import { MotionProvider } from "@/components/providers/MotionProvider";
import { FilmGrain } from "@/components/experience/FilmGrain";
import { LuxuryPreloader } from "@/components/experience/LuxuryPreloader";
import { LuxuryCursor } from "@/components/experience/LuxuryCursor";

const SmoothScroll = dynamic(
  () =>
    import("@/components/providers/SmoothScroll").then((m) => m.SmoothScroll),
  { ssr: false }
);

export function ClientShell({ children }: { children: React.ReactNode }) {
  return (
    <MotionProvider>
      <SmoothScroll />
      <LuxuryPreloader />
      <FilmGrain />
      <LuxuryCursor />
      <GoogleAnalytics />
      {children}
    </MotionProvider>
  );
}

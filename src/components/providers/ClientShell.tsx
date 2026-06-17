"use client";

import dynamic from "next/dynamic";
import { GoogleAnalytics } from "@/components/seo/Analytics";
import { CursorGlow } from "@/components/effects/CursorGlow";
import { MotionProvider } from "@/components/providers/MotionProvider";

const SmoothScroll = dynamic(
  () =>
    import("@/components/providers/SmoothScroll").then((m) => m.SmoothScroll),
  { ssr: false }
);

export function ClientShell({ children }: { children: React.ReactNode }) {
  return (
    <MotionProvider>
      <SmoothScroll />
      <GoogleAnalytics />
      <CursorGlow />
      {children}
    </MotionProvider>
  );
}

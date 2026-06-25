"use client";

import dynamic from "next/dynamic";
import { GoogleAnalytics } from "@/components/seo/Analytics";
import { MotionProvider } from "@/components/providers/MotionProvider";
import { LuxuryCursor } from "@/components/experience/LuxuryCursor";

export function ClientShell({ children }: { children: React.ReactNode }) {
  return (
    <MotionProvider>
      <LuxuryCursor />
      <GoogleAnalytics />
      {children}
    </MotionProvider>
  );
}

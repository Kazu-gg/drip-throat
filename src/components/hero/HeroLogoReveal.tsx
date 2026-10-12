"use client";

import { useReducedMotion } from "framer-motion";
import {
  DripthroatLogo,
  AnimatedDripthroatLogo,
} from "@/components/brand/DripthroatLogo";

const DRAW_DURATION = 2;

export function HeroLogoReveal() {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return (
      <div className="relative mx-auto w-full max-w-[min(100%,720px)] px-4">
        <DripthroatLogo className="mx-auto h-auto w-full text-gold" />
        <span className="sr-only">DRIPTHROAT</span>
      </div>
    );
  }

  return (
    <div className="relative mx-auto w-full max-w-[min(100%,720px)] px-4">
      <AnimatedDripthroatLogo
        gradientId="logo-gold-fill"
        duration={DRAW_DURATION}
        className="mx-auto h-auto w-full"
      />
      {/* Accessible duplicate for screen readers */}
      <span className="sr-only">DRIPTHROAT</span>
    </div>
  );
}

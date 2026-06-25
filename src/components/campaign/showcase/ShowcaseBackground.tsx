"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  SHOWCASE_DURATION,
  SHOWCASE_EASE,
  type ShowcaseCollection,
} from "@/lib/showcase-collections";
import { GoldParticles, FloatingDecorations } from "./GoldParticles";

type ShowcaseBackgroundProps = {
  active: ShowcaseCollection;
};

export function ShowcaseBackground({ active }: ShowcaseBackgroundProps) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <AnimatePresence mode="sync">
        <motion.div
          key={`bg-${active.id}`}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1.02 }}
          exit={{ opacity: 0, scale: 1 }}
          transition={{ duration: SHOWCASE_DURATION, ease: SHOWCASE_EASE }}
          className="absolute inset-0"
          style={{ willChange: "transform, opacity" }}
        >
          <Image
            src={active.image}
            alt=""
            fill
            priority
            className="object-cover"
            sizes="100vw"
            aria-hidden
          />
        </motion.div>
      </AnimatePresence>

      <AnimatePresence mode="sync">
        <motion.div
          key={`wash-${active.id}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: SHOWCASE_DURATION, ease: SHOWCASE_EASE }}
          className="absolute inset-0"
          style={{
            background: `linear-gradient(165deg, ${active.bg}88 0%, rgba(5,5,5,0.25) 55%, rgba(5,5,5,0.55) 100%)`,
            willChange: "opacity",
          }}
          aria-hidden
        />
      </AnimatePresence>

      <AnimatePresence mode="sync">
        <motion.div
          key={`glow-${active.id}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: SHOWCASE_DURATION, ease: SHOWCASE_EASE }}
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse 80% 65% at 50% 30%, ${active.glow} 0%, transparent 60%)`,
            willChange: "opacity",
          }}
          aria-hidden
        />
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-black/45" aria-hidden />

      <FloatingDecorations accent={active.accent} glow={active.glow} />
      <GoldParticles color={active.particle} active />
    </div>
  );
}

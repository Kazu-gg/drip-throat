"use client";

import { motion, useReducedMotion } from "framer-motion";

const waveA =
  "M0 320 Q120 280 240 320 T480 320 T720 320 T960 320 V420 H0 Z";
const waveB =
  "M0 320 Q120 360 240 320 T480 300 T720 320 T960 320 V420 H0 Z";
const waveC =
  "M0 320 Q120 300 240 330 T480 340 T720 310 T960 320 V420 H0 Z";

export function SilkWaveBackground() {
  const reduceMotion = useReducedMotion();

  return (
    <div
      className="pointer-events-none absolute inset-x-0 bottom-0 h-[55vh] opacity-[0.07] sm:h-[50vh]"
      aria-hidden
    >
      <svg
        viewBox="0 0 960 420"
        preserveAspectRatio="none"
        className="h-full w-full"
      >
        <defs>
          <linearGradient id="silk-gold" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8A9374" stopOpacity="0" />
            <stop offset="35%" stopColor="#A8B38A" stopOpacity="0.9" />
            <stop offset="65%" stopColor="#B6C38E" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#8A9374" stopOpacity="0" />
          </linearGradient>
        </defs>

        <motion.path
          fill="url(#silk-gold)"
          initial={{ d: waveA }}
          animate={reduceMotion ? { d: waveA } : { d: [waveA, waveB, waveC, waveA] }}
          transition={
            reduceMotion
              ? { duration: 0 }
              : { duration: 18, repeat: Infinity, ease: "easeInOut" }
          }
          style={{ willChange: "auto" }}
        />
        <motion.path
          fill="url(#silk-gold)"
          fillOpacity="0.5"
          initial={{ d: waveC }}
          animate={reduceMotion ? { d: waveC } : { d: [waveC, waveA, waveB, waveC] }}
          transition={
            reduceMotion
              ? { duration: 0 }
              : { duration: 22, repeat: Infinity, ease: "easeInOut", delay: 2 }
          }
        />
      </svg>
    </div>
  );
}

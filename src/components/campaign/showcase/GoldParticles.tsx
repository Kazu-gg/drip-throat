"use client";

import { motion } from "framer-motion";
import { SHOWCASE_DURATION, SHOWCASE_EASE } from "@/lib/showcase-collections";

const PARTICLES = [
  { cx: "12%", cy: "18%", r: 1.2, delay: 0 },
  { cx: "78%", cy: "22%", r: 0.8, delay: 0.4 },
  { cx: "88%", cy: "68%", r: 1.4, delay: 0.8 },
  { cx: "22%", cy: "72%", r: 1, delay: 1.2 },
  { cx: "52%", cy: "12%", r: 0.6, delay: 0.6 },
  { cx: "65%", cy: "85%", r: 1.1, delay: 1 },
  { cx: "8%", cy: "48%", r: 0.7, delay: 0.2 },
  { cx: "92%", cy: "42%", r: 0.9, delay: 1.4 },
  { cx: "38%", cy: "88%", r: 0.5, delay: 0.9 },
  { cx: "58%", cy: "58%", r: 1.3, delay: 0.3 },
];

type GoldParticlesProps = {
  color: string;
  active: boolean;
};

export function GoldParticles({ color, active }: GoldParticlesProps) {
  if (!active) return null;

  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full opacity-80"
      aria-hidden
    >
      <defs>
        <filter id="showcase-particle-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {PARTICLES.map((p, i) => (
        <motion.circle
          key={i}
          cx={p.cx}
          cy={p.cy}
          r={p.r}
          fill={color}
          filter="url(#showcase-particle-glow)"
          animate={{ opacity: [0.12, 0.5, 0.12] }}
          transition={{
            duration: 5 + i * 0.35,
            repeat: Infinity,
            ease: "easeInOut",
            delay: p.delay,
          }}
          style={{ willChange: "opacity" }}
        />
      ))}
    </svg>
  );
}

export function FloatingDecorations({
  accent,
  glow,
}: {
  accent: string;
  glow: string;
}) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <motion.div
        className="absolute top-[18%] left-[8%] h-24 w-px origin-top"
        style={{
          background: `linear-gradient(to bottom, transparent, ${accent}, transparent)`,
        }}
        animate={{ opacity: [0.2, 0.5, 0.2], scaleY: [0.8, 1.1, 0.8] }}
        transition={{ duration: SHOWCASE_DURATION * 3, repeat: Infinity, ease: SHOWCASE_EASE }}
      />
      <motion.div
        className="absolute top-[28%] right-[10%] h-16 w-16 rounded-full border"
        style={{ borderColor: accent }}
        animate={{ opacity: [0.1, 0.35, 0.1], scale: [0.9, 1.05, 0.9], rotate: [0, 90, 0] }}
        transition={{ duration: SHOWCASE_DURATION * 4, repeat: Infinity, ease: SHOWCASE_EASE }}
      />
      <motion.div
        className="absolute bottom-[22%] left-[14%] h-20 w-20 rounded-full"
        style={{
          background: `radial-gradient(circle, ${glow} 0%, transparent 70%)`,
        }}
        animate={{ opacity: [0.15, 0.4, 0.15], scale: [1, 1.15, 1] }}
        transition={{ duration: SHOWCASE_DURATION * 2.5, repeat: Infinity, ease: SHOWCASE_EASE }}
      />
      <motion.div
        className="absolute right-[18%] bottom-[30%] h-px w-32"
        style={{
          background: `linear-gradient(to right, transparent, ${accent}88, transparent)`,
        }}
        animate={{ opacity: [0.1, 0.45, 0.1] }}
        transition={{ duration: SHOWCASE_DURATION * 2, repeat: Infinity, ease: SHOWCASE_EASE }}
      />
    </div>
  );
}

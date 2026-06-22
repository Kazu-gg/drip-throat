"use client";

import { motion, useReducedMotion } from "framer-motion";

const DRAW_DURATION = 2;

export function HeroLogoReveal() {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return (
      <p className="font-accent text-5xl tracking-[0.3em] text-gold sm:text-6xl md:text-7xl lg:text-8xl">
        CHEVELLÈ
      </p>
    );
  }

  return (
    <div className="relative mx-auto w-full max-w-[min(100%,720px)]">
      <svg
        viewBox="0 0 720 100"
        className="mx-auto h-auto w-full max-w-[720px]"
        aria-hidden
      >
        <defs>
          <linearGradient id="logo-gold-fill" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#B8962E" />
            <stop offset="45%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#E2C663" />
          </linearGradient>
        </defs>

        <motion.text
          x="50%"
          y="72"
          textAnchor="middle"
          fontSize="52"
          fontFamily="var(--font-cormorant), 'Cormorant Garamond', serif"
          letterSpacing="0.28em"
          stroke="url(#logo-gold-fill)"
          strokeWidth="0.6"
          fill="transparent"
          initial={{ strokeDashoffset: 1400, strokeDasharray: 1400, fillOpacity: 0 }}
          animate={{
            strokeDashoffset: 0,
            fill: "url(#logo-gold-fill)",
            fillOpacity: 1,
          }}
          transition={{
            strokeDashoffset: {
              duration: DRAW_DURATION * 0.65,
              ease: [0.22, 1, 0.36, 1],
            },
            fillOpacity: {
              duration: DRAW_DURATION * 0.45,
              delay: DRAW_DURATION * 0.55,
              ease: "easeOut",
            },
          }}
        >
          CHEVELLÈ
        </motion.text>
      </svg>

      {/* Accessible duplicate for screen readers */}
      <span className="sr-only">CHEVELLÈ</span>
    </div>
  );
}

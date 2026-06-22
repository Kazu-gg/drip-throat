"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

type DustParticle = {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  drift: number;
};

function buildParticles(count: number): DustParticle[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 0.5,
    duration: Math.random() * 8 + 10,
    delay: Math.random() * 6,
    drift: Math.random() * 24 - 12,
  }));
}

export function LuxuryDust() {
  const reduceMotion = useReducedMotion();
  const [particles, setParticles] = useState<DustParticle[] | null>(null);

  useEffect(() => {
    if (reduceMotion) return;

    const mq = window.matchMedia("(max-width: 768px)");
    const sync = () => {
      setParticles(buildParticles(mq.matches ? 14 : 32));
    };

    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, [reduceMotion]);

  if (reduceMotion || !particles) return null;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden mix-blend-screen">
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full bg-gold/40"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            willChange: "transform, opacity",
            transform: "translate3d(0, 0, 0)",
          }}
          animate={{
            y: [0, -40, 0],
            x: [0, p.drift, 0],
            opacity: [0.05, 0.35, 0.05],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

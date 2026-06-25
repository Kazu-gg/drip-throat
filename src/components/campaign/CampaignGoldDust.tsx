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
    size: Math.random() * 2.2 + 0.5,
    duration: Math.random() * 8 + 10,
    delay: Math.random() * 6,
    drift: Math.random() * 24 - 12,
  }));
}

type CampaignGoldDustProps = {
  /** Theme particle color — defaults to campaign gold */
  color?: string;
  /** Particle count; auto-reduced on mobile */
  count?: number;
  className?: string;
};

export function CampaignGoldDust({
  color = "#D4AF37",
  count,
  className = "",
}: CampaignGoldDustProps) {
  const reduceMotion = useReducedMotion();
  const [particles, setParticles] = useState<DustParticle[] | null>(null);

  useEffect(() => {
    if (reduceMotion) return;

    const mq = window.matchMedia("(max-width: 768px)");
    const sync = () => {
      const base = count ?? (mq.matches ? 20 : 36);
      setParticles(buildParticles(base));
    };

    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, [reduceMotion, count]);

  if (reduceMotion || !particles) return null;

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden mix-blend-screen ${className}`}
      aria-hidden
    >
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            background: color,
            boxShadow: `0 0 ${p.size * 4}px ${color}`,
            willChange: "transform, opacity",
          }}
          animate={{
            y: [0, -44, 0],
            x: [0, p.drift, 0],
            opacity: [0.06, 0.4, 0.06],
            scale: [1, 1.2, 1],
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

"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

export type TrailDot = { key: string; x: number; y: number };

const MAX_TRAIL = 16;
const THROTTLE_MS = 50;

export function useHeroTrail() {
  const reduceMotion = useReducedMotion();
  const [dots, setDots] = useState<TrailDot[]>([]);
  const [active, setActive] = useState(false);
  const seqRef = useRef(0);
  const lastRef = useRef(0);

  useEffect(() => {
    setActive(
      !reduceMotion &&
        window.matchMedia("(pointer: fine) and (min-width: 768px)").matches
    );
  }, [reduceMotion]);

  const pushTrail = useCallback(
    (x: number, y: number) => {
      if (!active) return;
      const now = Date.now();
      if (now - lastRef.current < THROTTLE_MS) return;
      lastRef.current = now;
      seqRef.current += 1;
      const key = `hero-trail-${seqRef.current}-${now}`;
      setDots((prev) => [...prev, { key, x, y }].slice(-MAX_TRAIL));
    },
    [active]
  );

  return { dots, pushTrail, active };
}

export function HeroCursorTrail({ dots }: { dots: TrailDot[] }) {
  return (
    <div className="pointer-events-none absolute inset-0 z-[5] overflow-hidden">
      {dots.map((dot) => (
        <motion.span
          key={dot.key}
          className="absolute rounded-full"
          style={{
            left: dot.x,
            top: dot.y,
            width: 2.5,
            height: 2.5,
            marginLeft: -1.25,
            marginTop: -1.25,
            background:
              "radial-gradient(circle, rgba(212,175,55,0.5) 0%, transparent 72%)",
            boxShadow: "0 0 6px rgba(212,175,55,0.2)",
            willChange: "transform, opacity",
          }}
          initial={{ opacity: 0.45, scale: 1 }}
          animate={{ opacity: 0, scale: 0.15 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        />
      ))}
    </div>
  );
}

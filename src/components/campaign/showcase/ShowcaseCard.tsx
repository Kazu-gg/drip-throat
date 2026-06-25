"use client";

import { useRef, useState, useCallback } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  SHOWCASE_DURATION,
  SHOWCASE_EASE,
  type ShowcaseCollection,
} from "@/lib/showcase-collections";

type ShowcaseCardProps = {
  collection: ShowcaseCollection;
  isActive: boolean;
  onActivate: () => void;
};

export function ShowcaseCard({
  collection,
  isActive,
  onActivate,
}: ShowcaseCardProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

  const handleMove = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ rotateX: y * -14, rotateY: x * 14 });
  }, []);

  const resetTilt = useCallback(() => setTilt({ rotateX: 0, rotateY: 0 }), []);

  return (
    <button
      ref={ref}
      type="button"
      onMouseEnter={onActivate}
      onFocus={onActivate}
      onMouseMove={handleMove}
      onMouseLeave={resetTilt}
      onBlur={resetTilt}
      aria-pressed={isActive}
      aria-label={`${collection.name} — ${collection.palette}`}
      data-cursor="explore"
      className="group relative flex shrink-0 flex-col items-center outline-none"
    >
      <motion.div
        animate={{
          scale: isActive ? 1.08 : 1,
          y: isActive ? -8 : 0,
        }}
        transition={{ duration: SHOWCASE_DURATION, ease: SHOWCASE_EASE }}
        style={{ willChange: "transform" }}
      >
        <div
          style={{
            transform: `perspective(1200px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
            transformStyle: "preserve-3d",
            transition: "transform 0.35s cubic-bezier(0.22, 1, 0.36, 1)",
            willChange: "transform",
          }}
          className={`showcase-glass-card relative h-[200px] w-[130px] overflow-hidden sm:h-[240px] sm:w-[156px] ${
            isActive ? "showcase-glass-card--active" : ""
          }`}
        >
          <Image
            src={collection.image}
            alt={collection.alt}
            fill
            className="object-cover object-top transition-transform duration-[800ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
            sizes="160px"
            draggable={false}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
          <div
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-[800ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:opacity-100"
            style={{
              background: `linear-gradient(135deg, ${collection.glow} 0%, transparent 55%)`,
            }}
          />

          {isActive && (
            <motion.span
              layoutId="showcase-active-ring"
              className="pointer-events-none absolute inset-0 rounded-[inherit]"
              style={{
                boxShadow: `0 0 48px ${collection.glow}, inset 0 0 0 1px ${collection.accent}88`,
              }}
              transition={{ duration: SHOWCASE_DURATION, ease: SHOWCASE_EASE }}
            />
          )}
        </div>
      </motion.div>

    </button>
  );
}

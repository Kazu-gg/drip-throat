"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const fabricImage =
  "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=1200&q=80";
const outfitImage =
  "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1200&q=80";

export function FabricReveal() {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const onMove = (clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(100, Math.max(0, pct)));
  };

  return (
    <section
      id="craft"
      className="relative z-10 py-24 sm:py-32"
      aria-labelledby="craft-heading"
    >
      <div className="section-padding mx-auto max-w-6xl">
        <p className="text-center font-body text-xs tracking-[0.45em] text-[var(--campaign-accent)] uppercase">
          Craftsmanship Revealed
        </p>
        <h2
          id="craft-heading"
          className="mt-4 text-center font-display text-[clamp(2rem,5vw,4rem)] font-light text-[var(--campaign-text)]"
        >
          From Fabric to Masterpiece
        </h2>

        <div
          ref={containerRef}
          className="relative mt-14 aspect-[16/10] cursor-ew-resize overflow-hidden border border-white/10"
          onMouseMove={(e) => onMove(e.clientX)}
          onTouchMove={(e) => onMove(e.touches[0].clientX)}
        >
          <Image src={outfitImage} alt="Finished Chevellè outfit" fill className="object-cover" sizes="100vw" />
          <motion.div
            className="absolute inset-0"
            style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
          >
            <Image src={fabricImage} alt="Luxury silk fabric texture" fill className="object-cover" sizes="100vw" />
            <div className="absolute inset-0 bg-[var(--campaign-secondary)]/20 mix-blend-multiply" />
          </motion.div>

          <div
            className="absolute top-0 bottom-0 z-10 w-px bg-[var(--campaign-accent)] shadow-[0_0_20px_var(--campaign-accent)]"
            style={{ left: `${position}%` }}
          >
            <div className="absolute top-1/2 left-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--campaign-accent)] bg-black/80 text-[10px] tracking-widest text-[var(--campaign-accent)]">
              ◈
            </div>
          </div>

          <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-between bg-gradient-to-t from-black/80 to-transparent p-6 font-body text-[10px] tracking-[0.35em] uppercase">
            <span className="text-white/50">Fabric</span>
            <span className="text-[var(--campaign-accent)]">Finished Outfit</span>
          </div>
        </div>
      </div>
    </section>
  );
}

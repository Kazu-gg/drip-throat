"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

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
      className="relative z-10 py-20 sm:py-28"
      aria-labelledby="craft-heading"
    >
      <div className="section-padding mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div
          ref={containerRef}
          className="relative aspect-[4/5] cursor-ew-resize overflow-hidden rounded-2xl ring-1 ring-white/10 lg:aspect-[3/4]"
          onMouseMove={(e) => onMove(e.clientX)}
          onTouchMove={(e) => onMove(e.touches[0].clientX)}
        >
          <Image
            src={outfitImage}
            alt="Finished Chevellè outfit"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div
            className="absolute inset-0"
            style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
          >
            <Image
              src={fabricImage}
              alt="Luxury silk fabric texture"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          <div
            className="absolute top-0 bottom-0 z-10 w-px bg-white shadow-[0_0_16px_rgba(255,255,255,0.6)]"
            style={{ left: `${position}%` }}
          >
            <div className="absolute top-1/2 left-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/80 bg-black/80 text-white">
              ‖
            </div>
          </div>

          <div className="pointer-events-none absolute inset-x-0 top-0 flex justify-between p-4 font-body text-[9px] tracking-[0.3em] text-white/70 uppercase">
            <span>Fabric</span>
            <span>Finished</span>
          </div>
        </div>

        <div className="text-center lg:text-left">
          <p className="font-body text-xs tracking-[0.4em] text-[var(--campaign-accent)] uppercase">
            Mix &amp; Match
          </p>
          <h2
            id="craft-heading"
            className="mt-4 font-display text-[clamp(2rem,5vw,3.5rem)] font-light leading-[1.1] text-white"
          >
            Layer pieces designed
            <br />
            for every occasion
          </h2>
          <p className="mt-6 max-w-md font-body text-sm leading-relaxed text-white/45 lg:mx-0 mx-auto">
            From handwoven silk to finished silhouette — experience how Chevellè
            transforms fabric into wearable art. Drag to reveal the craft.
          </p>
          <Link
            href="/collections/co-ord-set"
            className="mt-10 inline-block border border-white/30 px-10 py-4 font-body text-[10px] tracking-[0.28em] text-white uppercase transition-colors hover:border-[var(--campaign-accent)] hover:text-[var(--campaign-accent)]"
          >
            Shop Mix &amp; Match
          </Link>
        </div>
      </div>
    </section>
  );
}

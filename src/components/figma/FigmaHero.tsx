"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { HERO_IMAGE, HERO_FALLBACK } from "@/lib/figma-home";

const PARTICLES = Array.from({ length: 24 }, (_, i) => ({
  id: i,
  left: `${8 + (i * 17) % 84}%`,
  top: `${12 + (i * 23) % 72}%`,
  delay: (i % 5) * 0.4,
  size: i % 3 === 0 ? 2 : 1,
}));

export function FigmaHero() {
  return (
    <section
      id="intro"
      className="relative flex min-h-[100dvh] flex-col overflow-hidden"
      aria-label="Introduction"
    >
      <div className="absolute inset-0">
        <Image
          src={HERO_IMAGE.src}
          alt={HERO_IMAGE.alt}
          fill
          priority
          className="object-cover object-top"
          sizes="100vw"
          onError={(e) => {
            const img = e.currentTarget;
            if (!img.src.includes("unsplash")) img.src = HERO_FALLBACK;
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-black/35" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50" />
      </div>

      {PARTICLES.map((p) => (
        <motion.span
          key={p.id}
          className="pointer-events-none absolute rounded-full bg-gold"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
          }}
          animate={{ opacity: [0.15, 0.7, 0.15], scale: [1, 1.8, 1] }}
          transition={{
            duration: 3 + p.delay,
            repeat: Infinity,
            ease: "easeInOut",
            delay: p.delay,
          }}
          aria-hidden
        />
      ))}

      <div className="relative z-10 flex flex-1 flex-col justify-end section-padding pb-14 pt-28 sm:pb-16">
        <div className="mx-auto w-full max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl"
          >
            <h1 className="font-accent text-[clamp(3.5rem,12vw,7.5rem)] leading-[0.9] tracking-[0.12em] text-gold">
              CHEVELLÈ
            </h1>
            <p className="mt-6 font-body text-[10px] tracking-[0.55em] text-gold/80 uppercase sm:text-xs">
              Curated Elegance
            </p>
            <p className="mt-5 max-w-lg font-body text-sm leading-relaxed text-white/55 sm:text-base">
              Where Indian luxury meets modern grace — curated for those who
              wear elegance as identity.
            </p>

            <Link
              href="#explore"
              className="figma-btn-enter group mt-10 inline-flex items-center gap-4 font-body text-[10px] tracking-[0.35em] text-white uppercase"
            >
              Enter the World
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/50 text-gold transition-colors group-hover:bg-gold group-hover:text-black">
                →
              </span>
            </Link>
          </motion.div>

          <div className="mt-16 flex items-end justify-between gap-6">
            <div className="hidden items-center gap-3 sm:flex">
              <span className="font-body text-[9px] tracking-[0.35em] text-white/35 uppercase">
                Scroll to Discover
              </span>
              <div className="flex h-9 w-5 items-start justify-center rounded-full border border-white/20 p-1">
                <motion.span
                  animate={{ y: [0, 6, 0] }}
                  transition={{ duration: 1.6, repeat: Infinity }}
                  className="block h-1.5 w-1 rounded-full bg-gold/70"
                />
              </div>
            </div>
            <button
              type="button"
              className="ml-auto flex items-center gap-2 font-body text-[9px] tracking-[0.32em] text-white/45 uppercase transition-colors hover:text-gold"
              aria-label="Play brand film"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/25">
                ▶
              </span>
              Play Film
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

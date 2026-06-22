"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { featuredWorlds } from "@/lib/collection-worlds";
import { MaskTextReveal } from "@/components/experience/MaskTextReveal";

export function CollectionWorldsPreview() {
  return (
    <section
      id="worlds"
      className="section-padding relative overflow-hidden border-t border-white/5"
      aria-labelledby="worlds-heading"
    >
      <MaskTextReveal className="mx-auto max-w-7xl">
        <p className="font-body text-xs tracking-[0.4em] text-gold uppercase">
          Collection Universes
        </p>
        <h2
          id="worlds-heading"
          className="mt-4 font-display text-4xl font-light tracking-wide text-white sm:text-5xl md:text-6xl"
        >
          Each World. Entirely Different.
        </h2>
        <p className="mt-6 max-w-xl font-body text-sm leading-relaxed text-white/40">
          Enter a collection and the atmosphere transforms — color, light, and
          mood shift like stepping into a new exhibition hall.
        </p>
      </MaskTextReveal>

      <div className="mx-auto mt-16 grid max-w-7xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {featuredWorlds.map((world, i) => (
          <motion.div
            key={world.id}
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: i * 0.08, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link
              href={`/collections/${world.id}`}
              data-cursor="enter"
              className="group relative flex aspect-[3/4] flex-col justify-end overflow-hidden p-6 transition-transform duration-700 hover:scale-[1.02]"
              style={{ backgroundColor: world.bg }}
            >
              <div
                className="pointer-events-none absolute inset-0 opacity-60 transition-opacity duration-700 group-hover:opacity-100"
                style={{
                  background: `radial-gradient(ellipse at 50% 20%, ${world.glow} 0%, transparent 65%)`,
                }}
              />
              <div
                className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                style={{
                  boxShadow: `inset 0 0 0 1px ${world.accent}40`,
                }}
              />
              <p
                className="relative font-body text-[10px] tracking-[0.35em] uppercase"
                style={{ color: world.accent }}
              >
                {world.tagline}
              </p>
              <h3 className="relative mt-2 font-display text-2xl font-light tracking-wide text-white">
                {world.name}
              </h3>
              <span
                className="relative mt-4 font-body text-[10px] tracking-[0.25em] uppercase opacity-0 transition-all duration-500 group-hover:opacity-100"
                style={{ color: world.accent }}
              >
                Enter World →
              </span>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

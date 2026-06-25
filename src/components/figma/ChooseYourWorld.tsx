"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { CHOOSE_WORLDS, figmaImage } from "@/lib/figma-home";

const EASE = [0.22, 1, 0.36, 1] as const;
const DURATION = 0.75;

type World = (typeof CHOOSE_WORLDS)[number];

function CategoryChip({
  world,
  isActive,
  onSelect,
}: {
  world: World;
  isActive: boolean;
  onSelect: () => void;
}) {
  const image = figmaImage(world.slug, world.title);

  return (
    <div className="relative flex shrink-0 flex-col items-center">
      <AnimatePresence mode="wait">
        {isActive && (
          <motion.div
            key={`pill-${world.slug}`}
            initial={{ opacity: 0, y: 10, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.95 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="mb-3 rounded-full border border-white/15 bg-black/55 px-5 py-2 backdrop-blur-md"
          >
            <span className="font-body text-[10px] tracking-[0.38em] text-white uppercase">
              {world.subtitle}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={onSelect}
        onMouseEnter={onSelect}
        onFocus={onSelect}
        aria-pressed={isActive}
        aria-label={`${world.subtitle} — ${world.title}`}
        animate={{
          width: isActive ? 124 : 92,
          height: isActive ? 210 : 158,
        }}
        transition={{ duration: DURATION, ease: EASE }}
        className="relative overflow-hidden rounded-[18px] outline-none ring-offset-2 ring-offset-black focus-visible:ring-2 focus-visible:ring-gold/60"
        style={{
          backgroundColor: world.tint,
          boxShadow: isActive
            ? `0 24px 48px ${world.glow}, inset 0 0 0 1px rgba(255,255,255,0.12)`
            : "0 8px 24px rgba(0,0,0,0.35)",
        }}
      >
        <Image
          src={image.src}
          alt={image.alt}
          fill
          className="object-cover object-top"
          sizes="124px"
          draggable={false}
        />
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to top, ${world.tint}dd 0%, transparent 55%)`,
          }}
        />
        {isActive && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-x-0 bottom-3 text-center font-body text-[11px] tracking-wide text-white/90"
          >
            {world.subtitle}
          </motion.span>
        )}
      </motion.button>
    </div>
  );
}

export function ChooseYourWorld() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = CHOOSE_WORLDS[activeIndex];
  const heroImage = figmaImage(active.slug, active.title);
  const href = `/collections/${active.slug}?category=${active.gender}`;

  return (
    <section
      id="explore"
      className="relative min-h-[100dvh] overflow-hidden border-t border-gold/10"
      aria-labelledby="choose-world-heading"
    >
      <div className="pointer-events-none absolute inset-0">
        <AnimatePresence mode="sync">
          <motion.div
            key={`bg-${active.slug}`}
            initial={{ opacity: 0, scale: 1.12 }}
            animate={{ opacity: 1, scale: 1.06 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: DURATION, ease: EASE }}
            className="absolute inset-0"
          >
            <Image
              src={heroImage.src}
              alt=""
              fill
              priority
              className="object-cover object-center"
              sizes="100vw"
              aria-hidden
            />
          </motion.div>
        </AnimatePresence>

        <AnimatePresence mode="sync">
          <motion.div
            key={`wash-${active.slug}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: DURATION, ease: EASE }}
            className="absolute inset-0"
            style={{
              background: `linear-gradient(165deg, ${active.tint}55 0%, ${active.tint}aa 35%, rgba(5,5,5,0.75) 100%)`,
            }}
            aria-hidden
          />
        </AnimatePresence>

        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse 90% 70% at 50% 35%, ${active.glow} 0%, transparent 62%)`,
          }}
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/80" aria-hidden />
      </div>

      <div className="relative z-10 flex min-h-[100dvh] flex-col">
        <header className="section-padding shrink-0 pt-28 text-center">
          <p className="font-body text-[10px] tracking-[0.45em] text-gold/80 uppercase">
            Explore
          </p>
          <h2
            id="choose-world-heading"
            className="mt-3 font-display text-[clamp(1.75rem,4vw,2.75rem)] font-light tracking-[0.12em] text-white uppercase"
          >
            Choose Your World
          </h2>

          <AnimatePresence mode="wait">
            <motion.div
              key={active.slug}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: DURATION, ease: EASE }}
              className="mx-auto mt-8 max-w-xl"
            >
              <h3 className="font-display text-3xl font-light tracking-wide text-white sm:text-4xl">
                {active.title}
              </h3>
              <p className="mt-4 font-body text-sm leading-relaxed text-white/55 sm:text-base">
                {active.description}
              </p>
            </motion.div>
          </AnimatePresence>
        </header>

        <div className="flex-1" aria-hidden />

        <div className="section-padding shrink-0 pb-10 pt-6">
          <div
            className="flex items-end justify-center gap-3 overflow-x-auto pb-2 sm:gap-4 md:gap-5"
            role="list"
            aria-label="Category worlds"
          >
            {CHOOSE_WORLDS.map((world, i) => (
              <div key={world.slug} role="listitem">
                <CategoryChip
                  world={world}
                  isActive={i === activeIndex}
                  onSelect={() => setActiveIndex(i)}
                />
              </div>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={`cta-${active.slug}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.45, ease: EASE }}
              className="mt-8 flex justify-center"
            >
              <Link
                href={href}
                className="figma-btn-outline inline-flex items-center gap-2 px-10 py-3.5 font-body text-[10px] tracking-[0.32em] text-gold uppercase"
              >
                Enter {active.subtitle}
                <span aria-hidden>→</span>
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

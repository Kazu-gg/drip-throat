"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { CHOOSE_WORLDS, figmaImage } from "@/lib/figma-home";

type World = (typeof CHOOSE_WORLDS)[number];

function WorldFlipCard({ world, index }: { world: World; index: number }) {
  const [flipped, setFlipped] = useState(false);
  const reduceMotion = useReducedMotion();
  const image = figmaImage(world.slug, world.title);
  const showBack = !reduceMotion && flipped;
  const href = `/collections/${world.slug}?category=${world.gender}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ delay: index * 0.08, duration: 0.65 }}
    >
      <div
        className="flip-scene aspect-[3/4] cursor-pointer"
        onMouseEnter={() => !reduceMotion && setFlipped(true)}
        onMouseLeave={() => setFlipped(false)}
        onClick={() => {
          if (!reduceMotion) setFlipped((v) => !v);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            if (!reduceMotion) setFlipped((v) => !v);
          }
        }}
        role="button"
        tabIndex={0}
        aria-label={`${world.title}, ${world.subtitle}. ${flipped ? "Showing details" : "Flip for details"}`}
        aria-pressed={flipped}
      >
        <div className={`flip-inner ${showBack ? "is-flipped" : ""}`}>
          <div className="flip-face overflow-hidden bg-black-card">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover object-top"
              sizes="(max-width:640px) 50vw, 25vw"
            />
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(to top, ${world.tint}ee 0%, rgba(0,0,0,0.35) 55%, rgba(0,0,0,0.2) 100%)`,
              }}
            />
            <div
              className="absolute inset-0 opacity-60"
              style={{
                background: `radial-gradient(circle at 50% 80%, ${world.glow} 0%, transparent 65%)`,
              }}
            />

            <div className="absolute inset-x-0 top-0 flex items-start justify-between p-5">
              <span className="font-body text-[10px] tracking-[0.35em] text-white/50">
                {world.num}
              </span>
              <span className="flex h-7 w-7 items-center justify-center border border-white/20 text-sm text-white/50">
                +
              </span>
            </div>

            <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
              <p className="font-body text-[9px] tracking-[0.35em] text-gold/80 uppercase">
                {world.subtitle}
              </p>
              <h3 className="mt-2 font-display text-xl font-light leading-snug text-white sm:text-2xl">
                {world.title}
              </h3>
            </div>

            <div className="pointer-events-none absolute top-14 right-4 border border-white/15 bg-black/45 px-2.5 py-1 font-body text-[8px] tracking-[0.28em] text-white/50 uppercase backdrop-blur-sm">
              Flip
            </div>
          </div>

          <div
            className="flip-face flip-back flex flex-col justify-between overflow-hidden p-5 sm:p-6"
            style={{
              background: `linear-gradient(160deg, ${world.tint}33 0%, #0a0a0a 45%, #050505 100%)`,
              boxShadow: `inset 0 0 0 1px ${world.tint}55, 0 0 40px ${world.glow}`,
            }}
          >
            <div>
              <div className="flex items-start justify-between">
                <span className="font-body text-[10px] tracking-[0.35em] text-gold/70">
                  {world.num}
                </span>
                <span className="font-body text-[9px] tracking-[0.32em] text-white/35 uppercase">
                  {world.gender}
                </span>
              </div>
              <p className="mt-6 font-body text-[9px] tracking-[0.35em] text-gold uppercase">
                {world.subtitle}
              </p>
              <h3 className="mt-2 font-display text-xl font-light leading-snug text-white sm:text-2xl">
                {world.title}
              </h3>
              <p className="mt-4 font-body text-sm leading-relaxed text-white/50">
                {world.description}
              </p>
            </div>

            <Link
              href={href}
              onClick={(e) => e.stopPropagation()}
              className="figma-btn-outline mt-6 block py-3.5 text-center font-body text-[10px] tracking-[0.32em] text-gold uppercase"
            >
              Enter →
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function ChooseYourWorld() {
  return (
    <section
      id="explore"
      className="section-padding border-t border-gold/10 bg-black"
      aria-labelledby="choose-world-heading"
    >
      <div className="mx-auto max-w-7xl">
        <h2
          id="choose-world-heading"
          className="text-center font-display text-[clamp(1.75rem,4vw,2.75rem)] font-light tracking-[0.12em] text-white uppercase"
        >
          Choose Your World
        </h2>

        <div className="mt-14 grid grid-cols-2 gap-3 sm:gap-4 lg:gap-5">
          {CHOOSE_WORLDS.map((world, i) => (
            <WorldFlipCard key={world.slug} world={world} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

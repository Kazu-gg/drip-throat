"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { figmaImage } from "@/lib/figma-home";
import { getCategoryImage } from "@/lib/category-images";
import { getWorldCardImage } from "@/lib/world-cards";

const WORLDS = [
  {
    id: "women",
    label: "Women",
    href: "/collections/women",
    slug: "sarees",
    tint: "#8B1538",
    description:
      "Sarees, lehengas, kurtis, co-ord sets, suits & shirts — luxury womenswear for weddings, festivities, and everyday elegance.",
    highlights: ["Sarees", "Lehengas", "Kurtis", "Co-ords", "Suits"],
  },
  {
    id: "men",
    label: "Men",
    href: "/collections/men",
    slug: "jackets",
    tint: "#2D6A4F",
    description:
      "Kurtas, shirts, jackets, denim & tailored trousers — refined menswear for celebrations, work, and off-duty style.",
    highlights: ["Kurtas", "Shirts", "Jackets", "Jeans", "Trousers"],
  },
  {
    id: "unisex",
    label: "Unisex",
    href: "/collections/unisex",
    slug: "unisex",
    tint: "#6B21A8",
    description:
      "Women's & men's shirts, everyday tees, denim, jackets & co-ords — easy pieces both can wear, mix, and make their own.",
    highlights: ["Women's Shirts", "Men's Shirts", "T-Shirts", "Jeans", "Jackets"],
  },
  {
    id: "accessories",
    label: "Accessories",
    href: "/collections/accessories",
    slug: "jewellery",
    tint: "#1C1C22",
    description:
      "Jewellery, handbags, watches, sunglasses, wallets & belts — the finishing touches that complete every look.",
    highlights: ["Jewellery", "Handbags", "Watches", "Sunglasses"],
  },
] as const;

function worldImage(world: (typeof WORLDS)[number]) {
  const card = getWorldCardImage(world.id, world.label);
  if (card) return card;
  const fallback = getCategoryImage(world.slug);
  return fallback ?? figmaImage(world.slug, world.label);
}

function WorldFlipCard({
  world,
  priority,
}: {
  world: (typeof WORLDS)[number];
  priority?: boolean;
}) {
  const [flipped, setFlipped] = useState(false);
  const reduceMotion = useReducedMotion();
  const image = worldImage(world);
  const showBack = !reduceMotion && flipped;

  return (
    <Link
      href={world.href}
      className="flip-scene group block aspect-[3/4]"
      onMouseEnter={() => !reduceMotion && setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      onFocus={() => !reduceMotion && setFlipped(true)}
      onBlur={() => setFlipped(false)}
      aria-label={`${world.label} — ${world.description}`}
    >
      <div className={`flip-inner h-full ${showBack ? "is-flipped" : ""}`}>
        {/* Front */}
        <div className="flip-face overflow-hidden">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className="object-cover object-top"
            sizes="25vw"
            priority={priority}
          />
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(to top, ${world.tint}55 0%, ${world.tint}22 30%, transparent 65%)`,
            }}
          />
          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/45 to-transparent" />
          <span className="absolute inset-x-0 bottom-0 p-5 text-center font-body text-[11px] tracking-[0.38em] text-white uppercase">
            {world.label}
          </span>
        </div>

        {/* Back */}
        <div
          className="flip-face flip-back flex flex-col justify-between p-5 sm:p-6"
          style={{
            background: `linear-gradient(160deg, ${world.tint}22 0%, #12150a 45%, #1a1f10 100%)`,
            boxShadow: `inset 0 0 0 1px ${world.tint}55`,
          }}
        >
          <div>
            <p
              className="font-body text-[9px] tracking-[0.4em] uppercase"
              style={{ color: world.tint }}
            >
              {world.label}
            </p>
            <p className="mt-4 font-body text-xs leading-relaxed text-white/65 sm:text-sm">
              {world.description}
            </p>
            <ul className="mt-4 flex flex-wrap gap-1.5">
              {world.highlights.map((item) => (
                <li
                  key={item}
                  className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 font-body text-[8px] tracking-[0.12em] text-white/55 uppercase"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <span className="font-body text-[10px] tracking-[0.28em] text-gold uppercase">
            Explore →
          </span>
        </div>
      </div>
    </Link>
  );
}

export function ExploreOurWorlds() {
  return (
    <section
      id="explore"
      className="section-padding border-t border-[var(--border-subtle)] bg-[var(--campaign-bg)]"
      aria-labelledby="worlds-heading"
    >
      <div className="mx-auto max-w-7xl">
        <h2
          id="worlds-heading"
          className="text-center font-display text-2xl font-light tracking-[0.15em] text-[var(--campaign-text)] uppercase sm:text-3xl"
        >
          Explore Our Worlds
        </h2>

        <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {WORLDS.map((world, i) => (
            <motion.div
              key={world.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <WorldFlipCard world={world} priority={i < 2} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

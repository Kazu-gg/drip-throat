"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { products } from "@/lib/products";

export function SpotlightCarousel() {
  const items = products.slice(0, 5);
  const [index, setIndex] = useState(0);
  const active = items[index];

  const prev = () => setIndex((i) => (i === 0 ? items.length - 1 : i - 1));
  const next = () => setIndex((i) => (i === items.length - 1 ? 0 : i + 1));

  return (
    <section
      id="showroom"
      className="relative z-10 overflow-hidden py-20 sm:py-28"
      aria-labelledby="showroom-heading"
    >
      <div className="section-padding relative mx-auto max-w-7xl">
        <p className="text-center font-body text-xs tracking-[0.45em] text-[var(--campaign-accent)] uppercase">
          The Spotlight
        </p>
        <h2
          id="showroom-heading"
          className="mt-4 text-center font-display text-[clamp(2rem,6vw,4.5rem)] font-light leading-[1.05] text-[var(--campaign-text)]"
        >
          Unleash Elegance
          <br />
          <span className="text-[var(--campaign-accent)]">In Every Thread</span>
        </h2>

        <div className="relative mt-14 flex items-center justify-center">
          <button
            type="button"
            onClick={prev}
            className="absolute left-0 z-20 hidden h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white backdrop-blur-sm transition-colors hover:border-[var(--campaign-accent)] sm:flex"
            aria-label="Previous piece"
          >
            ←
          </button>

          <div className="flex w-full max-w-5xl items-end justify-center gap-3 sm:gap-5">
            {items.map((product, i) => {
              const offset = i - index;
              const isCenter = offset === 0;
              const isVisible = Math.abs(offset) <= 1;

              if (!isVisible) return null;

              return (
                <motion.div
                  key={product.slug}
                  layout
                  animate={{
                    scale: isCenter ? 1 : 0.72,
                    y: isCenter ? 0 : 24,
                    opacity: isCenter ? 1 : 0.45,
                    zIndex: isCenter ? 10 : 1,
                  }}
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  className="w-[min(72vw,280px)] sm:w-[300px]"
                >
                  <Link href={`/products/${product.slug}`} data-cursor="view">
                    <div
                      className={`relative aspect-[3/4] overflow-hidden rounded-2xl ${
                        isCenter
                          ? "category-card-glow ring-1 ring-white/30"
                          : "ring-1 ring-white/10"
                      }`}
                    >
                      <Image
                        src={product.image.src}
                        alt={product.image.alt}
                        fill
                        className="object-cover"
                        sizes="300px"
                        priority={isCenter}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    </div>
                    {isCenter && (
                      <AnimatePresence>
                        <motion.p
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-5 text-center font-display text-xl font-light text-white sm:text-2xl"
                        >
                          {product.name}
                        </motion.p>
                      </AnimatePresence>
                    )}
                  </Link>
                </motion.div>
              );
            })}
          </div>

          <button
            type="button"
            onClick={next}
            className="absolute right-0 z-20 hidden h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white backdrop-blur-sm transition-colors hover:border-[var(--campaign-accent)] sm:flex"
            aria-label="Next piece"
          >
            →
          </button>
        </div>

        <div className="mt-8 flex justify-center gap-2">
          {items.map((p, i) => (
            <button
              key={p.slug}
              type="button"
              onClick={() => setIndex(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === index
                  ? "w-8 bg-[var(--campaign-accent)]"
                  : "w-1.5 bg-white/25"
              }`}
              aria-label={`Show ${p.name}`}
            />
          ))}
        </div>

        {active && (
          <p className="mt-6 text-center font-body text-sm text-[var(--campaign-accent)]">
            {active.priceDisplay}
          </p>
        )}
      </div>
    </section>
  );
}

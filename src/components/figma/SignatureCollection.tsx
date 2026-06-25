"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { SIGNATURE_SLIDES, figmaImage } from "@/lib/figma-home";

export function SignatureCollection() {
  const [index, setIndex] = useState(0);
  const slide = SIGNATURE_SLIDES[index];
  const image = figmaImage(slide.slug, slide.title);
  const total = SIGNATURE_SLIDES.length;
  const num = String(index + 1).padStart(2, "0");
  const totalStr = String(total).padStart(2, "0");

  const prev = () => setIndex((i) => (i === 0 ? total - 1 : i - 1));
  const next = () => setIndex((i) => (i === total - 1 ? 0 : i + 1));

  return (
    <section
      id="signature"
      className="relative overflow-hidden border-t border-gold/10 bg-black"
      aria-labelledby="signature-heading"
    >
      <div className="mx-auto grid max-w-7xl lg:grid-cols-2 lg:items-stretch">
        <div className="flex flex-col justify-center section-padding !py-16 lg:!py-24">
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.id}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 12 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="font-body text-[10px] tracking-[0.45em] text-gold uppercase">
                Signature Collection
              </p>
              <h2
                id="signature-heading"
                className="mt-4 font-display text-[clamp(1.75rem,4vw,2.75rem)] font-light leading-snug tracking-wide text-white uppercase"
              >
                {slide.title}
              </h2>
              <p className="mt-5 max-w-md font-body text-sm leading-relaxed text-white/50">
                {slide.description}
              </p>
              <Link
                href={`/collections/${slide.slug}`}
                className="figma-btn-outline mt-8 inline-flex items-center px-8 py-3.5 font-body text-[10px] tracking-[0.32em] text-gold uppercase"
              >
                Explore Collection →
              </Link>
            </motion.div>
          </AnimatePresence>

          <div className="mt-12 flex items-center gap-6">
            <button
              type="button"
              onClick={prev}
              className="flex h-10 w-10 items-center justify-center border border-white/15 text-white/60 transition-colors hover:border-gold/40 hover:text-gold"
              aria-label="Previous collection"
            >
              ←
            </button>
            <span className="font-body text-[11px] tracking-[0.35em] text-white/45 tabular-nums">
              {num} — {totalStr}
            </span>
            <button
              type="button"
              onClick={next}
              className="flex h-10 w-10 items-center justify-center border border-white/15 text-white/60 transition-colors hover:border-gold/40 hover:text-gold"
              aria-label="Next collection"
            >
              →
            </button>
          </div>
        </div>

        <div className="relative min-h-[360px] lg:min-h-[560px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.id}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover object-top"
                sizes="(max-width:1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent lg:from-black/40" />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { figmaImage } from "@/lib/figma-home";

const THUMBNAIL_SLUGS = ["handbags", "jewellery", "sarees"] as const;

export function PackagingExperience() {
  const [active, setActive] = useState(0);
  const images = THUMBNAIL_SLUGS.map((slug) => figmaImage(slug, "Chevellè packaging"));
  const main = images[active];

  return (
    <section
      id="experience"
      className="relative border-t border-gold/10 bg-black"
      aria-labelledby="packaging-heading"
    >
      <div className="mx-auto grid max-w-7xl lg:grid-cols-[1fr_auto] lg:items-stretch">
        <div className="relative min-h-[420px] lg:min-h-[560px]">
          <motion.div
            key={active}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <Image
              src={main.src}
              alt={main.alt}
              fill
              className="object-cover object-center"
              sizes="(max-width:1024px) 100vw, 65vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />
          </motion.div>

          <div className="relative z-10 flex h-full flex-col justify-end section-padding !pb-14 !pt-32">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="max-w-lg"
            >
              <p className="font-body text-[10px] tracking-[0.4em] text-gold uppercase">
                The Chevellè Experience
              </p>
              <h2
                id="packaging-heading"
                className="mt-4 font-display text-[clamp(1.5rem,3.5vw,2.25rem)] font-light leading-snug tracking-wide text-white uppercase"
              >
                Luxury begins before the outfit
              </h2>
              <Link
                href="/collections"
                className="figma-btn-outline mt-8 inline-flex items-center px-8 py-3.5 font-body text-[10px] tracking-[0.32em] text-gold uppercase"
              >
                Discover Our Packaging
              </Link>
            </motion.div>
          </div>
        </div>

        <div className="hidden flex-col gap-3 border-l border-gold/10 bg-black-card/50 p-4 lg:flex">
          {images.map((img, i) => (
            <button
              key={THUMBNAIL_SLUGS[i]}
              type="button"
              onClick={() => setActive(i)}
              className={`relative h-24 w-20 overflow-hidden border transition-colors ${
                active === i ? "border-gold/60" : "border-white/10 hover:border-white/25"
              }`}
              aria-label={`View packaging image ${i + 1}`}
              aria-pressed={active === i}
            >
              <Image src={img.src} alt="" fill className="object-cover" sizes="80px" />
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-center gap-2 border-t border-gold/10 p-4 lg:hidden">
        {images.map((img, i) => (
          <button
            key={THUMBNAIL_SLUGS[i]}
            type="button"
            onClick={() => setActive(i)}
            className={`relative h-16 w-14 overflow-hidden border ${
              active === i ? "border-gold/60" : "border-white/10"
            }`}
            aria-label={`View packaging image ${i + 1}`}
          >
            <Image src={img.src} alt="" fill className="object-cover" sizes="56px" />
          </button>
        ))}
      </div>
    </section>
  );
}

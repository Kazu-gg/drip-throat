"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { products } from "@/lib/products";
import { MagneticButton } from "@/components/ui/MagneticButton";

export function LuxuryBestsellers() {
  const items = products.slice(0, 4);
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section
      id="bestsellers"
      className="relative z-10 py-24 sm:py-32"
      aria-labelledby="bestsellers-heading"
    >
      <div className="section-padding mx-auto max-w-7xl">
        <p className="font-body text-xs tracking-[0.45em] text-[var(--campaign-accent)] uppercase">
          Most Coveted
        </p>
        <h2
          id="bestsellers-heading"
          className="mt-4 font-display text-[clamp(2.5rem,6vw,4.5rem)] font-light text-[var(--campaign-text)]"
        >
          The Edit
        </h2>

        <div className="mt-16 flex flex-col gap-10">
          {items.map((product, index) => (
            <motion.article
              key={product.slug}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              onMouseEnter={() => setHovered(product.slug)}
              onMouseLeave={() => setHovered(null)}
              className="group relative"
            >
              <Link href={`/products/${product.slug}`} data-cursor="view">
                <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
                  <div className="relative aspect-[4/5] overflow-hidden lg:col-span-7">
                    <Image
                      src={product.image.src}
                      alt={product.image.alt}
                      fill
                      className={`object-cover transition-transform duration-[1.4s] ease-luxury ${hovered === product.slug ? "scale-110" : "scale-100"}`}
                      sizes="(max-width: 1024px) 100vw, 58vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <motion.div
                      className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-[var(--campaign-accent)]/25 to-transparent"
                      initial={{ x: "-100%" }}
                      animate={{ x: hovered === product.slug ? "100%" : "-100%" }}
                      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </div>
                  <div className="lg:col-span-5">
                    <p className="font-body text-[10px] tracking-[0.4em] text-[var(--campaign-accent)] uppercase">
                      {product.category}
                    </p>
                    <h3 className="mt-3 font-display text-3xl font-light text-white sm:text-4xl">
                      {product.name}
                    </h3>
                    <p className="mt-4 font-body text-lg text-[var(--campaign-accent)]">
                      {product.priceDisplay}
                    </p>
                    <p className="mt-4 max-w-md font-body text-sm leading-relaxed text-white/45">
                      {product.description.slice(0, 120)}…
                    </p>
                    <div className="mt-8">
                      <MagneticButton
                        href={`/products/${product.slug}`}
                        className="border border-[var(--campaign-accent)] px-8 py-3 font-body text-[10px] tracking-[0.25em] text-[var(--campaign-accent)] uppercase transition-colors hover:bg-[var(--campaign-accent)] hover:text-black"
                      >
                        View Piece
                      </MagneticButton>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { bestsellers } from "@/lib/data";
import { GrabScroll } from "@/components/ui/GrabScroll";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Bestsellers() {
  const [activeProduct, setActiveProduct] = useState<number | null>(null);

  return (
    <section
      id="bestsellers"
      className="section-padding relative overflow-hidden luxury-gradient"
      aria-labelledby="bestsellers-heading"
    >
      <SectionHeading
        label="Most Loved"
        title="Bestsellers"
        subtitle="The pieces our clientele can't stop talking about."
      />

      <GrabScroll className="gap-5 px-5 sm:gap-6 sm:px-8 md:px-12 lg:px-16 xl:px-24">
        {bestsellers.map((product, index) => (
          <motion.article
            key={product.id}
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              delay: index * 0.1,
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="group relative w-[280px] flex-shrink-0 sm:w-[320px]"
            style={{ scrollSnapAlign: "start" }}
            onMouseEnter={() => setActiveProduct(product.id)}
            onMouseLeave={() => setActiveProduct(null)}
          >
            <Link href={`/products/${product.slug}`} className="block" draggable={false}>
              <div className="gold-border-glow relative aspect-[3/4] overflow-hidden bg-black-card">
                <Image
                  src={product.image}
                  alt={product.imageAlt}
                  fill
                  loading="lazy"
                  className="pointer-events-none object-cover transition-transform duration-700 ease-luxury group-hover:scale-105"
                  sizes="320px"
                  draggable={false}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />

                <AnimatePresence>
                  {activeProduct === product.id && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm"
                    >
                      <span className="border border-gold px-8 py-3 font-body text-xs tracking-[0.2em] text-gold uppercase">
                        Quick View
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="absolute top-4 left-4">
                  <span className="bg-black/60 px-3 py-1 font-body text-[10px] tracking-[0.2em] text-gold/80 uppercase backdrop-blur-sm">
                    {product.category}
                  </span>
                </div>
              </div>

              <div className="mt-5">
                <h3 className="font-display text-lg font-light tracking-wide text-white transition-colors duration-300 group-hover:text-gold">
                  {product.name}
                </h3>
                <p className="mt-1 font-body text-sm text-gold/80">{product.price}</p>
              </div>
            </Link>
          </motion.article>
        ))}
      </GrabScroll>

      <div className="mt-10 text-center">
        <Link
          href="/products"
          className="inline-block border border-white/10 px-8 py-3 font-body text-xs tracking-[0.2em] text-white/50 uppercase transition-colors hover:border-gold/40 hover:text-gold"
        >
          View All Products
        </Link>
      </div>
    </section>
  );
}

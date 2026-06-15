"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { collections } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { fadeUp, staggerContainer } from "@/components/ui/SectionHeading";

export function FeaturedCollections() {
  return (
    <section
      id="collections"
      className="section-padding relative luxury-gradient"
      aria-labelledby="collections-heading"
    >
      <SectionHeading
        label="Discover"
        title="Featured Collections"
        subtitle="Explore our handpicked selection of premium ethnic and contemporary wear."
      />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="mx-auto grid max-w-7xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6"
      >
        {collections.map((collection, index) => (
          <motion.article
            key={collection.id}
            variants={fadeUp}
            custom={index * 0.05}
            className={`gold-border-glow group relative overflow-hidden ${
              index === 0 ? "sm:col-span-2 sm:row-span-1 lg:col-span-2" : ""
            }`}
          >
            <Link
              href={`/collections/${collection.id}`}
              className="block"
              aria-label={`Shop ${collection.name} — ${collection.subtitle}`}
            >
              <div
                className={`relative overflow-hidden ${
                  index === 0 ? "aspect-[21/9] sm:aspect-[2.2/1]" : "aspect-[3/4]"
                }`}
              >
                <Image
                  src={collection.image}
                  alt={collection.imageAlt}
                  fill
                  loading="lazy"
                  className="object-cover transition-transform duration-700 ease-luxury group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-90" />

              <div
                className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  boxShadow: "inset 0 0 60px rgba(201,162,74,0.1)",
                }}
              />

              <div className="absolute right-0 bottom-0 left-0 p-6 sm:p-8">
                <p className="mb-1 font-body text-[10px] tracking-[0.3em] text-gold/70 uppercase">
                  {collection.subtitle}
                </p>
                <h3 className="font-display text-2xl font-light tracking-wide text-white sm:text-3xl">
                  {collection.name}
                </h3>
                <motion.div
                  className="mt-4 flex items-center gap-2 opacity-0 transition-all duration-500 group-hover:opacity-100"
                >
                  <span className="font-body text-xs tracking-[0.2em] text-gold uppercase">
                    Explore
                  </span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    className="text-gold transition-transform duration-300 group-hover:translate-x-1"
                  >
                    <path
                      d="M3 8h10M9 4l4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="1"
                    />
                  </svg>
                </motion.div>
              </div>
            </div>
            </Link>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}

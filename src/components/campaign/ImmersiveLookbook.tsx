"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { instagramPosts } from "@/lib/data";

const sizes = [
  "sm:col-span-2 sm:row-span-2",
  "sm:col-span-1 sm:row-span-1",
  "sm:col-span-1 sm:row-span-2",
  "sm:col-span-2 sm:row-span-1",
  "sm:col-span-1 sm:row-span-1",
  "sm:col-span-1 sm:row-span-1",
];

export function ImmersiveLookbook() {
  return (
    <section
      id="lookbook"
      className="relative z-10 py-24 sm:py-32"
      aria-labelledby="lookbook-heading"
    >
      <div className="section-padding mx-auto max-w-7xl">
        <p className="font-body text-xs tracking-[0.45em] text-[var(--campaign-accent)] uppercase">
          Immersive Lookbook
        </p>
        <h2
          id="lookbook-heading"
          className="mt-4 font-display text-[clamp(2.5rem,6vw,4.5rem)] font-light text-[var(--campaign-text)]"
        >
          Vogue Meets Pinterest
        </h2>

        <div className="mt-14 grid grid-cols-1 gap-3 sm:grid-cols-4 sm:auto-rows-[200px]">
          {instagramPosts.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: (i % 4) * 0.08, duration: 0.8 }}
              whileHover={{ scale: 1.02 }}
              className={`group relative min-h-[240px] overflow-hidden border border-white/5 ${sizes[i % sizes.length]}`}
            >
              <Image
                src={post.image}
                alt={post.alt}
                fill
                className="object-cover transition-transform duration-[1.2s] group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, 25vw"
              />
              <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/30" />
              <span className="absolute bottom-4 left-4 font-body text-[10px] tracking-[0.3em] text-white/0 uppercase transition-all group-hover:text-[var(--campaign-accent)]">
                Editorial
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

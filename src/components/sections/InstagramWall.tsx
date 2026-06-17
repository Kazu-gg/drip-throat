"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { instagramPosts } from "@/lib/data";
import { SOCIAL } from "@/lib/seo";
import { SectionHeading, fadeUp, staggerContainer } from "@/components/ui/SectionHeading";

export function InstagramWall() {
  return (
    <section className="section-padding relative luxury-gradient">
      <SectionHeading
        label="@chevelleindia"
        title="Follow Our Journey"
        subtitle="A glimpse into the world of Chevellè — style, elegance, and inspiration."
      />

      <motion.div
        variants={staggerContainer}
        initial={false}
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="mx-auto columns-2 gap-3 sm:columns-3 sm:gap-4 lg:gap-5"
        style={{ maxWidth: "1200px" }}
      >
        {instagramPosts.map((post, index) => (
          <motion.div
            key={post.id}
            variants={fadeUp}
            custom={index * 0.05}
            className="group relative mb-3 break-inside-avoid overflow-hidden sm:mb-4"
          >
            <div
              className={`relative overflow-hidden ${
                index % 3 === 0 ? "aspect-[3/4]" : index % 3 === 1 ? "aspect-square" : "aspect-[4/5]"
              }`}
            >
              <Image
                src={post.image}
                alt={post.alt}
                fill
                loading="lazy"
                className="object-cover transition-transform duration-700 ease-luxury group-hover:scale-110"
                sizes="(max-width: 640px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-black/0 transition-all duration-500 group-hover:bg-black/50" />
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileHover={{ opacity: 1, y: 0 }}
                className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              >
                <div className="flex items-center gap-2 text-white">
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                  <span className="font-body text-sm">{post.likes}</span>
                </div>
              </motion.div>
              <div className="absolute inset-0 border border-transparent transition-colors duration-500 group-hover:border-gold/30" />
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.7 }}
        className="mt-12 text-center"
      >
        <a
          href={SOCIAL.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 border border-white/10 px-8 py-3 font-body text-xs tracking-[0.2em] text-white/60 uppercase transition-all duration-500 hover:border-gold/40 hover:text-gold"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.226-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
          </svg>
          Follow on Instagram
        </a>
      </motion.div>
    </section>
  );
}

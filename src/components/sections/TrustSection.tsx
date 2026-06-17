"use client";

import { motion } from "framer-motion";
import { trustItems } from "@/lib/data";
import { FeatureIcon } from "@/components/icons/FeatureIcons";
import type { FeatureIconId } from "@/components/icons/FeatureIcons";
import { SectionHeading, fadeUp, staggerContainer } from "@/components/ui/SectionHeading";

export function TrustSection() {
  return (
    <section id="trust" className="section-padding relative border-t border-white/5 bg-black-light">
      <SectionHeading
        label="Shop With Confidence"
        title="Trusted By Thousands"
        subtitle="Premium luxury fashion, delivered with care."
      />

      <motion.div
        variants={staggerContainer}
        initial={false}
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="mx-auto grid max-w-5xl grid-cols-1 gap-8 sm:grid-cols-3"
      >
        {trustItems.map((item, index) => (
          <motion.div
            key={item.title}
            variants={fadeUp}
            custom={index * 0.08}
            className="group text-center"
          >
            <div className="mx-auto mb-5 inline-flex h-14 w-14 items-center justify-center border border-gold/20 text-gold/60 transition-all duration-500 group-hover:border-gold/50 group-hover:text-gold">
              <FeatureIcon id={item.icon as FeatureIconId} />
            </div>
            <h3 className="mb-2 font-display text-lg font-light tracking-wide text-white">
              {item.title}
            </h3>
            <p className="font-body text-sm leading-relaxed text-white/40">
              {item.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

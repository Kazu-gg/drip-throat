"use client";

import { motion } from "framer-motion";
import { features } from "@/lib/data";
import { FeatureIcon } from "@/components/icons/FeatureIcons";
import type { FeatureIconId } from "@/components/icons/FeatureIcons";
import { SectionHeading, fadeUp, staggerContainer } from "@/components/ui/SectionHeading";

export function WhyChevelle() {
  return (
    <section id="why" className="section-padding relative border-t border-white/5">
      <SectionHeading
        label="The Chevellè Promise"
        title="Why Chevellè"
        subtitle="Premium luxury fashion, delivered with care."
      />

      <motion.div
        variants={staggerContainer}
        initial={false}
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="mx-auto grid max-w-6xl grid-cols-1 gap-px bg-white/5 sm:grid-cols-2 lg:grid-cols-4"
      >
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            variants={fadeUp}
            custom={index * 0.05}
            className="group relative bg-black p-8 transition-colors duration-500 hover:bg-black-card sm:p-10"
          >
            <div className="mb-6 inline-flex h-12 w-12 items-center justify-center border border-gold/15 text-gold/60 transition-all duration-500 group-hover:border-gold/40 group-hover:text-gold">
              <FeatureIcon id={feature.icon as FeatureIconId} />
            </div>
            <h3 className="mb-3 font-display text-xl font-light tracking-wide text-white">
              {feature.title}
            </h3>
            <p className="font-body text-sm leading-relaxed text-white/40 transition-colors duration-500 group-hover:text-white/60">
              {feature.description}
            </p>
            <div className="absolute bottom-0 left-0 h-px w-0 bg-gold transition-all duration-700 group-hover:w-full" />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

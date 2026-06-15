"use client";

import { motion } from "framer-motion";
import { features } from "@/lib/data";
import { SectionHeading, fadeUp, staggerContainer } from "@/components/ui/SectionHeading";

const icons: Record<string, React.ReactNode> = {
  diamond: (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" stroke="currentColor" strokeWidth="1">
      <path d="M12 2L2 9l10 13L22 9 12 2z" />
      <path d="M2 9h20M12 2v20" />
    </svg>
  ),
  sparkle: (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" stroke="currentColor" strokeWidth="1">
      <path d="M12 2l2 7h7l-5.5 4.5L17 21l-5-3.5L7 21l1.5-7.5L3 9h7l2-7z" />
    </svg>
  ),
  truck: (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" stroke="currentColor" strokeWidth="1">
      <path d="M1 6h15v11H1zM16 9h4l3 4v4h-7V9z" />
      <circle cx="5.5" cy="18.5" r="2.5" />
      <circle cx="18.5" cy="18.5" r="2.5" />
    </svg>
  ),
  shield: (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" stroke="currentColor" strokeWidth="1">
      <path d="M12 2l8 4v6c0 5.25-3.5 10-8 12-4.5-2-8-6.75-8-12V6l8-4z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  ),
  refresh: (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" stroke="currentColor" strokeWidth="1">
      <path d="M4 12a8 8 0 0114-5.3M20 12a8 8 0 01-14 5.3" />
      <path d="M18 4v4h-4M6 20v-4h4" />
    </svg>
  ),
  headset: (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" stroke="currentColor" strokeWidth="1">
      <path d="M4 14v-2a8 8 0 0116 0v2" />
      <path d="M4 14a2 2 0 002 2h1v-4H6a2 2 0 00-2 2zM20 14a2 2 0 01-2 2h-1v-4h1a2 2 0 012 2z" />
    </svg>
  ),
};

export function WhyChevelle() {
  return (
    <section id="why" className="section-padding relative border-t border-white/5">
      <SectionHeading
        label="The Chevellè Promise"
        title="Why Chevellè"
        subtitle="Every detail crafted to deliver an experience worthy of true luxury."
      />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="mx-auto grid max-w-6xl grid-cols-1 gap-px bg-white/5 sm:grid-cols-2 lg:grid-cols-3"
      >
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            variants={fadeUp}
            custom={index * 0.05}
            className="group relative bg-black p-8 transition-colors duration-500 hover:bg-black-card sm:p-10"
          >
            <div className="mb-6 inline-flex items-center justify-center text-gold/60 transition-colors duration-500 group-hover:text-gold">
              {icons[feature.icon]}
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

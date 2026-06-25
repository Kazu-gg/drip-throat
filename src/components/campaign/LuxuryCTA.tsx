"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export function LuxuryCTA() {
  return (
    <section
      id="cta"
      className="relative z-10 flex min-h-[80vh] items-center justify-center overflow-hidden py-24"
      aria-labelledby="cta-heading"
    >
      <div
        className="pointer-events-none absolute h-[500px] w-[500px] rounded-full opacity-30 blur-3xl"
        style={{ background: "var(--campaign-glow)" }}
      />

      <div className="section-padding relative z-10 mx-auto max-w-5xl text-center">
        <motion.h2
          id="cta-heading"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-[clamp(2.5rem,7vw,5.5rem)] font-light leading-[1.08] text-[var(--campaign-text)]"
        >
          Your next
          <br />
          <span className="text-[var(--campaign-accent)]">statement piece</span>
          <br />
          awaits.
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-6"
        >
          <Link
            href="/collections"
            data-cursor="shop"
            className="border border-[var(--campaign-accent)] bg-[var(--campaign-accent)] px-14 py-5 font-body text-xs tracking-[0.3em] text-black uppercase transition-all duration-700 hover:shadow-[0_0_40px_var(--campaign-glow)]"
          >
            Shop the Collection
          </Link>
          <Link
            href="/download"
            className="border border-white/20 px-12 py-5 font-body text-xs tracking-[0.25em] text-white/60 uppercase transition-colors hover:border-[var(--campaign-accent)]/40 hover:text-[var(--campaign-accent)]"
          >
            Download App
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

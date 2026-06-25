"use client";

import { motion } from "framer-motion";
import { FIGMA_STATS } from "@/lib/figma-home";

function StatIcon({ type }: { type: (typeof FIGMA_STATS)[number]["icon"] }) {
  const cls = "h-6 w-6 text-gold/60";
  switch (type) {
    case "floral":
      return (
        <svg viewBox="0 0 24 24" className={cls} fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden>
          <circle cx="12" cy="12" r="3" />
          <path d="M12 2v4M12 18v4M2 12h4M18 12h4M4.9 4.9l2.8 2.8M16.3 16.3l2.8 2.8M4.9 19.1l2.8-2.8M16.3 7.7l2.8-2.8" />
        </svg>
      );
    case "building":
      return (
        <svg viewBox="0 0 24 24" className={cls} fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden>
          <path d="M4 20V8l8-4 8 4v12" />
          <path d="M9 20v-6h6v6" />
        </svg>
      );
    case "box":
      return (
        <svg viewBox="0 0 24 24" className={cls} fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden>
          <path d="M12 2l9 5v10l-9 5-9-5V7z" />
          <path d="M12 12l9-5M12 12v10M12 12L3 7" />
        </svg>
      );
    case "return":
      return (
        <svg viewBox="0 0 24 24" className={cls} fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden>
          <path d="M9 14L4 9l5-5" />
          <path d="M4 9h11a5 5 0 015 5v2" />
        </svg>
      );
  }
}

export function WhyChevelleStats() {
  return (
    <section
      id="values"
      className="section-padding border-t border-gold/10 bg-black"
      aria-label="Brand values"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {FIGMA_STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.5 }}
              className="flex flex-col items-center text-center"
            >
              <StatIcon type={stat.icon} />
              <p className="mt-4 font-display text-xl font-light tracking-wide text-white sm:text-2xl">
                {stat.value}
              </p>
              <p className="mt-1 font-body text-[9px] tracking-[0.32em] text-white/40 uppercase">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

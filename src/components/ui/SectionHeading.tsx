"use client";

import { motion } from "framer-motion";
import { SectionOrnament } from "@/components/icons/SectionOrnament";

export const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: (delay = 0) => ({
    opacity: 1,
    transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] },
  }),
};

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

interface SectionHeadingProps {
  label?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}

export function SectionHeading({
  label,
  title,
  subtitle,
  align = "center",
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={false}
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className={`mb-14 md:mb-20 ${align === "center" ? "text-center" : "text-left"}`}
    >
      {label && (
        <motion.p
          variants={fadeUp}
          custom={0}
          className="mb-3 font-accent text-xs tracking-[0.35em] text-gold uppercase"
        >
          {label}
        </motion.p>
      )}
      <motion.h2
        variants={fadeUp}
        custom={0.1}
        className="font-display text-3xl font-light tracking-wide text-white sm:text-4xl md:text-5xl lg:text-6xl"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          variants={fadeUp}
          custom={0.2}
          className={`mt-4 max-w-xl font-body text-sm leading-relaxed text-white/50 sm:text-base ${
            align === "center" ? "mx-auto" : ""
          }`}
        >
          {subtitle}
        </motion.p>
      )}
      <motion.div variants={fadeIn} custom={0.3}>
        <SectionOrnament
          className={`mt-6 w-48 ${align === "center" ? "mx-auto" : ""}`}
        />
      </motion.div>
    </motion.div>
  );
}

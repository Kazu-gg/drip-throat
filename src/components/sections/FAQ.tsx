"use client";

import { motion } from "framer-motion";
import { faqItems } from "@/lib/data";
import { SectionHeading, fadeUp, staggerContainer } from "@/components/ui/SectionHeading";

export function FAQ() {
  return (
    <section
      id="faq"
      className="section-padding relative border-t border-white/5"
      aria-labelledby="faq-heading"
    >
      <SectionHeading
        label="Your Questions"
        title="Frequently Asked Questions"
        subtitle="Everything you need to know about shopping premium fashion at Chevellè."
      />

      <motion.dl
        variants={staggerContainer}
        initial={false}
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="mx-auto max-w-3xl divide-y divide-white/5"
      >
        {faqItems.map((item, index) => (
          <motion.div
            key={item.question}
            variants={fadeUp}
            custom={index * 0.05}
            className="py-8"
          >
            <dt className="font-display text-lg font-light tracking-wide text-white sm:text-xl">
              {item.question}
            </dt>
            <dd className="mt-3 font-body text-sm leading-relaxed text-white/45 sm:text-base">
              {item.answer}
            </dd>
          </motion.div>
        ))}
      </motion.dl>
    </section>
  );
}

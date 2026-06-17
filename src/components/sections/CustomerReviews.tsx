"use client";

import { motion } from "framer-motion";
import { reviews } from "@/lib/data";
import { SectionHeading, fadeUp, staggerContainer } from "@/components/ui/SectionHeading";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: rating }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 16 16"
          className="h-3 w-3 text-gold"
          fill="currentColor"
        >
          <path d="M8 1.5l1.76 3.57 3.94.57-2.85 2.78.67 3.93L8 10.27l-3.52 1.85.67-3.93L2.3 5.64l3.94-.57L8 1.5z" />
        </svg>
      ))}
    </div>
  );
}

export function CustomerReviews() {
  return (
    <section className="section-padding relative border-t border-white/5">
      <SectionHeading
        label="Testimonials"
        title="What Our Clients Say"
        subtitle="Trusted by thousands who demand nothing less than excellence."
      />

      <motion.div
        variants={staggerContainer}
        initial={false}
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2"
      >
        {reviews.map((review, index) => (
          <motion.blockquote
            key={review.id}
            variants={fadeUp}
            custom={index * 0.08}
            className="group relative border border-white/5 bg-black-card p-8 transition-all duration-500 hover:border-gold/20 sm:p-10"
          >
            <div
              className="absolute top-6 right-8 font-display text-6xl leading-none text-gold/10 transition-colors duration-500 group-hover:text-gold/20"
              aria-hidden
            >
              &ldquo;
            </div>

            <StarRating rating={review.rating} />

            <p className="mt-6 font-body text-sm leading-relaxed text-white/60 transition-colors duration-500 group-hover:text-white/80 sm:text-base">
              {review.text}
            </p>

            <footer className="mt-8 flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/30 bg-gold/5">
                <span className="font-accent text-sm text-gold">
                  {review.name.charAt(0)}
                </span>
              </div>
              <div>
                <cite className="font-display text-base font-light not-italic text-white">
                  {review.name}
                </cite>
                <p className="font-body text-xs text-white/40">{review.location}</p>
              </div>
            </footer>

            <div className="absolute bottom-0 left-0 h-px w-0 bg-gradient-to-r from-gold to-transparent transition-all duration-700 group-hover:w-full" />
          </motion.blockquote>
        ))}
      </motion.div>
    </section>
  );
}

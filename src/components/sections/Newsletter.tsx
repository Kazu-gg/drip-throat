"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { MagneticButton } from "@/components/ui/MagneticButton";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <section className="section-padding relative border-t border-white/5">
      <div className="mx-auto max-w-3xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="mb-3 font-accent text-xs tracking-[0.35em] text-gold uppercase">
            Exclusive Access
          </p>
          <h2 className="font-display text-3xl font-light tracking-wide text-white sm:text-4xl md:text-5xl">
            Join The Inner Circle
          </h2>
          <p className="mx-auto mt-4 max-w-md font-body text-sm leading-relaxed text-white/40 sm:text-base">
            Be the first to discover new collections, exclusive offers, and
            behind-the-scenes glimpses of Chevellè.
          </p>
          <div className="mx-auto mt-6 h-px w-16 bg-gradient-to-r from-transparent via-gold to-transparent" />
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          onSubmit={handleSubmit}
          className="mt-10"
        >
          {submitted ? (
            <motion.p
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="font-display text-xl text-gold"
            >
              Welcome to the Inner Circle.
            </motion.p>
          ) : (
            <div className="flex flex-col gap-4 sm:flex-row sm:gap-0">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="flex-1 border border-white/10 bg-black-card px-6 py-4 font-body text-sm text-white placeholder-white/30 transition-all duration-500 focus:border-gold/40 focus:outline-none sm:border-r-0"
              />
              <MagneticButton
                type="submit"
                className="border border-gold bg-gold/10 px-10 py-4 font-body text-xs tracking-[0.2em] text-gold uppercase transition-all duration-500 hover:bg-gold hover:text-black sm:-ml-px"
              >
                Subscribe
              </MagneticButton>
            </div>
          )}
          <p className="mt-4 font-body text-[11px] text-white/25">
            By subscribing, you agree to receive marketing communications from
            Chevellè. Unsubscribe anytime.
          </p>
        </motion.form>
      </div>
    </section>
  );
}

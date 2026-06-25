"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { AppPhoneVideo } from "@/components/ui/AppPhoneVideo";
import { APP_BENEFITS } from "@/lib/figma-home";

function PhoneMockup({ className, delay = 0 }: { className?: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6 }}
      className={`relative ${className ?? ""}`}
    >
      <div className="h-full w-full rounded-[28px] border border-white/10 bg-gradient-to-b from-black-card to-black p-2 shadow-2xl">
        <div className="relative h-full overflow-hidden rounded-[22px] border border-white/5 bg-black">
          <AppPhoneVideo />
        </div>
      </div>
    </motion.div>
  );
}

export function DownloadExperience() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black px-5 pt-28 pb-20">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 20%, rgba(212,175,55,0.1) 0%, transparent 55%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="grid items-center gap-14 lg:grid-cols-[1fr_auto_1fr] lg:gap-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-sm text-center lg:text-left"
          >
            <p className="font-body text-[10px] tracking-[0.4em] text-gold uppercase">
              The Chevellè App
            </p>
            <h1 className="mt-3 font-display text-3xl font-light leading-snug tracking-wide text-[var(--campaign-text)] uppercase sm:text-4xl">
              Get Chevellè on your phone
            </h1>
            <p className="mt-5 font-body text-sm leading-relaxed text-[var(--campaign-text)]/50">
              The app is launching soon. Until then, continue on web for the full
              curated collection — women, men, and accessories.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
              <span className="inline-flex items-center justify-center border border-white/10 px-5 py-2.5 font-body text-[9px] tracking-[0.2em] text-white/35 uppercase">
                App Store — Soon
              </span>
              <span className="inline-flex items-center justify-center border border-white/10 px-5 py-2.5 font-body text-[9px] tracking-[0.2em] text-white/35 uppercase">
                Google Play — Soon
              </span>
            </div>

            <Link
              href="/collections"
              className="figma-btn-gold mt-8 inline-flex items-center justify-center px-8 py-3.5 font-body text-[10px] tracking-[0.28em] uppercase lg:mt-10"
            >
              Continue on Web
            </Link>
          </motion.div>

          <div className="relative mx-auto flex h-[340px] w-full max-w-[320px] items-end justify-center sm:h-[380px]">
            <PhoneMockup
              className="absolute bottom-0 left-0 h-[280px] w-[130px] -rotate-6 opacity-70 sm:h-[300px] sm:w-[140px]"
              delay={0.15}
            />
            <PhoneMockup
              className="relative z-10 h-[320px] w-[150px] sm:h-[360px] sm:w-[165px]"
              delay={0}
            />
            <PhoneMockup
              className="absolute right-0 bottom-0 h-[280px] w-[130px] rotate-6 opacity-70 sm:h-[300px] sm:w-[140px]"
              delay={0.3}
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="max-w-sm text-center lg:justify-self-end lg:text-left"
          >
            <p className="font-body text-[10px] tracking-[0.35em] text-gold uppercase">
              App Benefits
            </p>
            <ul className="mt-5 space-y-3">
              {APP_BENEFITS.map((benefit) => (
                <li
                  key={benefit}
                  className="flex items-start gap-3 font-body text-sm text-white/50"
                >
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gold" aria-hidden />
                  {benefit}
                </li>
              ))}
            </ul>
            <Link
              href="/"
              className="figma-btn-outline mt-8 inline-flex items-center gap-2 px-8 py-3.5 font-body text-[10px] tracking-[0.32em] text-gold uppercase"
            >
              Back to Home
              <span aria-hidden>→</span>
            </Link>
          </motion.div>
        </div>
      </div>
    </main>
  );
}

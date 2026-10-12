"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { AppPhoneVideo } from "@/components/ui/AppPhoneVideo";
import { APP_BENEFITS } from "@/lib/figma-home";
import { APP_DOWNLOAD_PATH } from "@/lib/routes";

function PhoneMockup({ className, delay = 0 }: { className?: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
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

export function AppPromo() {
  return (
    <section
      id="app"
      className="section-padding border-t border-gold/10 bg-black"
      aria-labelledby="app-heading"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_auto_1fr] lg:gap-8">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-sm"
          >
            <p className="font-body text-[10px] tracking-[0.4em] text-gold uppercase">
              The Dripthroat App
            </p>
            <h2
              id="app-heading"
              className="mt-3 font-display text-2xl font-light leading-snug tracking-wide text-white uppercase sm:text-3xl"
            >
              Fashion in your hands
            </h2>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href={APP_DOWNLOAD_PATH}
                className="inline-flex items-center justify-center border border-white/15 px-5 py-2.5 font-body text-[9px] tracking-[0.2em] text-white/70 uppercase transition-colors hover:border-gold/40 hover:text-gold"
              >
                App Store
              </Link>
              <Link
                href={APP_DOWNLOAD_PATH}
                className="figma-btn-gold inline-flex items-center justify-center px-5 py-2.5 font-body text-[9px] tracking-[0.2em] uppercase"
              >
                Google Play
              </Link>
            </div>
          </motion.div>

          <div className="relative mx-auto flex h-[340px] w-full max-w-[320px] items-end justify-center sm:h-[380px]">
            <PhoneMockup
              className="absolute bottom-0 left-0 h-[280px] w-[130px] -rotate-6 opacity-70 sm:h-[300px] sm:w-[140px]"
              delay={0.1}
            />
            <PhoneMockup
              className="relative z-10 h-[320px] w-[150px] sm:h-[360px] sm:w-[165px]"
              delay={0}
            />
            <PhoneMockup
              className="absolute right-0 bottom-0 h-[280px] w-[130px] rotate-6 opacity-70 sm:h-[300px] sm:w-[140px]"
              delay={0.2}
            />
          </div>

          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-sm lg:justify-self-end"
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
              href={APP_DOWNLOAD_PATH}
              className="figma-btn-outline mt-8 inline-flex items-center gap-2 px-8 py-3.5 font-body text-[10px] tracking-[0.32em] text-gold uppercase"
            >
              Download Now
              <span aria-hidden>→</span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

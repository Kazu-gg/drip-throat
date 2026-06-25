"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { HERO_IMAGE } from "@/lib/figma-home";
import { APP_DOWNLOAD_PATH } from "@/lib/routes";

export function FigmaHero() {
  return (
    <section
      id="intro"
      className="relative flex min-h-[100dvh] flex-col overflow-hidden"
      aria-label="Introduction"
    >
      <div className="absolute inset-0">
        <Image
          src={HERO_IMAGE.src}
          alt={HERO_IMAGE.alt}
          fill
          priority
          className="object-cover object-[center_22%] scale-[1.03] brightness-[0.95] saturate-[1.12] contrast-[1.04]"
          sizes="100vw"
        />
        {/* Base warmth — ties photo into gold/black brand */}
        <div className="absolute inset-0 bg-[#1a1208]/25 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-br from-gold/[0.08] via-transparent to-[#0d0d0d]/30" />
        {/* Edge vignette for readability, centre stays luminous */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d0d0d]/75 via-[#0d0d0d]/20 to-[#0d0d0d]/55" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_70%_at_50%_45%,rgba(13,13,13,0.35)_0%,rgba(13,13,13,0.08)_55%,transparent_100%)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-[#0d0d0d]/15 to-[#0d0d0d]/45" />
      </div>

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center section-padding pt-28 pb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          <p className="text-shimmer font-accent text-[clamp(2.5rem,8vw,5rem)] leading-[1.05] tracking-[0.08em] opacity-75 drop-shadow-[0_4px_32px_rgba(0,0,0,0.25)]">
            CURATED ELEGANCE.
            <br />
            TIMELESS YOU.
          </p>
          <p className="mx-auto mt-6 max-w-md font-body text-sm leading-relaxed text-[var(--campaign-text)]/70 sm:text-base">
            Luxury fashion that speaks before you do.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/collections" className="shop-btn-primary min-w-[220px] px-10 py-3.5">
              Explore Collections
            </Link>
            <Link href="/products" className="shop-btn-outline min-w-[220px] px-10 py-3.5">
              Shop New In
            </Link>
          </div>

          <Link
            href={APP_DOWNLOAD_PATH}
            className="mt-6 inline-block font-body text-[10px] tracking-[0.28em] text-[var(--campaign-text)]/40 uppercase hover:text-gold"
          >
            Download App
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

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
          className="object-cover object-[center_22%] scale-[1.03] brightness-[0.88] contrast-[1.05] saturate-[0.85]"
          sizes="100vw"
        />
        {/* Olive grade — match mockup forest mood */}
        <div className="absolute inset-0 bg-[#12150a]/45 mix-blend-multiply" />
        <div className="absolute inset-0 bg-[#2a3320]/20 mix-blend-color" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#12150a]/80 via-[#12150a]/35 to-[#12150a]/65" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#12150a] via-[#12150a]/25 to-[#12150a]/50" />
      </div>

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center section-padding pt-28 pb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          <p className="font-accent text-[clamp(2.5rem,8vw,5rem)] leading-[1.05] tracking-[0.08em] text-[var(--campaign-text)] drop-shadow-[0_4px_32px_rgba(0,0,0,0.45)]">
            WEAR LOUD.
            <br />
            STAY RAW.
          </p>
          <p className="mx-auto mt-6 max-w-md font-body text-sm leading-relaxed text-[var(--campaign-text)]/65 sm:text-base">
            Streetwear for the unapologetic.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/products"
              className="shop-btn-primary min-w-[220px] rounded-none px-10 py-3.5"
              data-testid="hero_shop_now_button"
            >
              Shop Now
            </Link>
            <Link
              href="/collections"
              className="shop-btn-outline min-w-[220px] rounded-none px-10 py-3.5"
              data-testid="hero_explore_collection_button"
            >
              Explore Collection
            </Link>
          </div>

          <Link
            href={APP_DOWNLOAD_PATH}
            className="mt-6 inline-block font-body text-[10px] tracking-[0.28em] text-[var(--campaign-text)]/55 uppercase transition-colors hover:text-[var(--campaign-text)]"
            data-testid="hero_download_app_link"
          >
            Download App
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

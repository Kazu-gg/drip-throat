"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { DripthroatLogo } from "@/components/brand/DripthroatLogo";

const fade = { duration: 0.25, ease: [0.22, 1, 0.36, 1] as const };

export function CinematicHero() {
  return (
    <section
      className="relative z-10 flex h-[100dvh] min-h-[100dvh] flex-col overflow-hidden"
      aria-label="Dripthroat cinematic hero"
    >
      <div className="absolute inset-0 z-[4]">
        <Image
          src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1920&q=80"
          alt="Dripthroat ultra-luxury Indian fashion editorial"
          fill
          priority
          className="object-cover opacity-[0.42]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/60 to-[#12150a]" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60" />
      </div>

      <div className="relative z-20 flex flex-1 flex-col items-center justify-center px-5 pt-24 text-center sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={fade}
          className="mx-auto w-full max-w-[min(100%,680px)] px-4"
        >
          <DripthroatLogo className="mx-auto h-auto w-full text-[var(--campaign-accent)]" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...fade, delay: 0.05 }}
          className="mt-5 font-body text-[10px] tracking-[0.55em] text-[var(--campaign-accent)] uppercase sm:text-xs"
        >
          Curated Elegance
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...fade, delay: 0.1 }}
          className="mt-8 max-w-4xl font-display text-[clamp(2rem,6vw,4.25rem)] font-light leading-[1.1] tracking-wide text-white"
        >
          Where Indian Luxury
          <br />
          <span className="text-[var(--campaign-accent)]">Meets Modern Grace</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...fade, delay: 0.15 }}
          className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:gap-6"
        >
          <MagneticButton
            href="#universe"
            data-cursor="enter"
            className="border border-[var(--campaign-accent)] bg-[var(--campaign-accent)]/10 px-12 py-4 font-body text-xs tracking-[0.25em] text-[var(--campaign-accent)] uppercase backdrop-blur-sm transition-colors duration-300 hover:bg-[var(--campaign-accent)] hover:text-black"
          >
            Enter the House
          </MagneticButton>
          <Link
            href="/collections"
            data-cursor="explore"
            className="border border-white/20 px-10 py-4 font-body text-xs tracking-[0.2em] text-white/70 uppercase transition-colors duration-300 hover:border-[var(--campaign-accent)]/50 hover:text-[var(--campaign-accent)]"
          >
            Shop Collections
          </Link>
        </motion.div>
      </div>

      <div className="relative z-20 pb-10 flex flex-col items-center gap-2">
        <span className="font-body text-[10px] tracking-[0.35em] text-white/30 uppercase">
          Scroll
        </span>
        <div className="h-10 w-px bg-gradient-to-b from-[var(--campaign-accent)]/50 to-transparent" />
      </div>
    </section>
  );
}

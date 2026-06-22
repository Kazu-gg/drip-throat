"use client";

import dynamic from "next/dynamic";
import { motion, useMotionValue, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { GoldRays } from "@/components/campaign/GoldRays";
import { MagneticButton } from "@/components/ui/MagneticButton";

const HeroParticles3D = dynamic(
  () =>
    import("@/components/campaign/HeroParticles3D").then((m) => m.HeroParticles3D),
  { ssr: false }
);

export function CinematicHero() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const imgX = useTransform(mouseX, [-400, 400], [-30, 30]);
  const imgY = useTransform(mouseY, [-400, 400], [-20, 20]);
  const contentX = useTransform(mouseX, [-400, 400], [12, -12]);
  const contentY = useTransform(mouseY, [-400, 400], [8, -8]);

  return (
    <section
      className="relative z-10 flex min-h-screen items-center justify-center overflow-hidden"
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mouseX.set(e.clientX - r.left - r.width / 2);
        mouseY.set(e.clientY - r.top - r.height / 2);
      }}
      aria-label="Chevellè cinematic hero"
    >
      <HeroParticles3D />
      <GoldRays />

      <motion.div
        className="absolute inset-0 z-[4]"
        style={{ x: imgX, y: imgY }}
      >
        <motion.div
          initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
          animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
          transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          className="relative h-full w-full"
        >
          <Image
            src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1920&q=80"
            alt="Chevellè ultra-luxury Indian fashion editorial"
            fill
            priority
            className="object-cover opacity-[0.38]"
            sizes="100vw"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/50 to-[var(--campaign-bg)]" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-transparent to-black/55" />
      </motion.div>

      <motion.div
        className="relative z-20 mx-auto max-w-6xl px-5 pt-28 text-center sm:px-8"
        style={{ x: contentX, y: contentY }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="font-accent text-[clamp(3rem,11vw,7.5rem)] leading-none tracking-[0.22em] text-shimmer">
            CHEVELLÈ
          </p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 font-body text-xs tracking-[0.55em] text-[var(--campaign-accent)] uppercase sm:text-sm"
        >
          Curated Elegance
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 font-display text-[clamp(1.75rem,5vw,3.75rem)] font-light leading-[1.15] tracking-wide text-[var(--campaign-text)]"
        >
          Luxury Fashion
          <br />
          <span className="text-white/65">Delivered With Care</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.9 }}
          className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6"
        >
          <MagneticButton
            href="/collections"
            data-cursor="enter"
            className="border border-[var(--campaign-accent)] bg-[var(--campaign-accent)]/10 px-12 py-4 font-body text-xs tracking-[0.25em] text-[var(--campaign-accent)] uppercase backdrop-blur-sm transition-all duration-700 hover:bg-[var(--campaign-accent)] hover:text-black"
          >
            Enter the House
          </MagneticButton>
          <Link
            href="#universe"
            data-cursor="explore"
            className="border border-white/20 px-10 py-4 font-body text-xs tracking-[0.2em] text-white/70 uppercase transition-all duration-500 hover:border-[var(--campaign-accent)]/50 hover:text-[var(--campaign-accent)]"
          >
            Explore Worlds
          </Link>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.6, duration: 1 }}
        className="absolute bottom-10 left-1/2 z-20 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="font-body text-[10px] tracking-[0.35em] text-white/30 uppercase">
            Scroll
          </span>
          <div className="h-12 w-px bg-gradient-to-b from-[var(--campaign-accent)]/60 to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
}

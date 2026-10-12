"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import Image from "next/image";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { APP_DOWNLOAD_PATH } from "@/lib/routes";
import { LuxuryCompass } from "@/components/hero/LuxuryCompass";
import { SilkWaveBackground } from "@/components/hero/SilkWaveBackground";
import { LuxuryDust } from "@/components/hero/LuxuryDust";
import { HeroLogoReveal } from "@/components/hero/HeroLogoReveal";
import {
  HeroCursorTrail,
  useHeroTrail,
} from "@/components/hero/HeroCursorTrail";

export function Hero() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const { dots, pushTrail } = useHeroTrail();

  const parallaxX = useTransform(mouseX, [-500, 500], [-18, 18]);
  const parallaxY = useTransform(mouseY, [-500, 500], [-12, 12]);
  const compassX = useTransform(mouseX, [-500, 500], [-8, 8]);
  const compassY = useTransform(mouseY, [-500, 500], [-8, 8]);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mouseX.set(x - rect.width / 2);
    mouseY.set(y - rect.height / 2);
    pushTrail(x, y);
  };

  return (
    <section
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black"
      onMouseMove={handleMouseMove}
      aria-label="Dripthroat premium luxury fashion"
    >
      <div className="absolute inset-0">
        <motion.div
          style={{ x: parallaxX, y: parallaxY }}
          className="absolute inset-0 will-change-transform"
        >
          <Image
            src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1920&q=80"
            alt="Premium luxury women's fashion — sarees, lehengas and ethnic wear by Dripthroat"
            fill
            priority
            className="object-cover opacity-[0.22]"
            sizes="100vw"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/55 to-black" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50" />
      </div>

      <LuxuryDust />
      <SilkWaveBackground />
      <HeroCursorTrail dots={dots} />

      <motion.div
        className="pointer-events-none absolute top-1/2 left-1/2 z-[1] -translate-x-1/2 -translate-y-1/2"
        style={{ x: compassX, y: compassY, willChange: "transform" }}
      >
        <LuxuryCompass className="h-[min(88vw,520px)] w-[min(88vw,520px)] sm:h-[min(72vw,580px)] sm:w-[min(72vw,580px)]" />
      </motion.div>

      <div
        className="pointer-events-none absolute top-[38%] left-1/2 z-[2] h-[420px] w-[640px] -translate-x-1/2 -translate-y-1/2"
        style={{
          background:
            "radial-gradient(ellipse, rgba(168,179,138,0.07) 0%, transparent 68%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-5xl px-5 pt-24 text-center sm:px-8">
        <div className="relative mb-8">
          <HeroLogoReveal />
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 2.1,
              duration: 0.9,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mt-5 font-body text-xs tracking-[0.5em] text-gold/65 uppercase sm:text-sm"
          >
            Curated Elegance
          </motion.p>
        </div>

        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 2.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mb-10 h-px w-24 origin-center bg-gradient-to-r from-transparent via-gold to-transparent"
        />

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.45, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-3xl leading-tight font-light tracking-wide text-white sm:text-4xl md:text-5xl lg:text-6xl"
        >
          <span className="sr-only">Dripthroat — Premium Luxury Fashion. </span>
          Premium Luxury Fashion,
          <br />
          <span className="text-white/70">Delivered With Care</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.65, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-6 max-w-lg font-body text-sm leading-relaxed text-white/45 sm:text-base"
        >
          Premium luxury fashion, curated for weddings, festivals, and everyday
          elegance.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.85, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6"
        >
          <MagneticButton
            href={APP_DOWNLOAD_PATH}
            className="border border-gold bg-gold/10 px-10 py-4 font-body text-xs tracking-[0.2em] text-gold uppercase backdrop-blur-sm transition-all duration-500 hover:bg-gold hover:text-black"
          >
            Download the App
          </MagneticButton>
          <MagneticButton
            href="/collections"
            className="border border-white/20 px-10 py-4 font-body text-xs tracking-[0.2em] text-white/75 uppercase transition-all duration-500 hover:border-gold/50 hover:text-gold"
          >
            Shop on Web
          </MagneticButton>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.2, duration: 1 }}
        className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="font-body text-[10px] tracking-[0.3em] text-white/25 uppercase">
            Scroll
          </span>
          <div className="h-10 w-px bg-gradient-to-b from-gold/45 to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
}

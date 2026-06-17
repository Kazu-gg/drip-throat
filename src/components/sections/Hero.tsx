"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import Image from "next/image";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { FloatingParticles } from "@/components/effects/FloatingParticles";
import { HeroOrnament } from "@/components/icons/HeroOrnament";

export function Hero() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const parallaxX = useTransform(mouseX, [-500, 500], [-20, 20]);
  const parallaxY = useTransform(mouseY, [-500, 500], [-15, 15]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };

  return (
    <section
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
      onMouseMove={handleMouseMove}
      aria-label="Chevellè premium luxury fashion"
    >
      <div className="absolute inset-0 bg-black">
        <motion.div style={{ x: parallaxX, y: parallaxY }} className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1920&q=80"
            alt="Premium luxury women's fashion — sarees, lehengas and ethnic wear by Chevellè"
            fill
            priority
            className="object-cover opacity-25"
            sizes="100vw"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60" />
      </div>

      <FloatingParticles />

      <div
        className="pointer-events-none absolute top-1/4 left-1/2 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2"
        style={{
          background:
            "radial-gradient(ellipse, rgba(212,175,55,0.1) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-5xl px-5 pt-24 text-center sm:px-8">
        <div className="hero-rise relative mb-8">
          <HeroOrnament className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-60" />
          <p className="relative font-accent text-5xl tracking-[0.3em] sm:text-6xl md:text-7xl lg:text-8xl" aria-hidden="true">
            <span className="text-shimmer">CHEVELLÈ</span>
          </p>
          <p className="hero-rise hero-rise-delay-2 mt-3 font-body text-xs tracking-[0.5em] text-gold/70 uppercase sm:text-sm">
            Curated Elegance
          </p>
        </div>

        <div className="hero-line mx-auto mb-10 h-px w-24 origin-center bg-gradient-to-r from-transparent via-gold to-transparent" />

        <h1 className="hero-rise hero-rise-delay-3 font-display text-3xl leading-tight font-light tracking-wide text-white sm:text-4xl md:text-5xl lg:text-6xl">
          <span className="sr-only">Chevellè — Premium Luxury Fashion. </span>
          Premium Luxury Fashion,
          <br />
          <span className="text-white/70">Delivered With Care</span>
        </h1>

        <p className="hero-rise hero-rise-delay-4 mx-auto mt-6 max-w-lg font-body text-sm leading-relaxed text-white/50 sm:text-base">
          Premium luxury fashion, curated for weddings, festivals, and
          everyday elegance.
        </p>

        <div className="hero-rise hero-rise-delay-5 mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
          <MagneticButton
            href="#app"
            className="border border-gold bg-gold/10 px-10 py-4 font-body text-xs tracking-[0.2em] text-gold uppercase backdrop-blur-sm transition-all duration-500 hover:bg-gold hover:text-black"
          >
            Download the App
          </MagneticButton>
          <MagneticButton
            href="/collections"
            className="border border-white/20 px-10 py-4 font-body text-xs tracking-[0.2em] text-white/80 uppercase transition-all duration-500 hover:border-gold/50 hover:text-gold"
          >
            Shop on Web
          </MagneticButton>
        </div>
      </div>

      <div className="hero-rise hero-rise-delay-6 absolute bottom-10 left-1/2 -translate-x-1/2">
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="font-body text-[10px] tracking-[0.3em] text-white/30 uppercase">
            Scroll
          </span>
          <div className="h-10 w-px bg-gradient-to-b from-gold/50 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}

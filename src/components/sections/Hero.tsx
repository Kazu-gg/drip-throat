"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import Image from "next/image";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { FloatingParticles } from "@/components/effects/FloatingParticles";
import { useMousePosition } from "@/hooks/useMousePosition";

export function Hero() {
  const { x, y } = useMousePosition();
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
            className="object-cover opacity-30"
            sizes="100vw"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50" />
      </div>

      <FloatingParticles />

      <div
        className="pointer-events-none absolute top-1/4 left-1/2 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2"
        style={{
          background:
            "radial-gradient(ellipse, rgba(201,162,74,0.08) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-5xl px-5 pt-24 text-center sm:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8"
        >
          <p className="font-accent text-5xl tracking-[0.3em] sm:text-6xl md:text-7xl lg:text-8xl" aria-hidden="true">
            <span className="text-shimmer">CHEVELLÈ</span>
          </p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-3 font-body text-xs tracking-[0.5em] text-gold/70 uppercase sm:text-sm"
          >
            Curated Elegance
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.8, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mb-10 h-px w-24 origin-center bg-gradient-to-r from-transparent via-gold to-transparent"
        />

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-3xl leading-tight font-light tracking-wide text-white sm:text-4xl md:text-5xl lg:text-6xl"
        >
          <span className="sr-only">Chevellè — </span>
          Curated Elegance
          <br />
          <span className="text-white/70">For The Modern Generation</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-6 max-w-lg font-body text-sm leading-relaxed text-white/50 sm:text-base"
        >
          Premium fashion, timeless style — shop designer sarees, lehengas,
          suits &amp; western wear delivered across India.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6"
        >
          <MagneticButton
            href="/collections"
            className="border border-gold bg-gold/10 px-10 py-4 font-body text-xs tracking-[0.2em] text-gold uppercase backdrop-blur-sm transition-all duration-500 hover:bg-gold hover:text-black"
          >
            Shop Collection
          </MagneticButton>
          <MagneticButton className="border border-white/20 px-10 py-4 font-body text-xs tracking-[0.2em] text-white/80 uppercase transition-all duration-500 hover:border-gold/50 hover:text-gold">
            Download App
          </MagneticButton>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
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
      </motion.div>
    </section>
  );
}

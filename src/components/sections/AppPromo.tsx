"use client";

import { motion } from "framer-motion";
import { appBenefits } from "@/lib/data";
import { SectionHeading, fadeUp, staggerContainer } from "@/components/ui/SectionHeading";
import { MagneticButton } from "@/components/ui/MagneticButton";

export function AppPromo() {
  return (
    <section id="app" className="section-padding relative overflow-hidden border-t border-white/5">
      <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2 lg:gap-20">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          <motion.p
            variants={fadeUp}
            custom={0}
            className="mb-3 font-accent text-xs tracking-[0.35em] text-gold uppercase"
          >
            Mobile Experience
          </motion.p>
          <motion.h2
            variants={fadeUp}
            custom={0.1}
            className="font-display text-3xl font-light tracking-wide text-white sm:text-4xl md:text-5xl"
          >
            The Chevellè
            <br />
            App Experience
          </motion.h2>
          <motion.div
            variants={fadeUp}
            custom={0.15}
            className="mt-6 h-px w-16 bg-gradient-to-r from-gold to-transparent"
          />

          <motion.div
            variants={staggerContainer}
            className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2"
          >
            {appBenefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                variants={fadeUp}
                custom={index * 0.05}
                className="group"
              >
                <div className="mb-2 flex items-center gap-3">
                  <div className="h-px w-6 bg-gold/40 transition-all duration-500 group-hover:w-10 group-hover:bg-gold" />
                  <h3 className="font-display text-lg font-light text-white">
                    {benefit.title}
                  </h3>
                </div>
                <p className="pl-9 font-body text-sm text-white/40">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            variants={fadeUp}
            custom={0.4}
            className="mt-12 flex flex-col gap-4 sm:flex-row"
          >
            <MagneticButton className="flex items-center gap-3 border border-gold bg-gold/10 px-8 py-4 font-body text-xs tracking-[0.15em] text-gold uppercase transition-all duration-500 hover:bg-gold hover:text-black">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                <path d="M17.6 9.48l1.84-3.18c.16-.31.04-.69-.26-.85a.637.637 0 00-.83.22l-1.88 3.24a11.43 11.43 0 00-8.6 0L5.99 5.67a.643.643 0 00-.87-.2.617.617 0 00-.27.82l1.84 3.19C4.14 11.97 2.5 14.94 2.5 18h19c0-3.06-1.64-6.03-3.9-8.52zM7 15.25a1.25 1.25 0 110-2.5 1.25 1.25 0 010 2.5zm10 0a1.25 1.25 0 110-2.5 1.25 1.25 0 010 2.5z" />
              </svg>
              Download Android App
            </MagneticButton>
            <MagneticButton className="border border-white/15 px-8 py-4 font-body text-xs tracking-[0.15em] text-white/50 uppercase transition-all duration-500 hover:border-white/30 hover:text-white/70">
              Coming Soon On iOS
            </MagneticButton>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex justify-center"
        >
          <div
            className="absolute inset-0 m-auto h-[400px] w-[400px] rounded-full opacity-30"
            style={{
              background:
                "radial-gradient(circle, rgba(201,162,74,0.15) 0%, transparent 70%)",
            }}
          />

          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="relative"
          >
            <div className="relative h-[520px] w-[260px] rounded-[40px] border border-white/10 bg-gradient-to-b from-black-card to-black p-3 shadow-2xl sm:h-[580px] sm:w-[290px]">
              <div className="absolute top-6 left-1/2 h-1 w-16 -translate-x-1/2 rounded-full bg-white/10" />
              <div className="h-full overflow-hidden rounded-[32px] border border-white/5 bg-black">
                <div className="flex h-12 items-center justify-center border-b border-white/5">
                  <span className="font-accent text-xs tracking-[0.3em] text-gold">
                    CHEVELLÈ
                  </span>
                </div>
                <div className="p-4">
                  <div className="mb-4 h-32 rounded-lg bg-gradient-to-br from-gold/20 to-transparent" />
                  <div className="mb-3 h-3 w-3/4 rounded bg-white/10" />
                  <div className="mb-6 h-3 w-1/2 rounded bg-white/5" />
                  <div className="grid grid-cols-2 gap-3">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="aspect-[3/4] rounded-lg bg-white/5"
                      />
                    ))}
                  </div>
                </div>
                <div className="absolute right-0 bottom-0 left-0 flex h-14 items-center justify-around border-t border-white/5">
                  {["Home", "Shop", "Wish", "Cart"].map((tab) => (
                    <div key={tab} className="flex flex-col items-center gap-1">
                      <div className="h-1 w-1 rounded-full bg-gold/40" />
                      <span className="text-[8px] text-white/30">{tab}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="absolute -right-4 -bottom-4 h-24 w-24 rounded-full border border-gold/20 opacity-50" />
            <div className="absolute -top-6 -left-6 h-16 w-16 rounded-full border border-gold/10 opacity-30" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { appBenefits } from "@/lib/data";
import { fadeUp, staggerContainer } from "@/components/ui/SectionHeading";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { AppPhoneVideo } from "@/components/ui/AppPhoneVideo";
import { APP_DOWNLOAD_PATH } from "@/lib/routes";
import { useState } from "react";

export function AppPromo() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section id="app" className="section-padding relative overflow-hidden border-t border-white/5">
      <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2 lg:gap-20">
        <motion.div
          variants={staggerContainer}
          initial={false}
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          <motion.p
            variants={fadeUp}
            custom={0}
            className="mb-3 font-body text-xs tracking-[0.35em] text-gold uppercase"
          >
            Mobile Experience
          </motion.p>
          <motion.h2
            variants={fadeUp}
            custom={0.1}
            className="font-display text-3xl font-light tracking-wide text-white sm:text-4xl md:text-5xl"
          >
            Browse Categories → Product → Cart → Checkout → Track
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
              <motion.button
                key={benefit.title}
                type="button"
                onClick={() => setActiveStep(index)}
                variants={fadeUp}
                custom={index * 0.05}
                className={`group text-left transition-opacity ${activeStep === index ? "opacity-100" : "opacity-60 hover:opacity-80"}`}
              >
                <div className="mb-2 flex items-center gap-3">
                  <div
                    className={`h-px transition-all duration-500 ${activeStep === index ? "w-10 bg-gold" : "w-6 bg-gold/40 group-hover:w-10 group-hover:bg-gold"}`}
                  />
                  <h3 className="font-display text-lg font-light text-white">
                    {benefit.title}
                  </h3>
                </div>
                <p className="pl-[52px] font-body text-sm text-white/40">
                  {benefit.description}
                </p>
              </motion.button>
            ))}
          </motion.div>

          <motion.div
            variants={fadeUp}
            custom={0.4}
            className="mt-12 flex flex-col gap-4 sm:flex-row"
          >
            <MagneticButton
              href={APP_DOWNLOAD_PATH}
              className="flex items-center gap-3 border border-gold bg-gold/10 px-8 py-4 font-body text-xs tracking-[0.15em] text-gold uppercase transition-all duration-500 hover:bg-gold hover:text-black"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                <path d="M17.6 9.48l1.84-3.18c.16-.31.04-.69-.26-.85a.637.637 0 00-.83.22l-1.88 3.24a11.43 11.43 0 00-8.6 0L5.99 5.67a.643.643 0 00-.87-.2.617.617 0 00-.27.82l1.84 3.19C4.14 11.97 2.5 14.94 2.5 18h19c0-3.06-1.64-6.03-3.9-8.52zM7 15.25a1.25 1.25 0 110-2.5 1.25 1.25 0 010 2.5zm10 0a1.25 1.25 0 110-2.5 1.25 1.25 0 010 2.5z" />
              </svg>
              Download the App
            </MagneticButton>
            <MagneticButton
              href="/collections"
              className="border border-white/15 px-8 py-4 font-body text-xs tracking-[0.15em] text-white/50 uppercase transition-all duration-500 hover:border-white/30 hover:text-white/70"
            >
              Shop on Web
            </MagneticButton>
          </motion.div>
        </motion.div>

        <motion.div
          initial={false}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex justify-center"
        >
          <div
            className="absolute inset-0 m-auto h-[400px] w-[400px] rounded-full opacity-30"
            style={{
              background:
                "radial-gradient(circle, rgba(212,175,55,0.15) 0%, transparent 70%)",
            }}
          />

          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="relative"
          >
            <div className="relative h-[520px] w-[260px] rounded-[40px] border border-white/10 bg-gradient-to-b from-black-card to-black p-3 shadow-2xl sm:h-[580px] sm:w-[290px]">
              <div className="absolute top-6 left-1/2 z-10 h-1 w-16 -translate-x-1/2 rounded-full bg-white/10" />
              <div className="relative h-full overflow-hidden rounded-[32px] border border-white/5 bg-black">
                <AppPhoneVideo />
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

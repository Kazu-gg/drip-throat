"use client";

import { motion, AnimatePresence } from "framer-motion";
import { appBenefits } from "@/lib/data";
import { appFlowStepDurationMs } from "@/lib/app-lottie";
import { SectionHeading, fadeUp, staggerContainer } from "@/components/ui/SectionHeading";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { AppLottie } from "@/components/ui/AppLottie";
import { APP_DOWNLOAD_PATH } from "@/lib/routes";
import { useCallback, useEffect, useRef, useState } from "react";

const appScreens = [
  { id: "browse", label: "Browse", step: 0 },
  { id: "product", label: "Product", step: 1 },
  { id: "cart", label: "Cart", step: 2 },
  { id: "checkout", label: "Pay", step: 3 },
  { id: "track", label: "Track", step: 4 },
] as const;

const stepLabels = [
  "Women · Men · Accessories",
  "Curated product detail",
  "Your cart",
  "Secure checkout",
  "Live order tracking",
] as const;

function PhoneScreen({ step }: { step: number }) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex flex-1 flex-col items-center justify-center px-4 pt-2">
        <AppLottie step={step} />
        <p className="mt-2 text-center font-body text-[9px] tracking-[0.2em] text-gold/70 uppercase">
          {stepLabels[step]}
        </p>
      </div>

      <div className="border-t border-white/5 px-4 pb-3 pt-3">
        {step === 0 && (
          <div className="grid grid-cols-3 gap-2">
            {["Sarees", "Kurtas", "Bags"].map((label) => (
              <div
                key={label}
                className="rounded border border-gold/15 bg-gold/5 py-2 text-center text-[7px] text-white/50"
              >
                {label}
              </div>
            ))}
          </div>
        )}
        {step === 1 && (
          <div className="space-y-2">
            <div className="h-2 w-3/4 rounded bg-white/10" />
            <div className="h-2 w-1/2 rounded bg-white/5" />
            <p className="text-[10px] text-gold">₹12,999</p>
          </div>
        )}
        {step === 2 && (
          <div className="flex justify-between text-[10px]">
            <span className="text-white/40">2 items</span>
            <span className="text-gold">₹12,499</span>
          </div>
        )}
        {step === 3 && (
          <p className="text-center text-[9px] tracking-[0.15em] text-gold/80 uppercase">
            UPI · Card · COD
          </p>
        )}
        {step === 4 && (
          <p className="text-center text-[9px] tracking-[0.15em] text-white/40 uppercase">
            Order #CVL-2847
          </p>
        )}
      </div>
    </div>
  );
}

export function AppPromo() {
  const [activeStep, setActiveStep] = useState(0);
  const pauseUntilRef = useRef(0);

  const goToStep = useCallback((step: number) => {
    setActiveStep(step);
    pauseUntilRef.current = Date.now() + appFlowStepDurationMs * 2;
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (Date.now() < pauseUntilRef.current) return;
      setActiveStep((current) => (current + 1) % appScreens.length);
    }, appFlowStepDurationMs);

    return () => clearInterval(interval);
  }, []);

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
                onClick={() => goToStep(index)}
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
              <div className="absolute top-6 left-1/2 h-1 w-16 -translate-x-1/2 rounded-full bg-white/10" />
              <div className="relative h-full overflow-hidden rounded-[32px] border border-white/5 bg-black">
                <div className="flex h-12 items-center justify-center border-b border-white/5">
                  <span className="font-accent text-xs tracking-[0.3em] text-gold">
                    CHEVELLÈ
                  </span>
                </div>

                <div className="relative h-[calc(100%-7rem)] overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeStep}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute inset-0"
                    >
                      <PhoneScreen step={activeStep} />
                    </motion.div>
                  </AnimatePresence>
                </div>

                <div className="absolute right-0 bottom-0 left-0 flex h-14 items-center justify-around border-t border-white/5 bg-black">
                  {appScreens.map(({ label, step }) => (
                    <button
                      key={label}
                      type="button"
                      onClick={() => goToStep(step)}
                      className="flex flex-col items-center gap-1"
                      aria-label={`Show ${label} screen`}
                      aria-current={activeStep === step ? "step" : undefined}
                    >
                      <motion.div
                        animate={{
                          scale: activeStep === step ? 1.4 : 1,
                          backgroundColor:
                            activeStep === step
                              ? "rgba(212,175,55,0.9)"
                              : "rgba(212,175,55,0.25)",
                        }}
                        className="h-1 w-1 rounded-full"
                      />
                      <span
                        className={`text-[8px] transition-colors ${activeStep === step ? "text-gold/80" : "text-white/30"}`}
                      >
                        {label}
                      </span>
                    </button>
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

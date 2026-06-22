"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { mainCategories, type MainCategoryId } from "@/lib/categories";
import { CategoryTabs, CategoryGrid } from "@/components/sections/CategoryNavigation";
import { MaskTextReveal } from "@/components/experience/MaskTextReveal";
import { SectionOrnament } from "@/components/icons/SectionOrnament";

function AccessoriesComingSoon() {
  return (
    <div className="mx-auto flex max-w-lg flex-col items-center px-5 py-16 text-center sm:py-20">
      <p className="font-body text-xs tracking-[0.4em] text-gold uppercase">
        Accessories
      </p>
      <h3 className="mt-4 font-display text-3xl font-light tracking-wide text-white sm:text-4xl">
        Coming Soon
      </h3>
      <SectionOrnament className="mx-auto mt-6 w-40" />
      <p className="mt-6 font-body text-sm leading-relaxed text-white/50 sm:text-base">
        Handbags, jewellery, watches, and more — we&apos;re curating the
        Accessories edit for web. Hang tight.
      </p>
      <p className="mt-8 font-body text-[10px] tracking-[0.35em] text-white/25 uppercase">
        Shop Women & Men in the meantime
      </p>
    </div>
  );
}

export function FeaturedCollections() {
  const [activeTab, setActiveTab] = useState<MainCategoryId>("women");
  const activeMain = mainCategories.find((c) => c.id === activeTab);

  return (
    <section
      id="collections"
      className="section-padding relative overflow-hidden luxury-gradient"
      aria-labelledby="collections-heading"
    >
      <MaskTextReveal className="mx-auto mb-16 max-w-7xl text-center">
        <p className="mb-3 font-body text-xs tracking-[0.35em] text-gold uppercase">
          Enter the House
        </p>
        <h2
          id="collections-heading"
          className="font-display text-3xl font-light tracking-wide text-white sm:text-4xl md:text-5xl"
        >
          Collection Worlds
        </h2>
        <p className="mx-auto mt-5 max-w-lg font-body text-sm text-white/40">
          Women · Men · Accessories — each category a doorway into a different
          universe of Chevellè.
        </p>
      </MaskTextReveal>

      <div className="mx-auto mb-12 flex max-w-7xl flex-col items-center gap-6">
        <CategoryTabs activeTab={activeTab} onTabChange={setActiveTab} />
        <AnimatePresence mode="wait">
          <motion.p
            key={activeTab}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-md text-center font-display text-lg font-light tracking-wide text-white/55 sm:text-xl"
          >
            {activeMain?.description}
          </motion.p>
        </AnimatePresence>
        <p className="font-body text-[10px] tracking-[0.35em] text-white/25 uppercase">
          {activeTab === "accessories"
            ? "Launching shortly"
            : "Drag or swipe to explore"}
        </p>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          id={`panel-${activeTab}`}
          role="tabpanel"
          aria-labelledby={`tab-${activeTab}`}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          {activeTab === "accessories" ? (
            <AccessoriesComingSoon />
          ) : (
            <CategoryGrid parentId={activeTab} />
          )}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}

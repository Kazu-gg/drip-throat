"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { mainCategories, type MainCategoryId } from "@/lib/categories";
import { CategoryTabs, CategoryGrid } from "@/components/sections/CategoryNavigation";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function FeaturedCollections() {
  const [activeTab, setActiveTab] = useState<MainCategoryId>("women");
  const activeMain = mainCategories.find((c) => c.id === activeTab);

  return (
    <section
      id="collections"
      className="section-padding relative overflow-hidden luxury-gradient"
      aria-labelledby="collections-heading"
    >
      <SectionHeading
        label="Shop by Category"
        title="Women · Men · Accessories"
        subtitle="Shop Women, Men & Accessories — exactly as in the Chevellè app."
      />

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
          Drag or swipe to explore
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
          <CategoryGrid parentId={activeTab} />
        </motion.div>
      </AnimatePresence>
    </section>
  );
}

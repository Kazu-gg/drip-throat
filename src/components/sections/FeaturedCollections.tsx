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
      className="section-padding relative luxury-gradient"
      aria-labelledby="collections-heading"
    >
      <SectionHeading
        label="Shop by Category"
        title="Women · Men · Accessories"
        subtitle="Shop Women, Men & Accessories — exactly as in the Chevellè app."
      />

      <div className="mx-auto mb-10 flex max-w-7xl justify-center">
        <CategoryTabs activeTab={activeTab} onTabChange={setActiveTab} />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          id={`panel-${activeTab}`}
          role="tabpanel"
          aria-labelledby={`tab-${activeTab}`}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-7xl"
        >
          <p className="mb-8 text-center font-body text-sm text-white/40">
            {activeMain?.description}
          </p>
          <CategoryGrid parentId={activeTab} />
        </motion.div>
      </AnimatePresence>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { mainCategories, type MainCategoryId } from "@/lib/categories";

type ShowcaseCategoryTabsProps = {
  activeTab: MainCategoryId;
  onTabChange: (id: MainCategoryId) => void;
  layoutId?: string;
};

export function ShowcaseCategoryTabs({
  activeTab,
  onTabChange,
  layoutId = "showcase-category-pill",
}: ShowcaseCategoryTabsProps) {
  return (
    <div
      role="tablist"
      aria-label="Shop by category"
      className="relative inline-flex gap-1 rounded-full border border-white/10 bg-black/50 p-1.5 backdrop-blur-md"
    >
      {mainCategories.map((cat) => {
        const isActive = activeTab === cat.id;
        return (
          <button
            key={cat.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onTabChange(cat.id)}
            className={`relative z-10 px-5 py-2.5 font-body text-[10px] tracking-[0.22em] uppercase transition-colors duration-300 sm:px-7 sm:text-[11px] ${
              isActive ? "text-black" : "text-white/50 hover:text-white/80"
            }`}
          >
            {isActive && (
              <motion.span
                layoutId={layoutId}
                className="absolute inset-0 rounded-full bg-[var(--campaign-accent)]"
                transition={{ type: "spring", stiffness: 400, damping: 34 }}
              />
            )}
            <span className="relative">{cat.name}</span>
          </button>
        );
      })}
    </div>
  );
}

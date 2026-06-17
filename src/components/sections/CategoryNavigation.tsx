"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  mainCategories,
  getSubcategoriesByParent,
  type MainCategoryId,
} from "@/lib/categories";
import { CategoryIcon } from "@/components/ui/CategoryIcon";
import { GrabScroll } from "@/components/ui/GrabScroll";
import { fadeUp } from "@/components/ui/SectionHeading";

export function CategoryTabs({
  activeTab,
  onTabChange,
}: {
  activeTab: MainCategoryId;
  onTabChange: (id: MainCategoryId) => void;
}) {
  return (
    <div
      role="tablist"
      aria-label="Main categories"
      className="inline-flex flex-wrap justify-center gap-2 border border-white/10 p-1"
    >
      {mainCategories.map((cat) => (
        <button
          key={cat.id}
          type="button"
          role="tab"
          aria-selected={activeTab === cat.id}
          aria-controls={`panel-${cat.id}`}
          id={`tab-${cat.id}`}
          onClick={() => onTabChange(cat.id)}
          className={`px-6 py-3 font-body text-xs tracking-[0.2em] uppercase transition-all duration-500 ${
            activeTab === cat.id
              ? "bg-gold/15 text-gold"
              : "text-white/45 hover:text-white/70"
          }`}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
}

export function CategoryGrid({ parentId }: { parentId: MainCategoryId }) {
  const subcats = getSubcategoriesByParent(parentId);

  return (
    <GrabScroll snap className="gap-3 sm:gap-4">
      {subcats.map((cat, index) => (
        <motion.article
          key={cat.id}
          initial={false}
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={fadeUp}
          custom={index * 0.04}
          className="gold-border-glow group w-[140px] flex-shrink-0 sm:w-[160px] lg:w-[180px]"
          style={{ scrollSnapAlign: "start" }}
        >
          <Link
            href={`/collections/${cat.id}`}
            draggable={false}
            className="flex aspect-[3/4] flex-col items-center justify-between border border-gold/15 bg-gradient-to-b from-black-charcoal via-black to-black p-4 transition-all duration-500 hover:border-gold/40 hover:from-gold-muted sm:p-5"
            aria-label={`Shop ${cat.name} — ${cat.subtitle}`}
          >
            <div className="flex flex-1 items-center justify-center text-gold/70 transition-colors duration-500 group-hover:text-gold">
              <CategoryIcon id={cat.icon} className="h-14 w-14 sm:h-16 sm:w-16" />
            </div>
            <div className="w-full text-center">
              <p className="font-body text-[9px] tracking-[0.25em] text-gold/50 uppercase sm:text-[10px]">
                {cat.subtitle}
              </p>
              <h3 className="mt-1 font-display text-sm font-light tracking-wide text-white transition-colors group-hover:text-gold sm:text-base">
                {cat.name}
              </h3>
            </div>
          </Link>
        </motion.article>
      ))}
    </GrabScroll>
  );
}

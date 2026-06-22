"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  mainCategories,
  getSubcategoriesByParent,
  type MainCategoryId,
} from "@/lib/categories";
import { getCategoryImage } from "@/lib/category-images";
import { CategoryIcon } from "@/components/ui/CategoryIcon";
import { ArrowRightIcon } from "@/components/icons/ArrowRightIcon";
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
      className="relative inline-flex gap-1 rounded-full border border-white/10 bg-black/40 p-1.5 backdrop-blur-sm"
    >
      {mainCategories.map((cat) => {
        const isActive = activeTab === cat.id;
        return (
          <button
            key={cat.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-controls={`panel-${cat.id}`}
            id={`tab-${cat.id}`}
            onClick={() => onTabChange(cat.id)}
            className={`relative z-10 px-7 py-3 font-body text-[11px] tracking-[0.22em] uppercase transition-colors duration-500 sm:px-9 sm:text-xs ${
              isActive ? "text-black" : "text-white/50 hover:text-white/80"
            }`}
          >
            {isActive && (
              <motion.span
                layoutId="category-tab-pill"
                className="absolute inset-0 rounded-full bg-gold"
                transition={{ type: "spring", stiffness: 380, damping: 32 }}
              />
            )}
            <span className="relative">{cat.name}</span>
          </button>
        );
      })}
    </div>
  );
}

export function CategoryGrid({ parentId }: { parentId: MainCategoryId }) {
  const subcats = getSubcategoriesByParent(parentId);

  return (
    <GrabScroll
      snap
      className="gap-4 px-5 sm:gap-5 sm:px-8 md:px-12 lg:px-16 xl:px-24"
    >
      {subcats.map((cat, index) => {
        const image = getCategoryImage(cat.id);

        return (
          <motion.article
            key={cat.id}
            initial={false}
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={fadeUp}
            custom={index * 0.05}
            className="group w-[220px] flex-shrink-0 sm:w-[260px] lg:w-[280px]"
            style={{ scrollSnapAlign: "start" }}
          >
            <Link
              href={`/collections/${cat.id}`}
              draggable={false}
              data-cursor="enter"
              className="gold-border-glow block"
              aria-label={`Shop ${cat.name} — ${cat.subtitle}`}
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-black-card">
                {image && (
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    loading="lazy"
                    className="object-cover transition-transform duration-700 ease-luxury group-hover:scale-110"
                    sizes="(max-width: 640px) 220px, 280px"
                    draggable={false}
                  />
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-black/10 transition-opacity duration-500 group-hover:via-black/50" />
                <div className="absolute inset-0 bg-gradient-to-br from-gold/10 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <div className="absolute top-4 left-4 flex h-10 w-10 items-center justify-center border border-white/15 bg-black/50 text-gold/80 backdrop-blur-sm transition-all duration-500 group-hover:border-gold/40 group-hover:text-gold">
                  <CategoryIcon id={cat.icon} className="h-5 w-5" />
                </div>

                <span className="absolute top-5 right-5 font-body text-[10px] tracking-[0.3em] text-white/25">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                  <p className="font-body text-[10px] tracking-[0.28em] text-gold/75 uppercase">
                    {cat.subtitle}
                  </p>
                  <h3 className="mt-2 font-display text-xl font-light tracking-wide text-white transition-colors duration-300 group-hover:text-gold sm:text-2xl">
                    {cat.name}
                  </h3>
                  <span className="mt-4 inline-flex items-center gap-2 font-body text-[10px] tracking-[0.2em] text-white/0 uppercase transition-all duration-500 group-hover:text-gold/90">
                    Explore
                    <ArrowRightIcon className="transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>

                <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 backdrop-blur-[2px] transition-all duration-500 group-hover:bg-black/25 group-hover:opacity-100">
                  <span className="translate-y-3 border border-gold/80 px-6 py-2.5 font-body text-[10px] tracking-[0.25em] text-gold uppercase opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    Shop Now
                  </span>
                </div>
              </div>
            </Link>
          </motion.article>
        );
      })}
    </GrabScroll>
  );
}

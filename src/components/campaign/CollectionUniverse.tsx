"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useCampaignTheme } from "@/components/campaign/CampaignThemeProvider";
import { MobileCollectionUniverse } from "@/components/campaign/MobileCollectionUniverse";
import {
  getCampaignCollections,
  type CampaignTheme,
} from "@/lib/campaign-theme";
import { mainCategories, type MainCategoryId } from "@/lib/categories";

function UniverseTabs({
  activeTab,
  onTabChange,
}: {
  activeTab: MainCategoryId;
  onTabChange: (id: MainCategoryId) => void;
}) {
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
            aria-controls={`universe-panel-${cat.id}`}
            id={`universe-tab-${cat.id}`}
            onClick={() => onTabChange(cat.id)}
            className={`relative z-10 px-6 py-2.5 font-body text-[11px] tracking-[0.22em] uppercase transition-colors duration-500 sm:px-8 sm:py-3 sm:text-xs ${
              isActive ? "text-black" : "text-white/50 hover:text-white/80"
            }`}
          >
            {isActive && (
              <motion.span
                layoutId="universe-category-pill"
                className="absolute inset-0 rounded-full bg-[var(--campaign-accent)]"
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

function UniverseRow({
  collection,
  index,
  isActive,
  onHover,
}: {
  collection: CampaignTheme;
  index: number;
  isActive: boolean;
  onHover: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.06, duration: 0.6 }}
      onMouseEnter={onHover}
      className="group relative"
    >
      <Link
        href={`/collections/${collection.slug}`}
        data-cursor="enter"
        className="relative flex min-h-[140px] items-center overflow-hidden border border-white/5 sm:min-h-[180px]"
      >
        <div className="absolute inset-0">
          <Image
            src={collection.image}
            alt={collection.alt}
            fill
            className={`object-cover transition-all duration-1000 ${isActive ? "scale-105 opacity-50" : "scale-100 opacity-25"}`}
            sizes="100vw"
          />
          <motion.div
            className="absolute inset-0"
            animate={{
              background: isActive
                ? `linear-gradient(90deg, ${collection.bg}ee 0%, ${collection.bg}99 45%, transparent 100%)`
                : "linear-gradient(90deg, rgba(5,5,5,0.92) 0%, rgba(5,5,5,0.7) 100%)",
            }}
            transition={{ duration: 0.9 }}
          />
        </div>

        <div className="relative z-10 flex w-full items-center justify-between px-6 py-8 sm:px-12">
          <div>
            <p
              className="font-body text-[10px] tracking-[0.4em] uppercase transition-colors duration-700"
              style={{ color: isActive ? collection.accent : "rgba(255,255,255,0.35)" }}
            >
              {collection.palette}
            </p>
            <h3
              className="mt-2 font-display text-4xl font-light tracking-wide sm:text-6xl md:text-7xl"
              style={{
                color: isActive ? collection.text : "rgba(255,255,255,0.85)",
                textShadow: isActive ? `0 0 40px ${collection.glow}` : "none",
              }}
            >
              {collection.name}
            </h3>
          </div>
          <span
            className="hidden font-body text-xs tracking-[0.3em] uppercase transition-all duration-500 sm:inline"
            style={{ color: isActive ? collection.accent : "rgba(255,255,255,0.3)" }}
          >
            Enter →
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

function DesktopCollectionUniverse() {
  const {
    activeId,
    activeCategory,
    setActiveCategory,
    setThemeById,
    resetTheme,
  } = useCampaignTheme();

  const collections = getCampaignCollections(activeCategory);
  const activeMain = mainCategories.find((c) => c.id === activeCategory);

  const handleTabChange = (id: MainCategoryId) => {
    setActiveCategory(id);
  };

  return (
    <section
      id="universe"
      className="relative z-10 hidden min-h-screen py-24 md:block sm:py-32"
      onMouseLeave={resetTheme}
      aria-labelledby="universe-heading"
    >
      <div className="section-padding relative mx-auto max-w-7xl">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-body text-xs tracking-[0.45em] text-[var(--campaign-accent)] uppercase"
        >
          Collection Universe
        </motion.p>
        <motion.h2
          id="universe-heading"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mt-4 font-display text-[clamp(2.5rem,6vw,5rem)] font-light leading-[1.05] tracking-wide text-[var(--campaign-text)]"
        >
          Five Worlds.
          <br />
          One Fashion House.
        </motion.h2>
        <p className="mt-6 max-w-xl font-body text-sm text-white/40">
          Hover a universe — watch the entire atmosphere transform.
        </p>

        <div className="mt-10 flex flex-col items-start gap-4 sm:items-center">
          <UniverseTabs activeTab={activeCategory} onTabChange={handleTabChange} />
          <AnimatePresence mode="wait">
            <motion.p
              key={activeCategory}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3 }}
              className="font-display text-lg font-light text-white/50 sm:text-center"
            >
              {activeMain?.description}
            </motion.p>
          </AnimatePresence>
        </div>

        <div
          id={`universe-panel-${activeCategory}`}
          role="tabpanel"
          aria-labelledby={`universe-tab-${activeCategory}`}
          className="mt-12 flex flex-col gap-4"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col gap-4"
            >
              {collections.map((collection, index) => (
                <UniverseRow
                  key={collection.id}
                  collection={collection}
                  index={index}
                  isActive={activeId === collection.id}
                  onHover={() => setThemeById(collection.id)}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

export function CollectionUniverse() {
  return (
    <>
      <MobileCollectionUniverse />
      <DesktopCollectionUniverse />
    </>
  );
}

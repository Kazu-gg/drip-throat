"use client";

import { useCallback, useEffect, useMemo, type CSSProperties } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useCampaignTheme } from "@/components/campaign/CampaignThemeProvider";
import {
  getShowcaseCollections,
  allShowcaseHeroUrls,
  SHOWCASE_DURATION,
  SHOWCASE_EASE,
  type ShowcaseCollection,
} from "@/lib/showcase-collections";
import { ShowcaseBackground } from "./ShowcaseBackground";
import { ShowcaseCard } from "./ShowcaseCard";
import { ShowcaseCategoryTabs } from "./ShowcaseCategoryTabs";
import { usePreloadImages } from "./usePreloadImages";

export function PremiumCollectionShowcase() {
  const { activeId, activeCategory, setActiveCategory, setThemeById } =
    useCampaignTheme();

  const collections = useMemo(
    () => getShowcaseCollections(activeCategory),
    [activeCategory]
  );

  const active = useMemo(
    () => collections.find((c) => c.id === activeId) ?? collections[0],
    [collections, activeId]
  );

  usePreloadImages(allShowcaseHeroUrls);

  const activate = useCallback(
    (collection: ShowcaseCollection) => {
      setThemeById(collection.id);
    },
    [setThemeById]
  );

  useEffect(() => {
    if (collections[0]) {
      const inList = collections.some((c) => c.id === activeId);
      if (!inList) setThemeById(collections[0].id);
    }
  }, [activeCategory, activeId, collections, setThemeById]);

  if (!active) return null;

  return (
    <section
      id="universe"
      className="relative z-10 hidden h-[100dvh] min-h-[640px] overflow-hidden md:flex md:flex-col"
      aria-labelledby="showcase-heading"
    >
      <ShowcaseBackground active={active} />

      <div className="relative z-10 flex h-full min-h-0 flex-col">
        <header className="section-padding shrink-0 pt-24 pb-2">
          <p
            id="showcase-heading"
            className="font-body text-[10px] tracking-[0.5em] text-[var(--campaign-accent)] uppercase"
          >
            Collection Universe
          </p>
          <div className="mt-5">
            <ShowcaseCategoryTabs
              activeTab={activeCategory}
              onTabChange={setActiveCategory}
            />
          </div>
          <p className="mt-4 font-body text-[11px] tracking-[0.2em] text-white/35">
            Hover to enter each world
          </p>
        </header>

        <div className="shrink-0 px-6 pt-4 text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: SHOWCASE_DURATION, ease: SHOWCASE_EASE }}
            >
              <p
                className="font-body text-[11px] tracking-[0.45em] uppercase"
                style={{ color: active.accent }}
              >
                {active.palette}
              </p>
              <h2 className="mt-3 font-display text-[clamp(2.25rem,6vw,4.5rem)] font-light leading-[0.92] tracking-wide text-white">
                {active.name}
              </h2>
              <p className="mx-auto mt-3 max-w-lg font-body text-sm leading-relaxed text-white/50">
                {active.tagline}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div
          className="flex min-h-0 flex-1 items-center justify-center px-6 py-4"
          role="list"
          aria-label="Featured collections"
        >
          <div className="flex max-w-full flex-wrap items-end justify-center gap-4 sm:gap-6 lg:gap-8">
            {collections.map((collection) => (
              <div key={collection.id} role="listitem">
                <ShowcaseCard
                  collection={collection}
                  isActive={active.id === collection.id}
                  onActivate={() => activate(collection)}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="section-padding shrink-0 pb-10 pt-2 text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={`cta-${active.id}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: SHOWCASE_DURATION, ease: SHOWCASE_EASE }}
            >
              <Link
                href={`/collections/${active.slug}`}
                data-cursor="enter"
                className="showcase-cta inline-block border px-12 py-4 font-body text-[10px] tracking-[0.38em] uppercase backdrop-blur-sm"
                style={
                  {
                    "--cta-accent": active.accent,
                    "--cta-glow": active.glow,
                  } as CSSProperties
                }
              >
                Enter {active.name} →
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

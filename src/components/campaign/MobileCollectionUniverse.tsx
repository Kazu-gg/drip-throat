"use client";

import { useCallback, useEffect, useMemo, type CSSProperties } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useCampaignTheme } from "@/components/campaign/CampaignThemeProvider";
import { ShowcaseCategoryTabs } from "@/components/campaign/showcase/ShowcaseCategoryTabs";
import { ShowcaseBackground } from "@/components/campaign/showcase/ShowcaseBackground";
import {
  getShowcaseCollections,
  allShowcaseHeroUrls,
  SHOWCASE_DURATION,
  SHOWCASE_EASE,
  type ShowcaseCollection,
} from "@/lib/showcase-collections";
import { usePreloadImages } from "@/components/campaign/showcase/usePreloadImages";

export function MobileCollectionUniverse() {
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
      className="relative z-10 flex h-[100dvh] min-h-0 flex-col overflow-hidden md:hidden"
      aria-labelledby="universe-mobile-heading"
    >
      <ShowcaseBackground active={active} />

      <div className="relative z-10 flex h-full min-h-0 flex-col section-padding pt-20">
          <p
            id="universe-mobile-heading"
            className="font-body text-[10px] tracking-[0.4em] text-[var(--campaign-accent)] uppercase"
          >
            Collection Universe
          </p>

          <div className="mt-4">
            <ShowcaseCategoryTabs
              activeTab={activeCategory}
              onTabChange={setActiveCategory}
              layoutId="showcase-category-pill-mobile"
            />
          </div>

          <div className="flex min-h-0 flex-1 flex-col items-center justify-center text-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: SHOWCASE_DURATION, ease: SHOWCASE_EASE }}
              >
                <p
                  className="font-body text-[10px] tracking-[0.4em] uppercase"
                  style={{ color: active.accent }}
                >
                  {active.palette}
                </p>
                <p className="mt-3 font-display text-[clamp(2.5rem,12vw,3.75rem)] font-light leading-[0.95] text-white">
                  {active.name}
                </p>
                <p className="mt-3 font-body text-xs text-white/45">{active.tagline}</p>
                <Link
                  href={`/collections/${active.slug}`}
                  data-cursor="enter"
                  className="showcase-cta mt-8 inline-block border px-10 py-3.5 font-body text-[9px] tracking-[0.32em] uppercase backdrop-blur-sm"
                  style={
                    {
                      "--cta-accent": active.accent,
                      "--cta-glow": active.glow,
                    } as CSSProperties
                  }
                >
                  Enter →
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="shrink-0 pb-4 pt-6">
            <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {collections.map((collection) => {
                const isActive = active.id === collection.id;
                return (
                  <button
                    key={collection.id}
                    type="button"
                    onClick={() => activate(collection)}
                    className="flex shrink-0 snap-center flex-col items-center"
                    aria-pressed={isActive}
                  >
                    <div
                      className={`showcase-glass-card relative h-[160px] w-[100px] overflow-hidden transition-transform duration-[800ms] ${
                        isActive ? "showcase-glass-card--active scale-105" : "scale-95 opacity-70"
                      }`}
                    >
                      <Image
                        src={collection.image}
                        alt={collection.alt}
                        fill
                        className="object-cover object-top"
                        sizes="100px"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/75 to-transparent" />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
      </div>
    </section>
  );
}

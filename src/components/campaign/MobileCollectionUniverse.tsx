"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useCampaignTheme } from "@/components/campaign/CampaignThemeProvider";
import { getCampaignCollections, type CampaignTheme } from "@/lib/campaign-theme";
import { mainCategories, type MainCategoryId } from "@/lib/categories";

type Particle = {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  drift: number;
};

function buildParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2.5 + 0.6,
    duration: Math.random() * 7 + 9,
    delay: Math.random() * 5,
    drift: Math.random() * 20 - 10,
  }));
}

function SlideParticles({ color }: { color: string }) {
  const reduceMotion = useReducedMotion();
  const [particles, setParticles] = useState<Particle[] | null>(null);

  useEffect(() => {
    if (reduceMotion) return;
    setParticles(buildParticles(18));
  }, [reduceMotion]);

  if (reduceMotion || !particles) return null;

  return (
    <div className="pointer-events-none absolute inset-0 z-[2] overflow-hidden">
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: color,
            boxShadow: `0 0 ${p.size * 3}px ${color}`,
          }}
          animate={{
            y: [0, -36, 0],
            x: [0, p.drift, 0],
            opacity: [0.08, 0.45, 0.08],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

function MobileEnterButton({
  href,
  accent,
}: {
  href: string;
  accent: string;
}) {
  return (
    <motion.div
      whileTap={{ scale: 0.94 }}
      className="inline-block"
    >
      <Link
        href={href}
        data-cursor="enter"
        className="group relative inline-flex items-center gap-3 overflow-hidden border px-8 py-4 font-body text-[10px] tracking-[0.35em] uppercase"
        style={{ borderColor: `${accent}99`, color: accent }}
      >
        <motion.span
          className="absolute inset-0 origin-left scale-x-0 bg-white/10"
          whileTap={{ scaleX: 1 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        />
        <span className="relative">Enter</span>
        <motion.span
          className="relative"
          animate={{ x: [0, 4, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          →
        </motion.span>
      </Link>
    </motion.div>
  );
}

function MobileCollectionSlide({
  collection,
  index,
  total,
  isActive,
  onVisible,
}: {
  collection: CampaignTheme;
  index: number;
  total: number;
  isActive: boolean;
  onVisible: () => void;
}) {
  const slideRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: slideRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.14, 1.08, 1.14]);
  const contentY = useTransform(scrollYProgress, [0, 1], [24, -24]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.4, 1], [0.72, 0.55, 0.72]);

  useEffect(() => {
    const node = slideRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.55) {
          onVisible();
        }
      },
      { threshold: [0.55, 0.7] }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [onVisible]);

  return (
    <section
      ref={slideRef}
      className="relative h-[100dvh] w-full shrink-0 snap-start snap-always overflow-hidden"
      aria-label={`${collection.name} collection`}
    >
      <motion.div className="absolute inset-[-8%]" style={{ y: imageY, scale: imageScale }}>
        <Image
          src={collection.image}
          alt={collection.alt}
          fill
          priority={index < 2}
          className="object-cover"
          sizes="100vw"
        />
      </motion.div>

      <motion.div
        className="absolute inset-0 z-[1]"
        style={{
          opacity: overlayOpacity,
          background: `linear-gradient(180deg, ${collection.bg}f2 0%, ${collection.bg}88 38%, ${collection.bg}dd 72%, #050505 100%)`,
        }}
      />

      <div
        className="absolute inset-0 z-[1] opacity-40"
        style={{
          background: `radial-gradient(ellipse 80% 50% at 50% 0%, ${collection.glow}, transparent 70%)`,
        }}
      />

      <SlideParticles color={collection.particle} />

      <motion.div
        className="relative z-10 flex h-full flex-col justify-end px-6 pb-12 pt-28"
        style={{ y: contentY }}
      >
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0.6, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="font-body text-[10px] tracking-[0.45em] uppercase"
          style={{ color: collection.accent }}
        >
          {collection.palette}
        </motion.p>

        <motion.h3
          initial={{ opacity: 0, y: 28 }}
          animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0.85, y: 0 }}
          transition={{ duration: 0.7, delay: 0.12 }}
          className="mt-3 font-display text-[clamp(3.25rem,14vw,4.5rem)] font-light leading-[0.92] tracking-wide"
          style={{
            color: collection.text,
            textShadow: `0 0 48px ${collection.glow}`,
          }}
        >
          {collection.name}
        </motion.h3>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isActive ? { opacity: 1 } : { opacity: 0.5 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-4 max-w-[16rem] font-body text-sm leading-relaxed text-white/45"
        >
          Editorial luxury — curated for the modern Indian wardrobe.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0.7, y: 0 }}
          transition={{ duration: 0.6, delay: 0.28 }}
          className="mt-8"
        >
          <MobileEnterButton
            href={`/collections/${collection.slug}`}
            accent={collection.accent}
          />
        </motion.div>

        <p className="mt-10 font-body text-[9px] tracking-[0.4em] text-white/25 uppercase">
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </p>
      </motion.div>
    </section>
  );
}

function MobileUniverseTabs({
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
      className="flex gap-1 rounded-full border border-white/10 bg-black/60 p-1 backdrop-blur-md"
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
            className={`relative flex-1 px-3 py-2 font-body text-[9px] tracking-[0.18em] uppercase transition-colors ${
              isActive ? "text-black" : "text-white/45"
            }`}
          >
            {isActive && (
              <motion.span
                layoutId="mobile-universe-tab-pill"
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

export function MobileCollectionUniverse() {
  const {
    activeCategory,
    setActiveCategory,
    setThemeById,
    resetTheme,
    activeId,
  } = useCampaignTheme();

  const collections = getCampaignCollections(activeCategory);
  const activeMain = mainCategories.find((c) => c.id === activeCategory);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    setActiveSlide(0);
    const scroller = scrollerRef.current;
    if (scroller) scroller.scrollTop = 0;
  }, [activeCategory]);

  const handleTabChange = (id: MainCategoryId) => {
    setActiveCategory(id);
    resetTheme();
  };

  return (
    <section
      id="universe-mobile"
      className="relative z-10 md:hidden"
      aria-labelledby="universe-mobile-heading"
    >
      <div className="section-padding border-b border-white/5 pb-6 pt-20">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-body text-[10px] tracking-[0.45em] text-[var(--campaign-accent)] uppercase"
        >
          Collection Universe
        </motion.p>
        <motion.h2
          id="universe-mobile-heading"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.08 }}
          className="mt-3 font-display text-[clamp(2.25rem,10vw,3rem)] font-light leading-[1.05] tracking-wide text-white"
        >
          Five Worlds.
          <br />
          One Fashion House.
        </motion.h2>
        <p className="mt-4 font-body text-xs leading-relaxed text-white/40">
          Swipe through each universe — a luxury editorial experience.
        </p>

        <div className="mt-6">
          <MobileUniverseTabs activeTab={activeCategory} onTabChange={handleTabChange} />
        </div>

        <AnimatePresence mode="wait">
          <motion.p
            key={activeCategory}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-4 font-display text-sm font-light text-white/45"
          >
            {activeMain?.description}
          </motion.p>
        </AnimatePresence>

        <div className="mt-5 flex items-center gap-2">
          {collections.map((c, i) => (
            <span
              key={c.id}
              className="h-px flex-1 transition-colors duration-500"
              style={{
                background:
                  i === activeSlide ? c.accent : "rgba(255,255,255,0.12)",
              }}
            />
          ))}
        </div>
      </div>

      <div
        ref={scrollerRef}
        className="h-[100dvh] snap-y snap-mandatory overflow-y-auto overscroll-y-contain [-webkit-overflow-scrolling:touch]"
        style={{ scrollSnapType: "y mandatory" }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {collections.map((collection, index) => (
              <MobileCollectionSlide
                key={collection.id}
                collection={collection}
                index={index}
                total={collections.length}
                isActive={activeId === collection.id}
                onVisible={() => {
                  setActiveSlide(index);
                  setThemeById(collection.id);
                }}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

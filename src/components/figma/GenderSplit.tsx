"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { figmaImage } from "@/lib/figma-home";
import { useGenderTheme } from "@/contexts/GenderThemeContext";

function PanelContent({
  gender,
  title,
  subtitle,
  align,
}: {
  gender: "women" | "men";
  title: string;
  subtitle: string;
  align: "left" | "right";
}) {
  const isRight = align === "right";
  return (
    <div
      className={`relative z-10 w-full p-8 sm:p-10 lg:p-12 ${isRight ? "ml-auto max-w-md text-right" : "max-w-md"}`}
    >
      <p className="font-body text-[10px] tracking-[0.4em] text-gold uppercase">
        {gender === "women" ? "Women" : "Men"}
      </p>
      <h2 className="mt-2 font-display text-2xl font-light tracking-wide text-white uppercase sm:text-3xl">
        {title}
      </h2>
      <span className="mt-5 inline-flex items-center gap-2 font-body text-[10px] tracking-[0.32em] text-white/60 uppercase">
        Explore {gender === "women" ? "Women" : "Men"} →
      </span>
      <p className="sr-only">{subtitle}</p>
    </div>
  );
}

export function GenderSplit() {
  const women = figmaImage("sarees", "Women's luxury fashion");
  const men = figmaImage("kurtas", "Men's luxury fashion");
  const { split, setSplit } = useGenderTheme();
  const containerRef = useRef<HTMLElement>(null);
  const dragging = useRef(false);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const measure = () => setContainerWidth(el.offsetWidth);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const updateFromClientX = useCallback(
    (clientX: number) => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const pct = ((clientX - rect.left) / rect.width) * 100;
      setSplit(pct);
    },
    [setSplit]
  );

  const onPointerDown = (e: React.PointerEvent<HTMLButtonElement>) => {
    dragging.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    updateFromClientX(e.clientX);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (!dragging.current) return;
    updateFromClientX(e.clientX);
  };

  const onPointerUp = (e: React.PointerEvent<HTMLButtonElement>) => {
    dragging.current = false;
    e.currentTarget.releasePointerCapture(e.pointerId);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      setSplit(split - 4);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      setSplit(split + 4);
    }
  };

  return (
    <section
      id="worlds"
      ref={containerRef}
      className="gender-split relative min-h-[480px] border-t border-gold/10 sm:min-h-[520px] lg:min-h-[560px]"
      aria-label="Women and Men collection splitter"
    >
      <Link
        href="/collections?category=men"
        className="group absolute inset-0 flex items-end overflow-hidden"
        aria-label="Explore men's collection"
      >
        <Image
          src={men.src}
          alt={men.alt}
          fill
          priority={false}
          className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.02]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-black/25" />
        <PanelContent
          gender="men"
          title="Modern Luxury"
          subtitle="Men's luxury fashion"
          align="right"
        />
      </Link>

      <div
        className="absolute inset-y-0 left-0 z-10 overflow-hidden"
        style={{ width: `${split}%` }}
      >
        <div className="relative h-full" style={{ width: containerWidth || "100%" }}>
          <Link
            href="/collections?category=women"
            className="group relative flex h-full min-h-[480px] items-end sm:min-h-[520px] lg:min-h-[560px]"
            aria-label="Explore women's collection"
          >
            <Image
              src={women.src}
              alt={women.alt}
              fill
              priority={false}
              className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.02]"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-black/25" />
            <PanelContent
              gender="women"
              title="Timeless Elegance"
              subtitle="Women's luxury fashion"
              align="left"
            />
          </Link>
        </div>
      </div>

      <div
        className="pointer-events-none absolute top-0 bottom-0 z-20 w-px bg-gold/50"
        style={{ left: `${split}%` }}
        aria-hidden
      />

      <motion.button
        type="button"
        initial={{ scale: 0.9, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onKeyDown={onKeyDown}
        className="gender-split-handle absolute top-1/2 z-30 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize items-center justify-center rounded-full border border-gold/50 bg-black/85 backdrop-blur-sm touch-none sm:h-20 sm:w-20"
        style={{ left: `${split}%` }}
        role="slider"
        aria-label="Drag to explore women's or men's collections"
        aria-valuemin={8}
        aria-valuemax={92}
        aria-valuenow={Math.round(split)}
        aria-orientation="horizontal"
      >
        <span className="font-accent text-2xl text-gold sm:text-3xl">C</span>
      </motion.button>
    </section>
  );
}

"use client";

import { useEffect, useState } from "react";
import { FIGMA_SECTIONS } from "@/lib/figma-home";

export function ScrollSpy() {
  const [active, setActive] = useState("intro");

  useEffect(() => {
    const ids = FIGMA_SECTIONS.map((s) => s.id);
    const observers: IntersectionObserver[] = [];

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        { rootMargin: "-40% 0px -40% 0px", threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <nav
      className="fixed left-4 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-5 xl:left-8 xl:flex"
      aria-label="Page sections"
    >
      {FIGMA_SECTIONS.map((section) => {
        const isActive = active === section.id;
        return (
          <a
            key={section.id}
            href={`#${section.id}`}
            className="group flex items-center gap-3"
            aria-current={isActive ? "true" : undefined}
          >
            <span
              className={`h-px transition-all duration-500 ${
                isActive ? "w-8 bg-gold" : "w-4 bg-white/20 group-hover:bg-white/40"
              }`}
            />
            <span
              className={`font-body text-[9px] tracking-[0.2em] uppercase transition-colors ${
                isActive ? "text-gold" : "text-white/25 group-hover:text-white/50"
              }`}
            >
              {section.num} {section.label}
            </span>
          </a>
        );
      })}
    </nav>
  );
}

"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { getCollectionWorld } from "@/lib/collection-worlds";

type CollectionWorldProps = {
  slug: string;
  children: ReactNode;
};

/** Transforms the page atmosphere per collection universe */
export function CollectionWorld({ slug, children }: CollectionWorldProps) {
  const revealRef = useRef<HTMLDivElement>(null);
  const world = getCollectionWorld(slug);

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--world-bg", world.bg);
    root.style.setProperty("--world-accent", world.accent);
    root.style.setProperty("--world-accent-muted", world.accentMuted);
    root.style.setProperty("--world-glow", world.glow);
    root.style.setProperty("--world-text", world.text);
    document.body.classList.add("collection-world-active");

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduceMotion && revealRef.current) {
      gsap.fromTo(
        revealRef.current,
        { clipPath: "circle(0% at 50% 50%)" },
        {
          clipPath: "circle(150% at 50% 50%)",
          duration: 1.4,
          ease: "power3.inOut",
        }
      );
    }

    return () => {
      root.style.removeProperty("--world-bg");
      root.style.removeProperty("--world-accent");
      root.style.removeProperty("--world-accent-muted");
      root.style.removeProperty("--world-glow");
      root.style.removeProperty("--world-text");
      document.body.classList.remove("collection-world-active");
    };
  }, [world]);

  return (
    <div
      ref={revealRef}
      className="collection-world min-h-screen"
      style={{
        backgroundColor: world.bg,
        color: world.text,
      }}
    >
      {children}
    </div>
  );
}

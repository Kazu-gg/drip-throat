"use client";

import { useEffect } from "react";
import { setLenis } from "@/lib/lenis-instance";
import { resetScrollMotionBlur, updateScrollMotionBlur } from "@/lib/scroll-motion-blur";
import "lenis/dist/lenis.css";

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function SmoothScroll() {
  useEffect(() => {
    if (prefersReducedMotion()) return;

    let disposed = false;
    let cleanup: (() => void) | undefined;

    void (async () => {
      try {
        const [{ default: Lenis }, { default: gsap }, { ScrollTrigger }] = await Promise.all([
          import("lenis"),
          import("gsap"),
          import("gsap/ScrollTrigger"),
        ]);

        if (disposed) return;

        gsap.registerPlugin(ScrollTrigger);

        const lenis = new Lenis({
          lerp: 0.08,
          smoothWheel: true,
          wheelMultiplier: 1.0,
          touchMultiplier: 1.2,
          anchors: true,
        });

        setLenis(lenis);

        const onScroll = () => {
          if (ScrollTrigger.getAll().length > 0) ScrollTrigger.update();
          updateScrollMotionBlur(lenis.velocity);
        };

        lenis.on("scroll", onScroll);

        const tickerFn = (time: number) => {
          lenis.raf(time * 1000);
        };

        gsap.ticker.add(tickerFn);
        gsap.ticker.lagSmoothing(0);

        const refreshScrollTriggers = () => {
          requestAnimationFrame(() => ScrollTrigger.refresh());
        };

        refreshScrollTriggers();
        window.addEventListener("load", refreshScrollTriggers);
        window.addEventListener("resize", refreshScrollTriggers);

        cleanup = () => {
          window.removeEventListener("load", refreshScrollTriggers);
          window.removeEventListener("resize", refreshScrollTriggers);
          gsap.ticker.remove(tickerFn);
          lenis.off("scroll", onScroll);
          lenis.destroy();
          setLenis(null);
          resetScrollMotionBlur();
        };
      } catch {
        if (!disposed) setLenis(null);
      }
    })();

    return () => {
      disposed = true;
      cleanup?.();
    };
  }, []);

  return null;
}

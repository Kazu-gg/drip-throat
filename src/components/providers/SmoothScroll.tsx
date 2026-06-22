"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { setLenis } from "@/lib/lenis-instance";
import "lenis/dist/lenis.css";

gsap.registerPlugin(ScrollTrigger);

export function SmoothScroll() {
  useEffect(() => {
    let lenis: Lenis | null = null;
    let tickerFn: ((time: number) => void) | null = null;

    try {
      lenis = new Lenis({
        lerp: 0.08,
        smoothWheel: true,
        wheelMultiplier: 0.85,
        touchMultiplier: 1.3,
        anchors: true,
      });

      setLenis(lenis);

      lenis.on("scroll", ScrollTrigger.update);

      tickerFn = (time: number) => {
        lenis?.raf(time * 1000);
      };
      gsap.ticker.add(tickerFn);
      gsap.ticker.lagSmoothing(0);

      requestAnimationFrame(() => ScrollTrigger.refresh());
    } catch {
      /* native scroll fallback */
    }

    return () => {
      if (tickerFn) gsap.ticker.remove(tickerFn);
      lenis?.destroy();
      setLenis(null);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return null;
}

"use client";

import { useEffect, useState } from "react";
import { getLenis, subscribeLenis } from "@/lib/lenis-instance";

export function useMousePosition() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return position;
}

export function useScrollY() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let raf = 0;
    let detachScroll: (() => void) | undefined;

    const scheduleUpdate = (y: number) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setScrollY(y));
    };

    const bindScroll = () => {
      detachScroll?.();

      const lenis = getLenis();
      if (lenis) {
        const onScroll = (instance: { scroll: number }) => scheduleUpdate(instance.scroll);
        lenis.on("scroll", onScroll);
        scheduleUpdate(lenis.scroll);
        detachScroll = () => lenis.off("scroll", onScroll);
        return;
      }

      const onNativeScroll = () => scheduleUpdate(window.scrollY);
      window.addEventListener("scroll", onNativeScroll, { passive: true });
      scheduleUpdate(window.scrollY);
      detachScroll = () => window.removeEventListener("scroll", onNativeScroll);
    };

    bindScroll();
    const unsubscribeLenis = subscribeLenis(() => bindScroll());

    return () => {
      unsubscribeLenis();
      detachScroll?.();
      cancelAnimationFrame(raf);
    };
  }, []);

  return scrollY;
}

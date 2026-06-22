"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type TrailDot = { key: string; x: number; y: number };

const MAX_TRAIL = 10;
type CursorLabel = "VIEW" | "ENTER" | "EXPLORE" | null;

const LABEL_MAP: Record<string, CursorLabel> = {
  view: "VIEW",
  enter: "ENTER",
  explore: "EXPLORE",
};

export function LuxuryCursor() {
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [label, setLabel] = useState<CursorLabel>(null);
  const [scale, setScale] = useState(1);
  const [dots, setDots] = useState<TrailDot[]>([]);
  const lastRef = useRef({ x: 0, y: 0, t: 0 });
  const seqRef = useRef(0);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine) and (min-width: 768px)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setEnabled(fine && !reduced);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    document.documentElement.classList.add("luxury-cursor-active");

    const onMove = (e: MouseEvent) => {
      setVisible(true);
      const now = performance.now();
      const dx = e.clientX - lastRef.current.x;
      const dy = e.clientY - lastRef.current.y;
      const dt = now - lastRef.current.t || 16;
      const speed = Math.sqrt(dx * dx + dy * dy) / dt;

      setPos({ x: e.clientX, y: e.clientY });
      setScale(Math.min(1.6, 1 + speed * 0.08));

      if (speed > 1.2) {
        seqRef.current += 1;
        const key = `trail-${seqRef.current}-${now}`;
        setDots((prev) =>
          [...prev, { key, x: e.clientX, y: e.clientY }].slice(-MAX_TRAIL)
        );
      }

      lastRef.current = { x: e.clientX, y: e.clientY, t: now };
    };

    const onOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("[data-cursor]");
      const key = target?.getAttribute("data-cursor")?.toLowerCase();
      setLabel(key ? LABEL_MAP[key] ?? null : null);
    };

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);
    const onScroll = () => {
      setVisible(false);
      setDots([]);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      document.documentElement.classList.remove("luxury-cursor-active");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
      window.removeEventListener("scroll", onScroll);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      {dots.map((dot) => (
        <motion.span
          key={dot.key}
            className="pointer-events-none fixed z-[9998] rounded-full"
            style={{
              left: dot.x,
              top: dot.y,
              width: 2,
              height: 2,
              marginLeft: -1,
              marginTop: -1,
              background: "rgba(212,175,55,0.45)",
            }}
            initial={{ opacity: 0.5, scale: 1 }}
            animate={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          />
        ))}

      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] mix-blend-difference"
        animate={{ x: pos.x, y: pos.y, opacity: visible ? 1 : 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 35, mass: 0.4 }}
      >
        <motion.div
          animate={{ scale }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="relative -translate-x-1/2 -translate-y-1/2"
        >
          <div
            className="flex h-8 w-8 items-center justify-center rounded-full border border-gold/60"
            style={{ boxShadow: "0 0 20px rgba(212,175,55,0.15)" }}
          >
            <div className="h-1 w-1 rounded-full bg-gold" />
          </div>
          <AnimatePresence>
            {label && (
              <motion.span
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                className="absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap font-body text-[9px] tracking-[0.35em] text-gold"
              >
                {label}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </>
  );
}

"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const chapters = [
  {
    label: "Chapter I",
    title: "Designed for Celebrations",
    body: "Every Dripthroat piece is conceived for the moments that matter — weddings, festivals, and the quiet confidence of everyday elegance.",
  },
  {
    label: "Chapter II",
    title: "Crafted for Elegance",
    body: "Hand-selected fabrics. Obsessive detail. An editorial eye that treats every garment as a work of art, not inventory.",
  },
  {
    label: "Chapter III",
    title: "Delivered with Care",
    body: "From atelier to doorstep — premium packaging, tracked delivery, and a shopping experience worthy of the craft.",
  },
];

export function Storytelling() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const panels = gsap.utils.toArray<HTMLElement>(".story-panel");
    const ctx = gsap.context(() => {
      panels.forEach((panel) => {
        gsap.fromTo(
          panel.querySelector(".story-content"),
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            scrollTrigger: {
              trigger: panel,
              start: "top 70%",
              end: "top 30%",
              scrub: 1,
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="story" className="relative z-10" aria-label="Brand story">
      {chapters.map((chapter) => (
        <div
          key={chapter.title}
          className="story-panel flex min-h-screen items-center justify-center border-t border-white/5 px-5 py-24 sm:px-8"
        >
          <div className="story-content mx-auto max-w-4xl text-center">
            <p className="font-body text-[10px] tracking-[0.5em] text-[var(--campaign-accent)] uppercase">
              {chapter.label}
            </p>
            <h2 className="mt-6 font-display text-[clamp(2.25rem,6vw,5rem)] font-light leading-[1.1] text-[var(--campaign-text)]">
              {chapter.title}
            </h2>
            <p className="mx-auto mt-8 max-w-2xl font-body text-base leading-relaxed text-white/45 sm:text-lg">
              {chapter.body}
            </p>
          </div>
        </div>
      ))}
    </section>
  );
}

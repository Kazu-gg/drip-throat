"use client";

import { useEffect, useMemo, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useCampaignTheme } from "@/components/campaign/CampaignThemeProvider";
import { getRunwayPanels } from "@/lib/runway-looks";

gsap.registerPlugin(ScrollTrigger);

export function FashionRunway() {
  const { activeCategory } = useCampaignTheme();
  const panels = useMemo(
    () => getRunwayPanels(activeCategory),
    [activeCategory]
  );

  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.set(track, { x: 0 });

    let trigger: ScrollTrigger | undefined;
    const setup = () => {
      const distance = track.scrollWidth - window.innerWidth;
      if (distance <= 0) return;
      trigger?.kill();
      trigger = ScrollTrigger.create({
        trigger: section,
        pin: true,
        scrub: 1.4,
        end: () => `+=${distance}`,
        invalidateOnRefresh: true,
        animation: gsap.to(track, {
          x: () => -(track.scrollWidth - window.innerWidth),
          ease: "none",
        }),
      });
    };

    const raf = requestAnimationFrame(() => {
      setup();
      ScrollTrigger.refresh();
    });

    window.addEventListener("resize", setup);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", setup);
      trigger?.kill();
    };
  }, [activeCategory, panels]);

  return (
    <section
      ref={sectionRef}
      id="runway"
      className="relative z-10 h-screen overflow-hidden"
      aria-label="Fashion runway"
    >
      <div
        ref={trackRef}
        key={activeCategory}
        className="flex h-full items-stretch will-change-transform"
      >
        {panels.map((panel, i) =>
          panel.type === "intro" ? (
            <div
              key={`intro-${activeCategory}`}
              className="flex h-full w-screen flex-shrink-0 flex-col justify-center px-8 sm:px-16"
            >
              <p className="font-body text-[10px] tracking-[0.5em] text-[var(--campaign-accent)] uppercase">
                {panel.subtitle}
              </p>
              <h2 className="mt-4 font-display text-[clamp(3rem,10vw,8rem)] font-light leading-[0.95] text-white">
                {panel.title}
              </h2>
              <p className="mt-8 max-w-md font-body text-sm leading-relaxed text-white/40">
                {panel.body}
              </p>
            </div>
          ) : (
            <div
              key={panel.key}
              className="relative h-full w-[88vw] flex-shrink-0 sm:w-[72vw]"
            >
              <Link href={panel.href} data-cursor="view" className="block h-full">
                <Image
                  src={panel.image}
                  alt={panel.alt}
                  fill
                  className="object-cover"
                  sizes="72vw"
                  priority={i === 1}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-8 sm:p-14">
                  <span className="font-body text-[10px] tracking-[0.45em] text-[var(--campaign-accent)] uppercase">
                    Look {String(i).padStart(2, "0")} — {panel.category}
                  </span>
                  <h3 className="mt-3 font-display text-[clamp(2rem,5vw,4.5rem)] font-light text-white">
                    {panel.name}
                  </h3>
                </div>
              </Link>
            </div>
          )
        )}
      </div>
    </section>
  );
}

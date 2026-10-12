"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { products } from "@/lib/products";

gsap.registerPlugin(ScrollTrigger);

const runwayItems = products.slice(0, 5).map((p, i) => ({
  slug: p.slug,
  name: p.name,
  category: p.category,
  image: p.image.src,
  alt: p.image.alt,
  index: String(i + 1).padStart(2, "0"),
}));

export function RunwaySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    let trigger: ScrollTrigger | undefined;

    const setup = () => {
      const scrollDistance = track.scrollWidth - window.innerWidth;
      if (scrollDistance <= 0) return;

      trigger?.kill();

      trigger = ScrollTrigger.create({
        trigger: section,
        pin: true,
        scrub: 1.2,
        end: () => `+=${track.scrollWidth - window.innerWidth}`,
        invalidateOnRefresh: true,
        anticipatePin: 1,
        animation: gsap.to(track, {
          x: () => -(track.scrollWidth - window.innerWidth),
          ease: "none",
        }),
      });
    };

    const raf = requestAnimationFrame(setup);
    window.addEventListener("resize", setup);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", setup);
      trigger?.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="runway"
      className="relative h-screen overflow-hidden bg-black"
      aria-label="Fashion runway experience"
    >
      <div className="pointer-events-none absolute top-8 left-8 z-10 sm:top-12 sm:left-12">
        <p className="font-body text-[10px] tracking-[0.45em] text-gold/60 uppercase">
          The Runway
        </p>
        <h2 className="mt-2 font-display text-3xl font-light tracking-wide text-white sm:text-5xl">
          Walk the Collection
        </h2>
      </div>

      <div
        ref={trackRef}
        className="flex h-full items-center gap-0 will-change-transform"
        data-lenis-prevent
      >
        <div className="runway-panel flex h-full w-screen flex-shrink-0 flex-col justify-end px-8 pb-20 sm:px-16">
          <p className="font-display text-[clamp(3rem,12vw,9rem)] font-light leading-[0.9] tracking-tight text-white/10">
            DRIPTHROAT
          </p>
          <p className="mt-6 max-w-md font-body text-sm leading-relaxed text-white/40">
            Scroll vertically. Move through the runway horizontally. Each piece is
            an editorial moment — not a product card.
          </p>
        </div>

        {runwayItems.map((item) => (
          <div
            key={item.slug}
            className="runway-panel group relative h-full w-[85vw] flex-shrink-0 sm:w-[70vw] lg:w-[55vw]"
          >
            <Link
              href={`/products/${item.slug}`}
              data-cursor="view"
              className="relative block h-full w-full overflow-hidden"
            >
              <div className="runway-image absolute inset-0 will-change-transform">
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  className="object-cover"
                  sizes="70vw"
                  priority={item.index === "01"}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
              </div>

              <div className="absolute inset-x-0 bottom-0 z-10 p-8 sm:p-12">
                <span className="font-body text-[10px] tracking-[0.4em] text-gold/70">
                  {item.index} — {item.category}
                </span>
                <h3 className="mt-3 font-display text-3xl font-light tracking-wide text-white sm:text-5xl">
                  {item.name}
                </h3>
                <span className="mt-6 inline-block font-body text-[10px] tracking-[0.3em] text-white/40 uppercase transition-colors group-hover:text-gold">
                  View Exhibit →
                </span>
              </div>
            </Link>
          </div>
        ))}

        <div className="runway-panel flex h-full w-screen flex-shrink-0 items-center justify-center">
          <Link
            href="/collections"
            data-cursor="enter"
            className="border border-gold/40 px-12 py-5 font-body text-xs tracking-[0.3em] text-gold uppercase transition-all duration-700 hover:bg-gold hover:text-black"
          >
            Enter All Worlds
          </Link>
        </div>
      </div>
    </section>
  );
}

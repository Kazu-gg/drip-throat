"use client";

import Image from "next/image";
import type { CategoryLandingId } from "@/lib/category-landing";
import { getCategoryLanding } from "@/lib/category-landing";
import { optimizedDimensions } from "@/lib/site-images";

export function CategoryHero({ landingId }: { landingId: CategoryLandingId }) {
  const landing = getCategoryLanding(landingId);
  const dimensions =
    optimizedDimensions(`category-hero:${landingId}`) ?? { width: 1920, height: 1080 };

  return (
    <section className="relative w-full overflow-hidden bg-[#12150a]">
      <Image
        src={landing.imageSrc}
        alt={landing.imageAlt}
        width={dimensions.width}
        height={dimensions.height}
        priority
        unoptimized
        className="h-auto w-full"
        sizes="100vw"
      />
      {/* Light edge fade only — keeps your uploaded banner colours true */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#12150a]/25 via-transparent to-[#12150a]/20" />

      <div className="absolute inset-x-0 top-0 z-10 mx-auto max-w-7xl section-padding pb-12 pt-28 sm:pt-32">
        <p className="font-body text-[10px] tracking-[0.4em] text-gold uppercase">
          {landing.eyebrow}
        </p>
        <h1 className="mt-3 font-display text-4xl font-light tracking-wide text-white sm:text-5xl">
          {landing.name}
        </h1>
        <p className="mt-4 max-w-xl font-body text-sm leading-relaxed text-white/65 sm:text-base">
          {landing.description}
        </p>
      </div>
    </section>
  );
}

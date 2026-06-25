"use client";

import Image from "next/image";
import Link from "next/link";
import type { CategoryLandingId } from "@/lib/category-landing";
import {
  getCategoryLanding,
  getLandingSubcategories,
  getLandingTint,
} from "@/lib/category-landing";
import { getCategoryImage } from "@/lib/category-images";

export function SubcategoryCards({ landingId }: { landingId: CategoryLandingId }) {
  const subcategories = getLandingSubcategories(landingId);
  const tint = getLandingTint(landingId);
  const landing = getCategoryLanding(landingId);

  return (
    <section className="section-padding !pb-10">
      <div className="mx-auto max-w-7xl">
        <p className="font-body text-[10px] tracking-[0.4em] text-gold uppercase">Shop by style</p>
        <h2 className="mt-2 font-display text-2xl font-light text-[var(--campaign-text)] sm:text-3xl">
          Explore {landing.name} Collections
        </h2>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3">
          {subcategories.map((sub) => {
            const image = getCategoryImage(sub.id);
            return (
              <Link
                key={sub.id}
                href={`/collections/${sub.id}`}
                className="group relative aspect-[3/4] overflow-hidden"
              >
                <Image
                  src={image?.src ?? ""}
                  alt={image?.alt ?? sub.name}
                  fill
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width:768px) 50vw, 33vw"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(to top, ${tint}55 0%, ${tint}18 30%, transparent 65%)`,
                  }}
                />
                <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                  <p className="font-body text-[8px] tracking-[0.32em] text-white/70 uppercase sm:text-[9px]">
                    {sub.subtitle}
                  </p>
                  <h3 className="mt-1 font-display text-lg text-white sm:text-xl">{sub.name}</h3>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

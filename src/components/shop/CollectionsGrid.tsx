"use client";

import Image from "next/image";
import Link from "next/link";
import { COLLECTION_EDITS } from "@/lib/shop";

export function CollectionsGrid() {
  return (
    <section className="section-padding border-t border-[var(--border-subtle)]">
      <div className="mx-auto max-w-7xl">
        <p className="font-body text-[10px] tracking-[0.4em] text-gold uppercase">Collections</p>
        <h2 className="mt-2 font-display text-3xl font-light text-[var(--campaign-text)]">
          Curated Edits
        </h2>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {COLLECTION_EDITS.map((edit) => (
            <Link
              key={edit.id}
              href={edit.href}
              className="group relative aspect-[4/5] overflow-hidden"
            >
              <Image
                src={edit.image}
                alt={edit.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <p className="font-body text-[9px] tracking-[0.35em] text-gold/80 uppercase">
                  {edit.subtitle}
                </p>
                <h3 className="mt-2 font-display text-xl text-white">{edit.title}</h3>
                <span className="mt-4 inline-block font-body text-[10px] tracking-[0.28em] text-white/60 uppercase group-hover:text-gold">
                  Explore →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

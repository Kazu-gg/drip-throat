"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useReducedMotion } from "framer-motion";
import { products, type Product } from "@/lib/products";
import { PLATFORM_FEE_PER_ITEM } from "@/lib/platform-fees";

function FlipProductCard({
  product,
  priority,
}: {
  product: Product;
  priority?: boolean;
}) {
  const [flipped, setFlipped] = useState(false);
  const reduceMotion = useReducedMotion();

  const showBack = reduceMotion ? false : flipped;

  return (
    <article className="w-[min(78vw,300px)] shrink-0 snap-center sm:w-[280px]">
      <div
        className="flip-scene aspect-[3/4] cursor-pointer"
        onMouseEnter={() => !reduceMotion && setFlipped(true)}
        onMouseLeave={() => setFlipped(false)}
        onClick={() => {
          if (!reduceMotion) setFlipped((v) => !v);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            if (!reduceMotion) setFlipped((v) => !v);
          }
        }}
        role="button"
        tabIndex={0}
        aria-label={`${product.name}. ${flipped ? "Showing details" : "Flip for details"}`}
        aria-pressed={flipped}
      >
        <div className={`flip-inner ${showBack ? "is-flipped" : ""}`}>
          {/* Front — editorial image */}
          <div className="flip-face overflow-hidden rounded-2xl ring-1 ring-white/10">
            <Image
              src={product.image.src}
              alt={product.image.alt}
              fill
              className="object-cover"
              sizes="300px"
              priority={priority}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/30" />
            <div className="absolute inset-x-0 bottom-0 p-5">
              <p className="font-body text-[9px] tracking-[0.35em] text-[var(--campaign-accent)] uppercase">
                {product.category}
              </p>
              <p className="mt-2 font-display text-xl font-light leading-snug text-white">
                {product.name}
              </p>
              <p className="mt-2 font-body text-sm text-white/70">
                ₹{PLATFORM_FEE_PER_ITEM} platform fee
              </p>
            </div>
            <div className="pointer-events-none absolute top-4 right-4 rounded-full border border-white/20 bg-black/50 px-3 py-1 font-body text-[8px] tracking-[0.25em] text-white/60 uppercase backdrop-blur-sm">
              Flip
            </div>
          </div>

          {/* Back — details + CTA */}
          <div
            className="flip-face flip-back flex flex-col justify-between overflow-hidden rounded-2xl p-6 ring-1 ring-[var(--campaign-accent)]/50"
            style={{
              background: `linear-gradient(145deg, #0c0c0c 0%, #1a1f10 50%, var(--campaign-bg) 100%)`,
              boxShadow: "0 0 48px color-mix(in srgb, var(--campaign-accent) 18%, transparent)",
            }}
          >
            <div>
              <p className="font-body text-[9px] tracking-[0.4em] text-[var(--campaign-accent)] uppercase">
                {product.category}
              </p>
              <h3 className="mt-3 font-display text-2xl font-light leading-tight text-white">
                {product.name}
              </h3>
              <p className="mt-4 line-clamp-4 font-body text-sm leading-relaxed text-white/45">
                {product.description}
              </p>
            </div>

            <div>
              <p className="font-display text-2xl text-[var(--campaign-accent)]">
                ₹{PLATFORM_FEE_PER_ITEM}
              </p>
              <p className="mt-1 font-body text-[10px] tracking-[0.2em] text-white/40 uppercase">
                Platform fee per item
              </p>
              <Link
                href={`/products/${product.slug}`}
                data-cursor="view"
                onClick={(e) => e.stopPropagation()}
                className="mt-5 block border border-[var(--campaign-accent)] py-3.5 text-center font-body text-[9px] tracking-[0.32em] text-[var(--campaign-accent)] uppercase transition-colors duration-300 hover:bg-[var(--campaign-accent)] hover:text-black"
              >
                View Piece →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {reduceMotion && (
        <div className="mt-4 flex items-start justify-between gap-3 px-1">
          <p className="font-display text-lg font-light text-white">{product.name}</p>
          <p className="font-body text-sm text-[var(--campaign-accent)]">
            ₹{PLATFORM_FEE_PER_ITEM} platform fee
          </p>
        </div>
      )}
    </article>
  );
}

export function LuxuryBestsellers() {
  const items = products.slice(0, 4);

  return (
    <section
      id="bestsellers"
      className="relative z-10 overflow-hidden py-20 sm:py-28"
      aria-labelledby="bestsellers-heading"
    >
      <div className="section-padding mx-auto max-w-7xl">
        <p className="text-center font-body text-xs tracking-[0.35em] text-white/50">
          You are in{" "}
          <span className="border-b border-[var(--campaign-accent)] text-white">
            best sellers
          </span>
        </p>
        <h2 id="bestsellers-heading" className="sr-only">
          Best sellers
        </h2>

        <div className="mt-10 flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:gap-6">
          {items.map((product, index) => (
            <FlipProductCard
              key={product.slug}
              product={product}
              priority={index < 2}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

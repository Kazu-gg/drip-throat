"use client";

import { useEffect, useRef, type ReactNode } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { BuyButton } from "@/components/auth/BuyButton";
import type { Product } from "@/lib/products";

gsap.registerPlugin(ScrollTrigger);

type ProductExhibitProps = {
  product: Product;
  collectionName?: string;
  collectionHref?: string;
  related: ReactNode;
};

export function ProductExhibit({
  product,
  collectionName,
  collectionHref,
  related,
}: ProductExhibitProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    const image = imageRef.current;
    if (!hero || !image) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      gsap.to(image, {
        scale: 1.08,
        ease: "none",
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
      });
    }, hero);

    return () => ctx.revert();
  }, []);

  return (
    <article>
      <div
        ref={heroRef}
        className="relative flex min-h-screen flex-col justify-end overflow-hidden"
      >
        <div ref={imageRef} className="absolute inset-0 will-change-transform">
          <Image
            src={product.image.src}
            alt={product.image.alt}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/60" />
        </div>

        <div className="relative z-10 section-padding pb-16 pt-32">
          <p className="font-body text-[10px] tracking-[0.45em] text-gold/70 uppercase">
            Exhibit — {product.category}
          </p>
          <h1 className="mt-4 max-w-4xl font-display text-[clamp(2.5rem,8vw,5.5rem)] font-light leading-[1.05] tracking-wide text-white">
            {product.name}
          </h1>
          <p className="mt-6 font-body text-xl text-gold">{product.priceDisplay}</p>
        </div>
      </div>

      <div className="section-padding border-t border-white/5">
        <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="font-body text-[10px] tracking-[0.4em] text-gold/60 uppercase">
              The Narrative
            </p>
            <h2 className="mt-4 font-display text-3xl font-light text-white sm:text-4xl">
              Craftsmanship & Story
            </h2>
          </div>
          <div className="lg:col-span-7">
            <p className="font-body text-lg leading-[1.9] text-white/55">
              {product.description}
            </p>
            <p className="mt-8 font-body text-base leading-[1.9] text-white/35 italic">
              Each Chevellè piece is selected with the eye of an editor — not
              merchandised like inventory. This is fashion as cultural artifact.
            </p>
            <div className="mt-12 flex flex-col gap-4 sm:flex-row">
              <BuyButton productSlug={product.slug} />
              {collectionHref && collectionName && (
                <MagneticButton
                  href={collectionHref}
                  data-cursor="explore"
                  className="border border-white/15 px-10 py-4 font-body text-xs tracking-[0.2em] text-white/60 uppercase transition-colors hover:border-gold/40 hover:text-gold"
                >
                  Explore {collectionName}
                </MagneticButton>
              )}
            </div>
          </div>
        </div>
      </div>

      {related}
    </article>
  );
}

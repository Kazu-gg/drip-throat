"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { products } from "@/lib/products";
import { PLATFORM_FEE_PER_ITEM } from "@/lib/platform-fees";

export function InteractiveShowroom() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20 });
  const rotateX = useTransform(springY, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-10, 10]);

  const showroomProducts = products.slice(0, 6);

  return (
    <section
      id="showroom"
      className="relative z-10 min-h-screen overflow-hidden py-24 sm:py-32"
      aria-labelledby="showroom-heading"
    >
      <div className="section-padding mx-auto max-w-7xl">
        <p className="font-body text-xs tracking-[0.45em] text-[var(--campaign-accent)] uppercase">
          Interactive Showroom
        </p>
        <h2
          id="showroom-heading"
          className="mt-4 font-display text-[clamp(2.5rem,6vw,4.5rem)] font-light text-[var(--campaign-text)]"
        >
          Pieces That Float
          <br />
          In Space
        </h2>

        <div
          ref={containerRef}
          className="relative mt-16 min-h-[70vh]"
          style={{ perspective: 1200 }}
          onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
            mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
          }}
          onMouseLeave={() => {
            mouseX.set(0);
            mouseY.set(0);
          }}
        >
          <motion.div
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
          >
            {showroomProducts.map((product, i) => (
              <motion.div
                key={product.slug}
                initial={{ opacity: 0, z: -80 }}
                whileInView={{ opacity: 1, z: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.9 }}
                style={{
                  transform: `translateZ(${40 + i * 20}px)`,
                  transformStyle: "preserve-3d",
                }}
                className="group"
              >
                <Link href={`/products/${product.slug}`} data-cursor="view">
                  <div className="relative aspect-[3/4] overflow-hidden border border-white/10 bg-black/40 shadow-[0_30px_80px_rgba(0,0,0,0.55)] backdrop-blur-sm transition-transform duration-700 group-hover:scale-[1.03]">
                    <div
                      className="pointer-events-none absolute -inset-8 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                      style={{
                        background: `radial-gradient(circle at 50% 30%, var(--campaign-glow), transparent 65%)`,
                      }}
                    />
                    <Image
                      src={product.image.src}
                      alt={product.image.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black p-5">
                      <p className="font-display text-xl text-white">{product.name}</p>
                      <p className="text-sm text-[var(--campaign-accent)]">
                        ₹{PLATFORM_FEE_PER_ITEM} platform fee
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

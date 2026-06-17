"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { curatedEdits } from "@/lib/data";
import { EditIcon } from "@/components/icons/EditIcons";
import { ArrowRightIcon } from "@/components/icons/ArrowRightIcon";
import { GrabScroll } from "@/components/ui/GrabScroll";
import { SectionHeading, fadeUp } from "@/components/ui/SectionHeading";

export function CuratedEdits() {
  return (
    <section
      id="edits"
      className="section-padding relative border-t border-white/5"
      aria-labelledby="edits-heading"
    >
      <SectionHeading
        label="Curated For You"
        title="Shop The Edit"
        subtitle="Premium luxury fashion, curated for weddings, festivals, and everyday elegance."
      />

      <GrabScroll className="gap-3 px-5 sm:gap-4 sm:px-8 md:px-12 lg:px-16 xl:px-24">
        {curatedEdits.map((edit, index) => (
          <motion.div
            key={edit.id}
            initial={false}
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={fadeUp}
            custom={index * 0.05}
            className="w-[200px] flex-shrink-0 sm:w-[240px]"
            style={{ scrollSnapAlign: "start" }}
          >
            <Link
              href={edit.href}
              draggable={false}
              className="gold-border-glow group relative flex aspect-[4/5] flex-col justify-between overflow-hidden border border-gold/20 bg-black-charcoal p-5 transition-all duration-500 hover:border-gold/50 hover:bg-gold-muted sm:p-6"
            >
              <div className="flex flex-1 items-start justify-center pt-2 text-gold/50 transition-colors duration-500 group-hover:text-gold">
                <EditIcon id={edit.icon} className="h-12 w-12 sm:h-14 sm:w-14" />
              </div>
              <div>
                <p className="font-body text-[10px] tracking-[0.25em] text-gold/60 uppercase">
                  {edit.subtitle}
                </p>
                <h3 className="mt-2 font-display text-lg font-light tracking-wide text-white transition-colors group-hover:text-gold sm:text-xl">
                  {edit.name}
                </h3>
                <span className="mt-4 inline-flex items-center gap-2 font-body text-[10px] tracking-[0.2em] text-white/30 uppercase transition-colors group-hover:text-gold/80">
                  Explore
                  <ArrowRightIcon className="transition-transform group-hover:translate-x-0.5" />
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </GrabScroll>
    </section>
  );
}

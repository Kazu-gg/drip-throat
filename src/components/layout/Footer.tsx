"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { collections } from "@/lib/data";
import { SOCIAL } from "@/lib/seo";

const footerLinks = {
  company: [
    { label: "About Us", href: "#why" },
    { label: "All Collections", href: "/collections" },
    { label: "Shop Products", href: "/products" },
    { label: "Fashion Blog", href: "/blog" },
    { label: "FAQ", href: "#faq" },
    { label: "Contact", href: "mailto:hello@chevelle.fashion" },
  ],
  legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Exchange Policy", href: "#" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-black">
      <div className="section-padding !pb-10 !pt-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-5">
            <div className="lg:col-span-1">
              <Link href="/">
                <span className="font-accent text-2xl tracking-[0.25em] text-white">
                  CHEVELLÈ
                </span>
              </Link>
              <p className="mt-2 font-body text-xs tracking-[0.3em] text-gold/60 uppercase">
                Curated Elegance
              </p>
              <p className="mt-6 max-w-xs font-body text-sm leading-relaxed text-white/35">
                Premium fashion for the modern generation. Timeless style,
                delivered with uncompromising quality.
              </p>
            </div>

            <div>
              <h4 className="mb-6 font-body text-xs tracking-[0.25em] text-white/50 uppercase">
                Company
              </h4>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="font-body text-sm text-white/35 transition-colors duration-300 hover:text-gold"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="mb-6 font-body text-xs tracking-[0.25em] text-white/50 uppercase">
                Shop Fashion
              </h4>
              <ul className="space-y-3">
                {collections.map((collection) => (
                  <li key={collection.id}>
                    <Link
                      href={`/collections/${collection.id}`}
                      className="font-body text-sm text-white/35 transition-colors duration-300 hover:text-gold"
                    >
                      {collection.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="mb-6 font-body text-xs tracking-[0.25em] text-white/50 uppercase">
                Legal
              </h4>
              <ul className="space-y-3">
                {footerLinks.legal.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="font-body text-sm text-white/35 transition-colors duration-300 hover:text-gold"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="mb-6 font-body text-xs tracking-[0.25em] text-white/50 uppercase">
                Connect
              </h4>
              <div className="flex gap-4">
                <a
                  href={SOCIAL.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center border border-white/10 text-white/40 transition-all duration-300 hover:border-gold/40 hover:text-gold"
                  aria-label="Follow Chevellè on Instagram"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.226-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                </a>
              </div>
              <div className="mt-8">
                <p className="mb-3 font-body text-xs tracking-[0.2em] text-white/40 uppercase">
                  Download App
                </p>
                <button className="w-full border border-white/10 px-4 py-3 font-body text-xs tracking-[0.15em] text-white/50 uppercase transition-all duration-300 hover:border-gold/30 hover:text-gold">
                  Get on Android
                </button>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-16 h-px origin-left bg-gradient-to-r from-gold/20 via-white/5 to-transparent"
          />

          <div className="mt-8 flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="font-body text-xs text-white/25">
              &copy; {new Date().getFullYear()} Chevellè. All rights reserved.
            </p>
            <p className="font-body text-xs tracking-[0.15em] text-white/20 uppercase">
              Crafted with elegance
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

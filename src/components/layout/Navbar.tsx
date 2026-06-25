"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useScrollY } from "@/hooks/useMousePosition";
import { useState, type ReactNode } from "react";
import Link from "next/link";

const navLinks = [
  { label: "Collections", href: "/collections" },
  { label: "Women", href: "/collections?category=women" },
  { label: "Men", href: "/collections?category=men" },
  { label: "Unisex", href: "/collections?category=accessories" },
  { label: "Our World", href: "#explore" },
  { label: "About Us", href: "#values" },
];

function NavIcon({
  children,
  label,
  href,
  badge,
}: {
  children: ReactNode;
  label: string;
  href?: string;
  badge?: number;
}) {
  const className =
    "relative flex h-9 w-9 items-center justify-center text-white/55 transition-colors hover:text-gold";
  const inner = (
    <>
      {children}
      {badge != null && badge > 0 && (
        <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-gold font-body text-[8px] font-medium text-black">
          {badge}
        </span>
      )}
    </>
  );
  if (href) {
    return (
      <Link href={href} className={className} aria-label={label}>
        {inner}
      </Link>
    );
  }
  return (
    <button type="button" className={className} aria-label={label}>
      {inner}
    </button>
  );
}

export function Navbar() {
  const scrollY = useScrollY();
  const [menuOpen, setMenuOpen] = useState(false);
  const isScrolled = scrollY > 50;

  return (
    <>
      <motion.header
        initial={false}
        className={`fixed top-0 right-0 left-0 z-50 transition-all duration-700 ${
          isScrolled
            ? "border-b border-white/5 bg-black/85 backdrop-blur-xl"
            : "bg-transparent"
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8 lg:px-12">
          <Link href="/" className="group relative z-50 shrink-0">
            <span className="block font-accent text-lg tracking-[0.22em] text-gold sm:text-xl">
              CHEVELLÈ
            </span>
          </Link>

          <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-5 xl:gap-7 lg:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="font-body text-[10px] tracking-[0.22em] text-white/55 uppercase transition-colors hover:text-gold"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="relative z-50 flex items-center gap-1 sm:gap-2">
            <NavIcon label="Search">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="11" cy="11" r="7" />
                <path d="M20 20l-3-3" />
              </svg>
            </NavIcon>
            <NavIcon label="Shopping bag" href="/checkout" badge={1}>
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M6 7h15l-1.5 9h-12L6 7z" />
                <path d="M9 7V5a3 3 0 016 0v2" />
              </svg>
            </NavIcon>

            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              className="ml-2 flex items-center gap-2 font-body text-[9px] tracking-[0.28em] text-white/55 uppercase transition-colors hover:text-gold lg:ml-3"
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              <span className="hidden sm:inline">Menu</span>
              <span className="flex h-10 w-10 flex-col items-center justify-center gap-1.5">
                <motion.span
                  animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                  className="block h-px w-5 bg-current"
                />
                <motion.span
                  animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
                  className="block h-px w-5 bg-current"
                />
                <motion.span
                  animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                  className="block h-px w-5 bg-current"
                />
              </span>
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-black/95 backdrop-blur-2xl"
          >
            <nav className="flex max-h-[80vh] flex-col items-center gap-6 overflow-y-auto px-6">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="font-display text-2xl font-light tracking-wide text-white/80 hover:text-gold"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useScrollY } from "@/hooks/useMousePosition";
import { useState, type ReactNode } from "react";
import Link from "next/link";
import { useCart } from "@/contexts/CartContext";
import { AUTH_ROUTES } from "@/lib/routes";

const navLinks = [
  { label: "New In", href: "/products" },
  { label: "Women", href: "/collections/women" },
  { label: "Men", href: "/collections/men" },
  { label: "Unisex", href: "/collections/unisex" },
  { label: "Collections", href: "/collections" },
  { label: "Our World", href: "/#explore" },
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
    "relative flex h-9 w-9 items-center justify-center text-[var(--campaign-text)]/55 transition-colors hover:text-gold";
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
  const { count } = useCart();
  const isScrolled = scrollY > 50;

  return (
    <>
      <motion.header
        initial={false}
        className={`fixed top-0 right-0 left-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "border-b border-[var(--border-subtle)] bg-[var(--campaign-bg)]/92 backdrop-blur-xl"
            : "bg-[var(--campaign-bg)]/40 backdrop-blur-sm"
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8 lg:px-10">
          <Link href="/" className="relative z-50 shrink-0">
            <span className="font-accent text-lg tracking-[0.22em] text-gold sm:text-xl">
              CHEVELLÈ
            </span>
          </Link>

          <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-4 xl:gap-6 lg:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="font-body text-[10px] tracking-[0.2em] text-[var(--campaign-text)]/55 uppercase transition-colors hover:text-gold"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="relative z-50 flex items-center gap-0.5 sm:gap-1">
            <NavIcon label="Search" href="/products">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="11" cy="11" r="7" />
                <path d="M20 20l-3-3" />
              </svg>
            </NavIcon>

            <NavIcon label="Account" href="/account">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="8" r="4" />
                <path d="M5 20c0-4 3-6 7-6s7 2 7 6" />
              </svg>
            </NavIcon>

            <NavIcon label="Wishlist" href="/account?tab=wishlist">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 21s-7-4.5-9.5-9C1 9 2.5 5 6 5c2 0 3.5 1.5 4 2.5C10.5 6.5 12 5 14 5c3.5 0 5 4 3.5 7C19 16.5 12 21 12 21z" />
              </svg>
            </NavIcon>

            <NavIcon label="Shopping bag" href="/cart" badge={count}>
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M6 7h15l-1.5 9h-12L6 7z" />
                <path d="M9 7V5a3 3 0 016 0v2" />
              </svg>
            </NavIcon>

            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              className="ml-1 flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
              aria-label="Menu"
              aria-expanded={menuOpen}
            >
              <span className="block h-px w-5 bg-gold" />
              <span className="block h-px w-5 bg-gold" />
              <span className="block h-px w-5 bg-gold" />
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
            className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-[var(--campaign-bg)]/98 backdrop-blur-xl lg:hidden"
          >
            <nav className="flex flex-col items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="font-display text-2xl font-light text-[var(--campaign-text)]/80 hover:text-gold"
                >
                  {link.label}
                </Link>
              ))}
              <Link href="/account" onClick={() => setMenuOpen(false)} className="text-gold">
                Account
              </Link>
              <Link href={AUTH_ROUTES.login} onClick={() => setMenuOpen(false)} className="text-sm tracking-widest uppercase">
                Sign In
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

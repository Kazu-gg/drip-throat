"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useScrollY } from "@/hooks/useMousePosition";
import { useState } from "react";
import Link from "next/link";
import { AuthNav } from "@/components/auth/AuthNav";
import { isAuthEnabled } from "@/lib/auth";
import { APP_DOWNLOAD_PATH, AUTH_ROUTES } from "@/lib/routes";

const navLinks = [
  { label: "Collections", href: "/collections" },
  { label: "Products", href: "/products" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "#why" },
];

export function Navbar() {
  const scrollY = useScrollY();
  const [menuOpen, setMenuOpen] = useState(false);
  const isScrolled = scrollY > 50;

  return (
    <>
      <motion.header
        initial={false}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        className={`fixed top-0 right-0 left-0 z-50 transition-all duration-700 ${
          isScrolled
            ? "border-b border-white/5 bg-black/80 backdrop-blur-xl"
            : "bg-transparent"
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8 md:px-12 lg:px-16">
          <Link href="/" className="group relative z-50">
            <span className="font-accent text-xl tracking-[0.25em] text-white transition-colors duration-500 group-hover:text-gold sm:text-2xl">
              CHEVELLÈ
            </span>
            <span className="absolute -bottom-1 left-0 h-px w-0 bg-gold transition-all duration-500 group-hover:w-full" />
          </Link>

          <ul className="hidden items-center gap-10 md:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="group relative font-body text-xs tracking-[0.2em] text-white/60 uppercase transition-colors duration-300 hover:text-gold"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-1/2 h-px w-0 -translate-x-1/2 bg-gold transition-all duration-300 group-hover:w-full" />
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-4 md:flex">
            <AuthNav />
            <Link
              href={APP_DOWNLOAD_PATH}
              className="border border-gold/30 px-6 py-2.5 font-body text-xs tracking-[0.15em] text-gold uppercase transition-all duration-500 hover:border-gold hover:bg-gold/10"
            >
              Download the App
            </Link>
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
            aria-label="Toggle menu"
          >
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              className="block h-px w-6 bg-gold"
            />
            <motion.span
              animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
              className="block h-px w-6 bg-gold"
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              className="block h-px w-6 bg-gold"
            />
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-black/95 backdrop-blur-2xl md:hidden"
          >
            <nav className="flex flex-col items-center gap-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="font-display text-3xl font-light tracking-wider text-white/80 transition-colors hover:text-gold"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-4 flex flex-col items-center gap-4"
              >
                {isAuthEnabled() && (
                  <>
                    <Link
                      href={AUTH_ROUTES.login}
                      onClick={() => setMenuOpen(false)}
                      className="font-body text-sm tracking-[0.15em] text-white/50 uppercase hover:text-gold"
                    >
                      Sign In
                    </Link>
                    <Link
                      href={AUTH_ROUTES.signup}
                      onClick={() => setMenuOpen(false)}
                      className="border border-white/15 px-8 py-3 font-body text-xs tracking-[0.2em] text-white/60 uppercase"
                    >
                      Sign Up
                    </Link>
                  </>
                )}
                <Link
                  href={APP_DOWNLOAD_PATH}
                  onClick={() => setMenuOpen(false)}
                  className="inline-block border border-gold px-8 py-3 font-body text-xs tracking-[0.2em] text-gold uppercase"
                >
                  Download the App
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

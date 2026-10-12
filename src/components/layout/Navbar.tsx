"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useScrollY } from "@/hooks/useMousePosition";
import { useState, type ReactNode } from "react";
import Link from "next/link";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { AuthNav } from "@/components/auth/AuthNav";
import {
  NavIconBag,
  NavIconHeart,
  NavIconSearch,
  NavIconUser,
} from "@/components/ui/NavIcons";
import { AUTH_ROUTES } from "@/lib/routes";
import { DripthroatLogo } from "@/components/brand/DripthroatLogo";

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
  onClick,
}: {
  children: ReactNode;
  label: string;
  href?: string;
  badge?: number;
  onClick?: () => void;
}) {
  const className =
    "relative flex h-10 w-10 items-center justify-center text-[var(--campaign-text)]/70 transition-colors duration-300 hover:text-[var(--campaign-text)]";
  const inner = (
    <>
      {children}
      {badge != null && badge > 0 && (
        <span className="absolute -top-0.5 -right-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-gold px-1 font-body text-[9px] font-medium leading-none text-black">
          {badge}
        </span>
      )}
    </>
  );
  if (onClick) {
    return (
      <button type="button" className={className} aria-label={label} onClick={onClick} data-testid="navbar_cart_button">
        {inner}
      </button>
    );
  }
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
  const { count, openDrawer } = useCart();
  const { user, signOut } = useAuth();
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
          <Link
            href="/"
            className="group relative z-50 flex shrink-0 items-center transition-opacity hover:opacity-90"
            aria-label="DRIPTHROAT Home"
          >
            <DripthroatLogo
              className="h-6 sm:h-7 lg:h-8 w-auto text-[var(--campaign-text)] transition-colors duration-300 group-hover:text-gold"
              data-testid="navbar_brand_logo"
            />
          </Link>

          <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-4 xl:gap-6 lg:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="font-body text-[10px] tracking-[0.2em] text-[var(--campaign-text)]/70 uppercase transition-colors hover:text-[var(--campaign-text)]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="relative z-50 flex items-center gap-0 sm:gap-0.5">
            <AuthNav />

            <NavIcon label="Search" href="/products">
              <NavIconSearch />
            </NavIcon>

            <NavIcon label="Account" href="/account">
              <NavIconUser />
            </NavIcon>

            <NavIcon label="Wishlist" href="/account?tab=wishlist">
              <NavIconHeart />
            </NavIcon>

            <NavIcon label="Shopping bag" badge={count} onClick={openDrawer}>
              <NavIconBag />
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
              {user ? (
                <>
                  <p className="text-sm text-white/50">{user.email}</p>
                  <button
                    type="button"
                    onClick={() => {
                      void signOut();
                      setMenuOpen(false);
                    }}
                    className="text-sm tracking-widest uppercase text-white/70"
                  >
                    Sign out
                  </button>
                </>
              ) : (
                <Link href={AUTH_ROUTES.login} onClick={() => setMenuOpen(false)} className="text-sm tracking-widest uppercase">
                  Sign In
                </Link>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

"use client";

import Link from "next/link";
import { isAuthEnabled } from "@/lib/auth";
import { useAuth } from "@/contexts/AuthContext";
import { AUTH_ROUTES } from "@/lib/routes";

export function AuthNav() {
  const { user, ready, signOut } = useAuth();

  if (!isAuthEnabled()) return null;

  if (user) {
    return (
      <div className="hidden items-center gap-3 md:flex">
        <span className="max-w-[140px] truncate font-body text-[10px] tracking-[0.1em] text-white/40">
          {user.email}
        </span>
        <button
          type="button"
          onClick={() => void signOut()}
          className="font-body text-[10px] tracking-[0.15em] text-white/50 uppercase transition-colors hover:text-gold"
        >
          Sign out
        </button>
      </div>
    );
  }

  return (
    <div className="hidden items-center gap-3 md:flex">
      <Link
        href={AUTH_ROUTES.login}
        className={`font-body text-xs tracking-[0.15em] uppercase transition-colors hover:text-gold ${
          ready ? "text-white/50" : "pointer-events-none text-white/25"
        }`}
      >
        Sign In
      </Link>
      <Link
        href={AUTH_ROUTES.signup}
        className={`border px-5 py-2.5 font-body text-xs tracking-[0.15em] uppercase transition-colors hover:border-gold/40 hover:text-gold ${
          ready
            ? "border-white/15 text-white/60"
            : "pointer-events-none border-white/10 text-white/30"
        }`}
      >
        Sign Up
      </Link>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { AuthChangeEvent, Session } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";
import { isAuthEnabled, isEmailVerified, isSupabaseConfigured } from "@/lib/auth";
import { AUTH_ROUTES } from "@/lib/routes";

export function AuthNav() {
  const router = useRouter();
  const [email, setEmail] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!isAuthEnabled() || !isSupabaseConfigured()) {
      setReady(true);
      return;
    }

    const supabase = createClient();
    if (!supabase) {
      setReady(true);
      return;
    }

    let cancelled = false;

    void (async () => {
      const { data } = await supabase.auth.getUser();
      if (cancelled) return;
      const user = data.user;
      if (user?.email && isEmailVerified(user)) {
        setEmail(user.email);
      }
      setReady(true);
    })();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (_event: AuthChangeEvent, session: Session | null) => {
        const user = session?.user ?? null;
        setEmail(user?.email && isEmailVerified(user) ? user.email : null);
        setReady(true);
      }
    );

    return () => {
      cancelled = true;
      subscription.unsubscribe();
    };
  }, []);

  async function signOut() {
    const supabase = createClient();
    if (supabase) {
      await supabase.auth.signOut();
    }
    setEmail(null);
    router.push("/");
    router.refresh();
  }

  if (!isAuthEnabled()) return null;

  if (email) {
    return (
      <div className="hidden items-center gap-3 md:flex">
        <span className="max-w-[140px] truncate font-body text-[10px] tracking-[0.1em] text-white/40">
          {email}
        </span>
        <button
          type="button"
          onClick={signOut}
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

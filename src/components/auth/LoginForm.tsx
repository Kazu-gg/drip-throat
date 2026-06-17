"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { sanitizeNextPath } from "@/lib/auth";
import { AUTH_ROUTES } from "@/lib/routes";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = sanitizeNextPath(searchParams.get("next"));

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const supabase = createClient();
    if (!supabase) {
      setError("Auth is not configured. Add Supabase keys to .env.local.");
      setLoading(false);
      return;
    }

    const { data, error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (signInError) {
      setError(signInError.message);
      return;
    }

    if (data.user && !data.user.email_confirmed_at) {
      router.push(`${AUTH_ROUTES.verifyEmail}?next=${encodeURIComponent(next)}`);
      router.refresh();
      return;
    }

    router.push(next);
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {searchParams.get("verified") === "1" && (
        <p className="border border-gold/30 bg-gold/10 px-4 py-3 font-body text-sm text-gold">
          Email verified. You can sign in now.
        </p>
      )}
      {searchParams.get("error") === "auth" && (
        <p className="border border-red-500/30 bg-red-500/10 px-4 py-3 font-body text-sm text-red-300">
          Sign-in link expired or invalid. Please try again.
        </p>
      )}
      {error && (
        <p className="border border-red-500/30 bg-red-500/10 px-4 py-3 font-body text-sm text-red-300">
          {error}
        </p>
      )}

      <div>
        <label
          htmlFor="login-email"
          className="mb-2 block font-body text-[10px] tracking-[0.25em] text-white/50 uppercase"
        >
          Email
        </label>
        <input
          id="login-email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-white/10 bg-black px-4 py-3 font-body text-sm text-white outline-none transition-colors focus:border-gold/50"
          placeholder="you@example.com"
        />
      </div>

      <div>
        <label
          htmlFor="login-password"
          className="mb-2 block font-body text-[10px] tracking-[0.25em] text-white/50 uppercase"
        >
          Password
        </label>
        <input
          id="login-password"
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-white/10 bg-black px-4 py-3 font-body text-sm text-white outline-none transition-colors focus:border-gold/50"
          placeholder="••••••••"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full border border-gold bg-gold/10 py-4 font-body text-xs tracking-[0.2em] text-gold uppercase transition-colors hover:bg-gold hover:text-black disabled:opacity-50"
      >
        {loading ? "Signing in…" : "Sign In"}
      </button>
    </form>
  );
}

export function LoginFooter() {
  const searchParams = useSearchParams();
  const next = encodeURIComponent(sanitizeNextPath(searchParams.get("next")));

  return (
    <>
      New to Chevellè?{" "}
      <Link
        href={`${AUTH_ROUTES.signup}?next=${next}`}
        className="text-gold transition-colors hover:text-gold-light"
      >
        Create an account
      </Link>
    </>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { getSiteOrigin, sanitizeNextPath } from "@/lib/auth";
import { AUTH_ROUTES } from "@/lib/routes";

export function SignupForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = sanitizeNextPath(searchParams.get("next"));

  const [name, setName] = useState("");
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

    const origin = getSiteOrigin();
    const redirectTo = `${origin}${AUTH_ROUTES.callback}?next=${encodeURIComponent(next)}`;

    const { error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: name },
        emailRedirectTo: redirectTo,
      },
    });

    setLoading(false);

    if (signUpError) {
      setError(signUpError.message);
      return;
    }

    router.push(
      `${AUTH_ROUTES.verifyEmail}?next=${encodeURIComponent(next)}&email=${encodeURIComponent(email)}`
    );
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <p className="border border-red-500/30 bg-red-500/10 px-4 py-3 font-body text-sm text-red-300">
          {error}
        </p>
      )}

      <div>
        <label
          htmlFor="signup-name"
          className="mb-2 block font-body text-[10px] tracking-[0.25em] text-white/50 uppercase"
        >
          Full name
        </label>
        <input
          id="signup-name"
          type="text"
          autoComplete="name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-white/10 bg-black px-4 py-3 font-body text-sm text-white outline-none transition-colors focus:border-gold/50"
          placeholder="Your name"
        />
      </div>

      <div>
        <label
          htmlFor="signup-email"
          className="mb-2 block font-body text-[10px] tracking-[0.25em] text-white/50 uppercase"
        >
          Email
        </label>
        <input
          id="signup-email"
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
          htmlFor="signup-password"
          className="mb-2 block font-body text-[10px] tracking-[0.25em] text-white/50 uppercase"
        >
          Password
        </label>
        <input
          id="signup-password"
          type="password"
          autoComplete="new-password"
          required
          minLength={8}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-white/10 bg-black px-4 py-3 font-body text-sm text-white outline-none transition-colors focus:border-gold/50"
          placeholder="At least 8 characters"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full border border-gold bg-gold/10 py-4 font-body text-xs tracking-[0.2em] text-gold uppercase transition-colors hover:bg-gold hover:text-black disabled:opacity-50"
      >
        {loading ? "Creating account…" : "Create Account"}
      </button>

      <p className="font-body text-xs leading-relaxed text-white/35">
        By signing up, you agree to verify your email before purchasing. We&apos;ll
        send a confirmation link to your inbox.
      </p>
    </form>
  );
}

export function SignupFooter() {
  const searchParams = useSearchParams();
  const next = encodeURIComponent(sanitizeNextPath(searchParams.get("next")));

  return (
    <>
      Already have an account?{" "}
      <Link
        href={`${AUTH_ROUTES.login}?next=${next}`}
        className="text-gold transition-colors hover:text-gold-light"
      >
        Sign in
      </Link>
    </>
  );
}

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { getSiteOrigin, isEmailVerified, isSupabaseConfigured, sanitizeNextPath } from "@/lib/auth";
import { AUTH_ROUTES } from "@/lib/routes";

export function VerifyEmailPanel() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = sanitizeNextPath(searchParams.get("next"));
  const emailHint = searchParams.get("email");

  const [email, setEmail] = useState(emailHint ?? "");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (!isSupabaseConfigured()) {
      setChecking(false);
      return;
    }

    async function checkSession() {
      const supabase = createClient();
      if (!supabase) {
        setChecking(false);
        return;
      }

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user?.email) setEmail(user.email);

      if (user && isEmailVerified(user)) {
        router.replace(next);
        return;
      }

      setChecking(false);
    }

    checkSession();
  }, [next, router]);

  async function resendEmail() {
    if (!email) {
      setError("Enter the email you signed up with.");
      return;
    }

    setError(null);
    setMessage(null);
    setLoading(true);

    const supabase = createClient();
    if (!supabase) {
      setError("Auth is not configured. Add Supabase keys to .env.local.");
      setLoading(false);
      return;
    }

    const origin = getSiteOrigin();
    const redirectTo = `${origin}${AUTH_ROUTES.callback}?next=${encodeURIComponent(next)}`;

    const { error: resendError } = await supabase.auth.resend({
      type: "signup",
      email,
      options: { emailRedirectTo: redirectTo },
    });

    setLoading(false);

    if (resendError) {
      setError(resendError.message);
      return;
    }

    setMessage("Verification email sent. Check your inbox and spam folder.");
  }

  async function refreshStatus() {
    setLoading(true);
    const supabase = createClient();
    if (!supabase) {
      setError("Auth is not configured. Add Supabase keys to .env.local.");
      setLoading(false);
      return;
    }

    await supabase.auth.refreshSession();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    setLoading(false);

    if (user && isEmailVerified(user)) {
      router.push(next);
      router.refresh();
      return;
    }

    setMessage("Not verified yet. Click the link in your email, then try again.");
  }

  if (checking) {
    return (
      <p className="text-center font-body text-sm text-white/50">
        Checking verification status…
      </p>
    );
  }

  if (!isSupabaseConfigured()) {
    return (
      <p className="border border-amber-500/30 bg-amber-500/10 px-4 py-3 font-body text-sm text-amber-200">
        Auth is not configured yet. Add{" "}
        <code className="text-gold">NEXT_PUBLIC_SUPABASE_URL</code> and{" "}
        <code className="text-gold">NEXT_PUBLIC_SUPABASE_ANON_KEY</code> to{" "}
        <code className="text-gold">.env.local</code>.
      </p>
    );
  }

  return (
    <div className="space-y-6">
      <div className="border border-gold/20 bg-gold/5 px-4 py-4 text-center">
        <p className="font-display text-lg text-gold">Hang tight</p>
        <p className="mt-2 font-body text-sm leading-relaxed text-white/55">
          We sent a verification link to your email. You must verify before
          checkout.
        </p>
      </div>

      {message && (
        <p className="border border-gold/30 bg-gold/10 px-4 py-3 font-body text-sm text-gold">
          {message}
        </p>
      )}
      {error && (
        <p className="border border-red-500/30 bg-red-500/10 px-4 py-3 font-body text-sm text-red-300">
          {error}
        </p>
      )}

      {!emailHint && (
        <div>
          <label
            htmlFor="verify-email"
            className="mb-2 block font-body text-[10px] tracking-[0.25em] text-white/50 uppercase"
          >
            Email
          </label>
          <input
            id="verify-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-white/10 bg-black px-4 py-3 font-body text-sm text-white outline-none transition-colors focus:border-gold/50"
            placeholder="you@example.com"
          />
        </div>
      )}

      {emailHint && (
        <p className="text-center font-body text-sm text-white/50">
          Sent to{" "}
          <span className="text-gold">{emailHint}</span>
        </p>
      )}

      <button
        type="button"
        onClick={resendEmail}
        disabled={loading}
        className="w-full border border-white/15 py-4 font-body text-xs tracking-[0.2em] text-white/70 uppercase transition-colors hover:border-gold/40 hover:text-gold disabled:opacity-50"
      >
        {loading ? "Sending…" : "Resend verification email"}
      </button>

      <button
        type="button"
        onClick={refreshStatus}
        disabled={loading}
        className="w-full border border-gold bg-gold/10 py-4 font-body text-xs tracking-[0.2em] text-gold uppercase transition-colors hover:bg-gold hover:text-black disabled:opacity-50"
      >
        I&apos;ve verified — continue
      </button>

      <p className="text-center font-body text-xs text-white/35">
        Wrong account?{" "}
        <Link href={AUTH_ROUTES.login} className="text-gold hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}

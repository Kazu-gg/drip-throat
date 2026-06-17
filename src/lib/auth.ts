export function isSupabaseConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}

/** Auth UI + checkout gating — set NEXT_PUBLIC_AUTH_ENABLED=true when ready */
export function isAuthEnabled(): boolean {
  return (
    process.env.NEXT_PUBLIC_AUTH_ENABLED === "true" && isSupabaseConfigured()
  );
}

export function getSiteOrigin(): string {
  if (typeof window !== "undefined") {
    return window.location.origin;
  }
  return process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
}

/** Supabase sets email_confirmed_at when the user verifies their inbox */
export function isEmailVerified(user: {
  email_confirmed_at?: string | null;
} | null): boolean {
  return Boolean(user?.email_confirmed_at);
}

export function sanitizeNextPath(next: string | null | undefined): string {
  if (!next || !next.startsWith("/") || next.startsWith("//")) {
    return "/";
  }
  return next;
}

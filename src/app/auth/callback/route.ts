import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { sanitizeNextPath } from "@/lib/auth";
import { AUTH_ROUTES } from "@/lib/routes";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = sanitizeNextPath(searchParams.get("next"));

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      const dest =
        next.startsWith(AUTH_ROUTES.checkout) || next === "/"
          ? next
          : `${AUTH_ROUTES.login}?verified=1&next=${encodeURIComponent(next)}`;
      return NextResponse.redirect(`${origin}${dest}`);
    }
  }

  return NextResponse.redirect(
    `${origin}${AUTH_ROUTES.login}?error=auth&next=${encodeURIComponent(next)}`
  );
}

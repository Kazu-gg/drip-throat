import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { AUTH_ROUTES } from "@/lib/routes";
import {
  isAuthEnabled,
  isEmailVerified,
  isSupabaseConfigured,
  sanitizeNextPath,
} from "@/lib/auth";

export async function updateSession(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!isAuthEnabled()) {
    if (
      pathname === AUTH_ROUTES.login ||
      pathname === AUTH_ROUTES.signup ||
      pathname === AUTH_ROUTES.verifyEmail ||
      pathname.startsWith(AUTH_ROUTES.callback)
    ) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }

  if (!isSupabaseConfigured()) {
    return NextResponse.next();
  }

  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { search } = request.nextUrl;
  const next = sanitizeNextPath(pathname + search);

  if (pathname.startsWith(AUTH_ROUTES.checkout)) {
    if (!user) {
      const url = request.nextUrl.clone();
      url.pathname = AUTH_ROUTES.login;
      url.searchParams.set("next", next);
      return NextResponse.redirect(url);
    }
    if (!isEmailVerified(user)) {
      const url = request.nextUrl.clone();
      url.pathname = AUTH_ROUTES.verifyEmail;
      url.searchParams.set("next", next);
      return NextResponse.redirect(url);
    }
  }

  if (
    user &&
    isEmailVerified(user) &&
    (pathname === AUTH_ROUTES.login || pathname === AUTH_ROUTES.signup)
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return supabaseResponse;
}

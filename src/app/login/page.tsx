import { Suspense } from "react";
import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { LoginForm, LoginFooter } from "@/components/auth/LoginForm";
import { isSupabaseConfigured } from "@/lib/auth";
import { buildMetadata, META_DESCRIPTIONS, PAGE_TITLES } from "@/lib/seo";
import { AUTH_ROUTES } from "@/lib/routes";

export const metadata: Metadata = buildMetadata({
  title: PAGE_TITLES.login,
  description: META_DESCRIPTIONS.login,
  path: AUTH_ROUTES.login,
  noIndex: true,
});

function SetupNotice() {
  return (
    <p className="border border-amber-500/30 bg-amber-500/10 px-4 py-3 font-body text-sm text-amber-200">
      Auth is not configured yet. Add{" "}
      <code className="text-gold">NEXT_PUBLIC_SUPABASE_URL</code> and{" "}
      <code className="text-gold">NEXT_PUBLIC_SUPABASE_ANON_KEY</code> to your{" "}
      <code className="text-gold">.env.local</code> file.
    </p>
  );
}

export default function LoginPage() {
  const configured = isSupabaseConfigured();

  return (
    <>
      <Navbar />
      <AuthLayout
        label="Account"
        title="Welcome Back"
        subtitle="Sign in to continue shopping premium luxury fashion."
        footer={
          <Suspense fallback={null}>
            <LoginFooter />
          </Suspense>
        }
      >
        {!configured ? (
          <SetupNotice />
        ) : (
          <Suspense fallback={<p className="text-white/50">Loading…</p>}>
            <LoginForm />
          </Suspense>
        )}
      </AuthLayout>
      <Footer />
    </>
  );
}

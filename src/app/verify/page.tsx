import { Suspense } from "react";
import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { VerifyOtpForm } from "@/components/auth/VerifyOtpForm";
import { isSupabaseConfigured } from "@/lib/auth";
import { buildMetadata, META_DESCRIPTIONS, PAGE_TITLES } from "@/lib/seo";
import { AUTH_ROUTES } from "@/lib/routes";

export const metadata: Metadata = buildMetadata({
  title: PAGE_TITLES.verify,
  description: META_DESCRIPTIONS.verify,
  path: AUTH_ROUTES.verify,
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

export default function VerifyPage() {
  const configured = isSupabaseConfigured();

  return (
    <>
      <Navbar />
      <AuthLayout
        label="Almost there"
        title="Verify Your Email"
        subtitle="Enter the 6-digit code we sent to your inbox to activate your account."
      >
        {!configured ? (
          <SetupNotice />
        ) : (
          <Suspense fallback={<p className="text-white/50">Loading…</p>}>
            <VerifyOtpForm />
          </Suspense>
        )}
      </AuthLayout>
      <Footer />
    </>
  );
}

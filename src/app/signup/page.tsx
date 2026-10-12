import { Suspense } from "react";
import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { SignupForm, SignupFooter } from "@/components/auth/SignupForm";
import { isSupabaseConfigured } from "@/lib/auth";
import { buildMetadata, META_DESCRIPTIONS, PAGE_TITLES } from "@/lib/seo";
import { AUTH_ROUTES } from "@/lib/routes";

export const metadata: Metadata = buildMetadata({
  title: PAGE_TITLES.signup,
  description: META_DESCRIPTIONS.signup,
  path: AUTH_ROUTES.signup,
  noIndex: true,
});

export default function SignupPage() {
  const configured = isSupabaseConfigured();

  return (
    <>
      <Navbar />
      <AuthLayout
        label="Join Dripthroat"
        title="Create Account"
        subtitle="Sign up with your email. We'll send a 6-digit verification code before you can checkout."
        footer={
          <Suspense fallback={null}>
            <SignupFooter />
          </Suspense>
        }
      >
        {!configured ? (
          <p className="font-body text-sm text-amber-200">
            Configure Supabase environment variables to enable sign up.
          </p>
        ) : (
          <Suspense fallback={<p className="text-white/50">Loading…</p>}>
            <SignupForm />
          </Suspense>
        )}
      </AuthLayout>
      <Footer />
    </>
  );
}

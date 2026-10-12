import { Suspense } from "react";
import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { VerifyEmailPanel } from "@/components/auth/VerifyEmailPanel";
import { buildMetadata, META_DESCRIPTIONS, PAGE_TITLES } from "@/lib/seo";
import { AUTH_ROUTES } from "@/lib/routes";

export const metadata: Metadata = buildMetadata({
  title: PAGE_TITLES.verifyEmail,
  description: META_DESCRIPTIONS.verifyEmail,
  path: AUTH_ROUTES.verifyEmail,
  noIndex: true,
});

export default function VerifyEmailPage() {
  return (
    <>
      <Navbar />
      <AuthLayout
        label="Almost there"
        title="Verify Your Email"
        subtitle="Check your inbox for the Dripthroat verification link. Hang tight — it only takes a moment."
      >
        <Suspense fallback={<p className="text-white/50">Loading…</p>}>
          <VerifyEmailPanel />
        </Suspense>
      </AuthLayout>
      <Footer />
    </>
  );
}

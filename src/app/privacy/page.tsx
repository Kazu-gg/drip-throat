import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata, PAGE_TITLES } from "@/lib/seo";
import { LEGAL_ROUTES } from "@/lib/routes";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = buildMetadata({
  title: PAGE_TITLES.privacy,
  description:
    "Dripthroat privacy policy — how we collect, use, and protect your personal information when you shop luxury fashion at dripthroat.in.",
  path: LEGAL_ROUTES.privacy,
});

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="section-padding mx-auto max-w-3xl pt-28 pb-20">
        <p className="font-body text-[10px] tracking-[0.4em] text-gold uppercase">Legal</p>
        <h1 className="mt-3 font-display text-4xl font-light tracking-wide text-white">
          Privacy Policy
        </h1>
        <div className="mt-10 space-y-6 font-body text-sm leading-relaxed text-white/55">
          <p>
            Dripthroat (&quot;we&quot;, &quot;us&quot;) operates dripthroat.in. This policy explains how
            we handle your information when you browse, create an account, or place an order.
          </p>
          <p>
            We collect information you provide — name, email, phone, delivery address, and order
            details — to fulfil purchases, provide support, and improve your experience.
          </p>
          <p>
            Payments are processed securely via Razorpay. We do not store full card numbers on our
            servers. Order and account data may be stored in Supabase (PostgreSQL) with
            industry-standard safeguards.
          </p>
          <p>
            We do not sell your personal data. You may request access, correction, or deletion of
            your account data by contacting our support team.
          </p>
          <p className="text-white/35">Last updated: June 2026</p>
        </div>
        <Link
          href="/"
          className="mt-10 inline-flex font-body text-[10px] tracking-[0.28em] text-gold uppercase hover:text-gold-light"
        >
          ← Back to Home
        </Link>
      </main>
      <Footer />
    </>
  );
}

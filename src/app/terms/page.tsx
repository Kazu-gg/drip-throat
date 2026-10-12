import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata, PAGE_TITLES } from "@/lib/seo";
import { LEGAL_ROUTES } from "@/lib/routes";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = buildMetadata({
  title: PAGE_TITLES.terms,
  description:
    "Dripthroat terms and conditions for shopping premium curated fashion at dripthroat.in — orders, payments, returns, and use of our website and app.",
  path: LEGAL_ROUTES.terms,
});

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="section-padding mx-auto max-w-3xl pt-28 pb-20">
        <p className="font-body text-[10px] tracking-[0.4em] text-gold uppercase">Legal</p>
        <h1 className="mt-3 font-display text-4xl font-light tracking-wide text-white">
          Terms &amp; Conditions
        </h1>
        <div className="mt-10 space-y-6 font-body text-sm leading-relaxed text-white/55">
          <p>
            By using dripthroat.in or the Dripthroat app, you agree to these terms. Dripthroat offers
            curated luxury fashion for women, men, and accessories across India.
          </p>
          <p>
            Product images are representative. Colours may vary slightly due to display settings.
            Prices are listed in INR and include applicable taxes unless stated otherwise.
          </p>
          <p>
            Orders are confirmed after successful payment (UPI, cards via Razorpay) or Cash on
            Delivery acceptance. We reserve the right to cancel orders affected by stock or
            verification issues, with a full refund where applicable.
          </p>
          <p>
            Returns and exchanges follow our published return policy. Contact support for assistance
            with order tracking — from placed to delivered.
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

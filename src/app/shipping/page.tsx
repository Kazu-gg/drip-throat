import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { buildMetadata } from "@/lib/seo";
import { CONTACT_EMAIL } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Shipping Policy | Dripthroat",
  description:
    "Dripthroat shipping policy — delivery timelines, free shipping threshold, and order tracking across India.",
  path: "/shipping",
});

export default function ShippingPolicyPage() {
  return (
    <>
      <Navbar />
      <main
        id="main-content"
        className="min-h-screen bg-[var(--campaign-bg)] px-5 pt-28 pb-20 text-[var(--campaign-text)]"
        data-testid="shipping_policy_page"
      >
        <div className="mx-auto max-w-3xl">
          <p className="font-body text-[10px] tracking-[0.4em] text-gold uppercase">Policy</p>
          <h1 className="mt-3 font-display text-4xl font-light">Shipping Policy</h1>
          <div className="mt-8 space-y-5 font-body text-sm leading-relaxed text-[var(--campaign-text)]/65">
            <p>
              Orders are typically processed within 1–2 business days. Delivery across India usually
              takes 3–7 business days depending on your pincode and courier partner.
            </p>
            <p>
              Free delivery unlocks automatically when your cart merchandise total reaches the
              configured free-shipping threshold shown in your cart.
            </p>
            <p>
              You will receive tracking details by email or SMS after dispatch. For help, email{" "}
              <a className="text-gold underline" href={`mailto:${CONTACT_EMAIL}`}>
                {CONTACT_EMAIL}
              </a>{" "}
              or visit our{" "}
              <Link href="/contact" className="text-gold underline">
                Contact
              </Link>{" "}
              page.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { buildMetadata, CONTACT_EMAIL } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Return & Exchange Policy | Dripthroat",
  description:
    "Dripthroat return and exchange policy — easy size exchanges on unused items with original tags.",
  path: "/returns",
});

export default function ReturnsPolicyPage() {
  return (
    <>
      <Navbar />
      <main
        id="main-content"
        className="min-h-screen bg-[var(--campaign-bg)] px-5 pt-28 pb-20 text-[var(--campaign-text)]"
        data-testid="returns_policy_page"
      >
        <div className="mx-auto max-w-3xl">
          <p className="font-body text-[10px] tracking-[0.4em] text-gold uppercase">Policy</p>
          <h1 className="mt-3 font-display text-4xl font-light">Return / Exchange Policy</h1>
          <div className="mt-8 space-y-5 font-body text-sm leading-relaxed text-[var(--campaign-text)]/65">
            <p>
              We offer easy size exchanges on unused products with original tags within 7 days of
              delivery, subject to stock availability.
            </p>
            <p>
              Items must be in original condition. Intimate wear, final-sale pieces, and products
              showing signs of wear may not be eligible.
            </p>
            <p>
              To start an exchange, email{" "}
              <a className="text-gold underline" href={`mailto:${CONTACT_EMAIL}`}>
                {CONTACT_EMAIL}
              </a>{" "}
              with your order details, or message us via the{" "}
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

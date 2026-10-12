import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { buildMetadata, CONTACT_EMAIL, SOCIAL } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Contact Us | Dripthroat",
  description: "Contact Dripthroat support by email. Social links available for updates.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main
        id="main-content"
        className="min-h-screen bg-[var(--campaign-bg)] px-5 pt-28 pb-20 text-[var(--campaign-text)]"
        data-testid="contact_page"
      >
        <div className="mx-auto max-w-3xl">
          <p className="font-body text-[10px] tracking-[0.4em] text-gold uppercase">Support</p>
          <h1 className="mt-3 font-display text-4xl font-light">Contact Us</h1>
          <p className="mt-4 max-w-xl font-body text-sm text-[var(--campaign-text)]/60">
            Questions about sizing, orders, or exchanges? Reach us directly — Instagram is for
            community updates, not the primary shopping flow.
          </p>
          <div className="mt-10 space-y-6">
            <div>
              <p className="font-body text-[11px] tracking-[0.24em] text-gold uppercase">Email</p>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="mt-2 inline-block font-body text-lg text-[var(--campaign-text)] underline decoration-[var(--border-subtle)] underline-offset-4 hover:text-gold"
                data-testid="contact_email_link"
              >
                {CONTACT_EMAIL}
              </a>
            </div>
            <div>
              <p className="font-body text-[11px] tracking-[0.24em] text-gold uppercase">Instagram</p>
              <a
                href={SOCIAL.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block font-body text-sm text-[var(--campaign-text)]/70 hover:text-gold"
                data-testid="contact_instagram_link"
              >
                @dripthroat
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

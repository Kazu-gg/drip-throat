"use client";

import Link from "next/link";
import { useState } from "react";
import { SOCIAL, CONTACT_EMAIL } from "@/lib/seo";
import { APP_DOWNLOAD_PATH, LEGAL_ROUTES } from "@/lib/routes";
import { curatedEdits } from "@/lib/data";
import { DripthroatLogo } from "@/components/brand/DripthroatLogo";

const shopLinks = [
  ...curatedEdits.map((e) => ({ label: e.name, href: e.href })),
  { label: "Women", href: "/collections/women" },
  { label: "Men", href: "/collections/men" },
  { label: "Unisex", href: "/collections/unisex" },
  { label: "Accessories", href: "/collections/accessories" },
];

const companyLinks = [
  { label: "About", href: "#values" },
  { label: "Experience", href: "#experience" },
  { label: "Journal", href: "/blog" },
  { label: "Get the App", href: APP_DOWNLOAD_PATH },
];

const helpLinks = [
  { label: "FAQ", href: LEGAL_ROUTES.faq },
  { label: "Shipping Policy", href: LEGAL_ROUTES.shipping },
  { label: "Return / Exchange", href: LEGAL_ROUTES.returns },
  { label: "Contact", href: LEGAL_ROUTES.contact },
  { label: "Privacy Policy", href: LEGAL_ROUTES.privacy },
  { label: "Terms & Conditions", href: LEGAL_ROUTES.terms },
];

function FooterAccordion({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-[var(--border-subtle)] lg:border-0">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-4 font-body text-xs tracking-[0.25em] text-[var(--campaign-text)]/50 uppercase lg:pointer-events-none lg:cursor-default lg:py-0"
        aria-expanded={open}
      >
        {title}
        <span className="text-gold lg:hidden">{open ? "−" : "+"}</span>
      </button>
      <ul
        className={`space-y-3 overflow-hidden transition-all lg:!max-h-none lg:!opacity-100 lg:mt-6 ${
          open ? "max-h-96 pb-4 opacity-100" : "max-h-0 opacity-0 lg:max-h-none"
        }`}
      >
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="font-body text-sm text-[var(--campaign-text)]/35 transition-colors hover:text-gold"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function FooterNewsletter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  return (
    <div className="lg:col-span-4">
      <h4 className="font-body text-xs tracking-[0.25em] text-[var(--campaign-text)]/50 uppercase">
        Newsletter
      </h4>
      <p className="mt-3 max-w-sm font-body text-sm text-[var(--campaign-text)]/35">
        Style notes and new arrivals — curated, never cluttered.
      </p>
      {done ? (
        <p className="mt-5 font-body text-sm text-gold">Thank you for subscribing.</p>
      ) : (
        <form
          className="relative mt-5 max-w-md"
          onSubmit={(e) => {
            e.preventDefault();
            if (email) setDone(true);
          }}
        >
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            className="w-full border border-[var(--border-subtle)] bg-[var(--surface)] py-4 pr-14 pl-4 font-body text-sm text-[var(--campaign-text)] placeholder-[var(--campaign-text)]/30 focus:border-gold/40 focus:outline-none"
          />
          <button
            type="submit"
            className="absolute top-1 right-1 bottom-1 flex aspect-square items-center justify-center bg-gold text-black transition-colors hover:bg-gold-light"
            aria-label="Subscribe"
          >
            →
          </button>
        </form>
      )}
    </div>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-[var(--border-subtle)] bg-[var(--campaign-bg)]">
      <div className="section-padding !pb-10 !pt-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-3">
              <Link
                href="/"
                className="group inline-flex items-center transition-opacity hover:opacity-90"
                aria-label="DRIPTHROAT Home"
              >
                <DripthroatLogo className="h-8 w-auto text-[var(--campaign-text)] transition-colors duration-300 group-hover:text-gold" />
              </Link>
              <p className="mt-1 font-body text-[9px] tracking-[0.35em] text-gold/60 uppercase">
                Curated Elegance
              </p>
              <p className="mt-5 max-w-xs font-body text-sm leading-relaxed text-[var(--campaign-text)]/35">
                Premium curated fashion for women, men, and accessories across
                India.
              </p>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="mt-4 inline-block font-body text-sm text-gold/80 transition-colors hover:text-gold"
              >
                {CONTACT_EMAIL}
              </a>
              <div className="mt-6 flex gap-3">
                <a
                  href={SOCIAL.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center border border-[var(--border-subtle)] text-[10px] text-[var(--campaign-text)]/40 transition-colors hover:border-gold/40 hover:text-gold"
                  aria-label="Instagram"
                >
                  Ig
                </a>
              </div>
            </div>

            <div className="lg:col-span-2">
              <FooterAccordion title="Shop" links={shopLinks} />
            </div>
            <div className="lg:col-span-2">
              <FooterAccordion title="Company" links={companyLinks} />
            </div>
            <div className="lg:col-span-1">
              <FooterAccordion title="Help" links={helpLinks} />
            </div>

            <FooterNewsletter />
          </div>

          <div className="mt-14 h-px bg-gradient-to-r from-gold/20 via-[var(--border-subtle)] to-transparent" />

          <div className="mt-8 flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="font-body text-xs text-[var(--campaign-text)]/25">
              &copy; {new Date().getFullYear()} Dripthroat. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link
                href={LEGAL_ROUTES.privacy}
                className="font-body text-[10px] text-[var(--campaign-text)]/25 hover:text-[var(--campaign-text)]/45"
              >
                Privacy Policy
              </Link>
              <Link
                href={LEGAL_ROUTES.terms}
                className="font-body text-[10px] text-[var(--campaign-text)]/25 hover:text-[var(--campaign-text)]/45"
              >
                Terms & Conditions
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

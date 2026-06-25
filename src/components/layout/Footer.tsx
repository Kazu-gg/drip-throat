"use client";

import Link from "next/link";
import { useState } from "react";
import { SOCIAL, CONTACT_EMAIL } from "@/lib/seo";
import { APP_DOWNLOAD_PATH } from "@/lib/routes";

const shopLinks = [
  { label: "Women", href: "/collections?category=women" },
  { label: "Men", href: "/collections?category=men" },
  { label: "Accessories", href: "/collections?category=accessories" },
  { label: "All Products", href: "/products" },
];

const companyLinks = [
  { label: "About Us", href: "#values" },
  { label: "Experience", href: "#experience" },
  { label: "Blog", href: "/blog" },
  { label: "Download App", href: APP_DOWNLOAD_PATH },
];

const helpLinks = [
  { label: "FAQ", href: "#faq" },
  { label: "Support", href: `mailto:${CONTACT_EMAIL}` },
  { label: "Privacy Policy", href: "#" },
  { label: "Terms & Conditions", href: "#" },
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
    <div className="border-b border-white/5 lg:border-0">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-4 font-body text-xs tracking-[0.25em] text-white/50 uppercase lg:pointer-events-none lg:cursor-default lg:py-0"
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
              className="font-body text-sm text-white/35 transition-colors hover:text-gold"
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
      <h4 className="font-body text-xs tracking-[0.25em] text-white/50 uppercase">
        Newsletter
      </h4>
      <p className="mt-3 max-w-sm font-body text-sm text-white/35">
        Get style updates and exclusive offers straight to your inbox.
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
            className="w-full border border-white/10 bg-[#0a0a0a] py-4 pr-14 pl-4 font-body text-sm text-white placeholder-white/30 focus:border-gold/40 focus:outline-none"
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
    <footer className="border-t border-white/5 bg-black">
      <div className="section-padding !pb-10 !pt-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-3">
              <Link href="/">
                <span className="font-accent text-2xl tracking-[0.22em] text-white">
                  CHEVELLÈ
                </span>
              </Link>
              <p className="mt-1 font-body text-[9px] tracking-[0.35em] text-gold/60 uppercase">
                Curated Elegance
              </p>
              <p className="mt-5 max-w-xs font-body text-sm leading-relaxed text-white/35">
                Premium luxury fashion, curated for weddings, festivals, and
                everyday elegance.
              </p>
              <div className="mt-6 flex gap-3">
                {[
                  { label: "Instagram", href: SOCIAL.instagram },
                  { label: "Facebook", href: "#" },
                  { label: "Pinterest", href: "#" },
                  { label: "YouTube", href: "#" },
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target={s.href.startsWith("http") ? "_blank" : undefined}
                    rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="flex h-9 w-9 items-center justify-center border border-white/10 text-[10px] text-white/40 transition-colors hover:border-gold/40 hover:text-gold"
                    aria-label={s.label}
                  >
                    {s.label[0]}
                  </a>
                ))}
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

          <div className="mt-14 h-px bg-gradient-to-r from-gold/20 via-white/5 to-transparent" />

          <div className="mt-8 flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="font-body text-xs text-white/25">
              &copy; {new Date().getFullYear()} Chevellè. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link href="#" className="font-body text-[10px] text-white/25 hover:text-white/45">
                Privacy Policy
              </Link>
              <Link href="#" className="font-body text-[10px] text-white/25 hover:text-white/45">
                Terms & Conditions
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

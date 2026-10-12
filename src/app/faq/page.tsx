import type { Metadata } from "next";
import { buildMetadata, PAGE_TITLES } from "@/lib/seo";
import { LEGAL_ROUTES } from "@/lib/routes";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FAQ } from "@/components/sections/FAQ";

export const metadata: Metadata = buildMetadata({
  title: PAGE_TITLES.faq,
  description:
    "Frequently asked questions about shopping Dripthroat — delivery, payments, returns, and account support for luxury Indian fashion.",
  path: LEGAL_ROUTES.faq,
});

export default function FaqPage() {
  return (
    <>
      <Navbar />
      <div className="pt-16">
        <FAQ />
      </div>
      <Footer />
    </>
  );
}

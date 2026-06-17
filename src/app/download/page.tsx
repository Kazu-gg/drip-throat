import type { Metadata } from "next";
import Link from "next/link";
import {
  APP_DOWNLOAD_PATH,
  buildMetadata,
  META_DESCRIPTIONS,
  PAGE_TITLES,
} from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/structured-data";
import { StructuredData } from "@/components/seo/StructuredData";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SectionOrnament } from "@/components/icons/SectionOrnament";

export const metadata: Metadata = buildMetadata({
  title: PAGE_TITLES.download,
  description: META_DESCRIPTIONS.download,
  path: APP_DOWNLOAD_PATH,
});

export default function DownloadPage() {
  return (
    <>
      <StructuredData
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Download App", path: APP_DOWNLOAD_PATH },
        ])}
      />
      <Navbar />
      <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-5 pt-28 pb-20">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 30%, rgba(212,175,55,0.12) 0%, transparent 55%)",
          }}
        />

        <div className="relative z-10 mx-auto max-w-2xl text-center">
          <p className="mb-4 font-body text-xs tracking-[0.4em] text-gold uppercase">
            Mobile Experience
          </p>

          <h1 className="font-display text-4xl font-light tracking-wide text-white sm:text-5xl md:text-6xl">
            Coming Soon
          </h1>

          <SectionOrnament className="mx-auto mt-8 w-48" />

          <p className="mx-auto mt-8 max-w-lg font-display text-xl font-light leading-relaxed text-white/70 sm:text-2xl">
            Hang tight — we&apos;re putting the finishing touches on the Chevellè
            app.
          </p>

          <p className="mx-auto mt-5 max-w-md font-body text-sm leading-relaxed text-white/45 sm:text-base">
            Browse categories, shop bestsellers, and track orders from your
            phone. iOS and Android launches are on the way.
          </p>

          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
            <Link
              href="/collections"
              className="border border-gold bg-gold/10 px-10 py-4 font-body text-xs tracking-[0.2em] text-gold uppercase transition-all duration-500 hover:bg-gold hover:text-black"
            >
              Shop on Web
            </Link>
            <Link
              href="/"
              className="border border-white/15 px-10 py-4 font-body text-xs tracking-[0.2em] text-white/50 uppercase transition-all duration-500 hover:border-white/30 hover:text-white/70"
            >
              Back to Home
            </Link>
          </div>

          <p className="mt-14 font-body text-[10px] tracking-[0.35em] text-white/25 uppercase">
            Android · iOS — launching shortly
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}

import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function ThankYouPage() {
  return (
    <>
      <Navbar />
      <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[var(--campaign-bg)] px-5 pt-28 pb-20 text-center">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 40%, rgba(212,175,55,0.15) 0%, transparent 55%)",
          }}
        />
        <p className="relative z-10 font-display text-5xl font-light tracking-[0.2em] text-gold sm:text-6xl">
          THANK YOU!
        </p>
        <p className="relative z-10 mt-4 font-body text-[10px] tracking-[0.45em] text-[var(--campaign-text)]/50 uppercase">
          Curated Elegance
        </p>
        <p className="relative z-10 mt-6 max-w-md font-body text-sm text-[var(--campaign-text)]/55">
          Your order has been placed. We&apos;ll send a confirmation to your email with tracking
          details.
        </p>
        <div className="relative z-10 mt-10 flex flex-col gap-3 sm:flex-row">
          <Link href="/account" className="shop-btn-primary px-10 py-3.5">
            Track Order
          </Link>
          <Link href="/products" className="shop-btn-outline px-10 py-3.5">
            Continue Shopping
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}

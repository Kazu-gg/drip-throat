import Link from "next/link";
import { SectionOrnament } from "@/components/icons/SectionOrnament";

type AuthLayoutProps = {
  label: string;
  title: string;
  subtitle: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
};

export function AuthLayout({
  label,
  title,
  subtitle,
  children,
  footer,
}: AuthLayoutProps) {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-5 pt-28 pb-20">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 20%, rgba(212,175,55,0.1) 0%, transparent 55%)",
        }}
      />

      <div className="relative z-10 w-full max-w-md">
        <p className="mb-3 text-center font-body text-xs tracking-[0.4em] text-gold uppercase">
          {label}
        </p>
        <h1 className="text-center font-display text-3xl font-light tracking-wide text-white sm:text-4xl">
          {title}
        </h1>
        <SectionOrnament className="mx-auto mt-6 w-40" />
        <p className="mx-auto mt-6 max-w-sm text-center font-body text-sm leading-relaxed text-white/45">
          {subtitle}
        </p>

        <div className="mt-10 border border-white/10 bg-black-charcoal/80 p-6 backdrop-blur-sm sm:p-8">
          {children}
        </div>

        {footer && (
          <div className="mt-8 text-center font-body text-sm text-white/40">
            {footer}
          </div>
        )}

        <p className="mt-10 text-center">
          <Link
            href="/"
            className="font-body text-xs tracking-[0.2em] text-white/30 uppercase transition-colors hover:text-gold"
          >
            ← Back to Chevellè
          </Link>
        </p>
      </div>
    </main>
  );
}

import { DripthroatLogo } from "@/components/brand/DripthroatLogo";

export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#12150a] px-4">
      <DripthroatLogo className="h-8 sm:h-10 w-auto text-gold/85 animate-pulse" />
      <p className="mt-4 font-body text-xs tracking-[0.4em] text-white/30 uppercase">
        Loading
      </p>
    </div>
  );
}

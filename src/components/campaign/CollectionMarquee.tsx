"use client";

const MESSAGES = [
  "Complimentary styling consultation on every order",
  "Premium packaging · White-glove delivery across India",
  "New season: five worlds of Indian luxury",
  "Chevellè — curated elegance, delivered with care",
];

export function CollectionMarquee() {
  const track = [...MESSAGES, ...MESSAGES].join("   ◆   ");

  return (
    <div
      className="relative z-20 border-t border-white/10 bg-black/80 py-3 backdrop-blur-sm"
      aria-hidden
    >
      <div className="marquee-track font-body text-[10px] tracking-[0.28em] text-white/55 uppercase">
        <span>{track}</span>
        <span aria-hidden>{track}</span>
      </div>
    </div>
  );
}

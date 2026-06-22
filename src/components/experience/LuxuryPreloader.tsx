"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { LuxuryCompass } from "@/components/hero/LuxuryCompass";

const SESSION_KEY = "chevelle-intro-seen";

export function LuxuryPreloader() {
  const [visible, setVisible] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<SVGLineElement>(null);
  const logoRef = useRef<SVGTextElement>(null);
  const compassWrapRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY) === "1") return;
    setVisible(true);
  }, []);

  useEffect(() => {
    if (!visible) return;

    document.body.style.overflow = "hidden";

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const duration = reduceMotion ? 0.8 : 3.8;

    const ctx = gsap.context(() => {
      const overlay = overlayRef.current;
      const line = lineRef.current;
      const logo = logoRef.current;
      const compass = compassWrapRef.current;
      const particles = particlesRef.current?.children;

      const finish = () => {
        sessionStorage.setItem(SESSION_KEY, "1");
        document.body.style.overflow = "";
        setVisible(false);
      };

      if (reduceMotion) {
        gsap.to(overlay, {
          opacity: 0,
          duration: 0.6,
          ease: "power2.inOut",
          onComplete: finish,
        });
        return;
      }

      const tl = gsap.timeline({ onComplete: finish });

      if (particles?.length) {
        tl.from(particles, {
          opacity: 0,
          scale: 0,
          stagger: 0.04,
          duration: 0.6,
          ease: "power2.out",
        });
      }

      if (line) {
        tl.fromTo(
          line,
          { strokeDashoffset: 400 },
          { strokeDashoffset: 0, duration: 1.2, ease: "power2.inOut" },
          0.2
        );
      }

      if (logo) {
        tl.fromTo(
          logo,
          { strokeDashoffset: 1200, fillOpacity: 0 },
          {
            strokeDashoffset: 0,
            fillOpacity: 1,
            duration: 1.6,
            ease: "power2.inOut",
          },
          0.6
        );
      }

      if (compass) {
        tl.from(
          compass,
          { opacity: 0, scale: 0.85, rotation: -20, duration: 1, ease: "power3.out" },
          1.4
        );
      }

      tl.to(
        overlay,
        { opacity: 0, duration: 0.9, ease: "power2.inOut" },
        duration - 0.9
      );

      if (compass) {
        tl.to(
          compass,
          { scale: 1.15, opacity: 0, duration: 0.9, ease: "power2.in" },
          duration - 0.9
        );
      }
    });

    return () => {
      ctx.revert();
      document.body.style.overflow = "";
    };
  }, [visible]);

  if (!visible) return null;

  const particles = Array.from({ length: 24 }, (_, i) => ({
    id: i,
    x: 15 + (i * 37) % 70,
    y: 10 + (i * 23) % 80,
    size: 1 + (i % 3),
  }));

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[10000] flex items-center justify-center bg-black"
      aria-hidden
    >
      <div ref={particlesRef} className="pointer-events-none absolute inset-0">
        {particles.map((p) => (
          <span
            key={p.id}
            className="absolute rounded-full bg-gold/50"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
            }}
          />
        ))}
      </div>

      <div className="relative flex flex-col items-center">
        <svg viewBox="0 0 400 40" className="mb-10 h-10 w-64 sm:w-80" aria-hidden>
          <line
            ref={lineRef}
            x1="0"
            y1="20"
            x2="400"
            y2="20"
            stroke="#D4AF37"
            strokeWidth="0.5"
            strokeDasharray="400"
            strokeDashoffset="400"
            opacity="0.6"
          />
        </svg>

        <svg viewBox="0 0 720 100" className="h-16 w-72 sm:h-20 sm:w-96" aria-hidden>
          <defs>
            <linearGradient id="preloader-gold" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#B8962E" />
              <stop offset="50%" stopColor="#D4AF37" />
              <stop offset="100%" stopColor="#E2C663" />
            </linearGradient>
          </defs>
          <text
            ref={logoRef}
            x="50%"
            y="72"
            textAnchor="middle"
            fontSize="52"
            fontFamily="var(--font-cormorant), serif"
            letterSpacing="0.28em"
            stroke="url(#preloader-gold)"
            strokeWidth="0.6"
            fill="url(#preloader-gold)"
            fillOpacity="0"
            strokeDasharray="1200"
            strokeDashoffset="1200"
          >
            CHEVELLÈ
          </text>
        </svg>

        <div ref={compassWrapRef} className="mt-12 opacity-0">
          <LuxuryCompass className="h-48 w-48 sm:h-56 sm:w-56" />
        </div>
      </div>
    </div>
  );
}

"use client";

import { motion } from "framer-motion";

export function GoldRays() {
  return (
    <div className="pointer-events-none absolute inset-0 z-[3] overflow-hidden opacity-30" aria-hidden>
      <motion.svg
        viewBox="0 0 1200 800"
        className="absolute top-1/2 left-1/2 h-[140%] w-[140%] -translate-x-1/2 -translate-y-1/2"
        animate={{ rotate: 360 }}
        transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
      >
        <defs>
          <linearGradient id="ray-gold" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#A8B38A" stopOpacity="0" />
            <stop offset="50%" stopColor="#A8B38A" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#A8B38A" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[0, 45, 90, 135].map((deg) => (
          <ellipse
            key={deg}
            cx="600"
            cy="400"
            rx="520"
            ry="80"
            fill="url(#ray-gold)"
            transform={`rotate(${deg} 600 400)`}
            opacity="0.4"
          />
        ))}
      </motion.svg>
    </div>
  );
}

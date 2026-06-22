"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useRef, useState } from "react";

type MagneticButtonProps = {
  children: React.ReactNode;
  className?: string;
  href?: string;
  type?: "button" | "submit" | "reset";
  "data-cursor"?: string;
};

export function MagneticButton({
  children,
  className = "",
  href,
  type = "button",
  "data-cursor": dataCursor,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setPosition({ x: x * 0.2, y: y * 0.2 });
  };

  const handleMouseLeave = () => setPosition({ x: 0, y: 0 });

  const content = href ? (
    <Link href={href} className={`inline-block ${className}`} data-cursor={dataCursor}>
      {children}
    </Link>
  ) : (
    <button type={type} className={className} data-cursor={dataCursor}>
      {children}
    </button>
  );

  return (
    <motion.div
      ref={ref}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="inline-block"
    >
      {content}
    </motion.div>
  );
}

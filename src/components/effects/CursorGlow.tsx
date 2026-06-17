"use client";

import { motion } from "framer-motion";
import { useMousePosition } from "@/hooks/useMousePosition";

export function CursorGlow() {
  const { x, y } = useMousePosition();

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-[9999] hidden mix-blend-screen md:block"
      animate={{ x: x - 200, y: y - 200 }}
      transition={{ type: "spring", stiffness: 50, damping: 20, mass: 0.5 }}
    >
      <div
        className="h-[400px] w-[400px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(212,175,55,0.06) 0%, transparent 70%)",
        }}
      />
    </motion.div>
  );
}

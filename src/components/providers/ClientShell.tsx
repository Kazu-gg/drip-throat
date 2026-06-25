"use client";

import dynamic from "next/dynamic";
import { GoogleAnalytics } from "@/components/seo/Analytics";
import { MotionProvider } from "@/components/providers/MotionProvider";
import { CartProvider } from "@/contexts/CartContext";
import { WishlistProvider } from "@/contexts/WishlistContext";
export function ClientShell({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <WishlistProvider>
        <MotionProvider>
          <GoogleAnalytics />
          {children}
        </MotionProvider>
      </WishlistProvider>
    </CartProvider>
  );
}

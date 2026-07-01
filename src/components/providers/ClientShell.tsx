"use client";

import { GoogleAnalytics } from "@/components/seo/Analytics";
import { MotionProvider } from "@/components/providers/MotionProvider";
import { CartProvider } from "@/contexts/CartContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { WishlistProvider } from "@/contexts/WishlistContext";
export function ClientShell({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <MotionProvider>
            <GoogleAnalytics />
            {children}
          </MotionProvider>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
}

"use client";

import { GoogleAnalytics } from "@/components/seo/Analytics";
import { MotionProvider } from "@/components/providers/MotionProvider";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { CartProvider } from "@/contexts/CartContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { WishlistProvider } from "@/contexts/WishlistContext";
import { CartDrawer } from "@/components/shop/CartDrawer";
import { PromoPopup } from "@/components/shop/PromoPopup";

export function ClientShell({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <MotionProvider>
            <SmoothScroll />
            <GoogleAnalytics />
            {children}
            <CartDrawer />
            <PromoPopup />
          </MotionProvider>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
}

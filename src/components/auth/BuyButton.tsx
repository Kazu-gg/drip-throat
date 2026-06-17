"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { isAuthEnabled, isEmailVerified } from "@/lib/auth";
import { AUTH_ROUTES } from "@/lib/routes";

type BuyButtonProps = {
  productSlug: string;
  label?: string;
  className?: string;
};

export function BuyButton({
  productSlug,
  label = "Add to Bag",
  className = "border border-gold bg-gold/10 px-10 py-4 font-body text-xs tracking-[0.2em] text-gold uppercase transition-colors hover:bg-gold hover:text-black disabled:opacity-50",
}: BuyButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleBuy() {
    setLoading(true);
    const checkoutUrl = `${AUTH_ROUTES.checkout}?product=${encodeURIComponent(productSlug)}`;

    try {
      if (!isAuthEnabled()) {
        router.push(checkoutUrl);
        return;
      }

      const supabase = createClient();
      if (!supabase) {
        router.push(checkoutUrl);
        return;
      }

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push(
          `${AUTH_ROUTES.login}?next=${encodeURIComponent(checkoutUrl)}`
        );
        return;
      }

      if (!isEmailVerified(user)) {
        router.push(
          `${AUTH_ROUTES.verifyEmail}?next=${encodeURIComponent(checkoutUrl)}`
        );
        return;
      }

      router.push(checkoutUrl);
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleBuy}
      disabled={loading}
      className={className}
    >
      {loading ? "Please wait…" : label}
    </button>
  );
}

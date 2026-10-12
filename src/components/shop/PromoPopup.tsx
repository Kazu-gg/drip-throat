"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  getClientCommerceConfig,
  formatInr,
  type PromoPopupConfig,
} from "@/lib/commerce-config";

const DISMISS_KEY = "dripthroat-promo-popup-dismissed-at";

function isDismissed(config: PromoPopupConfig) {
  try {
    const raw = localStorage.getItem(DISMISS_KEY);
    if (!raw) return false;
    const dismissedAt = Number(raw);
    if (!Number.isFinite(dismissedAt)) return false;
    const ms = config.dismissDays * 24 * 60 * 60 * 1000;
    return Date.now() - dismissedAt < ms;
  } catch {
    return false;
  }
}

export function PromoPopup() {
  const [open, setOpen] = useState(false);
  const [config, setConfig] = useState<PromoPopupConfig | null>(null);

  useEffect(() => {
    const commerce = getClientCommerceConfig();
    const promo = commerce.promoPopup;
    if (!promo.enabled || isDismissed(promo)) return;
    setConfig(promo);
    const timer = window.setTimeout(() => setOpen(true), 1800);
    return () => window.clearTimeout(timer);
  }, []);

  const dismiss = () => {
    localStorage.setItem(DISMISS_KEY, String(Date.now()));
    setOpen(false);
  };

  if (!open || !config) return null;

  return (
    <div
      className="fixed inset-0 z-[70] flex items-end justify-center p-4 sm:items-center backdrop-blur-sm transition-all duration-300"
      data-testid="promo_popup_root"
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/60 transition-opacity"
        aria-label="Dismiss promotion"
        data-testid="promo_popup_backdrop"
        onClick={dismiss}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="promo-popup-title"
        data-testid="promo_popup"
        className="relative w-full max-w-sm border border-[var(--border-subtle)] bg-[var(--campaign-bg)]/95 backdrop-blur-xl p-7 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.6)] text-[var(--campaign-text)]"
      >
        {/* Subtle decorative top gold accent */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[var(--gold)]/50 to-transparent" />

        <button
          type="button"
          onClick={dismiss}
          data-testid="promo_popup_close_button"
          className="absolute top-3.5 right-3.5 flex h-8 w-8 items-center justify-center text-xl text-[var(--campaign-text)]/40 transition-colors hover:text-gold"
          aria-label="Close promotion"
        >
          ×
        </button>

        <p className="font-body text-[10px] tracking-[0.3em] uppercase text-gold/75">
          Exclusive Offer
        </p>

        <p
          id="promo-popup-title"
          className="mt-2 pr-6 font-display text-3xl font-light tracking-wide text-gold"
          data-testid="promo_popup_title"
        >
          {config.title}
        </p>

        <p className="mt-3 font-body text-sm leading-relaxed text-[var(--campaign-text)]/65">
          {config.description ||
            `On orders above ${formatInr(config.minOrderValue)}`}
        </p>

        <div className="mt-6 flex flex-col gap-2.5">
          <Link
            href={config.ctaHref}
            onClick={dismiss}
            data-testid="promo_popup_cta_button"
            className="shop-btn-primary !flex w-full items-center justify-center px-6 py-3.5 text-center font-medium tracking-[0.25em] transition-all hover:scale-[1.01]"
          >
            {config.ctaLabel}
          </Link>
          <button
            type="button"
            onClick={dismiss}
            className="font-body text-[10px] tracking-[0.2em] text-[var(--campaign-text)]/40 hover:text-[var(--campaign-text)]/75 uppercase py-1 text-center transition-colors"
          >
            Continue browsing
          </button>
        </div>
      </div>
    </div>
  );
}

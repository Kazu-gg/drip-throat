"use client";

import { useEffect, useState } from "react";
import {
  DEFAULT_COMMERCE_CONFIG,
  getClientCommerceConfig,
  saveClientCommerceConfig,
  type CommerceConfig,
  formatInr,
} from "@/lib/commerce-config";

export function AdminCommercePanel() {
  const [config, setConfig] = useState<CommerceConfig>(DEFAULT_COMMERCE_CONFIG);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setConfig(getClientCommerceConfig());
  }, []);

  const persist = () => {
    saveClientCommerceConfig(config);
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2000);
  };

  return (
    <section className="shop-order-summary mt-8 p-6" data-testid="admin_commerce_panel">
      <h2 className="shop-filter-heading mb-2">Marketing & Commerce</h2>
      <p className="mb-6 font-body text-xs text-[var(--campaign-text)]/45">
        Local admin overrides (stored in this browser). Prefer env vars for production. Wire a CMS
        when Supabase admin APIs are ready.
      </p>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="font-body text-[10px] tracking-[0.2em] text-[var(--campaign-text)]/50 uppercase">
            Free shipping threshold
          </span>
          <input
            type="number"
            min={0}
            value={config.freeShippingThreshold}
            onChange={(e) =>
              setConfig((c) => ({
                ...c,
                freeShippingThreshold: Number(e.target.value) || 0,
              }))
            }
            data-testid="admin_free_shipping_threshold_input"
            className="mt-2 w-full border border-[var(--border-subtle)] bg-transparent px-3 py-2.5 font-body text-sm"
          />
          <span className="mt-1 block font-body text-[11px] text-[var(--campaign-text)]/35">
            Currently {formatInr(config.freeShippingThreshold)}
          </span>
        </label>

        <label className="block">
          <span className="font-body text-[10px] tracking-[0.2em] text-[var(--campaign-text)]/50 uppercase">
            Buy 2 bundle price
          </span>
          <input
            type="number"
            min={0}
            value={config.buyTwo.bundlePrice}
            onChange={(e) =>
              setConfig((c) => ({
                ...c,
                buyTwo: { ...c.buyTwo, bundlePrice: Number(e.target.value) || 0 },
              }))
            }
            data-testid="admin_buy_two_price_input"
            className="mt-2 w-full border border-[var(--border-subtle)] bg-transparent px-3 py-2.5 font-body text-sm"
          />
        </label>

        <label className="block sm:col-span-2">
          <span className="font-body text-[10px] tracking-[0.2em] text-[var(--campaign-text)]/50 uppercase">
            Buy 2 eligible slugs (comma-separated)
          </span>
          <input
            type="text"
            value={config.buyTwo.eligibleSlugs.join(",")}
            onChange={(e) =>
              setConfig((c) => ({
                ...c,
                buyTwo: {
                  ...c.buyTwo,
                  eligibleSlugs: e.target.value
                    .split(",")
                    .map((s) => s.trim())
                    .filter(Boolean),
                },
              }))
            }
            data-testid="admin_buy_two_slugs_input"
            className="mt-2 w-full border border-[var(--border-subtle)] bg-transparent px-3 py-2.5 font-body text-sm"
          />
        </label>

        <label className="flex items-center gap-3 sm:col-span-2">
          <input
            type="checkbox"
            checked={config.buyTwo.enabled}
            onChange={(e) =>
              setConfig((c) => ({
                ...c,
                buyTwo: { ...c.buyTwo, enabled: e.target.checked },
              }))
            }
            data-testid="admin_buy_two_enabled_checkbox"
          />
          <span className="font-body text-sm">Enable Buy 2 offer</span>
        </label>

        <label className="block">
          <span className="font-body text-[10px] tracking-[0.2em] text-[var(--campaign-text)]/50 uppercase">
            Popup title
          </span>
          <input
            type="text"
            value={config.promoPopup.title}
            onChange={(e) =>
              setConfig((c) => ({
                ...c,
                promoPopup: { ...c.promoPopup, title: e.target.value },
              }))
            }
            data-testid="admin_popup_title_input"
            className="mt-2 w-full border border-[var(--border-subtle)] bg-transparent px-3 py-2.5 font-body text-sm"
          />
        </label>

        <label className="block">
          <span className="font-body text-[10px] tracking-[0.2em] text-[var(--campaign-text)]/50 uppercase">
            Popup min order
          </span>
          <input
            type="number"
            min={0}
            value={config.promoPopup.minOrderValue}
            onChange={(e) =>
              setConfig((c) => ({
                ...c,
                promoPopup: {
                  ...c.promoPopup,
                  minOrderValue: Number(e.target.value) || 0,
                },
              }))
            }
            data-testid="admin_popup_min_order_input"
            className="mt-2 w-full border border-[var(--border-subtle)] bg-transparent px-3 py-2.5 font-body text-sm"
          />
        </label>

        <label className="flex items-center gap-3 sm:col-span-2">
          <input
            type="checkbox"
            checked={config.promoPopup.enabled}
            onChange={(e) =>
              setConfig((c) => ({
                ...c,
                promoPopup: { ...c.promoPopup, enabled: e.target.checked },
              }))
            }
            data-testid="admin_popup_enabled_checkbox"
          />
          <span className="font-body text-sm">Enable promo popup</span>
        </label>
      </div>

      <button
        type="button"
        onClick={persist}
        data-testid="admin_commerce_save_button"
        className="shop-btn-primary mt-6 px-8 py-3"
      >
        {saved ? "Saved" : "Save settings"}
      </button>
    </section>
  );
}

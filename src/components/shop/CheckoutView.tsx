"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SeoImage } from "@/components/seo/SeoImage";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { FreeShippingProgressBar } from "@/components/shop/FreeShippingProgressBar";
import { BuyTwoOffer } from "@/components/shop/BuyTwoOffer";
import { getEffectiveUnitPrice } from "@/lib/cart-pricing";
import { formatInr } from "@/lib/commerce-config";
import { cartLineKey } from "@/lib/cart-types";
import { isAuthEnabled } from "@/lib/auth";
import { startPaymentCheckout, isRazorpayConfigured } from "@/lib/payment-service";
import { FILTER_COLORS } from "@/lib/shop";
import { SHOP_ROUTES } from "@/lib/routes";
import { placeOrder } from "@/lib/supabase/queries/orders";

const STEPS = ["Delivery", "Payment", "Place Order"] as const;
type CheckoutStep = (typeof STEPS)[number];

type ShippingDetails = {
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  state: string;
  address: string;
  city: string;
  postalCode: string;
};

function colorHex(colorId?: string) {
  if (!colorId) return null;
  return FILTER_COLORS.find((c) => c.id === colorId)?.label ?? colorId;
}

function defaultShippingDetails(user: ReturnType<typeof useAuth>["user"]): ShippingDetails {
  const fullName = (user?.user_metadata?.full_name as string | undefined)?.trim() ?? "";
  const [firstName = "", ...rest] = fullName.split(/\s+/);
  return {
    email: user?.email ?? "",
    phone: (user?.user_metadata?.phone as string | undefined) ?? "",
    firstName,
    lastName: rest.join(" "),
    state: "",
    address: "",
    city: "",
    postalCode: "",
  };
}

function validateShipping(details: ShippingDetails) {
  if (!details.email.trim()) return "Enter your email";
  if (!details.phone.trim()) return "Enter your phone number";
  if (!details.firstName.trim() || !details.lastName.trim()) return "Enter your full name";
  if (!details.address.trim()) return "Enter your delivery address";
  if (!details.city.trim()) return "Enter your city";
  if (!details.state.trim()) return "Enter your state";
  if (!details.postalCode.trim()) return "Enter your pincode";
  return null;
}

export function CheckoutView() {
  const { lines, count, totals, resolveProduct, clear } = useCart();
  const { user } = useAuth();
  const router = useRouter();
  const [step, setStep] = useState<CheckoutStep>("Delivery");
  const [paying, setPaying] = useState(false);
  const [payError, setPayError] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<"razorpay" | "cod">("razorpay");
  const [shipping, setShipping] = useState<ShippingDetails>(() => defaultShippingDetails(user));

  const itemCount = count;

  const updateShipping = (field: keyof ShippingDetails, value: string) => {
    setShipping((prev) => ({ ...prev, [field]: value }));
  };

  const goToPayment = () => {
    const error = validateShipping(shipping);
    if (error) {
      setPayError(error);
      return;
    }
    setPayError(null);
    setStep("Payment");
  };

  if (lines.length === 0) {
    return (
      <div className="mx-auto max-w-lg py-20 text-center" data-testid="checkout_empty">
        <p className="font-body text-sm text-[var(--campaign-text)]/50">Your bag is empty.</p>
        <button
          type="button"
          onClick={() => router.push("/products")}
          className="cart-continue-btn mt-8 px-12 py-3.5"
          data-testid="checkout_continue_shopping_button"
        >
          Continue shopping
        </button>
      </div>
    );
  }

  const customerName = `${shipping.firstName.trim()} ${shipping.lastName.trim()}`.trim();
  const fullAddress = [
    shipping.address.trim(),
    shipping.city.trim(),
    shipping.state.trim(),
    shipping.postalCode.trim(),
    "India",
  ]
    .filter(Boolean)
    .join(", ");

  const finalizeOrder = async (paymentMeta?: {
    razorpayOrderId?: string;
    razorpayPaymentId?: string;
  }) => {
    if (user && isAuthEnabled()) {
      try {
        const { orderId } = await placeOrder({
          userId: user.id,
          lines,
          resolveProduct,
          platformFee: 0,
          orderTotal: totals.total,
          merchandiseSubtotal: totals.merchandiseSubtotal,
          discountTotal: totals.discountTotal,
          deliveryCharge: totals.shipping,
          customerName,
          phone: shipping.phone.trim(),
          address: fullAddress,
          area: shipping.city.trim() || null,
          razorpayOrderId: paymentMeta?.razorpayOrderId,
          razorpayPaymentId: paymentMeta?.razorpayPaymentId,
        });
        clear();
        router.push(`/orders/${orderId}`);
        return;
      } catch (err) {
        // Fall through to guest confirmation when DB write is unavailable
        console.warn("[checkout] placeOrder failed, using thank-you flow", err);
      }
    }

    try {
      sessionStorage.setItem(
        "dripthroat-last-order",
        JSON.stringify({
          customerName,
          email: shipping.email,
          phone: shipping.phone,
          total: totals.total,
          lines,
          createdAt: new Date().toISOString(),
          paymentMethod,
        })
      );
    } catch {
      /* ignore */
    }
    clear();
    router.push(SHOP_ROUTES.thankYou);
  };

  const handlePlaceOrder = async () => {
    const shippingError = validateShipping(shipping);
    if (shippingError) {
      setPayError(shippingError);
      setStep("Delivery");
      return;
    }

    setPaying(true);
    setPayError(null);

    try {
      if (paymentMethod === "cod") {
        await finalizeOrder();
        return;
      }

      const result = await startPaymentCheckout({
        amountInr: totals.total,
        description: `Dripthroat order · ${itemCount} item${itemCount === 1 ? "" : "s"}`,
        customer: {
          name: customerName,
          email: shipping.email || user?.email || undefined,
          phone: shipping.phone,
        },
        onSuccess: async (response) => {
          await finalizeOrder({
            razorpayOrderId: response.razorpay_order_id,
            razorpayPaymentId: response.razorpay_payment_id,
          });
        },
        onDismiss: () => setPaying(false),
      });

      if (!result.ok) {
        setPayError(result.error);
      }
    } catch (err) {
      setPayError(err instanceof Error ? err.message : "Payment failed");
    } finally {
      setPaying(false);
    }
  };

  return (
    <div className="mx-auto max-w-7xl section-padding" data-testid="checkout_page">
      <nav className="flex flex-wrap items-center gap-3 sm:gap-5" aria-label="Checkout progress">
        {STEPS.map((label, index) => {
          const isActive = step === label;
          const isPast = STEPS.indexOf(step) > index;
          return (
            <span key={label} className="flex items-center gap-3 sm:gap-5">
              {index > 0 ? (
                <span className="text-[var(--campaign-text)]/20" aria-hidden>
                  ›
                </span>
              ) : null}
              <button
                type="button"
                onClick={() => setStep(label)}
                data-testid={`checkout_step_${label.toLowerCase().replace(/\s+/g, "_")}_button`}
                className={`cart-checkout-step transition-colors ${
                  isActive
                    ? "font-semibold text-[var(--campaign-text)]"
                    : isPast
                      ? "text-[var(--campaign-text)]/55 hover:text-gold"
                      : "text-[var(--campaign-text)]/30"
                }`}
              >
                {label}
              </button>
            </span>
          );
        })}
      </nav>

      <p className="mt-4 font-body text-xs text-[var(--campaign-text)]/45">
        Guest checkout — no account required.
      </p>

      <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-14">
        <div className="min-w-0 space-y-10">
          {step === "Delivery" && (
            <>
              {payError ? (
                <p className="font-body text-sm text-red-400" role="alert" data-testid="checkout_error">
                  {payError}
                </p>
              ) : null}
              <section>
                <h2 className="font-body text-[11px] font-semibold tracking-[0.28em] text-[var(--campaign-text)] uppercase">
                  Delivery details
                </h2>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <input
                    type="text"
                    required
                    placeholder="First Name"
                    value={shipping.firstName}
                    onChange={(e) => updateShipping("firstName", e.target.value)}
                    className="cart-field"
                    data-testid="checkout_first_name_input"
                  />
                  <input
                    type="text"
                    required
                    placeholder="Last Name"
                    value={shipping.lastName}
                    onChange={(e) => updateShipping("lastName", e.target.value)}
                    className="cart-field"
                    data-testid="checkout_last_name_input"
                  />
                  <input
                    type="email"
                    required
                    placeholder="Email"
                    value={shipping.email}
                    onChange={(e) => updateShipping("email", e.target.value)}
                    className="cart-field sm:col-span-2"
                    data-testid="checkout_email_input"
                  />
                  <input
                    type="tel"
                    required
                    placeholder="Phone"
                    value={shipping.phone}
                    onChange={(e) => updateShipping("phone", e.target.value)}
                    className="cart-field sm:col-span-2"
                    data-testid="checkout_phone_input"
                  />
                  <input
                    type="text"
                    required
                    placeholder="Address"
                    value={shipping.address}
                    onChange={(e) => updateShipping("address", e.target.value)}
                    className="cart-field sm:col-span-2"
                    data-testid="checkout_address_input"
                  />
                  <input
                    type="text"
                    required
                    placeholder="City"
                    value={shipping.city}
                    onChange={(e) => updateShipping("city", e.target.value)}
                    className="cart-field"
                    data-testid="checkout_city_input"
                  />
                  <input
                    type="text"
                    required
                    placeholder="State"
                    value={shipping.state}
                    onChange={(e) => updateShipping("state", e.target.value)}
                    className="cart-field"
                    data-testid="checkout_state_input"
                  />
                  <input
                    type="text"
                    required
                    placeholder="Pincode"
                    value={shipping.postalCode}
                    onChange={(e) => updateShipping("postalCode", e.target.value)}
                    className="cart-field sm:col-span-2"
                    data-testid="checkout_pincode_input"
                  />
                </div>
              </section>
            </>
          )}

          {(step === "Payment" || step === "Place Order") && (
            <section>
              <h2 className="font-body text-[11px] font-semibold tracking-[0.28em] text-[var(--campaign-text)] uppercase">
                Payment
              </h2>
              <div className="mt-5 space-y-3">
                <label className="flex cursor-pointer items-center gap-3 border border-[var(--border-subtle)] p-4">
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === "razorpay"}
                    onChange={() => setPaymentMethod("razorpay")}
                    data-testid="checkout_payment_razorpay_radio"
                  />
                  <span className="font-body text-sm">
                    Online payment {isRazorpayConfigured() ? "(Razorpay)" : "(demo mode if unset)"}
                  </span>
                </label>
                <label className="flex cursor-pointer items-center gap-3 border border-[var(--border-subtle)] p-4">
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === "cod"}
                    onChange={() => setPaymentMethod("cod")}
                    data-testid="checkout_payment_cod_radio"
                  />
                  <span className="font-body text-sm">Cash on Delivery</span>
                </label>
              </div>
              {payError ? (
                <p className="mt-4 font-body text-sm text-red-400" role="alert" data-testid="checkout_error">
                  {payError}
                </p>
              ) : null}
            </section>
          )}

          {step === "Delivery" ? (
            <button
              type="button"
              onClick={goToPayment}
              className="cart-continue-btn flex w-full items-center justify-between px-6 py-4"
              data-testid="checkout_continue_to_payment_button"
            >
              <span>Payment</span>
              <span aria-hidden>→</span>
            </button>
          ) : step === "Payment" ? (
            <button
              type="button"
              onClick={() => setStep("Place Order")}
              className="cart-continue-btn flex w-full items-center justify-between px-6 py-4"
              data-testid="checkout_continue_to_place_order_button"
            >
              <span>Place Order</span>
              <span aria-hidden>→</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => void handlePlaceOrder()}
              disabled={paying}
              className="cart-continue-btn w-full py-4 disabled:opacity-50"
              data-testid="checkout_place_order_button"
            >
              {paying ? "Processing…" : `Place Order · ${formatInr(totals.total)}`}
            </button>
          )}
        </div>

        <aside className="h-fit border border-[var(--border-subtle)] bg-[var(--surface)] p-6 lg:p-8" data-testid="checkout_order_summary">
          <div className="flex items-baseline justify-between gap-4">
            <h2 className="font-body text-[11px] font-semibold tracking-[0.28em] text-[var(--campaign-text)] uppercase">
              Order summary
            </h2>
            <span className="font-body text-xs text-gold">({itemCount})</span>
          </div>

          <div className="mt-5">
            <FreeShippingProgressBar progress={totals.freeShipping} compact />
          </div>
          {totals.buyTwo.enabled ? (
            <div className="mt-4">
              <BuyTwoOffer progress={totals.buyTwo} />
            </div>
          ) : null}

          <ul className="mt-8 space-y-6">
            {lines.map((line) => {
              const product = resolveProduct(line.slug);
              if (!product) return null;
              const variant = [colorHex(line.color), line.size].filter(Boolean).join(" / ");
              const unit = getEffectiveUnitPrice(product);
              return (
                <li key={cartLineKey(line)} className="flex gap-4">
                  <div className="relative h-16 w-16 shrink-0 bg-[var(--campaign-bg)]">
                    <SeoImage
                      src={product.image.src}
                      alt={product.image.alt}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <p className="font-body text-sm font-medium text-[var(--campaign-text)]">
                        {product.name}
                      </p>
                      <p className="shrink-0 font-body text-xs text-gold">
                        {formatInr(unit * line.quantity)}
                      </p>
                    </div>
                    {variant ? (
                      <p className="mt-1 font-body text-xs text-[var(--campaign-text)]/45">{variant}</p>
                    ) : null}
                    <p className="mt-1 font-body text-xs text-[var(--campaign-text)]/45">
                      Qty {line.quantity}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>

          <dl className="mt-8 space-y-3 border-t border-[var(--border-subtle)] pt-6 font-body text-sm">
            <div className="flex justify-between text-[var(--campaign-text)]/55">
              <dt>Subtotal</dt>
              <dd>{formatInr(totals.merchandiseSubtotal)}</dd>
            </div>
            {totals.discountTotal > 0 ? (
              <div className="flex justify-between text-[var(--campaign-text)]/55">
                <dt>Discounts</dt>
                <dd>−{formatInr(totals.discountTotal)}</dd>
              </div>
            ) : null}
            <div className="flex justify-between text-[var(--campaign-text)]/55">
              <dt>Shipping</dt>
              <dd>
                {totals.freeShipping.unlocked ? "FREE" : formatInr(totals.shipping)}
              </dd>
            </div>
            <div className="flex justify-between border-t border-[var(--border-subtle)] pt-4 font-semibold text-[var(--campaign-text)]">
              <dt>Total</dt>
              <dd data-testid="checkout_total">{formatInr(totals.total)}</dd>
            </div>
          </dl>

          <Link
            href={SHOP_ROUTES.cart}
            className="mt-6 inline-block font-body text-xs text-[var(--campaign-text)]/55 underline hover:text-gold"
          >
            Edit cart
          </Link>
        </aside>
      </div>
    </div>
  );
}

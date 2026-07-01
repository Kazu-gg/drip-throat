"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SeoImage } from "@/components/seo/SeoImage";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { FILTER_COLORS } from "@/lib/shop";
import {
  formatPlatformFee,
  platformFeeLineLabel,
  PLATFORM_FEE_PER_ITEM,
} from "@/lib/platform-fees";
import {
  createRazorpayOrder,
  openRazorpayCheckout,
  verifyRazorpayPayment,
} from "@/lib/razorpay-client";
import { SHOP_ROUTES } from "@/lib/routes";
import { placeOrder } from "@/lib/supabase/queries/orders";

const STEPS = ["Information", "Shipping", "Payment"] as const;

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
  if (!details.phone.trim()) return "Enter your phone number";
  if (!details.firstName.trim() || !details.lastName.trim()) return "Enter your full name";
  if (!details.address.trim()) return "Enter your delivery address";
  if (!details.city.trim()) return "Enter your city";
  if (!details.postalCode.trim()) return "Enter your postal code";
  return null;
}

export function CheckoutView() {
  const { lines, count, platformFee, resolveProduct, clear } = useCart();
  const { user } = useAuth();
  const router = useRouter();
  const [step, setStep] = useState<(typeof STEPS)[number]>("Information");
  const [paying, setPaying] = useState(false);
  const [payError, setPayError] = useState<string | null>(null);
  const [shipping, setShipping] = useState<ShippingDetails>(() => defaultShippingDetails(user));

  const itemCount = count;
  const razorpayKey = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;

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
      <div className="mx-auto max-w-lg py-20 text-center">
        <p className="font-body text-sm text-[var(--campaign-text)]/50">Your bag is empty.</p>
        <button
          type="button"
          onClick={() => router.push("/products")}
          className="cart-continue-btn mt-8 px-12 py-3.5"
        >
          Continue shopping
        </button>
      </div>
    );
  }

  const handlePay = async () => {
    if (!user) {
      setPayError("Sign in to place your order.");
      return;
    }

    const shippingError = validateShipping(shipping);
    if (shippingError) {
      setPayError(shippingError);
      setStep("Information");
      return;
    }

    if (!razorpayKey) {
      setPayError("Razorpay is not configured. Add NEXT_PUBLIC_RAZORPAY_KEY_ID.");
      return;
    }

    setPaying(true);
    setPayError(null);

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

    try {
      const amountPaise = platformFee * 100;
      const razorpayOrderId = await createRazorpayOrder(amountPaise, `chevelle_${Date.now()}`);

      await openRazorpayCheckout({
        key: razorpayKey,
        amount: amountPaise,
        currency: "INR",
        name: "Chevellè",
        description: platformFeeLineLabel(itemCount),
        order_id: razorpayOrderId,
        prefill: {
          email: shipping.email || user.email || undefined,
          contact: shipping.phone,
          name: customerName || undefined,
        },
        theme: { color: "#D4AF37" },
        handler: async (response) => {
          await verifyRazorpayPayment(response);
          const { orderId } = await placeOrder({
            userId: user.id,
            lines,
            resolveProduct,
            platformFee,
            customerName,
            phone: shipping.phone.trim(),
            address: fullAddress,
            area: shipping.city.trim() || null,
            razorpayOrderId: response.razorpay_order_id,
            razorpayPaymentId: response.razorpay_payment_id,
          });
          clear();
          router.push(`/orders/${orderId}`);
        },
        modal: {
          ondismiss: () => setPaying(false),
        },
      });
    } catch (err) {
      setPayError(err instanceof Error ? err.message : "Payment failed");
    } finally {
      setPaying(false);
    }
  };

  return (
    <div className="mx-auto max-w-7xl section-padding">
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

      <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-14">
        <div className="min-w-0 space-y-10">
          {(step === "Information" || step === "Shipping") && (
            <>
              {payError && step !== "Payment" ? (
                <p className="font-body text-sm text-red-400" role="alert">
                  {payError}
                </p>
              ) : null}
              <section>
                <h2 className="font-body text-[11px] font-semibold tracking-[0.28em] text-[var(--campaign-text)] uppercase">
                  Contact Info
                </h2>
                <div className="mt-5 grid gap-3">
                  <input
                    type="email"
                    required
                    placeholder="Email"
                    value={shipping.email}
                    onChange={(e) => updateShipping("email", e.target.value)}
                    className="cart-field"
                  />
                  <input
                    type="tel"
                    required
                    placeholder="Phone"
                    value={shipping.phone}
                    onChange={(e) => updateShipping("phone", e.target.value)}
                    className="cart-field"
                  />
                </div>
              </section>

              <section>
                <h2 className="font-body text-[11px] font-semibold tracking-[0.28em] text-[var(--campaign-text)] uppercase">
                  Shipping Address
                </h2>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <input
                    type="text"
                    required
                    placeholder="First Name"
                    value={shipping.firstName}
                    onChange={(e) => updateShipping("firstName", e.target.value)}
                    className="cart-field"
                  />
                  <input
                    type="text"
                    required
                    placeholder="Last Name"
                    value={shipping.lastName}
                    onChange={(e) => updateShipping("lastName", e.target.value)}
                    className="cart-field"
                  />
                  <select required defaultValue="IN" className="cart-field sm:col-span-2">
                    <option value="IN">India</option>
                  </select>
                  <input
                    type="text"
                    required
                    placeholder="State / Region"
                    value={shipping.state}
                    onChange={(e) => updateShipping("state", e.target.value)}
                    className="cart-field sm:col-span-2"
                  />
                  <input
                    type="text"
                    required
                    placeholder="Address"
                    value={shipping.address}
                    onChange={(e) => updateShipping("address", e.target.value)}
                    className="cart-field sm:col-span-2"
                  />
                  <input
                    type="text"
                    required
                    placeholder="City"
                    value={shipping.city}
                    onChange={(e) => updateShipping("city", e.target.value)}
                    className="cart-field"
                  />
                  <input
                    type="text"
                    required
                    placeholder="Postal Code"
                    value={shipping.postalCode}
                    onChange={(e) => updateShipping("postalCode", e.target.value)}
                    className="cart-field"
                  />
                </div>
              </section>
            </>
          )}

          {step === "Payment" && (
            <section>
              <h2 className="font-body text-[11px] font-semibold tracking-[0.28em] text-[var(--campaign-text)] uppercase">
                Pay Platform Fee
              </h2>
              <p className="mt-4 font-body text-sm leading-relaxed text-[var(--campaign-text)]/55">
                Complete your order by paying the Chevellè platform fee via Razorpay. Product
                prices are not charged here — only ₹{PLATFORM_FEE_PER_ITEM} per item.
              </p>
              <div className="mt-6 border border-[var(--border-subtle)] bg-black/15 p-5">
                <p className="font-body text-xs tracking-[0.2em] text-gold uppercase">
                  Secured by Razorpay
                </p>
                <p className="mt-2 font-body text-sm text-[var(--campaign-text)]/60">
                  UPI · Cards · Net Banking · Wallets
                </p>
              </div>
              {payError ? (
                <p className="mt-4 font-body text-sm text-red-400" role="alert">
                  {payError}
                </p>
              ) : null}
            </section>
          )}

          {step !== "Payment" ? (
            <button
              type="button"
              onClick={() => {
                if (step === "Information") {
                  setStep("Shipping");
                  return;
                }
                goToPayment();
              }}
              className="cart-continue-btn flex w-full items-center justify-between px-6 py-4"
            >
              <span>{step === "Information" ? "Shipping" : "Payment"}</span>
              <span aria-hidden>→</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => void handlePay()}
              disabled={paying}
              className="cart-continue-btn w-full py-4 disabled:opacity-50"
            >
              {paying ? "Opening Razorpay…" : `Pay ${formatPlatformFee(platformFee)}`}
            </button>
          )}
        </div>

        <aside className="h-fit border border-[var(--border-subtle)] bg-[var(--surface)] p-6 lg:p-8">
          <div className="flex items-baseline justify-between gap-4">
            <h2 className="font-body text-[11px] font-semibold tracking-[0.28em] text-[var(--campaign-text)] uppercase">
              Your Order
            </h2>
            <span className="font-body text-xs text-gold">({itemCount})</span>
          </div>

          <ul className="mt-8 space-y-6">
            {lines.map((line) => {
              const product = resolveProduct(line.slug);
              if (!product) return null;
              const variant = [colorHex(line.color), line.size].filter(Boolean).join(" / ");
              return (
                <li key={line.slug} className="flex gap-4">
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
                      <Link
                        href={SHOP_ROUTES.cart}
                        className="shrink-0 font-body text-xs text-[var(--campaign-text)]/55 underline hover:text-gold"
                      >
                        Change
                      </Link>
                    </div>
                    {variant ? (
                      <p className="mt-1 font-body text-xs text-[var(--campaign-text)]/45">{variant}</p>
                    ) : null}
                    <p className="mt-1 font-body text-xs text-gold">({line.quantity})</p>
                  </div>
                </li>
              );
            })}
          </ul>

          <dl className="mt-8 space-y-3 border-t border-[var(--border-subtle)] pt-6 font-body text-sm">
            <div className="flex justify-between text-[var(--campaign-text)]/55">
              <dt>{platformFeeLineLabel(itemCount)}</dt>
              <dd>{formatPlatformFee(platformFee)}</dd>
            </div>
            <div className="flex justify-between border-t border-[var(--border-subtle)] pt-4 font-semibold text-[var(--campaign-text)]">
              <dt>Total due</dt>
              <dd>{formatPlatformFee(platformFee)}</dd>
            </div>
          </dl>
        </aside>
      </div>
    </div>
  );
}

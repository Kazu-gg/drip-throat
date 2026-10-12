/**
 * Payment integration boundary.
 * Razorpay is wired via Supabase Edge Functions (`create-order`, `verify-payment`).
 * Edge function secrets live outside this repo — mark integration points clearly.
 */

import {
  createRazorpayOrder,
  openRazorpayCheckout,
  verifyRazorpayPayment,
  type RazorpayHandlerResponse,
} from "@/lib/razorpay-client";

export type PaymentCheckoutInput = {
  amountInr: number;
  description: string;
  customer: {
    name?: string;
    email?: string;
    phone?: string;
  };
  onSuccess: (response: RazorpayHandlerResponse) => void | Promise<void>;
  onDismiss?: () => void;
};

export type PaymentResult =
  | { ok: true; mode: "razorpay" }
  | { ok: true; mode: "mock"; mockOrderId: string }
  | { ok: false; error: string };

export function isRazorpayConfigured(): boolean {
  return Boolean(process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID);
}

/**
 * Starts hosted Razorpay checkout for `amountInr`.
 * If Razorpay is not configured, returns a mock success path for local/dev flows.
 */
export async function startPaymentCheckout(
  input: PaymentCheckoutInput
): Promise<PaymentResult> {
  const amountPaise = Math.round(input.amountInr * 100);
  if (amountPaise <= 0) {
    return { ok: false, error: "Order total must be greater than zero." };
  }

  const key = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
  if (!key) {
    // INTEGRATION POINT: configure NEXT_PUBLIC_RAZORPAY_KEY_ID + Edge Functions
    const mockOrderId = `mock_${Date.now()}`;
    await input.onSuccess({
      razorpay_payment_id: `pay_mock_${Date.now()}`,
      razorpay_order_id: mockOrderId,
      razorpay_signature: "mock",
    });
    return { ok: true, mode: "mock", mockOrderId };
  }

  try {
    const orderId = await createRazorpayOrder(
      amountPaise,
      `dripthroat_${Date.now()}`
    );
    await openRazorpayCheckout({
      key,
      amount: amountPaise,
      currency: "INR",
      name: "Dripthroat",
      description: input.description,
      order_id: orderId,
      prefill: {
        email: input.customer.email,
        contact: input.customer.phone,
        name: input.customer.name,
      },
      theme: { color: "#A8B38A" },
      handler: async (response) => {
        await verifyRazorpayPayment(response);
        await input.onSuccess(response);
      },
      modal: { ondismiss: input.onDismiss },
    });
    return { ok: true, mode: "razorpay" };
  } catch (err) {
    return {
      ok: false,
      error: err instanceof Error ? err.message : "Payment failed",
    };
  }
}

import { createClient } from "@/lib/supabase/client";

type RazorpayHandlerResponse = {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
};

type RazorpayCheckoutOptions = {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  prefill?: { email?: string; contact?: string; name?: string };
  theme?: { color?: string };
  handler: (response: RazorpayHandlerResponse) => void | Promise<void>;
  modal?: { ondismiss?: () => void };
};

type RazorpayInstance = { open: () => void };

type InvokeErrorBody = {
  error?: string;
  source?: string;
  detail?: string;
};

declare global {
  interface Window {
    Razorpay?: new (options: RazorpayCheckoutOptions) => RazorpayInstance;
  }
}

async function invokePaymentFunction<T>(
  name: string,
  body: Record<string, unknown>
): Promise<T> {
  const baseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!baseUrl || !anonKey) {
    throw new Error("Payment is unavailable — Supabase is not configured.");
  }

  const supabase = createClient();
  const session = supabase ? (await supabase.auth.getSession()).data.session : null;
  const token = session?.access_token ?? anonKey;

  const res = await fetch(`${baseUrl}/functions/v1/${name}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      apikey: anonKey,
    },
    body: JSON.stringify(body),
  });

  const payload = (await res.json().catch(() => ({}))) as T & InvokeErrorBody;

  if (!res.ok) {
    const parts = [payload.error, payload.detail].filter(Boolean);
    throw new Error(parts.join(" — ") || `Payment request failed (${res.status})`);
  }

  return payload;
}

export function loadRazorpayScript(): Promise<boolean> {
  if (typeof window === "undefined") return Promise.resolve(false);
  if (window.Razorpay) return Promise.resolve(true);

  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => resolve(Boolean(window.Razorpay));
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export async function createRazorpayOrder(amountPaise: number, _receipt: string) {
  const data = await invokePaymentFunction<{ id?: string }>("create-order", {
    amount: amountPaise,
  });

  if (!data.id) {
    throw new Error("Could not start payment");
  }

  return data.id;
}

export async function verifyRazorpayPayment(response: RazorpayHandlerResponse) {
  const data = await invokePaymentFunction<{ success?: boolean; error?: string }>(
    "verify-payment",
    response
  );

  if (!data.success) {
    throw new Error(data.error ?? "Payment verification failed");
  }
}

export async function openRazorpayCheckout(
  options: Omit<RazorpayCheckoutOptions, "handler"> & {
    handler: (response: RazorpayHandlerResponse) => void | Promise<void>;
  }
) {
  const loaded = await loadRazorpayScript();
  if (!loaded || !window.Razorpay) {
    throw new Error("Razorpay checkout could not be loaded");
  }

  const instance = new window.Razorpay(options);
  instance.open();
}

export type { RazorpayHandlerResponse };

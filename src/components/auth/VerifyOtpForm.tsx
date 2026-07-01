"use client";

import {
  useRef,
  useState,
  type ChangeEvent,
  type ClipboardEvent,
  type FormEvent,
  type KeyboardEvent,
  type MouseEvent,
} from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { AUTH_ROUTES } from "@/lib/routes";

const CODE_LENGTH = 6;
const INVALID_CODE_MESSAGE = "Invalid or expired code. Try again.";

export function VerifyOtpForm() {
  const searchParams = useSearchParams();
  const emailParam = searchParams.get("email")?.trim() ?? "";

  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const [digits, setDigits] = useState<string[]>(() => Array(CODE_LENGTH).fill(""));
  const [email, setEmail] = useState(emailParam);
  const [formError, setFormError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [resending, setResending] = useState(false);

  const emailForAuth = emailParam || email.trim();
  const code = digits.join("");

  function updateDigit(index: number, rawValue: string) {
    const nextChar = rawValue.replace(/\D/g, "").slice(-1);
    setDigits((prev) => {
      const next = [...prev];
      next[index] = nextChar;
      return next;
    });
    setFormError(null);

    if (nextChar && index < CODE_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  }

  function handleEmailChange(event: ChangeEvent<HTMLInputElement>) {
    setEmail(event.currentTarget.value);
    setFormError(null);
  }

  function handleDigitChange(index: number, event: ChangeEvent<HTMLInputElement>) {
    updateDigit(index, event.currentTarget.value);
  }

  function handleKeyDown(index: number, event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Backspace" && !digits[index] && index > 0) {
      event.preventDefault();
      inputRefs.current[index - 1]?.focus();
    }
  }

  function handlePaste(event: ClipboardEvent<HTMLInputElement>) {
    event.preventDefault();

    const pasted = (event.clipboardData?.getData("text") ?? "")
      .replace(/\D/g, "")
      .slice(0, CODE_LENGTH);
    if (!pasted) return;

    const next = Array(CODE_LENGTH).fill("");
    pasted.split("").forEach((char, i) => {
      next[i] = char;
    });
    setDigits(next);
    setFormError(null);

    const focusIndex = Math.min(pasted.length, CODE_LENGTH - 1);
    inputRefs.current[focusIndex]?.focus();
  }

  function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void submitVerification();
  }

  async function submitVerification() {
    setFormError(null);
    setMessage(null);

    if (!emailForAuth) {
      setFormError("Enter the email you signed up with.");
      return;
    }

    if (code.length !== CODE_LENGTH) {
      setFormError("Enter the full 6-digit code.");
      return;
    }

    const supabase = createClient();
    if (!supabase) {
      setFormError("Auth is not configured. Add Supabase keys to .env.local.");
      return;
    }

    setSubmitting(true);

    console.log("[verify] email:", emailParam);
    console.log("[verify] token:", digits.join(""));

    const { data, error } = await supabase.auth.verifyOtp({
      email: emailForAuth,
      token: code,
      type: "signup",
    });

    console.log("[verify] result:", { data, error });

    setSubmitting(false);

    if (error) {
      setFormError(INVALID_CODE_MESSAGE);
      return;
    }

    if (!error) {
      window.location.href = "/account";
      return;
    }
  }

  function handleResendClick(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    void resendCode();
  }

  async function resendCode() {
    setFormError(null);
    setMessage(null);

    if (!emailForAuth) {
      setFormError("Enter the email you signed up with.");
      return;
    }

    const supabase = createClient();
    if (!supabase) {
      setFormError("Auth is not configured. Add Supabase keys to .env.local.");
      return;
    }

    setResending(true);

    const { error: resendError } = await supabase.auth.resend({
      type: "signup",
      email: emailForAuth,
    });

    setResending(false);

    if (resendError) {
      setFormError(resendError.message);
      return;
    }

    setMessage("A new code has been sent. Check your inbox and spam folder.");
    setDigits(Array(CODE_LENGTH).fill(""));
    inputRefs.current[0]?.focus();
  }

  return (
    <form onSubmit={handleFormSubmit} className="space-y-6" noValidate>
      {message && (
        <p className="border border-gold/30 bg-gold/10 px-4 py-3 font-body text-sm text-gold">
          {message}
        </p>
      )}
      {formError && (
        <p className="border border-red-500/30 bg-red-500/10 px-4 py-3 font-body text-sm text-red-300">
          {formError}
        </p>
      )}

      {emailParam ? (
        <p className="text-center font-body text-sm text-white/50">
          Code sent to <span className="text-gold">{emailParam}</span>
        </p>
      ) : (
        <div>
          <label
            htmlFor="verify-otp-email"
            className="mb-2 block font-body text-[10px] tracking-[0.25em] text-white/50 uppercase"
          >
            Email
          </label>
          <input
            id="verify-otp-email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={handleEmailChange}
            className="w-full border border-white/10 bg-black px-4 py-3 font-body text-sm text-white outline-none transition-colors focus:border-gold/50"
            placeholder="you@example.com"
          />
        </div>
      )}

      <div>
        <p className="mb-3 text-center font-body text-[10px] tracking-[0.25em] text-white/50 uppercase">
          Verification code
        </p>
        <div className="flex justify-center gap-2 sm:gap-3">
          {digits.map((digit, index) => (
            <input
              key={index}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              autoComplete={index === 0 ? "one-time-code" : "off"}
              maxLength={1}
              value={digit}
              onChange={(event) => handleDigitChange(index, event)}
              onKeyDown={(event) => handleKeyDown(index, event)}
              onPaste={handlePaste}
              aria-label={`Digit ${index + 1} of ${CODE_LENGTH}`}
              className="h-12 w-10 border border-white/10 bg-black text-center font-display text-xl text-white outline-none transition-colors focus:border-gold/50 sm:h-14 sm:w-12 sm:text-2xl"
            />
          ))}
        </div>
      </div>

      <button
        type="submit"
        disabled={submitting || resending}
        className="w-full border border-gold bg-gold/10 py-4 font-body text-xs tracking-[0.2em] text-gold uppercase transition-colors hover:bg-gold hover:text-black disabled:opacity-50"
      >
        {submitting ? "Verifying…" : "Verify Email"}
      </button>

      <button
        type="button"
        onClick={handleResendClick}
        disabled={submitting || resending}
        className="w-full border border-white/15 py-4 font-body text-xs tracking-[0.2em] text-white/70 uppercase transition-colors hover:border-gold/40 hover:text-gold disabled:opacity-50"
      >
        {resending ? "Sending…" : "Resend code"}
      </button>

      <p className="text-center font-body text-xs text-white/35">
        Wrong account?{" "}
        <Link href={AUTH_ROUTES.signup} className="text-gold hover:underline">
          Sign up again
        </Link>
      </p>
    </form>
  );
}

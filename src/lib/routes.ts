/** Client-safe route constants */
export const APP_DOWNLOAD_PATH = "/download";

export const LEGAL_ROUTES = {
  privacy: "/privacy",
  terms: "/terms",
  faq: "/faq",
} as const;

export const SHOP_ROUTES = {
  cart: "/cart",
  account: "/account",
  thankYou: "/thank-you",
  admin: "/admin",
} as const;

export const AUTH_ROUTES = {
  login: "/login",
  signup: "/signup",
  verify: "/verify",
  verifyEmail: "/verify-email",
  checkout: "/checkout",
  callback: "/auth/callback",
} as const;

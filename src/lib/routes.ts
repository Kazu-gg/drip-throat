/** Client-safe route constants */
export const APP_DOWNLOAD_PATH = "/download";

export const AUTH_ROUTES = {
  login: "/login",
  signup: "/signup",
  verifyEmail: "/verify-email",
  checkout: "/checkout",
  callback: "/auth/callback",
} as const;

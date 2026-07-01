import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

const DISALLOW = [
  "/api/",
  "/_next/",
  "/login",
  "/signup",
  "/verify",
  "/verify-email",
  "/checkout",
  "/cart",
  "/account",
  "/orders/",
  "/admin",
  "/auth/",
];

export default function robots(): MetadataRoute.Robots {
  const base = SITE_URL.replace(/\/$/, "");

  const allowAll = {
    userAgent: "*",
    allow: "/",
    disallow: DISALLOW,
  };

  return {
    rules: [
      allowAll,
      { userAgent: "Googlebot", allow: "/", disallow: DISALLOW },
      { userAgent: "Googlebot-Image", allow: "/" },
      { userAgent: "Bingbot", allow: "/", disallow: DISALLOW },
      { userAgent: "Slurp", allow: "/", disallow: DISALLOW },
      { userAgent: "DuckDuckBot", allow: "/", disallow: DISALLOW },
      { userAgent: "facebookexternalhit", allow: "/" },
      { userAgent: "Twitterbot", allow: "/" },
      { userAgent: "LinkedInBot", allow: "/" },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}

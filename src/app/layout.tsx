import type { Metadata } from "next";
import { Cormorant_Garamond, Inter, Cinzel } from "next/font/google";
import "./globals.css";
import { GoogleAnalytics } from "@/components/seo/Analytics";
import { CursorGlow } from "@/components/effects/CursorGlow";
import { homeMetadata, SITE_URL } from "@/lib/seo";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-inter",
  display: "swap",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-cinzel",
  display: "swap",
});

export const metadata: Metadata = {
  ...homeMetadata,
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
    ...(process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
      ? { other: { "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION } }
      : {}),
  },
  applicationName: "Chevellè",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  appleWebApp: {
    capable: true,
    title: "Chevellè",
    statusBarStyle: "black-translucent",
  },
  alternates: {
    ...homeMetadata.alternates,
    canonical: SITE_URL,
    languages: {
      "en-IN": SITE_URL,
      en: SITE_URL,
      "x-default": SITE_URL,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-IN"
      className={`${cormorant.variable} ${inter.variable} ${cinzel.variable}`}
    >
      <body className="font-body antialiased">
        <GoogleAnalytics />
        <CursorGlow />
        {children}
      </body>
    </html>
  );
}

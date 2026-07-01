import type { Metadata } from "next";

export const SITE_NAME = "Chevellè";
export const SITE_TAGLINE = "Curated Elegance";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.chevelle.in";

export const CONTACT_EMAIL = "support@chevelle.in";

export const SOCIAL = {
  instagram: "https://www.instagram.com/chevelleindia",
  twitter: "https://twitter.com/chevellefashion",
};

/** Default social sharing copy */
export const OG_DEFAULTS = {
  title: "Chevellè India — Luxury Fashion Online",
  description:
    "Chevellè India — premium curated fashion for women, men, and accessories. Designer sarees, lehengas, kurtas, and luxury ethnic wear with secure checkout.",
};

export const PRIMARY_KEYWORDS = [
  "Chevellè",
  "Chevellè India",
  "Chevelle India",
  "Chevelle fashion India",
  "Chevellè fashion",
  "Luxury Fashion India",
  "Premium Ethnic Wear",
  "Women's Fashion Online India",
  "Men's Fashion India",
  "Luxury Accessories India",
  "Designer ethnic wear India",
];

export const SECONDARY_KEYWORDS = [
  "Designer Sarees Online",
  "Kurti Sets",
  "Co-ord Sets",
  "Nehru Jackets",
  "Premium Handbags India",
  "Curated Elegance",
];

export const TARGET_KEYWORDS = [
  ...PRIMARY_KEYWORDS,
  ...SECONDARY_KEYWORDS,
  "Chevellè online",
  "shop Chevellè",
  "www.chevelle.in",
];

/** Exact page titles per SEO spec */
export const PAGE_TITLES = {
  home: "Chevellè India | Luxury Fashion Online — Curated Elegance",
  collections: "Shop Collections | Chevellè",
  blog: "Journal | Chevellè",
  products: "Shop All | Chevellè",
  download: "Get the App | Chevellè",
  login: "Sign In | Chevellè",
  signup: "Create Account | Chevellè",
  verifyEmail: "Verify Email | Chevellè",
  verify: "Enter Verification Code | Chevellè",
  checkout: "Checkout | Chevellè",
  privacy: "Privacy Policy | Chevellè",
  terms: "Terms & Conditions | Chevellè",
  faq: "FAQ | Chevellè",
  // Women
  sarees: "Sarees | Women | Chevellè",
  lehengas: "Lehengas | Women | Chevellè",
  "kurti-corset": "Kurti / Corset | Women | Chevellè",
  "co-ord-set": "Co-ord Set | Women | Chevellè",
  suit: "Suit | Women | Chevellè",
  "shirts-tshirt": "Shirts / T-Shirt | Women | Chevellè",
  // Men
  kurtas: "Kurtas | Men | Chevellè",
  "men-shirts": "Shirts | Men | Chevellè",
  "men-tshirts": "T-Shirts | Men | Chevellè",
  jeans: "Jeans | Men | Chevellè",
  pants: "Pants | Men | Chevellè",
  jackets: "Jackets | Men | Chevellè",
  // Accessories
  handbags: "Handbags | Accessories | Chevellè",
  jewellery: "Jewellery | Accessories | Chevellè",
  watches: "Watches | Accessories | Chevellè",
  sunglasses: "Sunglasses | Accessories | Chevellè",
  wallets: "Wallets | Accessories | Chevellè",
  belts: "Belts | Accessories | Chevellè",
} as const;

export const META_DESCRIPTIONS = {
  home: "Chevellè India — shop luxury fashion online. Designer sarees, lehengas, kurtas, co-ords, and accessories. Premium ethnic wear with secure Razorpay checkout.",
  collections:
    "Browse Chevellè collections — New Arrivals, Best Sellers, Wedding Edit, Festive Edit, and more. Women, men, and accessories.",
  blog: "Style notes and luxury fashion guidance from Chevellè — refined curation for modern Indian elegance.",
  products:
    "Shop Chevellè — curated luxury fashion across women, men, and accessories. Secure Razorpay checkout and order tracking.",
  download:
    "Get Chevellè on your phone. Browse collections, track orders, and shop curated luxury fashion — iOS and Android coming soon.",
  login:
    "Sign in to your Chevellè account to shop premium luxury fashion and access secure checkout.",
  signup:
    "Create a Chevellè account. Verify your email to unlock checkout for curated luxury fashion.",
  verifyEmail:
    "Verify your email to complete your Chevellè account and continue to secure checkout.",
  verify:
    "Enter the 6-digit verification code sent to your email to activate your Chevellè account.",
} as const;

export { APP_DOWNLOAD_PATH } from "@/lib/routes";

/** Trim descriptions to 150–160 characters for SERP */
export function metaDescription(text: string, max = 160): string {
  const trimmed = text.trim();
  if (trimmed.length <= max) return trimmed;
  const cut = trimmed.slice(0, max - 3);
  const lastSpace = cut.lastIndexOf(" ");
  return (lastSpace > 120 ? cut.slice(0, lastSpace) : cut).trimEnd() + "...";
}

export function productTitle(productName: string): string {
  return `${productName} | Chevellè`;
}

export function blogTitle(articleTitle: string): string {
  return `${articleTitle} | Chevellè`;
}

export function absoluteUrl(path = ""): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL.replace(/\/$/, "")}${normalized === "/" ? "" : normalized}`;
}

export function ogImageUrl(path: string, title?: string): string {
  const params = new URLSearchParams();
  if (title) params.set("title", title);
  const query = params.toString();
  return absoluteUrl(`${path}/opengraph-image${query ? `?${query}` : ""}`);
}

type BuildMetadataOptions = {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
  ogImage?: string;
  ogTitle?: string;
  ogDescription?: string;
  type?: "website" | "article";
  publishedTime?: string;
  noIndex?: boolean;
};

export function buildMetadata({
  title,
  description,
  path = "/",
  keywords = TARGET_KEYWORDS,
  ogImage,
  ogTitle = OG_DEFAULTS.title,
  ogDescription = OG_DEFAULTS.description,
  type = "website",
  publishedTime,
  noIndex = false,
}: BuildMetadataOptions): Metadata {
  const url = absoluteUrl(path);
  const desc = metaDescription(description);
  const image = ogImage ?? absoluteUrl("/opengraph-image");

  return {
    title,
    description: desc,
    keywords,
    authors: [{ name: SITE_NAME, url: SITE_URL }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: url,
      languages: { "en-IN": url, en: url },
    },
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      url,
      siteName: SITE_NAME,
      locale: "en_IN",
      type,
      ...(publishedTime && type === "article"
        ? { publishedTime, authors: [SITE_NAME] }
        : {}),
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: `${ogTitle} — ${SITE_TAGLINE}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: ogDescription,
      images: [image],
      creator: "@chevellefashion",
      site: "@chevellefashion",
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        },
    category: "fashion",
    other: {
      "geo.region": "IN",
      "geo.placename": "India",
      "content-language": "en-IN",
    },
  };
}

export const homeMetadata = buildMetadata({
  title: PAGE_TITLES.home,
  description: META_DESCRIPTIONS.home,
  path: "/",
  ogTitle: OG_DEFAULTS.title,
  ogDescription: OG_DEFAULTS.description,
});

export function collectionMetadata(
  collectionId: keyof typeof PAGE_TITLES,
  description: string,
  keywords: string[],
  ogImage?: string
): Metadata {
  const title =
    PAGE_TITLES[collectionId as keyof typeof PAGE_TITLES] ??
    `${collectionId} | Chevellè`;

  return buildMetadata({
    title,
    description,
    path: `/collections/${collectionId}`,
    keywords: [...keywords, ...PRIMARY_KEYWORDS.slice(0, 4)],
    ogImage,
    ogTitle: OG_DEFAULTS.title,
    ogDescription: metaDescription(description),
  });
}

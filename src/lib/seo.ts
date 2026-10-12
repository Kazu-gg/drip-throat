import type { Metadata } from "next";

export const SITE_NAME = "Dripthroat";
export const SITE_TAGLINE = "Curated Elegance";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.dripthroat.in";

export const CONTACT_EMAIL = "support@dripthroat.in";

export const SOCIAL = {
  instagram: "https://www.instagram.com/dripthroat",
  twitter: "https://twitter.com/dripthroat",
};

/** Default social sharing copy */
export const OG_DEFAULTS = {
  title: "Dripthroat India — Luxury Fashion Online",
  description:
    "Dripthroat India — premium curated fashion for women, men, and accessories. Designer sarees, lehengas, kurtas, and luxury ethnic wear with secure checkout.",
};

export const PRIMARY_KEYWORDS = [
  "Dripthroat",
  "Dripthroat India",
  "Dripthroat fashion India",
  "Dripthroat fashion",
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
  "Dripthroat online",
  "shop Dripthroat",
  "www.dripthroat.in",
];

/** Exact page titles per SEO spec */
export const PAGE_TITLES = {
  home: "Dripthroat India | Luxury Fashion Online — Curated Elegance",
  collections: "Shop Collections | Dripthroat",
  blog: "Journal | Dripthroat",
  products: "Shop All | Dripthroat",
  download: "Get the App | Dripthroat",
  login: "Sign In | Dripthroat",
  signup: "Create Account | Dripthroat",
  verifyEmail: "Verify Email | Dripthroat",
  verify: "Enter Verification Code | Dripthroat",
  checkout: "Checkout | Dripthroat",
  privacy: "Privacy Policy | Dripthroat",
  terms: "Terms & Conditions | Dripthroat",
  faq: "FAQ | Dripthroat",
  // Women
  sarees: "Sarees | Women | Dripthroat",
  lehengas: "Lehengas | Women | Dripthroat",
  "kurti-corset": "Kurti / Corset | Women | Dripthroat",
  "co-ord-set": "Co-ord Set | Women | Dripthroat",
  suit: "Suit | Women | Dripthroat",
  "shirts-tshirt": "Shirts / T-Shirt | Women | Dripthroat",
  // Men
  kurtas: "Kurtas | Men | Dripthroat",
  "men-shirts": "Shirts | Men | Dripthroat",
  "men-tshirts": "T-Shirts | Men | Dripthroat",
  jeans: "Jeans | Men | Dripthroat",
  pants: "Pants | Men | Dripthroat",
  jackets: "Jackets | Men | Dripthroat",
  // Accessories
  handbags: "Handbags | Accessories | Dripthroat",
  jewellery: "Jewellery | Accessories | Dripthroat",
  watches: "Watches | Accessories | Dripthroat",
  sunglasses: "Sunglasses | Accessories | Dripthroat",
  wallets: "Wallets | Accessories | Dripthroat",
  belts: "Belts | Accessories | Dripthroat",
} as const;

export const META_DESCRIPTIONS = {
  home: "Dripthroat India — shop luxury fashion online. Designer sarees, lehengas, kurtas, co-ords, and accessories. Premium ethnic wear with secure Razorpay checkout.",
  collections:
    "Browse Dripthroat collections — New Arrivals, Best Sellers, Wedding Edit, Festive Edit, and more. Women, men, and accessories.",
  blog: "Style notes and luxury fashion guidance from Dripthroat — refined curation for modern Indian elegance.",
  products:
    "Shop Dripthroat — curated luxury fashion across women, men, and accessories. Secure Razorpay checkout and order tracking.",
  download:
    "Get Dripthroat on your phone. Browse collections, track orders, and shop curated luxury fashion — iOS and Android coming soon.",
  login:
    "Sign in to your Dripthroat account to shop premium luxury fashion and access secure checkout.",
  signup:
    "Create a Dripthroat account. Verify your email to unlock checkout for curated luxury fashion.",
  verifyEmail:
    "Verify your email to complete your Dripthroat account and continue to secure checkout.",
  verify:
    "Enter the 6-digit verification code sent to your email to activate your Dripthroat account.",
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
  return `${productName} | Dripthroat`;
}

export function blogTitle(articleTitle: string): string {
  return `${articleTitle} | Dripthroat`;
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
      creator: "@dripthroat",
      site: "@dripthroat",
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
    `${collectionId} | Dripthroat`;

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

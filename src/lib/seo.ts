import type { Metadata } from "next";

export const SITE_NAME = "Chevellè";
export const SITE_TAGLINE = "Curated Elegance";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.chevelle.fashion";

export const CONTACT_EMAIL = "hello@chevelle.fashion";

export const SOCIAL = {
  instagram: "https://www.instagram.com/chevelleindia",
  twitter: "https://twitter.com/chevellefashion",
};

/** Default social sharing copy */
export const OG_DEFAULTS = {
  title: "Chevellè | Curated Elegance",
  description: "Premium fashion, timeless style, and curated collections.",
};

export const PRIMARY_KEYWORDS = [
  "Luxury Fashion India",
  "Women's Fashion Online",
  "Premium Ethnic Wear",
  "Designer Sarees Online",
  "Luxury Co-Ord Sets",
  "Premium Kurtis",
  "Women's Clothing India",
];

export const SECONDARY_KEYWORDS = [
  "Buy Sarees Online India",
  "Designer Lehengas",
  "Luxury Women's Fashion",
  "Premium Fashion Store India",
  "Women's Ethnic Wear Online",
  "Trendy Co-Ord Sets",
];

export const TARGET_KEYWORDS = [...PRIMARY_KEYWORDS, ...SECONDARY_KEYWORDS, "Chevellè"];

/** Exact page titles per SEO spec */
export const PAGE_TITLES = {
  home: "Chevellè | Luxury Fashion & Premium Women's Wear",
  collections: "Women's Fashion Collection | Chevellè",
  blog: "Luxury Fashion Blog | Chevellè",
  products: "Premium Women's Fashion | Chevellè",
  sarees: "Designer Sarees Online | Chevellè",
  lehengas: "Luxury Lehengas Collection | Chevellè",
  suits: "Premium Women's Suits Online | Chevellè",
  "co-ord": "Premium Co-Ord Sets For Women | Chevellè",
  kurti: "Premium Kurtis Online | Chevellè",
  western: "Luxury Western Wear For Women | Chevellè",
} as const;

export const META_DESCRIPTIONS = {
  home: "Discover Chevellè — India's premium luxury fashion destination. Shop designer sarees, lehengas, co-ord sets, kurtis & ethnic wear with fast delivery.",
  collections:
    "Explore Chevellè women's fashion collections — premium ethnic wear, designer sarees, luxury lehengas, co-ord sets & kurtis curated for modern elegance.",
  blog: "Expert luxury fashion guides, saree trends, styling tips & ethnic wear inspiration from Chevellè — India's premium women's fashion brand.",
  products:
    "Shop Chevellè bestsellers — premium designer sarees, luxury lehengas, co-ord sets & kurtis. Curated women's fashion with secure checkout & fast delivery.",
} as const;

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

import {
  SITE_NAME,
  SITE_TAGLINE,
  SITE_URL,
  CONTACT_EMAIL,
  SOCIAL,
  absoluteUrl,
  OG_DEFAULTS,
} from "@/lib/seo";
import { collections, reviews, faqItems } from "@/lib/data";
import { products, type Product } from "@/lib/products";
import type { BlogPost } from "@/lib/blog";

type JsonLd = Record<string, unknown>;

export function organizationSchema(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    alternateName: [
      "Dripthroat India",
      "Dripthroat Fashion",
      "Dripthroat Fashion India",
      "dripthroat.in",
    ],
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: absoluteUrl("/opengraph-image"),
      width: 1200,
      height: 630,
    },
    description: OG_DEFAULTS.description,
    slogan: SITE_TAGLINE,
    email: CONTACT_EMAIL,
    sameAs: [SOCIAL.instagram, SOCIAL.twitter],
    areaServed: {
      "@type": "Country",
      name: "India",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: CONTACT_EMAIL,
      availableLanguage: ["English", "Hindi"],
      areaServed: "IN",
    },
  };
}

export function onlineStoreSchema(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "OnlineStore",
    "@id": `${SITE_URL}/#store`,
    name: `${SITE_NAME} India`,
    alternateName: ["Dripthroat India"],
    url: SITE_URL,
    description: OG_DEFAULTS.description,
    image: absoluteUrl("/opengraph-image"),
    priceRange: "₹₹₹",
    currenciesAccepted: "INR",
    paymentAccepted: "Credit Card, Debit Card, UPI, Net Banking, Cash on Delivery",
    areaServed: {
      "@type": "Country",
      name: "India",
    },
    brand: { "@id": `${SITE_URL}/#organization` },
    parentOrganization: { "@id": `${SITE_URL}/#organization` },
  };
}

export function websiteSchema(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: `${SITE_NAME} India`,
    alternateName: ["Dripthroat India", "Dripthroat Fashion"],
    url: SITE_URL,
    description: OG_DEFAULTS.description,
    inLanguage: "en-IN",
    publisher: { "@id": `${SITE_URL}/#organization` },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/products`,
      },
    },
  };
}

export function productSchema(product: Product): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.image.src,
    sku: product.id,
    brand: { "@type": "Brand", name: SITE_NAME },
    category: product.category,
    url: absoluteUrl(`/products/${product.slug}`),
    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      price: product.price.toString(),
      availability: "https://schema.org/InStock",
      url: absoluteUrl(`/products/${product.slug}`),
      seller: { "@id": `${SITE_URL}/#organization` },
    },
  };
}

export function itemListSchema(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Dripthroat Fashion Collections",
    numberOfItems: collections.length,
    itemListElement: collections.map((collection, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: `${collection.name} — ${collection.parentId}`,
      url: absoluteUrl(`/collections/${collection.id}`),
    })),
  };
}

export function productListSchema(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Dripthroat Bestsellers",
    itemListElement: products.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: productSchema(product),
    })),
  };
}

export function faqSchema(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

export function breadcrumbSchema(
  items: { name: string; path: string }[]
): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function collectionPageSchema(collection: {
  id: string;
  name: string;
  seoDescription: string;
  image?: string;
  keywords: string[];
}): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${collection.name} — ${SITE_NAME}`,
    description: collection.seoDescription,
    url: absoluteUrl(`/collections/${collection.id}`),
    ...(collection.image ? { image: collection.image } : {}),
    isPartOf: { "@id": `${SITE_URL}/#website` },
    keywords: collection.keywords.join(", "),
    provider: { "@id": `${SITE_URL}/#organization` },
  };
}

export function blogPostingSchema(post: BlogPost): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.seoDescription,
    image: post.image.src,
    datePublished: post.publishedAt,
    author: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/opengraph-image"),
      },
    },
    mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
    keywords: post.seoKeywords.join(", "),
    articleSection: post.category,
  };
}

export function homePageSchemas(): JsonLd[] {
  return [
    organizationSchema(),
    onlineStoreSchema(),
    websiteSchema(),
    itemListSchema(),
    productListSchema(),
    faqSchema(),
    breadcrumbSchema([{ name: "Home", path: "/" }]),
  ];
}

import {
  SITE_NAME,
  SITE_TAGLINE,
  SITE_URL,
  CONTACT_EMAIL,
  SOCIAL,
  absoluteUrl,
  OG_DEFAULTS,
} from "@/lib/seo";
import { collections } from "@/lib/data";
import { products, type Product } from "@/lib/products";
import { reviews } from "@/lib/data";
import type { BlogPost } from "@/lib/blog";

type JsonLd = Record<string, unknown>;

export function organizationSchema(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    alternateName: ["Chevelle Fashion", "Chevellè India"],
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
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: CONTACT_EMAIL,
      availableLanguage: ["English", "Hindi"],
      areaServed: "IN",
    },
  };
}

export function websiteSchema(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: SITE_NAME,
    alternateName: "Chevellè Fashion",
    url: SITE_URL,
    description: OG_DEFAULTS.description,
    inLanguage: "en-IN",
    publisher: { "@id": `${SITE_URL}/#organization` },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/collections?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
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
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "1",
      bestRating: "5",
    },
  };
}

export function itemListSchema(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Chevellè Fashion Collections",
    numberOfItems: collections.length,
    itemListElement: collections.map((collection, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: collection.name,
      url: absoluteUrl(`/collections/${collection.id}`),
      image: collection.image,
    })),
  };
}

export function productListSchema(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Chevellè Bestsellers",
    itemListElement: products.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: productSchema(product),
    })),
  };
}

export const faqItems = [
  {
    question: "What is Chevellè?",
    answer:
      "Chevellè is a premium luxury fashion brand in India offering curated women's clothing — designer sarees, lehengas, co-ord sets, kurtis, suits, and western wear with fast delivery nationwide.",
  },
  {
    question: "Does Chevellè deliver across India?",
    answer:
      "Yes. Chevellè offers fast, reliable delivery to cities and towns across India. Track your order in real time through our website or mobile app.",
  },
  {
    question: "Where can I buy designer sarees online in India?",
    answer:
      "Shop designer sarees online at Chevellè — India's premium fashion destination for luxury silk sarees, wedding sarees, and festive ethnic wear with secure checkout.",
  },
  {
    question: "What are the best luxury co-ord sets for women?",
    answer:
      "Chevellè offers premium co-ord sets crafted in luxury fabrics with perfectly matched silhouettes — ideal for parties, brunches, and modern Indian fashion.",
  },
  {
    question: "Is Chevellè good for wedding ethnic wear?",
    answer:
      "Absolutely. Chevellè curates bridal lehengas, designer sarees, and anarkali suits for weddings and celebrations with premium fabrics and craftsmanship.",
  },
  {
    question: "How do I shop women's fashion online at Chevellè?",
    answer:
      "Browse collections at chevelle.fashion, explore individual products, or download the Chevellè Android app for faster shopping and exclusive launches.",
  },
];

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
  image: string;
  keywords: string[];
}): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${collection.name} — ${SITE_NAME}`,
    description: collection.seoDescription,
    url: absoluteUrl(`/collections/${collection.id}`),
    image: collection.image,
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
    websiteSchema(),
    itemListSchema(),
    productListSchema(),
    faqSchema(),
    breadcrumbSchema([{ name: "Home", path: "/" }]),
  ];
}

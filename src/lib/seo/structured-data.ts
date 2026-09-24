import { clientConfig } from "@/lib/env-client";

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: clientConfig.NEXT_PUBLIC_SITE_NAME,
    url: clientConfig.NEXT_PUBLIC_SITE_URL,
    logo: `${clientConfig.NEXT_PUBLIC_SITE_URL}/favicon.ico`,
    telephone: clientConfig.NEXT_PUBLIC_PHONE || undefined,
    address: {
      "@type": "PostalAddress",
      addressCountry: "VN",
    },
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${clientConfig.NEXT_PUBLIC_SITE_URL}${item.url}`,
    })),
  };
}

export function articleSchema(input: {
  title: string;
  description?: string;
  image?: string;
  publishedAt: Date | string;
  url: string;
}) {
  const date = typeof input.publishedAt === "string" ? input.publishedAt : input.publishedAt.toISOString();
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.title,
    description: input.description,
    image: input.image,
    datePublished: date,
    dateModified: date,
    author: {
      "@type": "Organization",
      name: clientConfig.NEXT_PUBLIC_SITE_NAME,
    },
    publisher: {
      "@type": "Organization",
      name: clientConfig.NEXT_PUBLIC_SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: `${clientConfig.NEXT_PUBLIC_SITE_URL}/favicon.ico`,
      },
    },
    mainEntityOfPage: `${clientConfig.NEXT_PUBLIC_SITE_URL}${input.url}`,
  };
}
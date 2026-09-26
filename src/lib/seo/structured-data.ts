const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || "https://xaydungdonga.netlify.app";

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Công ty TNHH Tư vấn Thiết kế - Xây dựng Đông Á",
    url: BASE_URL,
    logo: `${BASE_URL}/logo.png`,
    description:
      "Tư vấn - Thiết kế - Giám sát - Thi công xây dựng dân dụng, công nghiệp và hạ tầng.",
    address: {
      "@type": "PostalAddress",
      addressCountry: "VN",
    },
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Xây dựng Đông Á",
    url: BASE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: `${BASE_URL}/tim-kiem?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${BASE_URL}${item.url}`,
    })),
  };
}

export function articleSchema(input: {
  title: string;
  description?: string;
  image?: string;
  publishedAt: Date | string;
  updatedAt?: Date | string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.title,
    description: input.description,
    image: input.image,
    datePublished: new Date(input.publishedAt).toISOString(),
    dateModified: new Date(input.updatedAt || input.publishedAt).toISOString(),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": input.url.startsWith("http") ? input.url : `${BASE_URL}${input.url}`,
    },
  };
}

export function projectSchema(input: {
  title: string;
  description?: string;
  image?: string;
  location?: string;
  year?: number;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: input.title,
    description: input.description,
    image: input.image,
    locationCreated: input.location,
    dateCreated: input.year?.toString(),
    url: input.url.startsWith("http") ? input.url : `${BASE_URL}${input.url}`,
  };
}
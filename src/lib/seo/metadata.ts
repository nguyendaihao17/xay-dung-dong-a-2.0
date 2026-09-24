import type { Metadata } from "next";
import { clientConfig } from "@/lib/env-client";

type SeoInput = {
  title: string;
  description?: string | null;
  image?: string | null;
  path?: string;
  noIndex?: boolean;
  type?: "website" | "article";
  publishedTime?: string;
};

export function buildMetadata(input: SeoInput): Metadata {
  const url = input.path ? `${clientConfig.NEXT_PUBLIC_SITE_URL}${input.path}` : undefined;

  return {
    title: input.title,
    description: input.description || undefined,
    alternates: url ? { canonical: url } : undefined,
    robots: input.noIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      title: input.title,
      description: input.description || undefined,
      url,
      siteName: clientConfig.NEXT_PUBLIC_SITE_NAME,
      type: input.type || "website",
      images: input.image ? [{ url: input.image }] : undefined,
      locale: "vi_VN",
    },
    twitter: {
      card: "summary_large_image",
      title: input.title,
      description: input.description || undefined,
      images: input.image ? [input.image] : undefined,
    },
  };
}
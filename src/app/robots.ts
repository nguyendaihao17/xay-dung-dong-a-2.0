import type { MetadataRoute } from "next";
import { clientConfig } from "@/lib/env-client";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/api"],
      },
    ],
    sitemap: `${clientConfig.NEXT_PUBLIC_SITE_URL}/sitemap.xml`,
  };
}
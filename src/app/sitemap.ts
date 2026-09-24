import type { MetadataRoute } from "next";
import { clientConfig } from "@/lib/env-client";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = clientConfig.NEXT_PUBLIC_SITE_URL;

  const [projects, articles, services, careers] = await Promise.all([
    prisma.project.findMany({ where: { published: true }, select: { slug: true, updatedAt: true } }),
    prisma.article.findMany({ where: { published: true }, select: { slug: true, updatedAt: true } }),
    prisma.service.findMany({ where: { published: true }, select: { slug: true, updatedAt: true } }),
    prisma.career.findMany({ where: { published: true }, select: { slug: true, updatedAt: true } }),
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/gioi-thieu`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/dich-vu`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/du-an`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/tin-tuc`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/thu-vien`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/tuyen-dung`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/lien-he`, changeFrequency: "yearly", priority: 0.5 },
  ];

  return [
    ...staticRoutes,
    ...services.map((s) => ({
      url: `${base}/dich-vu/${s.slug}`,
      lastModified: s.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...projects.map((p) => ({
      url: `${base}/du-an/${p.slug}`,
      lastModified: p.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...articles.map((a) => ({
      url: `${base}/tin-tuc/${a.slug}`,
      lastModified: a.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...careers.map((c) => ({
      url: `${base}/tuyen-dung/${c.slug}`,
      lastModified: c.updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })),
  ];
}
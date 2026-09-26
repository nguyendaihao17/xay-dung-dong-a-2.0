import type { MetadataRoute } from "next";
import { prisma } from "@/lib/db";

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || "https://xaydungdonga.netlify.app";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Trang tĩnh
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/gioi-thieu`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/dich-vu`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/du-an`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/tin-tuc`, lastModified: new Date(), changeFrequency: "daily", priority: 0.8 },
    { url: `${BASE_URL}/tuyen-dung`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE_URL}/lien-he`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  ];

  try {
    // Dự án động
    const projects = await prisma.project.findMany({
      where: { published: true },
      select: { slug: true, updatedAt: true },
    });

    // Bài viết động
    const articles = await prisma.article.findMany({
      where: { published: true },
      select: { slug: true, updatedAt: true },
    });

    // Dịch vụ động
    const services = await prisma.service.findMany({
      where: { published: true },
      select: { slug: true, updatedAt: true },
    });

    // Tuyển dụng động
    const careers = await prisma.career.findMany({
      where: { published: true },
      select: { slug: true, updatedAt: true },
    });

    return [
      ...staticRoutes,
      ...projects.map((p) => ({
        url: `${BASE_URL}/du-an/${p.slug}`,
        lastModified: p.updatedAt,
        changeFrequency: "monthly" as const,
        priority: 0.7,
      })),
      ...articles.map((a) => ({
        url: `${BASE_URL}/tin-tuc/${a.slug}`,
        lastModified: a.updatedAt,
        changeFrequency: "weekly" as const,
        priority: 0.6,
      })),
      ...services.map((s) => ({
        url: `${BASE_URL}/dich-vu/${s.slug}`,
        lastModified: s.updatedAt,
        changeFrequency: "monthly" as const,
        priority: 0.7,
      })),
      ...careers.map((c) => ({
        url: `${BASE_URL}/tuyen-dung/${c.slug}`,
        lastModified: c.updatedAt,
        changeFrequency: "weekly" as const,
        priority: 0.6,
      })),
    ];
  } catch {
    return staticRoutes;
  }
}
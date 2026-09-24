import { prisma } from "@/lib/db";
import type { Prisma } from "@prisma/client";

export const projectRepository = {
  list(opts: { published?: boolean; featured?: boolean; categoryId?: string; limit?: number; skip?: number } = {}) {
    return prisma.project.findMany({
      where: {
        ...(opts.published !== undefined ? { published: opts.published } : {}),
        ...(opts.featured !== undefined ? { featured: opts.featured } : {}),
        ...(opts.categoryId ? { categoryId: opts.categoryId } : {}),
      },
      include: { category: true, coverImage: true },
      orderBy: [{ sortOrder: "asc" }, { publishedAt: "desc" }, { createdAt: "desc" }],
      take: opts.limit,
      skip: opts.skip,
    });
  },
  count(where: Prisma.ProjectWhereInput = {}) {
    return prisma.project.count({ where });
  },
  bySlug(slug: string) {
    return prisma.project.findUnique({
      where: { slug },
      include: {
        category: true,
        coverImage: true,
        ogImage: true,
        gallery: { include: { media: true }, orderBy: { sortOrder: "asc" } },
      },
    });
  },
  byId(id: string) {
    return prisma.project.findUnique({
      where: { id },
      include: { gallery: { include: { media: true } } },
    });
  },
};

export type ProjectList = Awaited<ReturnType<typeof projectRepository.list>>;
export type ProjectDetail = Awaited<ReturnType<typeof projectRepository.bySlug>>;
import { prisma } from "@/lib/db";

export const serviceRepository = {
  list(opts: { published?: boolean; featured?: boolean; limit?: number } = {}) {
    return prisma.service.findMany({
      where: {
        ...(opts.published !== undefined ? { published: opts.published } : {}),
        ...(opts.featured !== undefined ? { featured: opts.featured } : {}),
      },
      include: { coverImage: true },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
      take: opts.limit,
    });
  },
  bySlug(slug: string) {
    return prisma.service.findUnique({
      where: { slug },
      include: { coverImage: true, ogImage: true },
    });
  },
};

export type ServiceList = Awaited<ReturnType<typeof serviceRepository.list>>;
export type ServiceDetail = Awaited<ReturnType<typeof serviceRepository.bySlug>>;
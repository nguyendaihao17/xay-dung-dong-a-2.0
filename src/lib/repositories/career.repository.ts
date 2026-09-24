import { prisma } from "@/lib/db";

export const careerRepository = {
  list(published?: boolean) {
    return prisma.career.findMany({
      where: published !== undefined ? { published } : {},
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    });
  },
  count(published?: boolean) {
    return prisma.career.count({ where: published !== undefined ? { published } : {} });
  },
  bySlug(slug: string) {
    return prisma.career.findUnique({ where: { slug } });
  },
};

export type CareerList = Awaited<ReturnType<typeof careerRepository.list>>;
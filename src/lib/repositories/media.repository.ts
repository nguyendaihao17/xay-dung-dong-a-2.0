import { prisma } from "@/lib/db";

export const mediaRepository = {
  list(opts: { limit?: number; skip?: number } = {}) {
    return prisma.media.findMany({
      orderBy: { createdAt: "desc" },
      take: opts.limit ?? 60,
      skip: opts.skip ?? 0,
    });
  },
  count() {
    return prisma.media.count();
  },
  byId(id: string) {
    return prisma.media.findUnique({ where: { id } });
  },
};

export type MediaItem = Awaited<ReturnType<typeof mediaRepository.list>>[number];
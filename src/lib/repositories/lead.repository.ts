import { prisma } from "@/lib/db";

export const leadRepository = {
  list(opts: { status?: string; limit?: number; skip?: number } = {}) {
    return prisma.contactLead.findMany({
      where: opts.status ? { status: opts.status as never } : {},
      orderBy: { createdAt: "desc" },
      take: opts.limit ?? 50,
      skip: opts.skip,
    });
  },
  count(status?: string) {
    return prisma.contactLead.count({ where: status ? { status: status as never } : {} });
  },
  recent(limit = 5) {
    return prisma.contactLead.findMany({ orderBy: { createdAt: "desc" }, take: limit });
  },
};

export type LeadList = Awaited<ReturnType<typeof leadRepository.list>>;
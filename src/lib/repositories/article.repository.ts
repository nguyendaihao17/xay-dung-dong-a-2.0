import { prisma } from "@/lib/db";

export const articleRepository = {
  list(opts: { published?: boolean; featured?: boolean; limit?: number; skip?: number } = {}) {
    return prisma.article.findMany({
      where: {
        ...(opts.published !== undefined ? { published: opts.published } : {}),
        ...(opts.featured !== undefined ? { featured: opts.featured } : {}),
      },
      include: { category: true, coverImage: true, author: true },
      orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
      take: opts.limit,
      skip: opts.skip,
    });
  },
  count(published?: boolean) {
    return prisma.article.count({ where: published !== undefined ? { published } : {} });
  },
  bySlug(slug: string) {
    return prisma.article.findUnique({
      where: { slug },
      include: { category: true, coverImage: true, ogImage: true, author: true },
    });
  },
};

export type ArticleList = Awaited<ReturnType<typeof articleRepository.list>>;
export type ArticleDetail = Awaited<ReturnType<typeof articleRepository.bySlug>>;
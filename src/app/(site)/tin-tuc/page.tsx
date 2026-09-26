import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/site/page-hero";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { ArticleCard } from "@/components/site/article-card";
import { CTABlock } from "@/components/site/cta-block";
import { prisma } from "@/lib/db";
import { buildMetadata } from "@/lib/seo/metadata";

export const revalidate = 900;

export const metadata: Metadata = buildMetadata({
  title: "Tin tức",
  description:
    "Tin tức, sự kiện và câu chuyện từ Công ty TNHH Tư vấn Thiết kế - Xây dựng Đông Á.",
  path: "/tin-tuc",
});

type ArticleRow = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  coverImage: { url: string } | null;
  category: { name: string } | null;
  publishedAt: Date | null;
  createdAt: Date;
  featured: boolean;
};

async function getArticles(): Promise<ArticleRow[]> {
  try {
    return (await prisma.article.findMany({
      where: { published: true },
      orderBy: [{ featured: "desc" }, { publishedAt: "desc" }, { createdAt: "desc" }],
      take: 20,
      include: {
        coverImage: { select: { url: true } },
        category: { select: { name: true } },
      },
    })) as unknown as ArticleRow[];
  } catch {
    return [];
  }
}

export default async function NewsPage() {
  const articles = await getArticles();

  return (
    <>
      <PageHero
        eyebrow="Tin tức"
        title="Câu chuyện & sự kiện"
        description="Cập nhật tin tức mới nhất về các dự án, sự kiện và hoạt động của Đông Á."
        crumbs={[{ label: "Tin tức" }]}
      />

      <Section>
        <Container>
          {articles.length === 0 ? (
            <div className="mx-auto max-w-2xl py-20 text-center">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-neutral-100">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-neutral-400">
                  <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/>
                  <path d="M18 14h-8M15 18h-5M10 6h8v4h-8V6Z"/>
                </svg>
              </div>
              <h3 className="mt-6 font-display text-2xl font-bold uppercase text-navy-900">
                Chưa có bài viết nào
              </h3>
              <p className="mt-3 text-base text-neutral-600">
                Các bài viết sẽ được cập nhật sớm. Vui lòng quay lại sau.
              </p>
              <Link
                href="/lien-he"
                className="mt-8 inline-flex items-center gap-2 bg-navy-900 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white hover:bg-navy-800"
              >
                Liên hệ tư vấn
              </Link>
            </div>
          ) : (
            <>
              <div className="mb-10 flex items-end justify-between">
                <p className="text-sm text-neutral-500">
                  Hiển thị <span className="font-semibold text-navy-900">{articles.length}</span> bài viết
                </p>
              </div>

              <div className="grid auto-rows-auto gap-6 md:grid-cols-2 lg:grid-cols-3">
                {articles.map((a, idx) => (
                  <ArticleCard
                    key={a.id}
                    title={a.title}
                    slug={a.slug}
                    excerpt={a.excerpt}
                    coverImageUrl={a.coverImage?.url ?? null}
                    categoryName={a.category?.name ?? null}
                    publishedAt={a.publishedAt || a.createdAt}
                    featured={a.featured}
                    big={idx === 0}
                  />
                ))}
              </div>
            </>
          )}
        </Container>
      </Section>

      <CTABlock />
    </>
  );
}
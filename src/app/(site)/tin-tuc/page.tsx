import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { PageHero } from "@/components/site/page-hero";
import { ArticleCard } from "@/components/site/article-card";
import { CTABlock } from "@/components/site/cta-block";
import { articleRepository } from "@/lib/repositories/article.repository";
import { buildMetadata } from "@/lib/seo/metadata";

export const revalidate = 900;

export const metadata: Metadata = buildMetadata({
  title: "Tin tức",
  description: "Cập nhật tin tức, kiến thức và kinh nghiệm trong ngành xây dựng.",
  path: "/tin-tuc",
});

export default async function NewsPage() {
  const articles = await articleRepository.list({ published: true }).catch(() => []);

  return (
    <>
      <PageHero
        eyebrow="Tin tức"
        title="Kiến thức & tin tức"
        description="Cập nhật xu hướng, kinh nghiệm và thông tin mới nhất trong ngành xây dựng."
        crumbs={[{ label: "Tin tức" }]}
      />

      <Section>
        <Container>
          {articles.length === 0 ? (
            <p className="py-20 text-center text-neutral-500">Chưa có bài viết nào được đăng.</p>
          ) : (
            <div className="grid gap-x-8 gap-y-16 lg:grid-cols-3">
              {articles.map((a) => (
                <ArticleCard
                  key={a.id}
                  slug={a.slug}
                  title={a.title}
                  excerpt={a.excerpt || undefined}
                  category={a.category?.name}
                  publishedAt={a.publishedAt || undefined}
                  coverImage={a.coverImage?.url}
                />
              ))}
            </div>
          )}
        </Container>
      </Section>

      <CTABlock />
    </>
  );
}
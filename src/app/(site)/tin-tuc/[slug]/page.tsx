import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { PageHero } from "@/components/site/page-hero";
import { RichContent } from "@/components/site/rich-content";
import { CTABlock } from "@/components/site/cta-block";
import { JsonLd } from "@/components/site/json-ld";
import { articleSchema, breadcrumbSchema } from "@/lib/seo/structured-data";
import { articleRepository } from "@/lib/repositories/article.repository";
import { buildMetadata } from "@/lib/seo/metadata";
import { formatDate } from "@/lib/utils";

export const revalidate = 900;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await articleRepository.bySlug(slug).catch(() => null);
  if (!article) return buildMetadata({ title: "Bài viết" });
  return buildMetadata({
    title: article.seoTitle || article.title,
    description: article.metaDescription || article.excerpt,
    image: article.ogImage?.url || article.coverImage?.url,
    path: `/tin-tuc/${article.slug}`,
    noIndex: article.noIndex,
    type: "article",
  });
}

export default async function ArticleDetailPage({ params }: Props) {
  const { slug } = await params;
  const article = await articleRepository.bySlug(slug).catch(() => null);
  if (!article) notFound();

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Trang chủ", url: "/" },
            { name: "Tin tức", url: "/tin-tuc" },
            { name: article.title, url: `/tin-tuc/${article.slug}` },
          ]),
          articleSchema({
            title: article.title,
            description: article.excerpt || undefined,
            image: article.coverImage?.url || undefined,
            publishedAt: article.publishedAt || article.createdAt,
            url: `/tin-tuc/${article.slug}`,
          }),
        ]}
      />

      <PageHero
        eyebrow={article.category?.name || "Bài viết"}
        title={article.title}
        description={article.excerpt || undefined}
        crumbs={[{ label: "Tin tức", href: "/tin-tuc" }, { label: article.title }]}
      />

      {article.coverImage?.url && (
        <Container className="pt-12">
          <div className="relative aspect-[16/9] w-full overflow-hidden bg-neutral-100">
            <Image
              src={article.coverImage.url}
              alt={article.title}
              fill
              sizes="100vw"
              className="object-cover"
              priority
            />
          </div>
        </Container>
      )}

      <Section>
        <Container>
          <div className="mx-auto max-w-3xl">
            <div className="mb-8 text-sm text-neutral-500">
              <time>{formatDate(article.publishedAt || article.createdAt)}</time>
            </div>
            <RichContent content={article.content as unknown} />
          </div>
        </Container>
      </Section>

      <CTABlock />
    </>
  );
}
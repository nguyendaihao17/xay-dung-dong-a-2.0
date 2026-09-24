import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { PageHero } from "@/components/site/page-hero";
import { RichContent } from "@/components/site/rich-content";
import { CTABlock } from "@/components/site/cta-block";
import { ARTICLES } from "@/lib/placeholder-data";
import { formatDate } from "@/lib/utils";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = ARTICLES.find((a) => a.slug === slug);
  if (!article) return { title: "Bài viết" };
  return { title: article.title, description: article.excerpt };
}

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export default async function ArticleDetailPage({ params }: Props) {
  const { slug } = await params;
  const article = ARTICLES.find((a) => a.slug === slug);
  if (!article) notFound();

  return (
    <>
      <PageHero
        eyebrow={article.category}
        title={article.title}
        description={article.excerpt}
        crumbs={[{ label: "Tin tức", href: "/tin-tuc" }, { label: article.title }]}
      />

      <Section>
        <Container>
          <div className="mx-auto max-w-3xl">
            <div className="mb-8 text-sm text-neutral-500">
              <time>{formatDate(article.publishedAt)}</time>
            </div>
            <RichContent html={article.content} />
          </div>
        </Container>
      </Section>

      <CTABlock />
    </>
  );
}
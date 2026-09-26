import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, User, Tag } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { PageHero } from "@/components/site/page-hero";
import { RichContent } from "@/components/site/rich-content";
import { CTABlock } from "@/components/site/cta-block";
import { ArticleCard } from "@/components/site/article-card";
import { prisma } from "@/lib/db";
import { buildMetadata } from "@/lib/seo/metadata";

export const revalidate = 900;

type Props = { params: Promise<{ slug: string }> };

function formatDate(d: Date | null | undefined) {
  if (!d) return "";
  return new Intl.DateTimeFormat("vi-VN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(d));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const a = await prisma.article.findUnique({
      where: { slug },
      include: { coverImage: { select: { url: true } } },
    });
    if (!a) return buildMetadata({ title: "Bài viết" });
    return buildMetadata({
      title: a.title,
      description: a.excerpt || undefined,
      image: a.coverImage?.url,
      path: `/tin-tuc/${a.slug}`,
    });
  } catch {
    return buildMetadata({ title: "Bài viết" });
  }
}

export default async function ArticleDetailPage({ params }: Props) {
  const { slug } = await params;

  let article = null;
  let related: any[] = [];

  try {
    article = await prisma.article.findUnique({
      where: { slug },
      include: {
        coverImage: { select: { url: true } },
        category: { select: { id: true, name: true } },
      },
    });

    if (article) {
      related = await prisma.article.findMany({
        where: {
          published: true,
          id: { not: article.id },
          ...(article.categoryId ? { categoryId: article.categoryId } : {}),
        },
        orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
        take: 3,
        include: {
          coverImage: { select: { url: true } },
          category: { select: { name: true } },
        },
      });
    }
  } catch {
    article = null;
  }

  if (!article) notFound();

  return (
    <>
      <PageHero
        eyebrow={article.category?.name || "Bài viết"}
        title={article.title}
        description={article.excerpt || undefined}
        crumbs={[
          { label: "Tin tức", href: "/tin-tuc" },
          { label: article.title },
        ]}
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
        <Container size="narrow">
          <Link
            href="/tin-tuc"
            className="mb-8 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-neutral-500 transition-colors hover:text-accent"
          >
            <ArrowLeft size={14} />
            Quay lại tin tức
          </Link>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-6 border-y border-neutral-200 py-5 text-xs font-medium uppercase tracking-wider text-neutral-500">
            <span className="inline-flex items-center gap-2">
              <Calendar size={14} />
              <time>{formatDate(article.publishedAt || article.createdAt)}</time>
            </span>
            
            {article.category?.name && (
              <span className="inline-flex items-center gap-2">
                <Tag size={14} />
                {article.category.name}
              </span>
            )}
          </div>

          {/* Content */}
          <article className="mt-10">
            <RichContent content={article.content as never} />
          </article>
        </Container>
      </Section>

      {/* Related */}
      {related.length > 0 && (
        <Section className="border-t border-neutral-200 bg-neutral-50">
          <Container>
            <div className="text-center">
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
                Bài viết khác
              </span>
              <h2 className="mt-3 font-display text-3xl font-bold uppercase text-navy-900 md:text-4xl">
                Có thể bạn quan tâm
              </h2>
              <div className="mx-auto mt-6 h-1 w-16 bg-accent" />
            </div>

            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((a) => (
                <ArticleCard
                  key={a.id}
                  title={a.title}
                  slug={a.slug}
                  excerpt={a.excerpt}
                  coverImageUrl={a.coverImage?.url ?? null}
                  categoryName={a.category?.name ?? null}
                  publishedAt={a.publishedAt || a.createdAt}
                />
              ))}
            </div>
          </Container>
        </Section>
      )}

      <CTABlock />
    </>
  );
}
import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { PageHero } from "@/components/site/page-hero";
import { ArticleCard } from "@/components/site/article-card";
import { CTABlock } from "@/components/site/cta-block";
import { ARTICLES } from "@/lib/placeholder-data";

export const metadata: Metadata = {
  title: "Tin tức",
  description:
    "Cập nhật tin tức, kiến thức và kinh nghiệm trong ngành xây dựng từ Công ty TNHH Xây dựng Đông Á.",
};

export default function NewsPage() {
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
          <div className="grid gap-x-8 gap-y-16 lg:grid-cols-3">
            {ARTICLES.map((a) => (
              <ArticleCard
                key={a.slug}
                slug={a.slug}
                title={a.title}
                excerpt={a.excerpt}
                category={a.category}
                publishedAt={a.publishedAt}
              />
            ))}
          </div>
        </Container>
      </Section>

      <CTABlock />
    </>
  );
}
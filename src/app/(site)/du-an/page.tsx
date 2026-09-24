import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { PageHero } from "@/components/site/page-hero";
import { ProjectCard } from "@/components/site/project-card";
import { CTABlock } from "@/components/site/cta-block";
import { PROJECTS } from "@/lib/placeholder-data";

export const metadata: Metadata = {
  title: "Dự án",
  description:
    "Các dự án tiêu biểu của Đông Á trong lĩnh vực xây dựng dân dụng, công nghiệp và hạ tầng kỹ thuật.",
};

export default function ProjectsPage() {
  const categories = Array.from(new Set(PROJECTS.map((p) => p.category)));

  return (
    <>
      <PageHero
        eyebrow="Dự án"
        title="Công trình tiêu biểu"
        description="Những dự án đã hoàn thành khẳng định năng lực và uy tín của Đông Á trong suốt hơn 20 năm hoạt động."
        crumbs={[{ label: "Dự án" }]}
      />

      <Section>
        <Container>
          <div className="mb-12 flex flex-wrap gap-3">
            <button className="border border-navy-900 bg-navy-900 px-4 py-2 text-xs font-medium uppercase tracking-widest text-white">
              Tất cả
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                className="border border-neutral-300 px-4 py-2 text-xs font-medium uppercase tracking-widest text-neutral-700 transition-colors hover:border-navy-900 hover:text-navy-900"
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid gap-x-8 gap-y-16 lg:grid-cols-2">
            {PROJECTS.map((p) => (
              <ProjectCard
                key={p.slug}
                slug={p.slug}
                title={p.title}
                category={p.category}
                location={p.location}
                year={p.year}
              />
            ))}
          </div>
        </Container>
      </Section>

      <CTABlock />
    </>
  );
}
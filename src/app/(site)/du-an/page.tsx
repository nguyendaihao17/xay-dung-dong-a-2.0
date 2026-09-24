import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { PageHero } from "@/components/site/page-hero";
import { ProjectCard } from "@/components/site/project-card";
import { CTABlock } from "@/components/site/cta-block";
import { projectRepository } from "@/lib/repositories/project.repository";
import { buildMetadata } from "@/lib/seo/metadata";

export const revalidate = 1800;

export const metadata: Metadata = buildMetadata({
  title: "Dự án",
  description: "Các dự án tiêu biểu của Đông Á trong lĩnh vực xây dựng dân dụng, công nghiệp và hạ tầng kỹ thuật.",
  path: "/du-an",
});

export default async function ProjectsPage() {
  const projects = await projectRepository.list({ published: true }).catch(() => []);
  const categories = Array.from(new Set(projects.map((p) => p.category?.name).filter(Boolean)));

  return (
    <>
      <PageHero
        eyebrow="Dự án"
        title="Công trình tiêu biểu"
        description="Những dự án đã hoàn thành khẳng định năng lực và uy tín của Đông Á."
        crumbs={[{ label: "Dự án" }]}
      />

      <Section>
        <Container>
          {categories.length > 0 && (
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
          )}

          {projects.length === 0 ? (
            <p className="py-20 text-center text-neutral-500">Chưa có dự án nào được đăng.</p>
          ) : (
            <div className="grid gap-x-8 gap-y-16 lg:grid-cols-2">
              {projects.map((p) => (
                <ProjectCard
                  key={p.id}
                  slug={p.slug}
                  title={p.title}
                  category={p.category?.name}
                  location={p.location || undefined}
                  year={p.year || undefined}
                  coverImage={p.coverImage?.url}
                  featured={p.featured}
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
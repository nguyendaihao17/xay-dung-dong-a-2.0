import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { PageHero } from "@/components/site/page-hero";
import { RichContent } from "@/components/site/rich-content";
import { CTABlock } from "@/components/site/cta-block";
import { JsonLd } from "@/components/site/json-ld";
import { breadcrumbSchema } from "@/lib/seo/structured-data";
import { projectRepository } from "@/lib/repositories/project.repository";
import { buildMetadata } from "@/lib/seo/metadata";

export const revalidate = 1800;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await projectRepository.bySlug(slug).catch(() => null);
  if (!project) return buildMetadata({ title: "Dự án" });
  return buildMetadata({
    title: project.seoTitle || project.title,
    description: project.metaDescription || project.shortDescription,
    image: project.ogImage?.url || project.coverImage?.url,
    path: `/du-an/${project.slug}`,
    noIndex: project.noIndex,
  });
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = await projectRepository.bySlug(slug).catch(() => null);
  if (!project) notFound();

  const meta = [
    { label: "Danh mục", value: project.category?.name },
    { label: "Vị trí", value: project.location },
    { label: "Chủ đầu tư", value: project.client },
    { label: "Năm hoàn thành", value: project.year?.toString() },
    { label: "Phạm vi", value: project.scope },
  ].filter((m) => m.value);

  const html = project.content
    ? typeof project.content === "string"
      ? project.content
      : JSON.stringify(project.content)
    : "";

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Trang chủ", url: "/" },
          { name: "Dự án", url: "/du-an" },
          { name: project.title, url: `/du-an/${project.slug}` },
        ])}
      />

      <PageHero
        eyebrow={project.category?.name || "Dự án"}
        title={project.title}
        description={project.shortDescription || undefined}
        crumbs={[{ label: "Dự án", href: "/du-an" }, { label: project.title }]}
      />

      <Section>
        <Container>
          <div className="grid gap-16 lg:grid-cols-12">
            <div className="lg:col-span-8">
              {html ? <RichContent html={html} /> : <p className="text-neutral-500">Nội dung đang được cập nhật.</p>}
            </div>
            {meta.length > 0 && (
              <aside className="lg:col-span-4">
                <div className="border border-neutral-200 bg-neutral-50 p-8">
                  <h3 className="font-display text-sm uppercase tracking-widest text-navy-900">
                    Thông tin dự án
                  </h3>
                  <dl className="mt-6 space-y-5">
                    {meta.map((m) => (
                      <div key={m.label}>
                        <dt className="text-xs font-medium uppercase tracking-widest text-neutral-500">{m.label}</dt>
                        <dd className="mt-1 text-base text-navy-900">{m.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </aside>
            )}
          </div>
        </Container>
      </Section>

      <CTABlock />
    </>
  );
}
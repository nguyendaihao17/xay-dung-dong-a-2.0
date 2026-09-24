import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { PageHero } from "@/components/site/page-hero";
import { RichContent } from "@/components/site/rich-content";
import { CTABlock } from "@/components/site/cta-block";
import { PROJECTS } from "@/lib/placeholder-data";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) return { title: "Dự án" };
  return { title: project.title, description: project.shortDescription };
}

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) notFound();

  const meta = [
    { label: "Danh mục", value: project.category },
    { label: "Vị trí", value: project.location },
    { label: "Chủ đầu tư", value: project.client },
    { label: "Năm hoàn thành", value: String(project.year) },
    { label: "Phạm vi", value: project.scope },
  ];

  return (
    <>
      <PageHero
        eyebrow={project.category}
        title={project.title}
        description={project.shortDescription}
        crumbs={[{ label: "Dự án", href: "/du-an" }, { label: project.title }]}
      />

      <Section>
        <Container>
          <div className="grid gap-16 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <RichContent html={project.content} />
            </div>
            <aside className="lg:col-span-4">
              <div className="border border-neutral-200 bg-neutral-50 p-8">
                <h3 className="font-display text-sm uppercase tracking-widest text-navy-900">
                  Thông tin dự án
                </h3>
                <dl className="mt-6 space-y-5">
                  {meta.map((m) => (
                    <div key={m.label}>
                      <dt className="text-xs font-medium uppercase tracking-widest text-neutral-500">
                        {m.label}
                      </dt>
                      <dd className="mt-1 text-base text-navy-900">{m.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </aside>
          </div>
        </Container>
      </Section>

      <CTABlock />
    </>
  );
}
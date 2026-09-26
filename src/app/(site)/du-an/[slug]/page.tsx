import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, MapPin, Building2, Calendar, Ruler, Tag } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { PageHero } from "@/components/site/page-hero";
import { RichContent } from "@/components/site/rich-content";
import { CTABlock } from "@/components/site/cta-block";
import { ProjectCard } from "@/components/site/project-card";
import { prisma } from "@/lib/db";
import { buildMetadata } from "@/lib/seo/metadata";

export const revalidate = 1800;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const p = await prisma.project.findUnique({
      where: { slug },
      include: { coverImage: { select: { url: true } } },
    });
    if (!p) return buildMetadata({ title: "Dự án" });
    return buildMetadata({
      title: p.title,
      description: p.shortDescription || undefined,
      image: p.coverImage?.url,
      path: `/du-an/${p.slug}`,
    });
  } catch {
    return buildMetadata({ title: "Dự án" });
  }
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;

  let project = null;
  let related: any[] = [];

  try {
    project = await prisma.project.findUnique({
      where: { slug },
      include: {
        coverImage: { select: { url: true } },
        category: { select: { id: true, name: true } },
      },
    });

    if (project) {
      related = await prisma.project.findMany({
        where: {
          published: true,
          id: { not: project.id },
          ...(project.categoryId ? { categoryId: project.categoryId } : {}),
        },
        orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
        take: 3,
        include: {
          coverImage: { select: { url: true } },
          category: { select: { name: true } },
        },
      });
    }
  } catch {
    project = null;
  }

  if (!project) notFound();

  const meta = [
    { icon: Tag, label: "Lĩnh vực", value: project.category?.name },
    { icon: MapPin, label: "Vị trí", value: project.location },
    { icon: Building2, label: "Chủ đầu tư", value: project.client },
    { icon: Calendar, label: "Năm hoàn thành", value: project.year?.toString() },
    { icon: Ruler, label: "Phạm vi", value: project.scope },
  ].filter((m) => m.value);

  return (
    <>
      <PageHero
        eyebrow={project.category?.name || "Dự án"}
        title={project.title}
        description={project.shortDescription || undefined}
        crumbs={[
          { label: "Dự án", href: "/du-an" },
          { label: project.title },
        ]}
      />

      {project.coverImage?.url && (
        <Container className="pt-12">
          <div className="relative aspect-[16/9] w-full overflow-hidden bg-neutral-100">
            <Image
              src={project.coverImage.url}
              alt={project.title}
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
          <Link
            href="/du-an"
            className="mb-8 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-neutral-500 transition-colors hover:text-accent"
          >
            <ArrowLeft size={14} />
            Quay lại danh sách dự án
          </Link>

          <div className="grid gap-16 lg:grid-cols-12">
            {/* Main content */}
            <div className="lg:col-span-8">
              <h2 className="font-display text-2xl font-bold uppercase text-navy-900 md:text-3xl">
                Mô tả dự án
              </h2>
              <div className="mt-6 h-1 w-16 bg-accent" />
              <div className="mt-8">
                <RichContent content={project.content as never} />
              </div>
            </div>

            {/* Sidebar */}
            {meta.length > 0 && (
              <aside className="lg:col-span-4">
                <div className="sticky top-24 border border-neutral-200 bg-neutral-50 p-8">
                  <h3 className="font-display text-sm font-bold uppercase tracking-[0.2em] text-navy-900">
                    Thông tin dự án
                  </h3>

                  <dl className="mt-6 space-y-6">
                    {meta.map((m) => {
                      const Icon = m.icon;
                      return (
                        <div key={m.label} className="flex gap-4">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-white text-navy-900 ring-1 ring-neutral-200">
                            <Icon size={16} strokeWidth={1.75} />
                          </div>
                          <div className="min-w-0">
                            <dt className="text-[11px] font-semibold uppercase tracking-wider text-neutral-500">
                              {m.label}
                            </dt>
                            <dd className="mt-1 text-sm font-medium text-navy-900">
                              {m.value}
                            </dd>
                          </div>
                        </div>
                      );
                    })}
                  </dl>

                  <Link
                    href="/lien-he"
                    className="mt-8 flex w-full items-center justify-center gap-2 bg-navy-900 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white transition-colors hover:bg-navy-800"
                  >
                    Nhận báo giá tương tự
                  </Link>
                </div>
              </aside>
            )}
          </div>
        </Container>
      </Section>

      {/* Related projects */}
      {related.length > 0 && (
        <Section className="border-t border-neutral-200 bg-neutral-50">
          <Container>
            <div className="text-center">
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
                Dự án khác
              </span>
              <h2 className="mt-3 font-display text-3xl font-bold uppercase text-navy-900 md:text-4xl">
                Công trình liên quan
              </h2>
              <div className="mx-auto mt-6 h-1 w-16 bg-accent" />
            </div>

            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <ProjectCard
                  key={p.id}
                  id={p.id}
                  title={p.title}
                  slug={p.slug}
                  shortDescription={p.shortDescription}
                  location={p.location}
                  year={p.year}
                  coverImageUrl={p.coverImage?.url ?? null}
                  categoryName={p.category?.name ?? null}
                />
              ))}
            </div>
          </Container>
        </Section>
      )}

      <CTABlock
        title="Bạn có dự án tương tự?"
        description="Liên hệ ngay để được tư vấn miễn phí về giải pháp, tiến độ và chi phí."
      />
    </>
  );
}
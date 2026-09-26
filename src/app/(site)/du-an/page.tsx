import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/site/page-hero";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { ProjectCard } from "@/components/site/project-card";
import { CTABlock } from "@/components/site/cta-block";
import { prisma } from "@/lib/db";
import { buildMetadata } from "@/lib/seo/metadata";

export const revalidate = 1800;

export const metadata: Metadata = buildMetadata({
  title: "Dự án",
  description:
    "Các công trình dân dụng, công nghiệp và hạ tầng tiêu biểu do Đông Á tư vấn, thiết kế, giám sát và thi công.",
  path: "/du-an",
});

type ProjectRow = {
  id: string;
  title: string;
  slug: string;
  shortDescription: string | null;
  location: string | null;
  year: number | null;
  coverImage: { url: string } | null;
  category: { name: string } | null;
};

async function getProjects(): Promise<ProjectRow[]> {
  try {
    return (await prisma.project.findMany({
      where: { published: true },
      orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
      include: {
        coverImage: { select: { url: true } },
        category: { select: { name: true } },
      },
    })) as unknown as ProjectRow[];
  } catch {
    return [];
  }
}

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <>
      <PageHero
        eyebrow="Dự án"
        title="Công trình tiêu biểu"
        description="Hơn 500 công trình dân dụng, công nghiệp và hạ tầng đã được Đông Á tư vấn, thiết kế và thi công trên khắp khu vực phía Nam."
        crumbs={[{ label: "Dự án" }]}
      />

      <Section>
        <Container>
          {projects.length === 0 ? (
            <div className="mx-auto max-w-2xl py-20 text-center">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-neutral-100">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-neutral-400">
                  <path d="M3 21h18M5 21V7l8-4v18M19 21V11l-6-4"/>
                </svg>
              </div>
              <h3 className="mt-6 font-display text-2xl font-bold uppercase text-navy-900">
                Chưa có dự án nào
              </h3>
              <p className="mt-3 text-base text-neutral-600">
                Các dự án sẽ được cập nhật sớm. Vui lòng quay lại sau.
              </p>
              <Link
                href="/lien-he"
                className="mt-8 inline-flex items-center gap-2 bg-navy-900 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white hover:bg-navy-800"
              >
                Liên hệ tư vấn
              </Link>
            </div>
          ) : (
            <>
              <div className="mb-10 flex items-end justify-between">
                <p className="text-sm text-neutral-500">
                  Hiển thị <span className="font-semibold text-navy-900">{projects.length}</span> dự án
                </p>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {projects.map((p) => (
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
            </>
          )}
        </Container>
      </Section>

      <CTABlock />
    </>
  );
}
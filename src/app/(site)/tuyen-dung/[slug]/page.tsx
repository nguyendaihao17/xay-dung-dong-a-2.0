import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { PageHero } from "@/components/site/page-hero";
import { RichContent } from "@/components/site/rich-content";
import { CTABlock } from "@/components/site/cta-block";
import { Badge } from "@/components/ui/badge";
import { careerRepository } from "@/lib/repositories/career.repository";
import { buildMetadata } from "@/lib/seo/metadata";

export const revalidate = 1800;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const job = await careerRepository.bySlug(slug).catch(() => null);
  if (!job) return buildMetadata({ title: "Tuyển dụng" });
  return buildMetadata({
    title: job.title,
    description: job.description ? String(job.description).slice(0, 160) : undefined,
    path: `/tuyen-dung/${job.slug}`,
  });
}

export default async function CareerDetailPage({ params }: Props) {
  const { slug } = await params;
  const job = await careerRepository.bySlug(slug).catch(() => null);
  if (!job) notFound();

  return (
    <>
      <PageHero
        eyebrow="Tuyển dụng"
        title={job.title}
        crumbs={[{ label: "Tuyển dụng", href: "/tuyen-dung" }, { label: job.title }]}
      />

      <Section>
        <Container>
          <div className="mx-auto max-w-3xl">
            <div className="mb-10 flex flex-wrap gap-3">
              {job.department && <Badge variant="navy">{job.department}</Badge>}
              {job.location && <Badge>{job.location}</Badge>}
              {job.salaryRange && <Badge variant="green">{job.salaryRange}</Badge>}
            </div>

            <div className="space-y-12">
              <div>
                <h2 className="font-display text-2xl uppercase text-navy-900">Mô tả công việc</h2>
                <div className="mt-4">
                  <RichContent content={job.description as unknown} />
                </div>
              </div>
              <div>
                <h2 className="font-display text-2xl uppercase text-navy-900">Yêu cầu</h2>
                <div className="mt-4">
                  <RichContent content={job.requirements as unknown} />
                </div>
              </div>
              <div>
                <h2 className="font-display text-2xl uppercase text-navy-900">Quyền lợi</h2>
                <div className="mt-4">
                  <RichContent content={job.benefits as unknown} />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <CTABlock
        title="Ứng tuyển ngay"
        description="Gửi CV của bạn về info@xddonga.vn với tiêu đề [Ứng tuyển] - Vị trí - Họ tên."
      />
    </>
  );
}
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { PageHero } from "@/components/site/page-hero";
import { CTABlock } from "@/components/site/cta-block";
import { careerRepository } from "@/lib/repositories/career.repository";
import { buildMetadata } from "@/lib/seo/metadata";

export const revalidate = 1800;

export const metadata: Metadata = buildMetadata({
  title: "Tuyển dụng",
  description: "Cơ hội nghề nghiệp tại Công ty TNHH Xây dựng Đông Á.",
  path: "/tuyen-dung",
});

export default async function CareersPage() {
  const careers = await careerRepository.list(true).catch(() => []);

  return (
    <>
      <PageHero
        eyebrow="Tuyển dụng"
        title="Cơ hội nghề nghiệp"
        description="Gia nhập đội ngũ Đông Á — nơi bạn được phát triển cùng những công trình quy mô và bền vững."
        crumbs={[{ label: "Tuyển dụng" }]}
      />

      <Section>
        <Container>
          <div className="mx-auto max-w-4xl">
            {careers.length === 0 ? (
              <p className="py-20 text-center text-neutral-500">
                Hiện chưa có vị trí tuyển dụng. Vui lòng quay lại sau.
              </p>
            ) : (
              careers.map((job) => (
                <Link
                  key={job.id}
                  href={`/tuyen-dung/${job.slug}`}
                  className="group flex items-center justify-between gap-6 border-b border-neutral-200 py-8 first:border-t"
                >
                  <div>
                    <h3 className="font-display text-2xl uppercase text-navy-900 group-hover:text-navy-700">
                      {job.title}
                    </h3>
                    <div className="mt-2 flex flex-wrap gap-4 text-xs font-medium uppercase tracking-widest text-neutral-500">
                      {job.department && <span>{job.department}</span>}
                      {job.location && <span>· {job.location}</span>}
                      {job.salaryRange && <span>· {job.salaryRange}</span>}
                    </div>
                  </div>
                  <ArrowRight
                    size={22}
                    className="shrink-0 text-navy-900 transition-transform group-hover:translate-x-1"
                  />
                </Link>
              ))
            )}
          </div>
        </Container>
      </Section>

      <CTABlock
        title="Không tìm thấy vị trí phù hợp?"
        description="Gửi CV của bạn cho chúng tôi — chúng tôi luôn tìm kiếm những cộng sự tài năng."
      />
    </>
  );
}
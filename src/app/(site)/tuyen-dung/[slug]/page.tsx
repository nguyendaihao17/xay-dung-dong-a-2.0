import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { PageHero } from "@/components/site/page-hero";
import { CTABlock } from "@/components/site/cta-block";
import { Badge } from "@/components/ui/badge";

const JOBS: Record<string, { title: string; department: string; location: string; type: string; salary: string; description: string; requirements: string; benefits: string }> = {
  "ky-su-xay-dung": {
    title: "Kỹ sư xây dựng",
    department: "Kỹ thuật",
    location: "TP. Hồ Chí Minh",
    type: "Toàn thời gian",
    salary: "Thương lượng",
    description: "<p>Chịu trách nhiệm triển khai thi công, giám sát chất lượng và tiến độ công trình theo thiết kế.</p>",
    requirements: "<ul><li>Tốt nghiệp ĐH chuyên ngành Xây dựng dân dụng & công nghiệp</li><li>Kinh nghiệm 2+ năm ở vị trí tương đương</li><li>Thành thạo AutoCAD, MS Project</li><li>Có chứng chỉ hành nghề là lợi thế</li></ul>",
    benefits: "<ul><li>Lương thưởng cạnh tranh theo năng lực</li><li>BHXH, BHYT, BHTN đầy đủ</li><li>Thưởng dự án, thưởng KPI</li><li>Cơ hội đào tạo và thăng tiến</li></ul>",
  },
  "ky-su-giam-sat": {
    title: "Kỹ sư giám sát công trình",
    department: "Kỹ thuật",
    location: "Long An",
    type: "Toàn thời gian",
    salary: "Thương lượng",
    description: "<p>Giám sát thi công tại công trường, đảm bảo chất lượng, tiến độ và an toàn lao động.</p>",
    requirements: "<ul><li>Tốt nghiệp ĐH Xây dựng</li><li>Kinh nghiệm giám sát công trình 3+ năm</li><li>Có khả năng đọc bản vẽ, lập báo cáo</li><li>Sẵn sàng đi công tác tỉnh</li></ul>",
    benefits: "<ul><li>Phụ cấp công trường, đi lại</li><li>BHXH đầy đủ</li><li>Thưởng hoàn thành dự án</li></ul>",
  },
  "ke-toan-tong-hop": {
    title: "Kế toán tổng hợp",
    department: "Tài chính - Kế toán",
    location: "TP. Hồ Chí Minh",
    type: "Toàn thời gian",
    salary: "Thương lượng",
    description: "<p>Phụ trách kế toán tổng hợp, lập báo cáo tài chính, thuế và các công việc liên quan.</p>",
    requirements: "<ul><li>Tốt nghiệp ĐH Kế toán - Tài chính</li><li>Kinh nghiệm 2+ năm</li><li>Thành thạo phần mềm kế toán</li><li>Ưu tiên có kinh nghiệm ngành xây dựng</li></ul>",
    benefits: "<ul><li>Môi trường chuyên nghiệp</li><li>BHXH, BHYT đầy đủ</li><li>Thưởng lễ, Tết, KPI</li></ul>",
  },
};

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const job = JOBS[slug];
  if (!job) return { title: "Tuyển dụng" };
  return { title: job.title };
}

export function generateStaticParams() {
  return Object.keys(JOBS).map((slug) => ({ slug }));
}

export default async function CareerDetailPage({ params }: Props) {
  const { slug } = await params;
  const job = JOBS[slug];
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
              <Badge variant="navy">{job.department}</Badge>
              <Badge>{job.location}</Badge>
              <Badge>{job.type}</Badge>
              <Badge variant="green">{job.salary}</Badge>
            </div>

            <div className="space-y-10 prose prose-lg max-w-none prose-headings:font-display prose-headings:uppercase prose-headings:text-navy-900">
              <div>
                <h2 className="font-display text-2xl uppercase text-navy-900">Mô tả công việc</h2>
                <div className="mt-4 text-neutral-700" dangerouslySetInnerHTML={{ __html: job.description }} />
              </div>
              <div>
                <h2 className="font-display text-2xl uppercase text-navy-900">Yêu cầu</h2>
                <div className="mt-4 text-neutral-700" dangerouslySetInnerHTML={{ __html: job.requirements }} />
              </div>
              <div>
                <h2 className="font-display text-2xl uppercase text-navy-900">Quyền lợi</h2>
                <div className="mt-4 text-neutral-700" dangerouslySetInnerHTML={{ __html: job.benefits }} />
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <CTABlock title="Ứng tuyển ngay" description="Gửi CV của bạn về info@xddonga.vn với tiêu đề [Ứng tuyển] - Vị trí - Họ tên." />
    </>
  );
}
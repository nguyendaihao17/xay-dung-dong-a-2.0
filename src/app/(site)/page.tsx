import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/site/section-heading";
import { Hero } from "@/components/site/hero";
import { IntroBlock } from "@/components/site/intro-block";
import { StatBlock } from "@/components/site/stat-block";
import { ServiceCard } from "@/components/site/service-card";
import { ProjectCard } from "@/components/site/project-card";
import { ArticleCard } from "@/components/site/article-card";
import { WhyBlock } from "@/components/site/why-block";
import { ProcessStep } from "@/components/site/process-step";
import { CTABlock } from "@/components/site/cta-block";

// ─── Placeholder data (sẽ thay bằng DB queries ở Phase 7) ───────────────
const PLACEHOLDER_SERVICES = [
  {
    slug: "xay-dung-dan-dung",
    title: "Xây dựng dân dụng",
    shortDescription: "Nhà ở, biệt thự, căn hộ, văn phòng, khách sạn — thi công trọn gói từ móng đến hoàn thiện.",
  },
  {
    slug: "xay-dung-cong-nghiep",
    title: "Xây dựng công nghiệp",
    shortDescription: "Nhà xưởng, nhà máy, kho bãi, kết cấu thép tiền chế theo tiêu chuẩn kỹ thuật cao.",
  },
  {
    slug: "ha-tang-ky-thuat",
    title: "Hạ tầng kỹ thuật",
    shortDescription: "Đường giao thông, cầu, hệ thống cấp thoát nước, san lấp mặt bằng.",
  },
  {
    slug: "cai-tao-sua-chua",
    title: "Cải tạo & sửa chữa",
    shortDescription: "Nâng cấp, cải tạo công trình cũ, sửa chữa hư hỏng, chống thấm.",
  },
  {
    slug: "tu-van-thiet-ke",
    title: "Tư vấn thiết kế",
    shortDescription: "Tư vấn kiến trúc, kết cấu, dự toán chi phí, xin giấy phép xây dựng.",
  },
  {
    slug: "giam-sat-thi-cong",
    title: "Giám sát thi công",
    shortDescription: "Giám sát chất lượng, tiến độ, an toàn lao động theo đúng thiết kế.",
  },
];

const PLACEHOLDER_PROJECTS = [
  {
    slug: "toa-nha-van-phong-dong-a",
    title: "Tòa nhà văn phòng Đông Á",
    category: "Dân dụng",
    location: "TP. Hồ Chí Minh",
    year: 2023,
    featured: true,
  },
  {
    slug: "nha-xuong-khu-cong-nghiep-long-an",
    title: "Nhà xưởng khu công nghiệp Long An",
    category: "Công nghiệp",
    location: "Long An",
    year: 2022,
    featured: false,
  },
  {
    slug: "cau-duong-dong-nai",
    title: "Cầu đường Đồng Nai",
    category: "Hạ tầng",
    location: "Đồng Nai",
    year: 2024,
    featured: false,
  },
];

const PLACEHOLDER_ARTICLES = [
  {
    slug: "xu-huong-vat-lieu-xay-dung-2026",
    title: "Xu hướng vật liệu xây dựng bền vững năm 2026",
    excerpt: "Tổng quan các loại vật liệu thân thiện môi trường đang được ứng dụng rộng rãi trong ngành xây dựng hiện đại.",
    category: "Kiến thức",
    publishedAt: new Date("2026-01-15"),
  },
  {
    slug: "kinh-nghiem-chon-nha-thau",
    title: "Kinh nghiệm chọn nhà thầu xây dựng uy tín",
    excerpt: "Những tiêu chí quan trọng giúp chủ đầu tư lựa chọn đơn vị thi công phù hợp và tránh rủi ro.",
    category: "Kinh nghiệm",
    publishedAt: new Date("2026-02-20"),
  },
  {
    slug: "quy-trinh-thi-cong-an-toan",
    title: "Quy trình thi công an toàn theo tiêu chuẩn",
    excerpt: "Các bước đảm bảo an toàn lao động trong suốt quá trình thi công công trình xây dựng.",
    category: "Kỹ thuật",
    publishedAt: new Date("2026-03-10"),
  },
];

export default function HomePage() {
  return (
    <>
      {/* 02 — HERO */}
      <Hero />

      {/* 03 — COMPANY INTRODUCTION */}
      <Section>
        <Container>
          <IntroBlock
            eyebrow="Về chúng tôi"
            title="Kiến tạo công trình, xây dựng niềm tin"
            paragraphs={[
              "CÔNG TY TNHH XÂY DỰNG ĐÔNG Á được thành lập từ năm 2003, hoạt động trong lĩnh vực tư vấn, thiết kế, giám sát và thi công xây dựng.",
              "Trải qua hơn 20 năm phát triển, chúng tôi đã khẳng định vị thế là một trong những đơn vị xây dựng uy tín tại khu vực phía Nam, với hàng trăm công trình dân dụng, công nghiệp và hạ tầng kỹ thuật.",
            ]}
            link={{ label: "Tìm hiểu thêm", href: "/gioi-thieu" }}
          />
        </Container>
      </Section>

      {/* 04 — STATISTICS */}
      <Section className="border-y border-neutral-200 bg-neutral-50">
        <Container>
          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
            <StatBlock value="2003" label="Năm thành lập" />
            <StatBlock value="20+" label="Năm kinh nghiệm" />
            <StatBlock value="100%" label="Cam kết chất lượng" />
            <StatBlock value="24/7" label="Hỗ trợ khách hàng" />
          </div>
        </Container>
      </Section>

      {/* 05 — SERVICES */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow="Dịch vụ"
            title="Lĩnh vực hoạt động"
            description="Cung cấp giải pháp xây dựng toàn diện, từ tư vấn thiết kế đến thi công hoàn thiện."
          />
          <div className="mt-16 grid gap-x-12 sm:grid-cols-2 lg:grid-cols-3">
            {PLACEHOLDER_SERVICES.map((s, i) => (
              <ServiceCard
                key={s.slug}
                index={i}
                slug={s.slug}
                title={s.title}
                shortDescription={s.shortDescription}
              />
            ))}
          </div>
        </Container>
      </Section>

      {/* 06 — FEATURED PROJECTS */}
      <Section className="bg-neutral-50">
        <Container>
          <SectionHeading
            eyebrow="Dự án"
            title="Công trình tiêu biểu"
            description="Những dự án đã hoàn thành khẳng định năng lực và uy tín của Đông Á."
          />
          <div className="mt-16 grid gap-x-8 gap-y-16 lg:grid-cols-3">
            {PLACEHOLDER_PROJECTS.map((p) => (
              <ProjectCard
                key={p.slug}
                slug={p.slug}
                title={p.title}
                category={p.category}
                location={p.location}
                year={p.year}
                featured={p.featured}
              />
            ))}
          </div>
        </Container>
      </Section>

      {/* 07 — WHY DONG A */}
      <Section>
        <Container>
          <SectionHeading eyebrow="Vì sao chọn Đông Á" title="Bốn lý do tin cậy" />
          <div className="mt-16">
            <WhyBlock />
          </div>
        </Container>
      </Section>

      {/* 08 — CONSTRUCTION PROCESS */}
      <Section className="border-y border-neutral-200 bg-neutral-50">
        <Container>
          <SectionHeading eyebrow="Quy trình" title="Quy trình thi công" />
          <div className="mt-16 grid gap-12 lg:grid-cols-4">
            <ProcessStep index={1} title="Tư vấn" description="Lắng nghe nhu cầu, khảo sát hiện trường và tư vấn giải pháp phù hợp." />
            <ProcessStep index={2} title="Thiết kế" description="Lên bản vẽ kiến trúc, kết cấu, dự toán chi phí chi tiết." />
            <ProcessStep index={3} title="Thi công" description="Triển khai theo đúng tiến độ, đảm bảo chất lượng và an toàn." />
            <ProcessStep index={4} title="Bàn giao" description="Nghiệm thu, bàn giao công trình và bảo hành dài hạn." isLast />
          </div>
        </Container>
      </Section>

      {/* 09 — LATEST NEWS */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow="Tin tức"
            title="Kiến thức & tin tức"
            description="Cập nhật xu hướng, kinh nghiệm và thông tin mới nhất trong ngành xây dựng."
          />
          <div className="mt-16 grid gap-x-8 gap-y-12 lg:grid-cols-3">
            {PLACEHOLDER_ARTICLES.map((a) => (
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

      {/* 10 — CTA */}
      <CTABlock />
    </>
  );
}
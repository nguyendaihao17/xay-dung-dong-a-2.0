import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { PageHero } from "@/components/site/page-hero";
import { ServiceCard } from "@/components/site/service-card";
import { CTABlock } from "@/components/site/cta-block";
import { serviceRepository } from "@/lib/repositories/service.repository";
import { buildMetadata } from "@/lib/seo/metadata";

export const revalidate = 3600;

export const metadata: Metadata = buildMetadata({
  title: "Dịch vụ",
  description: "Các dịch vụ xây dựng toàn diện: tư vấn thiết kế, thi công dân dụng, công nghiệp, hạ tầng kỹ thuật.",
  path: "/dich-vu",
});

const FALLBACK = [
  { slug: "xay-dung-dan-dung", title: "Xây dựng dân dụng", shortDescription: "Nhà ở, biệt thự, căn hộ, văn phòng, khách sạn." },
  { slug: "xay-dung-cong-nghiep", title: "Xây dựng công nghiệp", shortDescription: "Nhà xưởng, nhà máy, kho bãi, kết cấu thép tiền chế." },
  { slug: "ha-tang-ky-thuat", title: "Hạ tầng kỹ thuật", shortDescription: "Đường giao thông, cầu, hệ thống cấp thoát nước." },
  { slug: "cai-tao-sua-chua", title: "Cải tạo & sửa chữa", shortDescription: "Nâng cấp, cải tạo công trình cũ, chống thấm." },
  { slug: "tu-van-thiet-ke", title: "Tư vấn thiết kế", shortDescription: "Tư vấn kiến trúc, kết cấu, dự toán chi phí." },
  { slug: "giam-sat-thi-cong", title: "Giám sát thi công", shortDescription: "Giám sát chất lượng, tiến độ, an toàn lao động." },
];

export default async function ServicesPage() {
  const services = await serviceRepository.list({ published: true }).catch(() => []);
  const list = services.length > 0
    ? services.map((s) => ({ slug: s.slug, title: s.title, shortDescription: s.shortDescription || "" }))
    : FALLBACK;

  return (
    <>
      <PageHero
        eyebrow="Dịch vụ"
        title="Lĩnh vực hoạt động"
        description="Cung cấp giải pháp xây dựng toàn diện, từ tư vấn thiết kế đến thi công hoàn thiện."
        crumbs={[{ label: "Dịch vụ" }]}
      />

      <Section>
        <Container>
          <div className="grid gap-x-12 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((s, i) => (
              <ServiceCard key={s.slug} index={i} slug={s.slug} title={s.title} shortDescription={s.shortDescription} />
            ))}
          </div>
        </Container>
      </Section>

      <CTABlock />
    </>
  );
}
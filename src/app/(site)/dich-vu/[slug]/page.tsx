import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { PageHero } from "@/components/site/page-hero";
import { RichContent } from "@/components/site/rich-content";
import { CTABlock } from "@/components/site/cta-block";
import { serviceRepository } from "@/lib/repositories/service.repository";
import { buildMetadata } from "@/lib/seo/metadata";

const FALLBACK: Record<string, { title: string; shortDescription: string; content: string }> = {
  "xay-dung-dan-dung": { title: "Xây dựng dân dụng", shortDescription: "Thi công trọn gói công trình dân dụng.", content: "<p>Đông Á cung cấp dịch vụ thi công dân dụng trọn gói từ khảo sát, thiết kế đến hoàn thiện.</p>" },
  "xay-dung-cong-nghiep": { title: "Xây dựng công nghiệp", shortDescription: "Thi công nhà xưởng, nhà máy, kết cấu thép.", content: "<p>Chuyên thi công công trình công nghiệp quy mô lớn, đáp ứng tiêu chuẩn khắt khe.</p>" },
  "ha-tang-ky-thuat": { title: "Hạ tầng kỹ thuật", shortDescription: "Thi công hạ tầng kỹ thuật.", content: "<p>Thi công đường, cầu, hệ thống cấp thoát nước, san lấp mặt bằng.</p>" },
  "cai-tao-sua-chua": { title: "Cải tạo & sửa chữa", shortDescription: "Nâng cấp, cải tạo công trình.", content: "<p>Dịch vụ cải tạo, sửa chữa giúp công trình cũ nâng cấp, kéo dài tuổi thọ.</p>" },
  "tu-van-thiet-ke": { title: "Tư vấn thiết kế", shortDescription: "Tư vấn kiến trúc, kết cấu.", content: "<p>Đội ngũ kiến trúc sư và kỹ sư cung cấp dịch vụ tư vấn thiết kế toàn diện.</p>" },
  "giam-sat-thi-cong": { title: "Giám sát thi công", shortDescription: "Giám sát chất lượng, tiến độ.", content: "<p>Đảm bảo công trình thực hiện đúng thiết kế, đúng tiến độ và an toàn.</p>" },
};

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = await serviceRepository.bySlug(slug).catch(() => null);
  const fallback = FALLBACK[slug];
  if (!service && !fallback) return buildMetadata({ title: "Dịch vụ" });
  return buildMetadata({
    title: service?.seoTitle || service?.title || fallback?.title || "Dịch vụ",
    description: service?.metaDescription || service?.shortDescription || fallback?.shortDescription,
    path: `/dich-vu/${slug}`,
    noIndex: service?.noIndex,
  });
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = await serviceRepository.bySlug(slug).catch(() => null);
  const fallback = FALLBACK[slug];

  if (!service && !fallback) notFound();

  const title = service?.title || fallback?.title || "Dịch vụ";
  const shortDescription = service?.shortDescription || fallback?.shortDescription || "";
  const html = service?.content
    ? typeof service.content === "string"
      ? service.content
      : JSON.stringify(service.content)
    : fallback?.content || "";

  return (
    <>
      <PageHero
        eyebrow="Dịch vụ"
        title={title}
        description={shortDescription}
        crumbs={[{ label: "Dịch vụ", href: "/dich-vu" }, { label: title }]}
      />

      <Section>
        <Container>
          <div className="mx-auto max-w-4xl">
            <RichContent html={html} />
          </div>
        </Container>
      </Section>

      <CTABlock />
    </>
  );
}
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { PageHero } from "@/components/site/page-hero";
import { RichContent } from "@/components/site/rich-content";
import { CTABlock } from "@/components/site/cta-block";

const SERVICES: Record<string, { title: string; shortDescription: string; content: string }> = {
  "xay-dung-dan-dung": {
    title: "Xây dựng dân dụng",
    shortDescription: "Thi công trọn gói các công trình nhà ở, biệt thự, căn hộ, văn phòng, khách sạn.",
    content: `<p>Đông Á cung cấp dịch vụ thi công dân dụng trọn gói từ khảo sát, thiết kế đến thi công hoàn thiện. Chúng tôi đảm nhận các loại công trình:</p><ul><li>Nhà ở riêng lẻ, biệt thự</li><li>Chung cư, căn hộ cao cấp</li><li>Tòa nhà văn phòng, khách sạn</li><li>Trường học, bệnh viện, công trình công cộng</li></ul><p>Với hơn 20 năm kinh nghiệm, chúng tôi cam kết chất lượng, tiến độ và thẩm mỹ cho mọi công trình.</p>`,
  },
  "xay-dung-cong-nghiep": {
    title: "Xây dựng công nghiệp",
    shortDescription: "Thi công nhà xưởng, nhà máy, kho bãi, kết cấu thép tiền chế.",
    content: `<p>Đông Á chuyên thi công các công trình công nghiệp quy mô lớn, đáp ứng tiêu chuẩn kỹ thuật khắt khe:</p><ul><li>Nhà xưởng sản xuất, nhà máy chế biến</li><li>Kho bãi, nhà kho logistics</li><li>Kết cấu thép tiền chế</li><li>Hệ thống hạ tầng khu công nghiệp</li></ul><p>Đội ngũ kỹ sư giàu kinh nghiệm cùng trang thiết bị hiện đại giúp chúng tôi hoàn thành công trình đúng tiến độ và chất lượng.</p>`,
  },
  "ha-tang-ky-thuat": {
    title: "Hạ tầng kỹ thuật",
    shortDescription: "Thi công đường giao thông, cầu, hệ thống cấp thoát nước, san lấp mặt bằng.",
    content: `<p>Chúng tôi thi công các công trình hạ tầng kỹ thuật phục vụ phát triển đô thị và khu công nghiệp:</p><ul><li>Đường giao thông nông thôn, đô thị</li><li>Cầu, cống, hệ thống thoát nước</li><li>San lấp mặt bằng, xử lý nền móng</li><li>Hệ thống cấp nước sạch</li></ul>`,
  },
  "cai-tao-sua-chua": {
    title: "Cải tạo & sửa chữa",
    shortDescription: "Nâng cấp, cải tạo công trình cũ, sửa chữa hư hỏng, chống thấm.",
    content: `<p>Dịch vụ cải tạo và sửa chữa giúp công trình cũ được nâng cấp, kéo dài tuổi thọ và cải thiện công năng:</p><ul><li>Cải tạo nhà ở, văn phòng, nhà xưởng</li><li>Sửa chữa kết cấu, mái, tường</li><li>Chống thấm sân thượng, nhà vệ sinh</li><li>Nâng cấp hệ thống điện, nước</li></ul>`,
  },
  "tu-van-thiet-ke": {
    title: "Tư vấn thiết kế",
    shortDescription: "Tư vấn kiến trúc, kết cấu, dự toán chi phí, xin giấy phép xây dựng.",
    content: `<p>Đội ngũ kiến trúc sư và kỹ sư của Đông Á cung cấp dịch vụ tư vấn thiết kế toàn diện:</p><ul><li>Thiết kế kiến trúc, nội thất</li><li>Thiết kế kết cấu, MEP</li><li>Dự toán chi phí, lập hồ sơ thầu</li><li>Hỗ trợ xin giấy phép xây dựng</li></ul>`,
  },
  "giam-sat-thi-cong": {
    title: "Giám sát thi công",
    shortDescription: "Giám sát chất lượng, tiến độ, an toàn lao động theo đúng thiết kế.",
    content: `<p>Dịch vụ giám sát thi công đảm bảo công trình được thực hiện đúng thiết kế, đúng tiến độ và an toàn:</p><ul><li>Giám sát chất lượng vật tư, thi công</li><li>Kiểm soát tiến độ, khối lượng</li><li>Quản lý an toàn lao động</li><li>Báo cáo định kỳ cho chủ đầu tư</li></ul>`,
  },
};

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICES[slug];
  if (!service) return { title: "Dịch vụ" };
  return {
    title: service.title,
    description: service.shortDescription,
  };
}

export function generateStaticParams() {
  return Object.keys(SERVICES).map((slug) => ({ slug }));
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = SERVICES[slug];
  if (!service) notFound();

  return (
    <>
      <PageHero
        eyebrow="Dịch vụ"
        title={service.title}
        description={service.shortDescription}
        crumbs={[{ label: "Dịch vụ", href: "/dich-vu" }, { label: service.title }]}
      />

      <Section>
        <Container>
          <div className="mx-auto max-w-4xl">
            <RichContent html={service.content} />
          </div>
        </Container>
      </Section>

      <CTABlock />
    </>
  );
}
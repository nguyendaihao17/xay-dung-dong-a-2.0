import type { Metadata } from "next";
import { PageHero } from "@/components/site/page-hero";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Chính sách bảo hành",
  description: "Chính sách bảo hành công trình xây dựng của Đông Á.",
  path: "/bao-hanh",
});

export default function WarrantyPage() {
  return (
    <>
      <PageHero
        eyebrow="Chính sách"
        title="Chính sách bảo hành"
        description="Cam kết bảo hành dài hạn cho mọi công trình."
        crumbs={[{ label: "Chính sách bảo hành" }]}
      />
      <Section>
        <Container size="narrow">
          <div className="prose prose-lg max-w-none">
            <h2>1. Thời hạn bảo hành</h2>
            <ul>
              <li><strong>Kết cấu công trình:</strong> 5 năm</li>
              <li><strong>Hoàn thiện:</strong> 2 năm</li>
              <li><strong>Hệ thống MEP (điện, nước):</strong> 1 năm</li>
            </ul>
            <h2>2. Phạm vi bảo hành</h2>
            <p>Bảo hành miễn phí cho các lỗi do thi công hoặc vật tư do Đông Á cung cấp. Không áp dụng cho hư hỏng do thiên tai, sử dụng sai mục đích hoặc tự ý sửa chữa.</p>
            <h2>3. Quy trình bảo hành</h2>
            <p>Khi phát hiện sự cố, khách hàng liên hệ hotline 0901 219 261. Đông Á sẽ phản hồi trong 24 giờ và xử lý trong 48-72 giờ.</p>
            <h2>4. Chi phí bảo hành</h2>
            <p>Miễn phí trong thời hạn bảo hành. Ngoài thời hạn, chúng tôi hỗ trợ với chi phí ưu đãi.</p>
          </div>
        </Container>
      </Section>
    </>
  );
}
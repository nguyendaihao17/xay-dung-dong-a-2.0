import type { Metadata } from "next";
import { PageHero } from "@/components/site/page-hero";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Hình thức thanh toán",
  description: "Các hình thức thanh toán linh hoạt khi sử dụng dịch vụ của Đông Á.",
  path: "/thanh-toan",
});

export default function PaymentPage() {
  return (
    <>
      <PageHero
        eyebrow="Chính sách"
        title="Hình thức thanh toán"
        description="Đa dạng phương thức thanh toán, linh hoạt theo tiến độ."
        crumbs={[{ label: "Hình thức thanh toán" }]}
      />
      <Section>
        <Container size="narrow">
          <div className="prose prose-lg max-w-none">
            <h2>1. Phương thức thanh toán</h2>
            <ul>
              <li>Tiền mặt</li>
              <li>Chuyển khoản ngân hàng</li>
              <li>Thanh toán theo tiến độ thi công</li>
            </ul>
            <h2>2. Tiến độ thanh toán</h2>
            <ul>
              <li><strong>Đợt 1:</strong> 30% khi ký hợp đồng</li>
              <li><strong>Đợt 2:</strong> 30% khi hoàn thành phần móng</li>
              <li><strong>Đợt 3:</strong> 30% khi hoàn thiện</li>
              <li><strong>Đợt 4:</strong> 10% khi bàn giao</li>
            </ul>
            <h2>3. Hóa đơn</h2>
            <p>Đông Á xuất hóa đơn VAT đầy đủ theo quy định. Khách hàng vui lòng cung cấp thông tin xuất hóa đơn khi ký hợp đồng.</p>
          </div>
        </Container>
      </Section>
    </>
  );
}
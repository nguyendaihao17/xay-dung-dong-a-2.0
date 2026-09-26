import type { Metadata } from "next";
import { PageHero } from "@/components/site/page-hero";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Điều khoản dịch vụ",
  description: "Điều khoản sử dụng dịch vụ của Công ty TNHH Tư vấn Thiết kế - Xây dựng Đông Á.",
  path: "/dieu-khoan",
});

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Chính sách"
        title="Điều khoản dịch vụ"
        description="Các điều khoản áp dụng khi sử dụng dịch vụ của Đông Á."
        crumbs={[{ label: "Điều khoản dịch vụ" }]}
      />
      <Section>
        <Container size="narrow">
          <div className="prose prose-lg max-w-none">
            <p>Khi sử dụng dịch vụ của Đông Á, quý khách đồng ý với các điều khoản dưới đây.</p>
            <h2>1. Phạm vi dịch vụ</h2>
            <p>Đông Á cung cấp dịch vụ tư vấn, thiết kế, giám sát và thi công xây dựng cho các công trình dân dụng, công nghiệp và hạ tầng.</p>
            <h2>2. Báo giá và hợp đồng</h2>
            <p>Mọi báo giá có hiệu lực trong vòng 30 ngày. Hợp đồng được ký kết bằng văn bản giữa hai bên với đầy đủ điều khoản, tiến độ và giá trị.</p>
            <h2>3. Trách nhiệm của khách hàng</h2>
            <p>Khách hàng có trách nhiệm cung cấp thông tin chính xác, phối hợp trong quá trình thi công và thanh toán đúng hạn theo hợp đồng.</p>
            <h2>4. Trách nhiệm của Đông Á</h2>
            <p>Chúng tôi cam kết thi công đúng bản vẽ, đúng tiến độ, đảm bảo chất lượng và an toàn lao động theo quy định pháp luật.</p>
            <h2>5. Giải quyết tranh chấp</h2>
            <p>Mọi tranh chấp được giải quyết thông qua thương lượng. Nếu không đạt kết quả, hai bên đưa ra tòa án có thẩm quyền tại TP.HCM.</p>
          </div>
        </Container>
      </Section>
    </>
  );
}
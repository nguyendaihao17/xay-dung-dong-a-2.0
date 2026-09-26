import type { Metadata } from "next";
import { PageHero } from "@/components/site/page-hero";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Câu hỏi thường gặp",
  description: "Giải đáp thắc mắc thường gặp về dịch vụ xây dựng của Đông Á.",
  path: "/cau-hoi",
});

const FAQS = [
  {
    q: "Đông Á nhận những loại công trình nào?",
    a: "Chúng tôi nhận thi công đa dạng: nhà ở dân dụng, công trình công nghiệp (nhà xưởng, kho bãi), công trình hạ tầng và công trình thương mại.",
  },
  {
    q: "Chi phí tư vấn và báo giá có mất phí không?",
    a: "Hoàn toàn miễn phí. Đông Á tư vấn giải pháp và báo giá sơ bộ miễn phí cho mọi khách hàng.",
  },
  {
    q: "Thời gian thi công một công trình nhà phố mất bao lâu?",
    a: "Tùy quy mô: nhà phố 1-3 tầng mất 4-6 tháng, biệt thự 6-8 tháng, nhà xưởng công nghiệp 5-10 tháng.",
  },
  {
    q: "Có phát sinh chi phí trong quá trình thi công không?",
    a: "Đông Á cam kết báo giá trọn gói, minh bạch, không phát sinh chi phí ẩn.",
  },
  {
    q: "Chính sách bảo hành công trình như thế nào?",
    a: "Bảo hành kết cấu 5 năm, bảo hành hoàn thiện 2 năm, bảo hành MEP 1 năm. Hỗ trợ sự cố trong vòng 24-48 giờ.",
  },
  {
    q: "Có hỗ trợ xin giấy phép xây dựng không?",
    a: "Có. Đông Á hỗ trợ hoàn thiện hồ sơ xin giấy phép xây dựng, bao gồm bản vẽ và thủ tục hành chính.",
  },
];

export default function FAQPage() {
  return (
    <>
      <PageHero
        eyebrow="Hỗ trợ"
        title="Câu hỏi thường gặp"
        description="Những câu hỏi khách hàng hay hỏi nhất về dịch vụ của Đông Á."
        crumbs={[{ label: "Câu hỏi thường gặp" }]}
      />
      <Section>
        <Container size="narrow">
          <div className="space-y-4">
            {FAQS.map((faq, i) => (
              <details
                key={i}
                className="group border border-neutral-200 bg-white p-6 open:border-navy-900"
              >
                <summary className="flex cursor-pointer items-center justify-between font-display text-base font-bold uppercase text-navy-900 md:text-lg">
                  {faq.q}
                  <span className="ml-4 shrink-0 text-2xl text-accent transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-4 text-sm leading-relaxed text-neutral-600 md:text-base">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
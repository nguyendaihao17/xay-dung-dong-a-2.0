import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { PageHero } from "@/components/site/page-hero";
import { IntroBlock } from "@/components/site/intro-block";
import { StatBlock } from "@/components/site/stat-block";
import { WhyBlock } from "@/components/site/why-block";
import { CTABlock } from "@/components/site/cta-block";

export const metadata: Metadata = {
  title: "Giới thiệu",
  description:
    "CÔNG TY TNHH XÂY DỰNG ĐÔNG Á — hơn 20 năm kinh nghiệm trong lĩnh vực tư vấn, thiết kế, giám sát và thi công xây dựng.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Về chúng tôi"
        title="Giới thiệu Đông Á"
        description="Hơn 20 năm kiến tạo công trình bền vững — từ những dự án dân dụng đầu tiên đến các công trình công nghiệp, hạ tầng quy mô lớn."
        crumbs={[{ label: "Giới thiệu" }]}
      />

      <Section>
        <Container>
          <IntroBlock
            eyebrow="Câu chuyện"
            title="Từ năm 2003"
            paragraphs={[
              "CÔNG TY TNHH XÂY DỰNG ĐÔNG Á được thành lập từ năm 2003, khởi đầu với các công trình dân dụng nhỏ tại khu vực phía Nam.",
              "Qua hơn hai thập kỷ, chúng tôi không ngừng mở rộng quy mô và nâng cao năng lực, trở thành đối tác tin cậy của nhiều chủ đầu tư trong lĩnh vực xây dựng dân dụng, công nghiệp và hạ tầng kỹ thuật.",
              "Định hướng của Đông Á là trở thành đơn vị xây dựng hàng đầu khu vực, gắn liền chất lượng công trình với uy tín thương hiệu.",
            ]}
          />
        </Container>
      </Section>

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

      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-24">
            <div>
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-navy-900" />
                <span className="text-xs font-medium uppercase tracking-widest text-navy-900">
                  Sứ mệnh
                </span>
              </div>
              <h3 className="mt-4 font-display text-display-md uppercase leading-tight text-navy-900">
                Kiến tạo công trình bền vững
              </h3>
              <p className="mt-6 text-lg leading-relaxed text-neutral-700">
                Cung cấp giải pháp xây dựng toàn diện, chất lượng cao, đúng tiến độ và an toàn — góp phần phát triển hạ tầng và kiến trúc bền vững cho cộng đồng.
              </p>
            </div>
            <div>
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-navy-900" />
                <span className="text-xs font-medium uppercase tracking-widest text-navy-900">
                  Tầm nhìn
                </span>
              </div>
              <h3 className="mt-4 font-display text-display-md uppercase leading-tight text-navy-900">
                Đối tác tin cậy hàng đầu
              </h3>
              <p className="mt-6 text-lg leading-relaxed text-neutral-700">
                Trở thành một trong những đơn vị xây dựng uy tín hàng đầu Việt Nam, được khách hàng, đối tác và cộng đồng tin tưởng lựa chọn.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="bg-neutral-50">
        <Container>
          <div className="max-w-2xl">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-navy-900" />
              <span className="text-xs font-medium uppercase tracking-widest text-navy-900">
                Giá trị cốt lõi
              </span>
            </div>
            <h2 className="mt-4 font-display text-display-lg uppercase leading-tight text-navy-900">
              Bốn giá trị định hình Đông Á
            </h2>
          </div>
          <div className="mt-16">
            <WhyBlock />
          </div>
        </Container>
      </Section>

      <CTABlock />
    </>
  );
}
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/site/section-heading";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input, Textarea, Label, FieldError } from "@/components/ui/field";
import { Stack } from "@/components/ui/stack";
import { StatBlock } from "@/components/site/stat-block";
import { ServiceCard } from "@/components/site/service-card";
import { ProjectCard } from "@/components/site/project-card";
import { ArticleCard } from "@/components/site/article-card";
import { ProcessStep } from "@/components/site/process-step";

export const metadata = { robots: { index: false, follow: false } };

export default function DesignSystemPage() {
  return (
    <>
      <Section>
        <Container>
          <SectionHeading eyebrow="Design System" title="UI Primitives" description="Tất cả component trong một trang để review." />
        </Container>
      </Section>

      <Section className="border-t border-neutral-200">
        <Container>
          <SectionHeading eyebrow="01" title="Buttons" />
          <div className="mt-10 flex flex-wrap gap-4">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="accent">Accent</Button>
            <Button variant="link">Link</Button>
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
          </div>
        </Container>
      </Section>

      <Section className="border-t border-neutral-200">
        <Container>
          <SectionHeading eyebrow="02" title="Badges" />
          <div className="mt-10 flex flex-wrap gap-3">
            <Badge>Default</Badge>
            <Badge variant="navy">Navy</Badge>
            <Badge variant="green">Green</Badge>
            <Badge variant="red">Red</Badge>
            <Badge variant="outline">Outline</Badge>
          </div>
        </Container>
      </Section>

      <Section className="border-t border-neutral-200">
        <Container>
          <SectionHeading eyebrow="03" title="Form Fields" />
          <div className="mt-10 max-w-xl">
            <Stack gap="md">
              <div>
                <Label>Họ tên</Label>
                <Input placeholder="Nguyễn Văn A" className="mt-2" />
              </div>
              <div>
                <Label>Email</Label>
                <Input type="email" placeholder="email@example.com" className="mt-2" />
              </div>
              <div>
                <Label>Lỗi</Label>
                <Input className="mt-2 border-accent-red" />
                <FieldError>Vui lòng nhập họ tên</FieldError>
              </div>
              <div>
                <Label>Nội dung</Label>
                <Textarea placeholder="Nhập nội dung..." className="mt-2" />
              </div>
            </Stack>
          </div>
        </Container>
      </Section>

      <Section className="border-t border-neutral-200">
        <Container>
          <SectionHeading eyebrow="04" title="Statistics" />
          <div className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            <StatBlock value="2003" label="Năm thành lập" />
            <StatBlock value="20+" label="Năm kinh nghiệm" />
          </div>
        </Container>
      </Section>

      <Section className="border-t border-neutral-200">
        <Container>
          <SectionHeading eyebrow="05" title="Services" />
          <div className="mt-10 grid gap-x-12 sm:grid-cols-2 lg:grid-cols-3">
            <ServiceCard index={0} slug="xay-dung-dan-dung" title="Xây dựng dân dụng" shortDescription="Nhà ở, biệt thự, căn hộ, văn phòng." />
            <ServiceCard index={1} slug="xay-dung-cong-nghiep" title="Xây dựng công nghiệp" shortDescription="Nhà xưởng, kho bãi, nhà máy." />
            <ServiceCard index={2} slug="ha-tang-ky-thuat" title="Hạ tầng kỹ thuật" shortDescription="Đường, cầu, hệ thống cấp thoát nước." />
          </div>
        </Container>
      </Section>

      <Section className="border-t border-neutral-200">
        <Container>
          <SectionHeading eyebrow="06" title="Projects" />
          <div className="mt-10 grid gap-x-8 gap-y-12 lg:grid-cols-3">
            <ProjectCard slug="du-an-1" title="Tòa nhà văn phòng A" category="Dân dụng" location="TP.HCM" year={2023} featured />
            <ProjectCard slug="du-an-2" title="Nhà xưởng B" category="Công nghiệp" location="Long An" year={2022} />
            <ProjectCard slug="du-an-3" title="Cầu C" category="Hạ tầng" location="Đồng Nai" year={2024} />
          </div>
        </Container>
      </Section>

      <Section className="border-t border-neutral-200">
        <Container>
          <SectionHeading eyebrow="07" title="Articles" />
          <div className="mt-10 grid gap-x-8 gap-y-12 lg:grid-cols-3">
            <ArticleCard slug="bai-viet-1" title="Xu hướng vật liệu xây dựng 2026" excerpt="Tổng quan các vật liệu bền vững đang được ứng dụng." category="Kiến thức" publishedAt={new Date()} />
            <ArticleCard slug="bai-viet-2" title="Kinh nghiệm chọn nhà thầu" excerpt="Những tiêu chí quan trọng khi chọn đơn vị thi công." category="Kinh nghiệm" publishedAt={new Date()} />
          </div>
        </Container>
      </Section>

      <Section className="border-t border-neutral-200">
        <Container>
          <SectionHeading eyebrow="08" title="Process" />
          <div className="mt-10 grid gap-12 lg:grid-cols-4">
            <ProcessStep index={1} title="Tư vấn" description="Lắng nghe nhu cầu, khảo sát hiện trường." />
            <ProcessStep index={2} title="Thiết kế" description="Lên bản vẽ, dự toán chi phí." />
            <ProcessStep index={3} title="Thi công" description="Triển khai theo đúng tiến độ, chất lượng." />
            <ProcessStep index={4} title="Bàn giao" description="Nghiệm thu, bảo hành dài hạn." isLast />
          </div>
        </Container>
      </Section>
    </>
  );
}
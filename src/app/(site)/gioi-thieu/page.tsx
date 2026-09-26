import type { Metadata } from "next";
import Image from "next/image";
import { Check, Target, Eye, Heart } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/site/page-hero";
import { Stats } from "@/components/site/stats";
import { CTABlock } from "@/components/site/cta-block";
import { buildMetadata } from "@/lib/seo/metadata";

export const revalidate = 3600;

export const metadata: Metadata = buildMetadata({
  title: "Giới thiệu",
  description:
    "Công ty TNHH Tư vấn Thiết kế - Xây dựng Đông Á. Hơn 20 năm kinh nghiệm trong lĩnh vực tư vấn, thiết kế, giám sát và thi công xây dựng.",
  path: "/gioi-thieu",
});

const VALUES = [
  {
    icon: Target,
    title: "Sứ mệnh",
    text: "Kiến tạo những công trình bền vững, góp phần xây dựng hạ tầng và diện mạo đô thị Việt Nam.",
  },
  {
    icon: Eye,
    title: "Tầm nhìn",
    text: "Trở thành thương hiệu xây dựng uy tín hàng đầu khu vực phía Nam vào năm 2030.",
  },
  {
    icon: Heart,
    title: "Giá trị cốt lõi",
    text: "Niềm tin - Chất lượng - Uy tín. Đặt chữ Tín lên hàng đầu trong mọi cam kết với khách hàng.",
  },
];

const COMMITMENTS = [
  "Đội ngũ kỹ sư giàu kinh nghiệm, được đào tạo bài bản",
  "Quy trình thi công chuẩn, đúng tiến độ, đảm bảo chất lượng",
  "Vật tư chính hãng, nguồn gốc rõ ràng, giá cạnh tranh",
  "Bảo hành dài hạn, hỗ trợ khách hàng tận tâm sau bàn giao",
  "An toàn lao động và bảo vệ môi trường là ưu tiên hàng đầu",
  "Minh bạch trong báo giá, không phát sinh chi phí ẩn",
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Về chúng tôi"
        title="Công ty TNHH Tư vấn Thiết kế - Xây dựng Đông Á"
        description="Hơn 20 năm kiến tạo những công trình bền vững, đồng hành cùng sự phát triển của nhiều tỉnh thành phía Nam."
        crumbs={[{ label: "Giới thiệu" }]}
      />

      <Stats />

      <Section className="pt-32">
        <Container>
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <div className="relative">
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1200&q=80"
                  alt="Đông Á"
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>

              <div className="absolute -bottom-8 -right-8 hidden bg-accent p-8 text-white md:block">
                <div className="font-display text-5xl font-extrabold leading-none">20+</div>
                <div className="mt-2 text-xs font-semibold uppercase tracking-[0.2em]">
                  Năm kinh nghiệm
                </div>
              </div>
            </div>

            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
                Câu chuyện của chúng tôi
              </span>
              <h2 className="mt-4 font-display text-3xl font-bold uppercase leading-[1.1] text-navy-900 md:text-4xl">
                Uy tín xây dựng từ những công trình
              </h2>

              <div className="mt-6 space-y-4 text-base leading-relaxed text-neutral-600">
                <p>
                  Công ty TNHH Tư vấn Thiết kế - Xây dựng Đông Á được thành lập với sứ mệnh
                  mang đến giải pháp xây dựng toàn diện, chất lượng cao và bền vững cho
                  khách hàng tại khu vực phía Nam.
                </p>
                <p>
                  Trải qua hơn 20 năm hoạt động, chúng tôi đã hoàn thành hàng trăm công trình
                  dân dụng, công nghiệp, hạ tầng, khẳng định vị thế là đối tác tin cậy của
                  nhiều chủ đầu tư lớn.
                </p>
                <p>
                  Với đội ngũ kỹ sư, kiến trúc sư và công nhân lành nghề, chúng tôi cam kết
                  mang đến cho khách hàng những công trình đạt chuẩn về chất lượng, tiến độ
                  và thẩm mỹ.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="bg-neutral-50">
        <SectionHeader
          eyebrow="Giá trị cốt lõi"
          title="Điều chúng tôi theo đuổi"
          description="Ba trụ cột định hình nên bản sắc và cách chúng tôi làm việc mỗi ngày."
        />

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {VALUES.map((v) => {
            const Icon = v.icon;
            return (
              <div
                key={v.title}
                className="group border border-neutral-200 bg-white p-8 transition-all hover:border-navy-900 hover:shadow-lift"
              >
                <div className="flex h-14 w-14 items-center justify-center bg-navy-900 text-white transition-colors group-hover:bg-accent">
                  <Icon size={24} strokeWidth={1.5} />
                </div>
                <h3 className="mt-6 font-display text-xl font-bold uppercase text-navy-900">
                  {v.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-neutral-600">{v.text}</p>
              </div>
            );
          })}
        </div>
      </Section>

      <Section className="bg-white">
        <Container>
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
                Cam kết của chúng tôi
              </span>
              <h2 className="mt-4 font-display text-3xl font-bold uppercase leading-[1.1] text-navy-900 md:text-4xl">
                Chất lượng là danh dự
              </h2>
              <p className="mt-6 text-base leading-relaxed text-neutral-600">
                Mỗi cam kết với khách hàng đều được chúng tôi thực hiện nghiêm túc, từ khâu
                tư vấn ban đầu đến khi bàn giao và bảo hành.
              </p>

              <ul className="mt-8 space-y-4">
                {COMMITMENTS.map((c) => (
                  <li key={c} className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center bg-accent text-white">
                      <Check size={12} strokeWidth={3} />
                    </div>
                    <span className="text-sm leading-relaxed text-neutral-700">{c}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80"
                  alt="Công trình"
                  fill
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="relative mt-8 aspect-square overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1590725140246-20acdee442be?w=800&q=80"
                  alt="Công trình"
                  fill
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&q=80"
                  alt="Công trình"
                  fill
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="relative mt-8 aspect-square overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&q=80"
                  alt="Công trình"
                  fill
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <CTABlock />
    </>
  );
}
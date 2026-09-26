import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/site/page-hero";
import { Section, SectionHeader } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { ServiceCard } from "@/components/site/service-card";
import { CTABlock } from "@/components/site/cta-block";
import { Partners } from "@/components/site/partners";
import { prisma } from "@/lib/db";
import { buildMetadata } from "@/lib/seo/metadata";

export const revalidate = 1800;

export const metadata: Metadata = buildMetadata({
  title: "Dịch vụ",
  description:
    "Tư vấn thiết kế, giám sát và thi công xây dựng dân dụng, công nghiệp, hạ tầng bởi đội ngũ kỹ sư giàu kinh nghiệm của Đông Á.",
  path: "/dich-vu",
});

type ServiceRow = {
  id: string;
  title: string;
  slug: string;
  shortDescription: string | null;
  coverImage: { url: string } | null;
};

const FALLBACK_SERVICES = [
  {
    id: "1",
    title: "Tư vấn xây dựng",
    slug: "#",
    shortDescription:
      "Tư vấn giải pháp, lập dự án đầu tư, thẩm tra thiết kế và dự toán công trình cho mọi loại hình dự án.",
    coverImageUrl: null,
  },
  {
    id: "2",
    title: "Thiết kế kiến trúc",
    slug: "#",
    shortDescription:
      "Thiết kế kiến trúc, kết cấu, MEP cho công trình dân dụng, công nghiệp và hạ tầng kỹ thuật.",
    coverImageUrl: null,
  },
  {
    id: "3",
    title: "Giám sát thi công",
    slug: "#",
    shortDescription:
      "Giám sát chất lượng, tiến độ, khối lượng và an toàn lao động tại công trường theo đúng tiêu chuẩn.",
    coverImageUrl: null,
  },
  {
    id: "4",
    title: "Thi công xây dựng",
    slug: "#",
    shortDescription:
      "Thi công trọn gói từ móng đến hoàn thiện, đảm bảo tiến độ, chất lượng và an toàn tuyệt đối.",
    coverImageUrl: null,
  },
];

async function getServices(): Promise<ServiceRow[]> {
  try {
    return (await prisma.service.findMany({
      where: { published: true },
      orderBy: [{ featured: "desc" }, { createdAt: "asc" }],
      include: { coverImage: { select: { url: true } } },
    })) as unknown as ServiceRow[];
  } catch {
    return [];
  }
}

export default async function ServicesPage() {
  const fromDb = await getServices();
  const services =
    fromDb.length > 0
      ? fromDb.map((s) => ({
          id: s.id,
          title: s.title,
          slug: s.slug,
          shortDescription: s.shortDescription,
          coverImageUrl: s.coverImage?.url ?? null,
        }))
      : FALLBACK_SERVICES;

  return (
    <>
      <PageHero
        eyebrow="Lĩnh vực hoạt động"
        title="Dịch vụ của chúng tôi"
        description="Đông Á cung cấp giải pháp xây dựng toàn diện từ tư vấn, thiết kế, giám sát đến thi công — đảm bảo chất lượng và tiến độ cho mọi dự án."
        crumbs={[{ label: "Dịch vụ" }]}
      />

      <Section>
        <Container>
          <SectionHeader
            eyebrow="4 lĩnh vực chính"
            title="Giải pháp xây dựng toàn diện"
            description="Chúng tôi đồng hành cùng khách hàng xuyên suốt vòng đời dự án — từ ý tưởng ban đầu đến khi công trình đi vào sử dụng."
          />

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s, idx) => (
              <ServiceCard
                key={s.id}
                index={idx}
                title={s.title}
                slug={s.slug}
                shortDescription={s.shortDescription}
                coverImageUrl={s.coverImageUrl}
              />
            ))}
          </div>

          {/* Quote block */}
          <div className="mt-20 grid items-center gap-12 border border-neutral-200 bg-neutral-50 p-8 md:grid-cols-3 md:p-12">
            <div className="md:col-span-1">
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
                Cam kết
              </span>
              <h3 className="mt-3 font-display text-2xl font-bold uppercase leading-tight text-navy-900 md:text-3xl">
                Chất lượng là danh dự
              </h3>
              <div className="mt-4 h-1 w-12 bg-accent" />
            </div>
            <div className="md:col-span-2">
              <p className="text-base leading-relaxed text-neutral-700 md:text-lg">
                Mỗi dịch vụ chúng tôi cung cấp đều dựa trên nguyên tắc{" "}
                <strong className="text-navy-900">minh bạch - chuyên nghiệp - bền vững</strong>.
                Đội ngũ kỹ sư của Đông Á không chỉ thi công đúng kỹ thuật mà còn tư vấn
                giải pháp tối ưu chi phí và thẩm mỹ cho khách hàng.
              </p>
              <Link
                href="/lien-he"
                className="mt-6 inline-flex items-center gap-2 bg-navy-900 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white transition-colors hover:bg-navy-800"
              >
                Nhận tư vấn miễn phí
              </Link>
            </div>
          </div>
        </Container>
      </Section>

      <Partners />

      <CTABlock
        title="Bạn cần dịch vụ nào?"
        description="Hãy để lại thông tin, đội ngũ Đông Á sẽ tư vấn giải pháp phù hợp nhất cho dự án của bạn."
      />
    </>
  );
}
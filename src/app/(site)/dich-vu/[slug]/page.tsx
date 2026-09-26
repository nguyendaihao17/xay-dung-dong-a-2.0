import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Check } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { PageHero } from "@/components/site/page-hero";
import { RichContent } from "@/components/site/rich-content";
import { CTABlock } from "@/components/site/cta-block";
import { prisma } from "@/lib/db";
import { buildMetadata } from "@/lib/seo/metadata";

export const revalidate = 3600;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const s = await prisma.service.findUnique({
      where: { slug },
      include: { coverImage: { select: { url: true } } },
    });
    if (!s) return buildMetadata({ title: "Dịch vụ" });
    return buildMetadata({
      title: s.title,
      description: s.shortDescription || undefined,
      image: s.coverImage?.url,
      path: `/dich-vu/${s.slug}`,
    });
  } catch {
    return buildMetadata({ title: "Dịch vụ" });
  }
}

const HIGHLIGHTS = [
  "Đội ngũ kỹ sư giàu kinh nghiệm",
  "Quy trình chuẩn ISO",
  "Vật tư chính hãng, giá cạnh tranh",
  "Bảo hành dài hạn",
  "Đúng tiến độ, không phát sinh",
  "Hỗ trợ tận tâm sau bàn giao",
];

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;

  let service = null;
  let others: any[] = [];

  try {
    service = await prisma.service.findUnique({
      where: { slug },
      include: { coverImage: { select: { url: true } } },
    });

    if (service) {
      others = await prisma.service.findMany({
        where: { published: true, id: { not: service.id } },
        take: 4,
        orderBy: { createdAt: "asc" },
        select: {
          id: true,
          title: true,
          slug: true,
          shortDescription: true,
          coverImage: { select: { url: true } },
        },
      });
    }
  } catch {
    service = null;
  }

  if (!service) notFound();

  return (
    <>
      <PageHero
        eyebrow="Dịch vụ"
        title={service.title}
        description={service.shortDescription || undefined}
        crumbs={[
          { label: "Dịch vụ", href: "/dich-vu" },
          { label: service.title },
        ]}
      />

      {service.coverImage?.url && (
        <Container className="pt-12">
          <div className="relative aspect-[16/9] w-full overflow-hidden bg-neutral-100">
            <Image
              src={service.coverImage.url}
              alt={service.title}
              fill
              sizes="100vw"
              className="object-cover"
              priority
            />
          </div>
        </Container>
      )}

      <Section>
        <Container>
          <Link
            href="/dich-vu"
            className="mb-8 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-neutral-500 transition-colors hover:text-accent"
          >
            <ArrowLeft size={14} />
            Quay lại dịch vụ
          </Link>

          <div className="grid gap-16 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <RichContent content={service.content as never} />
            </div>

            <aside className="lg:col-span-4">
              <div className="sticky top-24 border border-neutral-200 bg-neutral-50 p-8">
                <h3 className="font-display text-sm font-bold uppercase tracking-[0.2em] text-navy-900">
                  Cam kết của chúng tôi
                </h3>

                <ul className="mt-6 space-y-3">
                  {HIGHLIGHTS.map((h) => (
                    <li key={h} className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center bg-accent text-white">
                        <Check size={11} strokeWidth={3} />
                      </div>
                      <span className="text-sm leading-relaxed text-neutral-700">{h}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/lien-he"
                  className="mt-8 flex w-full items-center justify-center bg-navy-900 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white transition-colors hover:bg-navy-800"
                >
                  Yêu cầu báo giá
                </Link>
              </div>
            </aside>
          </div>
        </Container>
      </Section>

      {others.length > 0 && (
        <Section className="border-t border-neutral-200 bg-neutral-50">
          <Container>
            <div className="text-center">
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
                Dịch vụ khác
              </span>
              <h2 className="mt-3 font-display text-3xl font-bold uppercase text-navy-900 md:text-4xl">
                Chúng tôi còn cung cấp
              </h2>
              <div className="mx-auto mt-6 h-1 w-16 bg-accent" />
            </div>

            <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {others.map((s) => (
                <Link
                  key={s.id}
                  href={`/dich-vu/${s.slug}`}
                  className="group border border-neutral-200 bg-white p-6 transition-all hover:border-navy-900 hover:shadow-lift"
                >
                  <h3 className="font-display text-base font-bold uppercase leading-tight text-navy-900 group-hover:text-accent">
                    {s.title}
                  </h3>
                  {s.shortDescription && (
                    <p className="mt-3 line-clamp-2 text-xs leading-relaxed text-neutral-600">
                      {s.shortDescription}
                    </p>
                  )}
                </Link>
              ))}
            </div>
          </Container>
        </Section>
      )}

      <CTABlock />
    </>
  );
}
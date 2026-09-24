import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { PageHero } from "@/components/site/page-hero";
import { RichContent } from "@/components/site/rich-content";
import { CTABlock } from "@/components/site/cta-block";
import { serviceRepository } from "@/lib/repositories/service.repository";
import { buildMetadata } from "@/lib/seo/metadata";

export const revalidate = 3600;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = await serviceRepository.bySlug(slug).catch(() => null);
  if (!service) return buildMetadata({ title: "Dịch vụ" });
  return buildMetadata({
    title: service.seoTitle || service.title,
    description: service.metaDescription || service.shortDescription,
    image: service.coverImage?.url,
    path: `/dich-vu/${service.slug}`,
    noIndex: service.noIndex,
  });
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = await serviceRepository.bySlug(slug).catch(() => null);
  if (!service) notFound();

  return (
    <>
      <PageHero
        eyebrow="Dịch vụ"
        title={service.title}
        description={service.shortDescription || undefined}
        crumbs={[{ label: "Dịch vụ", href: "/dich-vu" }, { label: service.title }]}
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
          <div className="mx-auto max-w-4xl">
            <RichContent content={service.content as unknown} />
          </div>
        </Container>
      </Section>

      <CTABlock />
    </>
  );
}
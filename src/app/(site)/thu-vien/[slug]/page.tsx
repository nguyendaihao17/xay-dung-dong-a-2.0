import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { PageHero } from "@/components/site/page-hero";
import { CTABlock } from "@/components/site/cta-block";
import { AlbumLightbox } from "@/components/site/album-lightbox";
import { prisma } from "@/lib/db";
import { buildMetadata } from "@/lib/seo/metadata";

export const revalidate = 1800;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const album = await prisma.album.findUnique({
      where: { slug },
      include: { coverImage: { select: { url: true } } },
    });
    if (!album) return buildMetadata({ title: "Thư viện" });
    return buildMetadata({
      title: album.title,
      description: album.description || undefined,
      image: album.coverImage?.url,
      path: `/thu-vien/${album.slug}`,
    });
  } catch {
    return buildMetadata({ title: "Thư viện" });
  }
}

export default async function AlbumDetailPage({ params }: Props) {
  const { slug } = await params;

  let album = null;
  try {
    album = await prisma.album.findUnique({
      where: { slug },
      include: {
        items: {
          orderBy: { sortOrder: "asc" },
          include: { media: true },
        },
      },
    });
  } catch {
    album = null;
  }

  if (!album) notFound();

  const images = album.items.map((item) => ({
    id: item.id,
    url: item.media.url,
    caption: item.caption,
  }));

  return (
    <>
      <PageHero
        eyebrow="Thư viện"
        title={album.title}
        description={album.description || undefined}
        crumbs={[
          { label: "Thư viện", href: "/thu-vien" },
          { label: album.title },
        ]}
      />

      <Section>
        <Container>
          <Link
            href="/thu-vien"
            className="mb-10 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-neutral-500 transition-colors hover:text-accent"
          >
            <ArrowLeft size={14} />
            Quay lại thư viện
          </Link>

          <p className="mb-6 text-sm text-neutral-500">
            <span className="font-semibold text-navy-900">{images.length}</span> ảnh trong album này
          </p>

          {images.length > 0 ? (
            <AlbumLightbox images={images} />
          ) : (
            <div className="border border-dashed border-neutral-300 bg-white p-16 text-center">
              <p className="text-neutral-500">Album này chưa có ảnh nào.</p>
            </div>
          )}
        </Container>
      </Section>

      <CTABlock />
    </>
  );
}
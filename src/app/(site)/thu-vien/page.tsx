import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Images } from "lucide-react";
import { PageHero } from "@/components/site/page-hero";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { CTABlock } from "@/components/site/cta-block";
import { prisma } from "@/lib/db";
import { buildMetadata } from "@/lib/seo/metadata";

export const revalidate = 1800;

export const metadata: Metadata = buildMetadata({
  title: "Thư viện",
  description:
    "Thư viện hình ảnh công trình, dự án và hoạt động của Công ty TNHH Tư vấn Thiết kế - Xây dựng Đông Á.",
  path: "/thu-vien",
});

type AlbumRow = {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  coverImage: { url: string } | null;
  _count: { items: number };
};

async function getAlbums(): Promise<AlbumRow[]> {
  try {
    return (await prisma.album.findMany({
      where: { published: true },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
      include: {
        coverImage: { select: { url: true } },
        _count: { select: { items: true } },
      },
    })) as unknown as AlbumRow[];
  } catch {
    return [];
  }
}

export default async function GalleryPage() {
  const albums = await getAlbums();

  return (
    <>
      <PageHero
        eyebrow="Thư viện"
        title="Thư viện hình ảnh"
        description="Khám phá các công trình, dự án và hoạt động của Đông Á qua từng khung hình."
        crumbs={[{ label: "Thư viện" }]}
      />

      <Section>
        <Container>
          {albums.length === 0 ? (
            <div className="mx-auto max-w-2xl py-20 text-center">
              <Images size={56} className="mx-auto text-neutral-300" />
              <h3 className="mt-6 font-display text-2xl font-bold uppercase text-navy-900">
                Chưa có album nào
              </h3>
              <p className="mt-3 text-base text-neutral-600">
                Thư viện ảnh sẽ được cập nhật sớm. Vui lòng quay lại sau.
              </p>
              <Link
                href="/lien-he"
                className="mt-8 inline-flex items-center gap-2 bg-navy-900 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white hover:bg-navy-800"
              >
                Liên hệ tư vấn
              </Link>
            </div>
          ) : (
            <>
              <div className="mb-10 flex items-end justify-between">
                <p className="text-sm text-neutral-500">
                  Hiển thị <span className="font-semibold text-navy-900">{albums.length}</span> album
                </p>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {albums.map((album) => (
                  <Link
                    key={album.id}
                    href={`/thu-vien/${album.slug}`}
                    className="group flex flex-col overflow-hidden border border-neutral-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-navy-900 hover:shadow-lift"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden bg-neutral-100">
                      {album.coverImage?.url ? (
                        <Image
                          src={album.coverImage.url}
                          alt={album.title}
                          fill
                          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-navy-900 to-navy-700">
                          <Images size={48} className="text-white/20" />
                        </div>
                      )}

                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-950/80 to-transparent p-4">
                        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-white">
                          <Images size={12} />
                          {album._count.items} ảnh
                        </div>
                      </div>

                      <div className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center bg-accent text-white opacity-0 transition-opacity group-hover:opacity-100">
                        <ArrowUpRight size={18} />
                      </div>
                    </div>

                    <div className="flex flex-1 flex-col p-6">
                      <h3 className="font-display text-lg font-bold uppercase leading-tight text-navy-900 transition-colors group-hover:text-accent">
                        {album.title}
                      </h3>
                      {album.description && (
                        <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-neutral-600">
                          {album.description}
                        </p>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}
        </Container>
      </Section>

      <CTABlock />
    </>
  );
}
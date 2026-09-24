import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { PageHero } from "@/components/site/page-hero";
import { CTABlock } from "@/components/site/cta-block";

export const metadata: Metadata = {
  title: "Thư viện",
  description: "Thư viện hình ảnh công trình và hoạt động của Công ty TNHH Xây dựng Đông Á.",
};

const PLACEHOLDER_ALBUMS = [
  { slug: "du-an-dan-dung", title: "Dự án dân dụng", count: 24 },
  { slug: "du-an-cong-nghiep", title: "Dự án công nghiệp", count: 18 },
  { slug: "ha-tang-ky-thuat", title: "Hạ tầng kỹ thuật", count: 12 },
  { slug: "hoat-dong-cong-ty", title: "Hoạt động công ty", count: 32 },
];

export default function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="Thư viện"
        title="Thư viện hình ảnh"
        description="Hình ảnh công trình, dự án và hoạt động của Đông Á qua hơn 20 năm."
        crumbs={[{ label: "Thư viện" }]}
      />

      <Section>
        <Container>
          <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {PLACEHOLDER_ALBUMS.map((album, i) => (
              <div key={album.slug} className="group cursor-pointer">
                <div className="relative aspect-[4/3] overflow-hidden bg-neutral-200">
                  <div className="flex h-full items-center justify-center bg-gradient-to-br from-navy-900 to-navy-700">
                    <span className="font-display text-5xl text-white/30">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-navy-950/40 opacity-0 transition-opacity group-hover:opacity-100" />
                </div>
                <div className="mt-5">
                  <h3 className="font-display text-xl uppercase text-navy-900">{album.title}</h3>
                  <p className="mt-1 text-sm text-neutral-500">{album.count} hình ảnh</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <CTABlock />
    </>
  );
}
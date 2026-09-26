import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button-link";
import { prisma } from "@/lib/db";

type ProjectCard = {
  id: string;
  title: string;
  slug: string;
  shortDescription: string | null;
  location: string | null;
  year: number | null;
  coverImageUrl: string | null;
};

async function getFeaturedProjects(): Promise<ProjectCard[]> {
  try {
    const rows = await prisma.project.findMany({
      where: { published: true },
      orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
      take: 6,
      include: { coverImage: { select: { url: true } } },
    });

    return rows.map((p) => ({
      id: p.id,
      title: p.title,
      slug: p.slug,
      shortDescription: p.shortDescription,
      location: p.location,
      year: p.year,
      coverImageUrl: p.coverImage?.url ?? null,
    }));
  } catch {
    return [];
  }
}

// Ảnh mẫu khi chưa có dự án trong DB
const FALLBACK: ProjectCard[] = [
  {
    id: "1",
    title: "Nhà máy sản xuất công nghiệp",
    slug: "#",
    shortDescription: "Thi công trọn gói nhà xưởng công nghiệp quy mô lớn.",
    location: "KCN Long Hậu, Long An",
    year: 2024,
    coverImageUrl: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=80",
  },
  {
    id: "2",
    title: "Tòa nhà văn phòng cho thuê",
    slug: "#",
    shortDescription: "Thiết kế và thi công tòa nhà văn phòng 12 tầng.",
    location: "Quận 7, TP.HCM",
    year: 2024,
    coverImageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80",
  },
  {
    id: "3",
    title: "Khu dân cư cao cấp",
    slug: "#",
    shortDescription: "Tư vấn thiết kế và giám sát khu dân cư 5 hecta.",
    location: "Bình Dương",
    year: 2023,
    coverImageUrl: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1200&q=80",
  },
];

export async function FeaturedProjects() {
  const fromDb = await getFeaturedProjects();
  const projects = fromDb.length > 0 ? fromDb : FALLBACK;

  return (
    <Section className="bg-white">
      <SectionHeader
        eyebrow="Dự án tiêu biểu"
        title="Công trình chúng tôi đã thực hiện"
        description="Mỗi công trình là một cam kết về chất lượng, tiến độ và uy tín của Đông Á."
      />

      <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((p, idx) => (
          <Link
            key={p.id}
            href={p.slug === "#" ? "/du-an" : `/du-an/${p.slug}`}
            className={`group relative overflow-hidden bg-navy-900 ${
              idx === 0 ? "md:col-span-2 md:row-span-2" : ""
            }`}
          >
            <div
              className={`relative overflow-hidden ${
                idx === 0 ? "aspect-[4/3] md:aspect-auto md:h-full" : "aspect-[4/3]"
              }`}
            >
              {p.coverImageUrl ? (
                <Image
                  src={p.coverImageUrl}
                  alt={p.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
              ) : (
                <div className="absolute inset-0 bg-navy-800" />
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-transparent" />

              <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                <div className="flex flex-wrap gap-3 text-xs font-medium uppercase tracking-[0.2em] text-accent">
                  {p.location && <span>{p.location}</span>}
                  {p.location && p.year && <span>•</span>}
                  {p.year && <span>{p.year}</span>}
                </div>

                <h3 className="mt-3 font-display text-xl font-bold uppercase leading-tight text-white md:text-2xl">
                  {p.title}
                </h3>

                {p.shortDescription && (
                  <p className="mt-3 line-clamp-2 max-w-lg text-sm leading-relaxed text-white/70">
                    {p.shortDescription}
                  </p>
                )}

                <div className="mt-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-white transition-transform group-hover:translate-x-1">
                  Xem chi tiết
                  <ArrowUpRight size={16} />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-14 text-center">
        <ButtonLink href="/du-an" variant="outline" size="lg">
          Xem tất cả dự án
          <ArrowUpRight size={18} />
        </ButtonLink>
      </div>
    </Section>
  );
}
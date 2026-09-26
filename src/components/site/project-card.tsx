import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

type Props = {
  id: string;
  title: string;
  slug: string;
  shortDescription: string | null;
  location: string | null;
  year: number | null;
  coverImageUrl: string | null;
  categoryName?: string | null;
};

export function ProjectCard({
  title,
  slug,
  shortDescription,
  location,
  year,
  coverImageUrl,
  categoryName,
}: Props) {
  return (
    <Link
      href={`/du-an/${slug}`}
      className="group flex flex-col overflow-hidden border border-neutral-200 bg-white transition-all duration-300 hover:border-navy-900 hover:shadow-lift"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-neutral-100">
        {coverImageUrl ? (
          <Image
            src={coverImageUrl}
            alt={title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-navy-900 to-navy-700 text-white/30">
            <span className="font-display text-4xl font-bold">ĐA</span>
          </div>
        )}

        {/* Category badge */}
        {categoryName && (
          <div className="absolute left-4 top-4 bg-navy-900 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-white">
            {categoryName}
          </div>
        )}

        {/* Hover overlay arrow */}
        <div className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center bg-accent text-white opacity-0 transition-all duration-300 group-hover:opacity-100">
          <ArrowUpRight size={18} />
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap items-center gap-3 text-[11px] font-medium uppercase tracking-[0.15em] text-accent">
          {location && <span>{location}</span>}
          {location && year && <span className="text-neutral-300">•</span>}
          {year && <span>{year}</span>}
        </div>

        <h3 className="mt-3 font-display text-lg font-bold uppercase leading-tight text-navy-900 transition-colors group-hover:text-accent md:text-xl">
          {title}
        </h3>

        {shortDescription && (
          <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-neutral-600">
            {shortDescription}
          </p>
        )}
      </div>
    </Link>
  );
}
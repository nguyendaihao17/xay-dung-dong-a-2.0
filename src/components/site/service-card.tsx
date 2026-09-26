import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

type Props = {
  title: string;
  slug: string;
  shortDescription: string | null;
  coverImageUrl: string | null;
  index?: number;
};

export function ServiceCard({
  title,
  slug,
  shortDescription,
  coverImageUrl,
  index = 0,
}: Props) {
  return (
    <Link
      href={`/dich-vu/${slug}`}
      className="group relative flex flex-col overflow-hidden border border-neutral-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-navy-900 hover:shadow-lift"
    >
      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-navy-900 to-navy-700">
        {coverImageUrl ? (
          <Image
            src={coverImageUrl}
            alt={title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-display text-6xl font-bold text-white/10">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-navy-950/20 to-transparent" />

        {/* Number badge */}
        <div className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center bg-accent font-display text-sm font-bold text-white">
          {String(index + 1).padStart(2, "0")}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-xl font-bold uppercase leading-tight text-navy-900 transition-colors group-hover:text-accent">
          {title}
        </h3>

        {shortDescription && (
          <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-neutral-600">
            {shortDescription}
          </p>
        )}

        <div className="mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-accent">
          Tìm hiểu thêm
          <ArrowUpRight
            size={14}
            className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
          />
        </div>
      </div>
    </Link>
  );
}
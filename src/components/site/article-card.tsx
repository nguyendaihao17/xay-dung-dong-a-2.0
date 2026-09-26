import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Calendar } from "lucide-react";

type Props = {
  title: string;
  slug: string;
  excerpt: string | null;
  coverImageUrl: string | null;
  categoryName?: string | null;
  publishedAt: Date | string | null;
  featured?: boolean;
  big?: boolean;
};

function formatDate(d: Date | string | null | undefined) {
  if (!d) return "";
  const date = new Date(d);
  return new Intl.DateTimeFormat("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
}

export function ArticleCard({
  title,
  slug,
  excerpt,
  coverImageUrl,
  categoryName,
  publishedAt,
  big = false,
}: Props) {
  return (
    <Link
      href={`/tin-tuc/${slug}`}
      className={`group flex flex-col overflow-hidden border border-neutral-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-navy-900 hover:shadow-lift ${
        big ? "md:col-span-2 md:row-span-2" : ""
      }`}
    >
      {/* Image */}
      <div className={`relative overflow-hidden bg-neutral-100 ${big ? "aspect-[16/10]" : "aspect-[16/10]"}`}>
        {coverImageUrl ? (
          <Image
            src={coverImageUrl}
            alt={title}
            fill
            sizes={big ? "(min-width: 1024px) 66vw, 100vw" : "(min-width: 1024px) 33vw, 100vw"}
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-navy-900 to-navy-700">
            <span className="font-display text-5xl font-bold text-white/10">ĐA</span>
          </div>
        )}

        {categoryName && (
          <div className="absolute left-4 top-4 bg-accent px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-white">
            {categoryName}
          </div>
        )}
      </div>

      {/* Content */}
      <div className={`flex flex-1 flex-col ${big ? "p-8" : "p-6"}`}>
        <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.15em] text-neutral-500">
          <Calendar size={12} />
          <time>{formatDate(publishedAt)}</time>
        </div>

        <h3
          className={`mt-3 font-display font-bold uppercase leading-tight text-navy-900 transition-colors group-hover:text-accent ${
            big ? "text-2xl md:text-3xl" : "text-lg"
          }`}
        >
          {title}
        </h3>

        {excerpt && (
          <p
            className={`mt-3 flex-1 leading-relaxed text-neutral-600 ${
              big ? "text-base line-clamp-3" : "text-sm line-clamp-2"
            }`}
          >
            {excerpt}
          </p>
        )}

        <div className="mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-accent">
          Đọc tiếp
          <ArrowUpRight
            size={14}
            className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
          />
        </div>
      </div>
    </Link>
  );
}
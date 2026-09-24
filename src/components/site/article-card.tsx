import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/lib/utils";

type Props = {
  slug: string;
  title: string;
  excerpt?: string;
  category?: string;
  publishedAt?: Date | string;
  coverImage?: string;
};

export function ArticleCard({ slug, title, excerpt, category, publishedAt, coverImage }: Props) {
  return (
    <Link href={`/tin-tuc/${slug}`} className="group block">
      <div className="relative aspect-[16/10] overflow-hidden bg-neutral-200">
        {coverImage ? (
          <Image
            src={coverImage}
            alt={title}
            fill
            sizes="(min-width: 1024px) 33vw, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-neutral-100 text-neutral-300">
            <span className="font-display text-3xl">ĐA</span>
          </div>
        )}
      </div>
      <div className="mt-5">
        <div className="flex items-center gap-3 text-xs font-medium uppercase tracking-widest text-neutral-500">
          {category && <span className="text-navy-900">{category}</span>}
          {publishedAt && (
            <>
              {category && <span>·</span>}
              <time>{formatDate(publishedAt)}</time>
            </>
          )}
        </div>
        <h3 className="mt-3 font-display text-xl uppercase leading-tight text-navy-900 transition-colors group-hover:text-navy-700">
          {title}
        </h3>
        {excerpt && (
          <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-neutral-600">{excerpt}</p>
        )}
      </div>
    </Link>
  );
}
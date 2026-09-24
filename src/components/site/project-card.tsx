import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  slug: string;
  title: string;
  category?: string;
  location?: string;
  year?: number;
  coverImage?: string;
  featured?: boolean;
};

export function ProjectCard({ slug, title, category, location, year, coverImage, featured }: Props) {
  return (
    <Link
      href={`/du-an/${slug}`}
      className={cn("group block", featured && "lg:col-span-2 lg:row-span-2")}
    >
      <div className={cn("relative overflow-hidden bg-neutral-200", featured ? "aspect-[4/3] lg:aspect-[16/10]" : "aspect-[4/3]")}>
        {coverImage ? (
          <Image
            src={coverImage}
            alt={title}
            fill
            sizes={featured ? "(min-width: 1024px) 66vw, 100vw" : "(min-width: 1024px) 33vw, 100vw"}
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-navy-100 text-navy-300">
            <span className="font-display text-4xl">ĐA</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-navy-950/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <div className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center bg-white opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          <ArrowUpRight size={20} className="text-navy-900" />
        </div>
      </div>
      <div className="mt-5">
        <div className="flex items-center gap-3 text-xs font-medium uppercase tracking-widest text-neutral-500">
          {category && <span>{category}</span>}
          {category && (location || year) && <span>·</span>}
          {location && <span>{location}</span>}
          {year && <span>· {year}</span>}
        </div>
        <h3 className="mt-2 font-display text-2xl uppercase leading-tight text-navy-900 transition-colors group-hover:text-navy-700">
          {title}
        </h3>
      </div>
    </Link>
  );
}
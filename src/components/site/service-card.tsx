import Link from "next/link";
import { ArrowRight } from "lucide-react";

type Props = {
  slug: string;
  title: string;
  shortDescription?: string;
  index: number;
};

export function ServiceCard({ slug, title, shortDescription, index }: Props) {
  return (
    <Link
      href={`/dich-vu/${slug}`}
      className="group flex flex-col border-t border-neutral-300 py-8 transition-colors hover:border-navy-900"
    >
      <div className="flex items-start justify-between gap-6">
        <span className="font-display text-sm uppercase tracking-widest text-neutral-400">
          {String(index + 1).padStart(2, "0")}
        </span>
        <ArrowRight
          size={20}
          className="-translate-x-2 text-navy-900 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
        />
      </div>
      <h3 className="mt-6 font-display text-2xl uppercase leading-tight text-navy-900">
        {title}
      </h3>
      {shortDescription && (
        <p className="mt-3 text-sm leading-relaxed text-neutral-600">{shortDescription}</p>
      )}
    </Link>
  );
}
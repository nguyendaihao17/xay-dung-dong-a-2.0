import Link from "next/link";
import { ArrowRight } from "lucide-react";

type Props = {
  eyebrow?: string;
  title: string;
  paragraphs: string[];
  link?: { label: string; href: string };
};

export function IntroBlock({ eyebrow, title, paragraphs, link }: Props) {
  return (
    <div className="grid gap-12 lg:grid-cols-12 lg:gap-20">
      <div className="lg:col-span-5">
        {eyebrow && (
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-navy-900" />
            <span className="text-xs font-medium uppercase tracking-widest text-navy-900">
              {eyebrow}
            </span>
          </div>
        )}
        <h2 className="mt-4 font-display text-display-lg uppercase leading-[1.05] text-navy-900">
          {title}
        </h2>
      </div>
      <div className="lg:col-span-7">
        <div className="space-y-5 text-lg leading-relaxed text-neutral-700">
          {paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
        {link && (
          <Link
            href={link.href}
            className="mt-8 inline-flex items-center gap-2 border-b border-navy-900 pb-1 text-sm font-medium uppercase tracking-wider text-navy-900 transition-colors hover:text-navy-700"
          >
            {link.label}
            <ArrowRight size={16} />
          </Link>
        )}
      </div>
    </div>
  );
}
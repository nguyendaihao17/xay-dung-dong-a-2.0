import Link from "next/link";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import { Container } from "@/components/ui/container";

type Crumb = { label: string; href?: string };

export function PageHero({
  eyebrow,
  title,
  description,
  crumbs = [],
  imageUrl = "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1920&q=80",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  crumbs?: Crumb[];
  imageUrl?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-navy-950">
      <div className="absolute inset-0">
        <Image
          src={imageUrl}
          alt={title}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/85 to-navy-950/60" />
      </div>

      <Container className="relative py-20 md:py-28">
        {eyebrow && (
          <span className="inline-block text-xs font-semibold uppercase tracking-[0.3em] text-accent">
            {eyebrow}
          </span>
        )}

        <h1 className="mt-4 max-w-4xl font-display text-4xl font-bold uppercase leading-[1.05] text-white md:text-5xl lg:text-6xl">
          {title}
        </h1>

        {description && (
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/75 md:text-lg">
            {description}
          </p>
        )}

        {crumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="mt-8">
            <ol className="flex flex-wrap items-center gap-2 text-xs font-medium uppercase tracking-[0.15em] text-white/60">
              <li>
                <Link href="/" className="transition-colors hover:text-accent">
                  Trang chủ
                </Link>
              </li>
              {crumbs.map((c, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <ChevronRight size={14} />
                  {c.href ? (
                    <Link href={c.href} className="transition-colors hover:text-accent">
                      {c.label}
                    </Link>
                  ) : (
                    <span className="text-white/90">{c.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}
      </Container>
    </section>
  );
}
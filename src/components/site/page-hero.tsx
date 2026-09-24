import { Container } from "@/components/ui/container";

type Crumb = { label: string; href?: string };

type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
  crumbs?: Crumb[];
};

export function PageHero({ eyebrow, title, description, crumbs }: Props) {
  return (
    <section className="border-b border-neutral-200 bg-neutral-50">
      <Container className="py-16 lg:py-24">
        {crumbs && crumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-widest text-neutral-500">
              <li><a href="/" className="hover:text-navy-900">Trang chủ</a></li>
              {crumbs.map((c, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span>/</span>
                  {c.href ? (
                    <a href={c.href} className="hover:text-navy-900">{c.label}</a>
                  ) : (
                    <span className="text-navy-900">{c.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}
        {eyebrow && (
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-navy-900" />
            <span className="text-xs font-medium uppercase tracking-widest text-navy-900">
              {eyebrow}
            </span>
          </div>
        )}
        <h1 className="mt-4 font-display text-display-lg uppercase leading-tight text-navy-900">
          {title}
        </h1>
        {description && (
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-neutral-600">
            {description}
          </p>
        )}
      </Container>
    </section>
  );
}
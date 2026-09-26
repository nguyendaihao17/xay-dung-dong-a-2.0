import { cn } from "@/lib/utils";
import { Container } from "./container";

export function Section({
  children,
  className,
  containerClassName,
  size = "default",
  as: Tag = "section",
}: {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  size?: "default" | "wide" | "narrow";
  as?: "section" | "div" | "article";
}) {
  return (
    <Tag className={cn("py-16 md:py-24", className)}>
      <Container size={size} className={containerClassName}>
        {children}
      </Container>
    </Tag>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className
      )}
    >
      {eyebrow && (
        <span className="inline-block text-xs font-semibold uppercase tracking-[0.25em] text-accent">
          {eyebrow}
        </span>
      )}
      <h2 className="mt-4 font-display text-3xl font-bold uppercase tracking-tight text-navy-900 md:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="mt-5 text-base leading-relaxed text-neutral-600 md:text-lg">
          {description}
        </p>
      )}
      <div
        className={cn(
          "mt-6 h-1 w-16 bg-accent",
          align === "center" && "mx-auto"
        )}
      />
    </div>
  );
}
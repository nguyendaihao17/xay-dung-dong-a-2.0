import { cn } from "@/lib/utils";

type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({ eyebrow, title, description, align = "left", className }: Props) {
  return (
    <div className={cn(align === "center" && "text-center", className)}>
      {eyebrow && (
        <div className={cn("flex items-center gap-3", align === "center" && "justify-center")}>
          <span className="h-px w-8 bg-navy-900" />
          <span className="text-xs font-medium uppercase tracking-widest text-navy-900">
            {eyebrow}
          </span>
        </div>
      )}
      <h2 className="mt-4 font-display text-display-lg uppercase text-navy-900">{title}</h2>
      {description && (
        <p
          className={cn(
            "mt-5 max-w-2xl text-lg leading-relaxed text-neutral-600",
            align === "center" && "mx-auto"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
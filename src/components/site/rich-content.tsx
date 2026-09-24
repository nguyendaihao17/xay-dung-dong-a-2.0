import { cn } from "@/lib/utils";

type Props = {
  html: string;
  className?: string;
};

export function RichContent({ html, className }: Props) {
  return (
    <div
      className={cn(
        "prose prose-lg max-w-none prose-headings:font-display prose-headings:uppercase prose-headings:text-navy-900 prose-p:text-neutral-700 prose-a:text-navy-900 prose-strong:text-navy-900",
        className
      )}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
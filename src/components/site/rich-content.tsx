import { cn } from "@/lib/utils";

export function contentToHtml(input: unknown): string {
  if (!input) return "";
  if (typeof input === "string") return input;
  if (typeof input === "object" && input !== null && "html" in input) {
    const html = (input as { html?: unknown }).html;
    if (typeof html === "string") return html;
  }
  return "";
}

type Props = {
  content?: unknown;
  html?: string;
  className?: string;
};

export function RichContent({ content, html, className }: Props) {
  const raw = html || contentToHtml(content);
  if (!raw.trim()) {
    return <p className="text-neutral-500">Nội dung đang được cập nhật.</p>;
  }
  return (
    <div
      className={cn(
        "prose prose-lg max-w-none prose-headings:font-display prose-headings:uppercase prose-headings:text-navy-900 prose-p:text-neutral-700 prose-a:text-navy-900 prose-strong:text-navy-900 prose-li:text-neutral-700",
        className
      )}
      dangerouslySetInnerHTML={{ __html: raw }}
    />
  );
}
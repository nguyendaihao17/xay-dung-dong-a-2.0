import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "ghost" | "accent";
type Size = "default" | "lg";

export function ButtonLink({
  href,
  children,
  variant = "primary",
  size = "default",
  className,
  ...rest
}: {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
} & Omit<React.ComponentProps<typeof Link>, "href" | "className">) {
  const variants: Record<Variant, string> = {
    primary:
      "bg-navy-900 text-white hover:bg-navy-800 shadow-card",
    accent:
      "bg-accent text-white hover:bg-accent-hover shadow-glow",
    outline:
      "border-2 border-navy-900 text-navy-900 hover:bg-navy-900 hover:text-white",
    ghost:
      "text-navy-900 hover:bg-navy-50",
  };
  const sizes: Record<Size, string> = {
    default: "h-11 px-6 text-xs",
    lg: "h-14 px-8 text-sm",
  };

  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold uppercase tracking-[0.15em] transition-all duration-200 active:scale-[0.98]",
        variants[variant],
        sizes[size],
        className
      )}
      {...rest}
    >
      {children}
    </Link>
  );
}
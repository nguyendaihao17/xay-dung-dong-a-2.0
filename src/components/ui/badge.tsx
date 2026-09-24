import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

const badgeVariants = cva(
  "inline-flex items-center border px-2.5 py-0.5 text-xs font-medium uppercase tracking-wider",
  {
    variants: {
      variant: {
        default: "border-neutral-300 bg-neutral-100 text-neutral-700",
        navy: "border-navy-900 bg-navy-900 text-white",
        green: "border-accent-green bg-accent-green text-white",
        red: "border-accent-red bg-accent-red text-white",
        outline: "border-neutral-900 text-neutral-900 bg-transparent",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

type BadgeProps = HTMLAttributes<HTMLSpanElement> & VariantProps<typeof badgeVariants>;

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}
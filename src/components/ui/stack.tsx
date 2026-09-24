import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

type StackProps = HTMLAttributes<HTMLDivElement> & {
  gap?: "xs" | "sm" | "md" | "lg" | "xl";
};

const gapMap = {
  xs: "gap-2",
  sm: "gap-3",
  md: "gap-6",
  lg: "gap-10",
  xl: "gap-16",
};

export function Stack({ gap = "md", className, ...props }: StackProps) {
  return <div className={cn("flex flex-col", gapMap[gap], className)} {...props} />;
}
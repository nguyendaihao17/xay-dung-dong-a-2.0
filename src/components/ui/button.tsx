import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";
import Link from "next/link";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium uppercase tracking-wider transition-colors duration-200 disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy-500",
  {
    variants: {
      variant: {
        primary: "bg-navy-900 text-white hover:bg-navy-800",
        secondary: "bg-white text-navy-900 border border-neutral-300 hover:border-navy-900",
        ghost: "bg-transparent text-navy-900 hover:bg-neutral-100",
        outline: "border border-navy-900 text-navy-900 hover:bg-navy-900 hover:text-white",
        accent: "bg-accent-green text-white hover:opacity-90",
        link: "text-navy-900 underline-offset-4 hover:underline normal-case tracking-normal",
      },
      size: {
        sm: "h-9 px-4 text-xs",
        md: "h-11 px-6 text-sm",
        lg: "h-14 px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  }
);

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & { href?: undefined };

type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> &
  VariantProps<typeof buttonVariants> & { href: string };

export function Button(props: ButtonProps | LinkProps) {
  if ("href" in props && props.href) {
    const { href, variant, size, className, children, ...rest } = props as LinkProps;
    return (
      <Link href={href} className={cn(buttonVariants({ variant, size }), className)} {...rest}>
        {children}
      </Link>
    );
  }
  const { variant, size, className, children, ...rest } = props as ButtonProps;
  return (
    <button className={cn(buttonVariants({ variant, size }), className)} {...rest}>
      {children}
    </button>
  );
}

export { buttonVariants };
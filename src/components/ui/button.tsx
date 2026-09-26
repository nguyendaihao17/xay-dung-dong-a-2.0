import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-semibold uppercase tracking-wider transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-900/20 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
  {
    variants: {
      variant: {
        default: "bg-navy-900 text-white hover:bg-navy-800 shadow-card",
        accent: "bg-accent text-white hover:bg-accent-hover shadow-glow",
        destructive: "bg-accent-red text-white hover:bg-accent-red/90",
        outline:
          "border border-neutral-300 bg-white text-navy-900 hover:border-navy-900 hover:bg-neutral-50",
        ghost: "text-navy-900 hover:bg-navy-50",
        link: "text-accent underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-9 px-4 text-xs",
        default: "h-11 px-6 text-xs",
        lg: "h-14 px-8 text-sm",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size }), className)}
        ref={ref}
        suppressHydrationWarning
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
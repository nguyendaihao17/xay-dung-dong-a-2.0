import { forwardRef, type InputHTMLAttributes, type TextareaHTMLAttributes, type SelectHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const fieldBase =
  "w-full border border-neutral-300 bg-white px-4 py-3 text-base text-navy-900 placeholder:text-neutral-400 transition-colors focus:border-navy-900 focus:outline-none focus:ring-2 focus:ring-navy-900/10 disabled:cursor-not-allowed disabled:opacity-50";

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  function Input({ className, ...props }, ref) {
    return (
      <input
        ref={ref}
        className={cn(fieldBase, className)}
        suppressHydrationWarning
        {...props}
      />
    );
  }
);

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement>>(
  function Textarea({ className, ...props }, ref) {
    return (
      <textarea
        ref={ref}
        className={cn(fieldBase, "min-h-[120px] resize-y", className)}
        suppressHydrationWarning
        {...props}
      />
    );
  }
);

export const Select = forwardRef<HTMLSelectElement, SelectHTMLAttributes<HTMLSelectElement>>(
  function Select({ className, ...props }, ref) {
    return (
      <select
        ref={ref}
        className={cn(fieldBase, "cursor-pointer", className)}
        suppressHydrationWarning
        {...props}
      />
    );
  }
);

export function Label({
  className,
  ...props
}: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label
      className={cn(
        "block text-xs font-semibold uppercase tracking-wider text-neutral-600",
        className
      )}
      {...props}
    />
  );
}

export function FieldError({ children }: { children?: React.ReactNode }) {
  if (!children) return null;
  return (
    <p className="mt-1.5 text-xs font-medium text-red-600">
      {children}
    </p>
  );
}
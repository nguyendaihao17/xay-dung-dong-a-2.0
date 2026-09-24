import { cn } from "@/lib/utils";
import type { InputHTMLAttributes, TextareaHTMLAttributes, SelectHTMLAttributes, LabelHTMLAttributes } from "react";

export function Label({ className, ...props }: LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label
      className={cn("block text-xs font-medium uppercase tracking-wider text-neutral-600", className)}
      {...props}
    />
  );
}

const fieldBase =
  "w-full border border-neutral-300 bg-white px-4 py-3 text-base text-neutral-900 placeholder:text-neutral-400 focus:border-navy-900 focus:outline-none disabled:opacity-50";

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn(fieldBase, className)} {...props} />;
}

export function Textarea({ className, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={cn(fieldBase, "min-h-32 resize-y", className)} {...props} />;
}

export function Select({ className, ...props }: SelectHTMLAttributes<HTMLSelectElement>) {
  return <select className={cn(fieldBase, "pr-10", className)} {...props} />;
}

export function FieldError({ children }: { children?: string }) {
  if (!children) return null;
  return <p className="text-sm text-accent-red">{children}</p>;
}
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type Props = {
  title: string;
  description?: string;
  children: ReactNode;
  actions?: ReactNode;
  className?: string;
};

export function FormShell({ title, description, children, actions, className }: Props) {
  return (
    <div className="p-6 lg:p-10">
      <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-display-md uppercase text-navy-900">{title}</h1>
          {description && <p className="mt-2 text-neutral-600">{description}</p>}
        </div>
        {actions}
      </div>
      <div className={cn("max-w-3xl border border-neutral-200 bg-white p-8", className)}>
        {children}
      </div>
    </div>
  );
}
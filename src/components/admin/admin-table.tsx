import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function AdminTable({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("overflow-x-auto border border-neutral-200 bg-white", className)}>
      <table className="w-full text-left text-sm">{children}</table>
    </div>
  );
}

export function AdminTableHead({ children }: { children: ReactNode }) {
  return (
    <thead className="border-b border-neutral-200 bg-neutral-50">
      <tr className="text-xs uppercase tracking-widest text-neutral-500">{children}</tr>
    </thead>
  );
}

export function AdminTh({ children, className }: { children?: ReactNode; className?: string }) {
  return <th className={cn("px-6 py-3 font-medium", className)}>{children}</th>;
}

export function AdminTd({ children, className }: { children?: ReactNode; className?: string }) {
  return <td className={cn("px-6 py-4", className)}>{children}</td>;
}

export function AdminTr({ children }: { children: ReactNode }) {
  return <tr className="border-b border-neutral-100 last:border-0">{children}</tr>;
}
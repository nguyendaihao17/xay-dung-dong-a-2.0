import Link from "next/link";
import { Plus } from "lucide-react";
import type { ReactNode } from "react";

type Props = {
  title: string;
  description?: string;
  createHref?: string;
  createLabel?: string;
  extra?: ReactNode;
};

export function PageToolbar({ title, description, createHref, createLabel = "Thêm mới", extra }: Props) {
  return (
    <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
      <div>
        <h1 className="font-display text-display-md uppercase text-navy-900">{title}</h1>
        {description && <p className="mt-2 text-neutral-600">{description}</p>}
      </div>
      <div className="flex flex-wrap gap-3">
        {extra}
        {createHref && (
          <Link
            href={createHref}
            className="inline-flex items-center gap-2 bg-navy-900 px-5 py-2.5 text-sm font-medium uppercase tracking-wider text-white hover:bg-navy-800"
          >
            <Plus size={16} /> {createLabel}
          </Link>
        )}
      </div>
    </div>
  );
}
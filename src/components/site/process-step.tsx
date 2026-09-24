type Props = {
  index: number;
  title: string;
  description: string;
  isLast?: boolean;
};

export function ProcessStep({ index, title, description, isLast }: Props) {
  return (
    <div className="relative">
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center border-2 border-navy-900 font-display text-lg font-bold text-navy-900">
          {String(index).padStart(2, "0")}
        </div>
        {!isLast && <div className="hidden h-px flex-1 bg-neutral-300 lg:block" />}
      </div>
      <h3 className="mt-6 font-display text-xl uppercase text-navy-900">{title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-neutral-600">{description}</p>
    </div>
  );
}
type Props = {
  value: string;
  label: string;
};

export function StatBlock({ value, label }: Props) {
  return (
    <div className="border-l-2 border-navy-900 pl-6">
      <div className="font-display text-display-md leading-none text-navy-900">{value}</div>
      <div className="mt-3 text-xs font-medium uppercase tracking-widest text-neutral-500">
        {label}
      </div>
    </div>
  );
}
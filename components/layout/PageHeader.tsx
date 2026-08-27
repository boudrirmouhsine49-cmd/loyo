type Props = { title: string; subtitle?: string };

export default function PageHeader({ title, subtitle }: Props) {
  return (
    <div className="mb-6">
      <h1 className="text-[22px] font-semibold tracking-tight">{title}</h1>
      {subtitle && <p className="mt-1 text-[14px] text-text-3">{subtitle}</p>}
    </div>
  );
}

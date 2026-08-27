type Props = {
  label: string;
  value: string;
};

// Label discret (mono, majuscules) + grande valeur — brique de base des KPI.
export function Stat({ label, value }: Props) {
  return (
    <div>
      <p className="font-mono text-[11px] tracking-[.05em] text-text-muted uppercase">{label}</p>
      <p className="mt-1 text-2xl font-semibold text-text">{value}</p>
    </div>
  );
}

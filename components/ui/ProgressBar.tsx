type Props = {
  value: number;
  max: number;
};

// Barre de progression simple (ex. étapes de démarrage complétées).
export function ProgressBar({ value, max }: Props) {
  const percent = max > 0 ? Math.min(100, Math.round((value / max) * 100)) : 0;

  return (
    <div
      role="progressbar"
      aria-valuenow={percent}
      aria-valuemin={0}
      aria-valuemax={100}
      className="h-1.5 w-full overflow-hidden rounded-pill bg-subtle"
    >
      <div className="h-full rounded-pill bg-btn transition-[width]" style={{ width: `${percent}%` }} />
    </div>
  );
}

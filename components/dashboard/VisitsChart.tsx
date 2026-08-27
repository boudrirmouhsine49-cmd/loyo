import { Card } from "@/components/ui/Card";
import { formatNumber } from "@/lib/format";
import type { WeeklyVisit } from "@/lib/types";

type Props = {
  data: WeeklyVisit[];
};

const CHART_HEIGHT = 160;

// Histogramme des visites par jour. Une seule série : pas de légende
// nécessaire (voir skill dataviz), juste une info-bulle par barre.
export function VisitsChart({ data }: Props) {
  const max = Math.max(...data.map((d) => d.visits));
  const peakDay = data.reduce((a, b) => (b.visits > a.visits ? b : a), data[0]);

  return (
    <Card title="Visites hebdomadaires" subtitle="Nombre de visites par jour, cette semaine">
      <div className="flex items-end justify-between gap-2" style={{ height: CHART_HEIGHT }}>
        {data.map((point) => {
          const barHeight = max > 0 ? Math.max(4, (point.visits / max) * CHART_HEIGHT) : 4;
          const isPeak = point.day === peakDay.day;

          return (
            <div
              key={point.day}
              tabIndex={0}
              className="group relative flex h-full flex-1 flex-col items-center justify-end outline-none"
            >
              {/* Info-bulle au survol / focus clavier */}
              <div className="pointer-events-none absolute bottom-full mb-1.5 rounded-btn-sm bg-btn px-2 py-1 text-[11px] whitespace-nowrap text-btn-text opacity-0 transition-opacity group-hover:opacity-100 group-focus:opacity-100">
                {point.day} · {formatNumber(point.visits)} visites
              </div>

              {/* Étiquette directe sur le pic de la semaine */}
              {isPeak && (
                <span className="mb-1 font-mono text-[11px] text-text-3 tabular-nums">
                  {formatNumber(point.visits)}
                </span>
              )}

              <div
                className="w-6 rounded-t-[4px] bg-btn transition-colors group-hover:bg-btn-hover"
                style={{ height: barHeight }}
              />
            </div>
          );
        })}
      </div>

      <div className="mt-2 flex justify-between border-t border-border pt-2">
        {data.map((point) => (
          <span
            key={point.day}
            className="flex-1 text-center font-mono text-[11px] tracking-[.05em] text-text-muted uppercase"
          >
            {point.day}
          </span>
        ))}
      </div>
    </Card>
  );
}

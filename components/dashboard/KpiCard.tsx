import { Card } from "@/components/ui/Card";
import { Stat } from "@/components/ui/Stat";
import { Pill } from "@/components/ui/Pill";
import type { Kpi } from "@/lib/types";

type Props = {
  kpi: Kpi;
};

export function KpiCard({ kpi }: Props) {
  return (
    <Card>
      <div className="flex items-start justify-between gap-3">
        <Stat label={kpi.label} value={kpi.value} />
        <Pill tone={kpi.trendTone}>{kpi.trend}</Pill>
      </div>
      <p className="mt-3 text-xs text-text-3">{kpi.caption}</p>
    </Card>
  );
}

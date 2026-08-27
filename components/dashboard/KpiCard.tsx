import type { Kpi } from "@/lib/types";
import Card from "@/components/ui/Card";

export default function KpiCard({ kpi }: { kpi: Kpi }) {
  return (
    <Card>
      <div className="label">{kpi.label}</div>
      <div className="mt-2 flex items-end gap-2">
        <div className="tnum text-[26px] font-semibold leading-none">{kpi.value}</div>
        <span
          className="tnum mb-0.5 rounded-[20px] px-2 py-0.5 text-[11px] font-semibold"
          style={{ color: "var(--succes)", background: "var(--succes-bg)" }}
        >
          {kpi.trend}
        </span>
      </div>
      <div className="mt-2 text-[12px] text-text-3">{kpi.compare}</div>
    </Card>
  );
}

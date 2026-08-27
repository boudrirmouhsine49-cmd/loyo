import { weeklyVisits } from "@/data/mock";
import Card from "@/components/ui/Card";

export default function VisitsChart() {
  const max = Math.max(...weeklyVisits.map((d) => d.visits));
  return (
    <Card>
      <div className="text-[15px] font-semibold">Visites hebdomadaires</div>
      <div className="mt-6 flex h-40 items-end gap-3">
        {weeklyVisits.map((d) => (
          <div key={d.day} className="flex flex-1 flex-col items-center gap-2">
            <div className="tnum text-[11px] text-text-3">{d.visits}</div>
            <div
              className="w-full rounded-t-[6px] bg-btn transition-all"
              style={{ height: `${Math.max(4, (d.visits / max) * 110)}px` }}
            />
            <div className="label">{d.day}</div>
          </div>
        ))}
      </div>
    </Card>
  );
}

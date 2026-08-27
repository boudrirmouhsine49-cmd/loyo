import { tierStats } from "@/data/mock";
import { tierColor } from "@/lib/colors";
import { fr } from "@/lib/format";
import Card from "@/components/ui/Card";

export default function TierBars() {
  const max = Math.max(...tierStats.map((t) => t.count));
  return (
    <Card>
      <div className="text-[15px] font-semibold">Répartition par niveau</div>
      <div className="mt-4 space-y-3.5">
        {tierStats.map((t) => (
          <div key={t.name}>
            <div className="mb-1 flex items-center justify-between text-[13px]">
              <span className="font-medium" style={{ color: tierColor[t.name] }}>{t.name}</span>
              <span className="tnum text-text-3">{fr(t.count)}</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-subtle">
              <div
                className="h-full rounded-full"
                style={{ width: `${(t.count / max) * 100}%`, background: tierColor[t.name] }}
              />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

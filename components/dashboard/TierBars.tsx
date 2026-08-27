import type { TierStat } from "@/model/types";
import { tierColor } from "@/lib/colors";
import { fr } from "@/lib/format";
import Card from "@/components/ui/Card";

type Props = { tiers: TierStat[] };

// VIEW — affichage uniquement. La largeur des barres (proportion du
// maximum) est un calcul de rendu, pas une règle métier.
export default function TierBars({ tiers }: Props) {
  const max = Math.max(...tiers.map((t) => t.count));
  return (
    <Card>
      <div className="text-[15px] font-semibold">Répartition par niveau</div>
      <div className="mt-4 space-y-3.5">
        {tiers.map((t) => (
          <div key={t.name}>
            <div className="mb-1 flex items-center justify-between text-[13px]">
              <span className="flex items-center gap-2 font-medium text-text-2">
                <span className="h-2 w-2 rounded-[2px]" style={{ background: tierColor[t.name] }} />
                {t.name}
              </span>
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

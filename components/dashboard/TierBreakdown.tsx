import { Card } from "@/components/ui/Card";
import { formatNumber } from "@/lib/format";
import type { TierBreakdownItem } from "@/lib/types";

type Props = {
  data: TierBreakdownItem[];
};

// Couleurs de niveau fixées par le design system (voir CLAUDE.md).
const tierColor: Record<TierBreakdownItem["tier"], string> = {
  or: "var(--gold)",
  argent: "var(--silver)",
  bronze: "var(--bronze)",
};

export function TierBreakdown({ data }: Props) {
  const max = Math.max(...data.map((item) => item.count));

  return (
    <Card title="Répartition par niveau" subtitle="Clients par niveau de fidélité">
      <div className="flex flex-col gap-4">
        {data.map((item) => {
          const width = max > 0 ? Math.max(4, (item.count / max) * 100) : 4;

          return (
            <div key={item.tier}>
              <div className="mb-1.5 flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-text-2">
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ background: tierColor[item.tier] }}
                  />
                  {item.label}
                </span>
                <span className="font-mono text-xs tabular-nums text-text-3">
                  {formatNumber(item.count)}
                </span>
              </div>
              <div className="h-2.5 w-full rounded-pill bg-subtle">
                <div
                  className="h-full rounded-r-[4px] rounded-l-none"
                  style={{ width: `${width}%`, background: tierColor[item.tier] }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

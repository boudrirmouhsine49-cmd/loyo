import type { Campaign } from "@/model/types";
import { campaignStatusColor } from "@/lib/colors";
import Card from "@/components/ui/Card";
import Pill from "@/components/ui/Pill";

type Props = { campaigns: Campaign[] };

export default function CampaignsPreview({ campaigns }: Props) {
  return (
    <Card>
      <div className="flex items-center justify-between">
        <div className="text-[15px] font-semibold">Campagnes en cours</div>
        <a href="/campagnes" className="text-[12.5px] font-medium text-text-2 hover:text-text">
          Gérer les campagnes →
        </a>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
        {campaigns.map((c) => {
          const [color, bg] = campaignStatusColor[c.status];
          return (
            <div key={c.name} className="rounded-[10px] border border-line-light bg-faint p-3.5">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[13px] font-medium">{c.name}</span>
                <Pill color={color} bg={bg}>{c.status}</Pill>
              </div>
              <div className="mt-2 flex items-baseline gap-1.5">
                {c.usagePct != null ? (
                  <span className="tnum text-[20px] font-bold">{c.usagePct} %</span>
                ) : (
                  <span className="text-[20px] font-bold text-text-muted">—</span>
                )}
                <span className="text-[11px] text-text-3">utilisation</span>
              </div>
              <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-subtle">
                <div className="h-full rounded-full bg-btn" style={{ width: `${c.usagePct ?? 0}%` }} />
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

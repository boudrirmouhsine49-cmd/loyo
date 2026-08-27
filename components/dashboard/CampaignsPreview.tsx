import { Card } from "@/components/ui/Card";
import { Pill } from "@/components/ui/Pill";
import type { CampaignPreview, CampaignStatus } from "@/lib/types";

type Props = {
  campaigns: CampaignPreview[];
};

const statusLabel: Record<CampaignStatus, string> = {
  active: "Active",
  planifiee: "Planifiée",
  automatique: "Automatique",
};

const statusTone: Record<CampaignStatus, "success" | "info" | "special"> = {
  active: "success",
  planifiee: "info",
  automatique: "special",
};

export function CampaignsPreview({ campaigns }: Props) {
  return (
    <Card title="Campagnes" subtitle="Aperçu de vos campagnes en cours">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {campaigns.map((campaign) => (
          <div key={campaign.id} className="rounded-btn border border-border bg-faint p-4">
            <p className="text-sm font-medium text-text">{campaign.name}</p>
            <div className="mt-2">
              <Pill tone={statusTone[campaign.status]}>{statusLabel[campaign.status]}</Pill>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

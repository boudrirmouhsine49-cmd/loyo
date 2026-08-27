import { campaignsPreview } from "@/data/mock";
import { campaignStatusColor } from "@/lib/colors";
import Card from "@/components/ui/Card";
import Pill from "@/components/ui/Pill";

export default function CampaignsPreview() {
  return (
    <Card>
      <div className="text-[15px] font-semibold">Campagnes</div>
      <ul className="mt-4 space-y-2.5">
        {campaignsPreview.map((c) => {
          const [color, bg] = campaignStatusColor[c.status];
          return (
            <li
              key={c.name}
              className="flex items-center justify-between rounded-[10px] border border-line-light bg-faint px-3.5 py-2.5"
            >
              <span className="text-[13.5px] font-medium">{c.name}</span>
              <Pill color={color} bg={bg}>{c.status}</Pill>
            </li>
          );
        })}
      </ul>
    </Card>
  );
}

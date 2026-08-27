import type { Inactive } from "@/model/types";
import { initials } from "@/lib/format";
import Card from "@/components/ui/Card";
import Avatar from "@/components/ui/Avatar";
import Button from "@/components/ui/Button";
import Pill from "@/components/ui/Pill";

type Props = { clients: Inactive[]; urgentCount: number };

export default function InactivesList({ clients, urgentCount }: Props) {
  return (
    <Card>
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-[15px] font-semibold">Clients à relancer</div>
          <p className="mt-0.5 text-[12.5px] text-text-3">Ils ne sont pas venus depuis un moment.</p>
        </div>
        <Pill color="var(--alerte)" bg="var(--alerte-bg)">{urgentCount} urgents</Pill>
      </div>

      <ul className="mt-4 space-y-2.5">
        {clients.map((c) => (
          <li key={c.name} className="flex items-center gap-3">
            <Avatar initials={initials(c.name)} />
            <div className="min-w-0 flex-1">
              <div className="truncate text-[13.5px] font-medium">{c.name}</div>
              <div className="text-[11.5px] font-medium text-info">{c.days} jours sans visite</div>
            </div>
            <Button variant="ghost">Relancer</Button>
          </li>
        ))}
      </ul>
    </Card>
  );
}

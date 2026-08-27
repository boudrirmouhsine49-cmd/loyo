import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Pill } from "@/components/ui/Pill";
import type { ReactivationClient, Tier } from "@/lib/types";

type Props = {
  clients: ReactivationClient[];
};

const tierLabel: Record<Tier, string> = { or: "Or", argent: "Argent", bronze: "Bronze" };
const tierColor: Record<Tier, string> = {
  or: "var(--gold)",
  argent: "var(--silver)",
  bronze: "var(--bronze)",
};

export function ReactivationList({ clients }: Props) {
  return (
    <Card title="À relancer" subtitle="Clients inactifs depuis plus de 20 jours">
      <ul className="flex flex-col">
        {clients.map((client, index) => (
          <li
            key={client.id}
            className={`flex items-center gap-3 py-3 ${index > 0 ? "border-t border-border-light" : ""}`}
          >
            <Avatar name={client.name} />

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-text">{client.name}</p>
              <div className="mt-1 flex items-center gap-2">
                <Pill tone="neutral" dotColor={tierColor[client.tier]}>
                  {tierLabel[client.tier]}
                </Pill>
                <span className="font-mono text-xs text-text-muted">
                  {client.inactiveDays} j
                </span>
              </div>
            </div>

            <Button variant="secondary" size="sm">
              Relancer
            </Button>
          </li>
        ))}
      </ul>
    </Card>
  );
}

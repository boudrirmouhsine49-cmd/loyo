import { inactives } from "@/data/mock";
import { tierColor } from "@/lib/colors";
import { initials } from "@/lib/format";
import Card from "@/components/ui/Card";
import Avatar from "@/components/ui/Avatar";
import Button from "@/components/ui/Button";

export default function InactivesList() {
  return (
    <Card>
      <div className="flex items-center justify-between">
        <div className="text-[15px] font-semibold">À relancer</div>
        <span className="label">{inactives.length} inactifs</span>
      </div>
      <ul className="mt-4 space-y-2.5">
        {inactives.map((c) => (
          <li key={c.name} className="flex items-center gap-3">
            <Avatar initials={initials(c.name)} color={tierColor[c.tier]} />
            <div className="min-w-0 flex-1">
              <div className="truncate text-[13.5px] font-medium">{c.name}</div>
              <div className="text-[11.5px] text-text-3">
                <span style={{ color: tierColor[c.tier] }}>{c.tier}</span> · inactif depuis {c.days} j
              </div>
            </div>
            <Button variant="ghost">Relancer</Button>
          </li>
        ))}
      </ul>
    </Card>
  );
}

import { recentActivity } from "@/data/mock";
import type { Activity } from "@/lib/types";
import Card from "@/components/ui/Card";

const dot: Record<Activity["kind"], string> = {
  points: "var(--text)",
  tier: "var(--tier-or)",
  campaign: "var(--info)",
  reward: "var(--special)",
  auto: "var(--text-muted)",
  join: "#8A6DBE",
};

export default function ActivityFeed() {
  return (
    <Card>
      <div className="text-[15px] font-semibold">Activité récente</div>
      <ul className="mt-4 space-y-3.5">
        {recentActivity.map((a, i) => (
          <li key={i} className="flex items-start gap-3">
            <span
              className="mt-1.5 h-2 w-2 shrink-0 rounded-full"
              style={{ background: dot[a.kind] }}
            />
            <div className="min-w-0 flex-1">
              <div className="text-[13.5px] leading-snug">
                <span className="font-medium">{a.who}</span>{" "}
                <span className="text-text-2">{a.what}</span>
              </div>
              <div className="mt-0.5 text-[11.5px] text-text-3">{a.when}</div>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
}

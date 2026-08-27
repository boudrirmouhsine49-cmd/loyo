import { Card } from "@/components/ui/Card";
import type { ActivityItem } from "@/lib/types";

type Props = {
  items: ActivityItem[];
};

export function ActivityFeed({ items }: Props) {
  return (
    <Card title="Activité récente">
      <ul className="flex flex-col">
        {items.map((item, index) => (
          <li
            key={item.id}
            className={`flex items-start justify-between gap-3 py-3 text-sm ${
              index > 0 ? "border-t border-border-light" : ""
            }`}
          >
            <p className="text-text-2">
              <span className="font-medium text-text">{item.who}</span> {item.action}
              {item.detail && <span className="text-text-3"> · {item.detail}</span>}
            </p>
            <span className="shrink-0 font-mono text-xs whitespace-nowrap text-text-muted">
              {item.when}
            </span>
          </li>
        ))}
      </ul>
    </Card>
  );
}

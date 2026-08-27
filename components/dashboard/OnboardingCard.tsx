import { onboardingSteps } from "@/data/mock";
import Card from "@/components/ui/Card";

export default function OnboardingCard() {
  const done = onboardingSteps.filter((s) => s.done).length;
  const pct = Math.round((done / onboardingSteps.length) * 100);

  return (
    <Card>
      <div className="flex items-center justify-between">
        <div className="text-[15px] font-semibold">Premiers pas</div>
        <div className="tnum label">{done}/{onboardingSteps.length}</div>
      </div>

      <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-subtle">
        <div className="h-full rounded-full bg-btn transition-all" style={{ width: `${pct}%` }} />
      </div>

      <ul className="mt-4 space-y-2.5">
        {onboardingSteps.map((step) => (
          <li key={step.label} className="flex items-center gap-3 text-[13.5px]">
            <span
              className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[11px]"
              style={{
                background: step.done ? "var(--btn)" : "transparent",
                borderColor: step.done ? "var(--btn)" : "var(--border)",
                color: "var(--btn-text)",
              }}
            >
              {step.done ? "✓" : ""}
            </span>
            <span className={step.done ? "text-text-3 line-through" : "text-text-2"}>
              {step.label}
            </span>
          </li>
        ))}
      </ul>
    </Card>
  );
}

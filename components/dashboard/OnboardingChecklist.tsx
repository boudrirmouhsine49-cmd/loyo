import { CircleCheck, Circle } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import type { OnboardingStep } from "@/lib/types";

type Props = {
  steps: OnboardingStep[];
};

export function OnboardingChecklist({ steps }: Props) {
  const doneCount = steps.filter((step) => step.done).length;

  return (
    <Card
      title="Premiers pas"
      subtitle={`${doneCount} / ${steps.length} étapes terminées`}
    >
      <ProgressBar value={doneCount} max={steps.length} />

      <ul className="mt-4 flex flex-col gap-2.5">
        {steps.map((step) => (
          <li key={step.id} className="flex items-center gap-2.5 text-sm">
            {step.done ? (
              <CircleCheck size={18} className="shrink-0 text-success" />
            ) : (
              <Circle size={18} className="shrink-0 text-text-muted" />
            )}
            <span className={step.done ? "text-text-3 line-through" : "text-text-2"}>
              {step.label}
            </span>
          </li>
        ))}
      </ul>
    </Card>
  );
}

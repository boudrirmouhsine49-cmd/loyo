"use client";

import { useState } from "react";
import { onboardingSteps } from "@/data/mock";
import Card from "@/components/ui/Card";

export default function OnboardingCard() {
  const [dismissed, setDismissed] = useState(false);
  const done = onboardingSteps.filter((s) => s.done).length;
  const pct = Math.round((done / onboardingSteps.length) * 100);

  if (dismissed) return null;

  return (
    <Card>
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-[15px] font-semibold">Bien démarrer avec Loyo</div>
          <p className="mt-0.5 text-[12.5px] text-text-3">
            {done} / {onboardingSteps.length} étapes terminées
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="h-1.5 w-36 overflow-hidden rounded-full bg-subtle">
            <div className="h-full rounded-full bg-btn transition-all" style={{ width: `${pct}%` }} />
          </div>
          <button
            onClick={() => setDismissed(true)}
            aria-label="Masquer"
            className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-text-muted hover:bg-subtle"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
          </button>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-2.5 sm:flex-row">
        {onboardingSteps.map((step) => (
          <div
            key={step.label}
            className="flex flex-1 items-center gap-2.5 rounded-[11px] border border-line-light px-3.5 py-3"
          >
            {step.done ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="var(--succes)" className="shrink-0">
                <circle cx="12" cy="12" r="10" />
                <path d="M8 12.5l2.5 2.5 5-5.5" stroke="var(--bg-card)" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ) : (
              <span className="h-[18px] w-[18px] shrink-0 rounded-full border border-line" />
            )}
            <span className="text-[12.5px] leading-tight font-medium text-text">{step.label}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}

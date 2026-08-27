import type { ReactNode } from "react";

type Tone = "success" | "danger" | "info" | "special" | "accent" | "neutral";

type Props = {
  tone?: Tone;
  dotColor?: string;
  children: ReactNode;
};

// Couleurs sémantiques identiques dans les 2 thèmes (voir CLAUDE.md).
const toneStyles: Record<Tone, { color: string; background: string }> = {
  success: { color: "var(--success)", background: "var(--success-bg)" },
  danger: { color: "var(--danger)", background: "var(--danger-bg)" },
  info: { color: "var(--info)", background: "var(--info-bg)" },
  special: { color: "var(--special)", background: "var(--special-bg)" },
  accent: { color: "var(--accent)", background: "var(--accent-bg)" },
  neutral: { color: "var(--text-2)", background: "var(--bg-subtle)" },
};

// Pastille (20px de rayon) pour badges de tendance, statuts, niveaux...
export function Pill({ tone = "neutral", dotColor, children }: Props) {
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-pill px-2.5 py-1 font-mono text-[11px] font-medium whitespace-nowrap"
      style={toneStyles[tone]}
    >
      {dotColor && <span className="h-1.5 w-1.5 rounded-full" style={{ background: dotColor }} />}
      {children}
    </span>
  );
}

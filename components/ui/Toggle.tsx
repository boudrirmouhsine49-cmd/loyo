"use client";

type Props = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
};

// Interrupteur réutilisable (piste 44x26px, bouton 20px) — voir
// CLAUDE.md, section "Formes & espacements".
export function Toggle({ checked, onChange, label }: Props) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className="relative h-[26px] w-[44px] shrink-0 rounded-[14px] transition-colors"
      style={{ background: checked ? "var(--btn)" : "var(--bg-subtle)" }}
    >
      <span
        className="absolute top-[3px] left-[3px] block h-[20px] w-[20px] rounded-full bg-white transition-transform"
        style={{ transform: checked ? "translateX(18px)" : "translateX(0)" }}
      />
    </button>
  );
}

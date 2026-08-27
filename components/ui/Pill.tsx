import { ReactNode } from "react";

type Props = { children: ReactNode; color: string; bg: string };

export default function Pill({ children, color, bg }: Props) {
  return (
    <span
      className="rounded-[20px] px-2.5 py-1 text-[11px] font-semibold"
      style={{ color, background: bg }}
    >
      {children}
    </span>
  );
}

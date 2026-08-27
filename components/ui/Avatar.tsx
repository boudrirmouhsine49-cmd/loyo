type Props = { initials: string; color?: string };

export default function Avatar({ initials, color = "var(--tier-argent)" }: Props) {
  return (
    <div
      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[12px] font-semibold text-white"
      style={{ background: color }}
    >
      {initials}
    </div>
  );
}

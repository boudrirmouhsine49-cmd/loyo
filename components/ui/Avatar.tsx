type Props = { initials: string; color?: string };

// Par défaut : rond neutre (bg-subtle). "color" permet de teinter le fond
// pour un cas particulier (ex. avatar mis en avant).
export default function Avatar({ initials, color }: Props) {
  return (
    <div
      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[12px] font-semibold ${
        color ? "text-white" : "bg-subtle text-text-2"
      }`}
      style={color ? { background: color } : undefined}
    >
      {initials}
    </div>
  );
}

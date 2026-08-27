import { getInitials } from "@/lib/format";

type Props = {
  name: string;
};

// Avatar rond avec les initiales du nom (pas de photo en Phase 1).
export function Avatar({ name }: Props) {
  return (
    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-subtle font-mono text-xs font-medium text-text-2">
      {getInitials(name)}
    </span>
  );
}

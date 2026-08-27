"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = { slug: string; label: string; onNavigate?: () => void };

export default function NavItem({ slug, label, onNavigate }: Props) {
  const pathname = usePathname();
  const active = pathname === `/${slug}`;
  return (
    <Link
      href={`/${slug}`}
      onClick={onNavigate}
      className={`block rounded-[10px] px-3 py-2 text-[13.5px] transition-colors ${
        active
          ? "bg-subtle font-medium text-text"
          : "text-text-2 hover:bg-subtle"
      }`}
    >
      {label}
    </Link>
  );
}

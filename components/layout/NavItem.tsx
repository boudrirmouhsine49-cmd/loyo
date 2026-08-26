"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavLink } from "@/lib/nav";

type Props = {
  link: NavLink;
  onNavigate?: () => void;
};

// Un lien de la sidebar, surligné quand la route active correspond.
export function NavItem({ link, onNavigate }: Props) {
  const pathname = usePathname();
  const active = pathname === link.href || pathname?.startsWith(`${link.href}/`);
  const Icon = link.icon;

  return (
    <Link
      href={link.href}
      onClick={onNavigate}
      aria-current={active ? "page" : undefined}
      className={`flex items-center gap-3 rounded-btn px-3 py-2 text-sm transition-colors ${
        active ? "bg-subtle text-text" : "text-text-2 hover:bg-hover hover:text-text"
      }`}
    >
      <Icon size={18} strokeWidth={2} />
      <span>{link.label}</span>
    </Link>
  );
}

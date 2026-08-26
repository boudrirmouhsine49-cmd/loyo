"use client";

import { Menu } from "lucide-react";
import { ThemeToggle } from "@/components/layout/ThemeToggle";

type Props = {
  onMenuClick: () => void;
};

// Barre du haut : bouton menu (mobile uniquement) + réglage du thème.
export function Topbar({ onMenuClick }: Props) {
  return (
    <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center justify-between border-b border-border bg-glass px-4 backdrop-blur">
      <button
        aria-label="Ouvrir le menu"
        onClick={onMenuClick}
        className="rounded-btn-sm p-2 text-text-2 hover:bg-hover lg:hidden"
      >
        <Menu size={20} />
      </button>

      <div className="flex-1" />

      <ThemeToggle />
    </header>
  );
}

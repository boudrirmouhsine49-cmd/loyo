"use client";

import ThemeToggle from "./ThemeToggle";

type Props = { onMenu: () => void };

export default function Topbar({ onMenu }: Props) {
  return (
    <header className="sticky top-0 z-20 flex items-center gap-3 border-b border-line bg-app/90 px-5 py-3 backdrop-blur">
      <button
        onClick={onMenu}
        aria-label="Ouvrir le menu"
        className="flex h-9 w-9 items-center justify-center rounded-[10px] border border-line text-text-2 md:hidden"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M3 6h18M3 12h18M3 18h18" /></svg>
      </button>

      <div className="flex-1" />

      <button className="flex items-center gap-2 rounded-[10px] bg-btn px-3.5 py-2 text-[13px] font-medium text-btn-text transition-colors hover:opacity-90">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 7V5a2 2 0 0 1 2-2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2M7 12h10" /></svg>
        Scanner
      </button>
      <ThemeToggle />
    </header>
  );
}

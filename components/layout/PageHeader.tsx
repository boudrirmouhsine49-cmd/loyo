"use client";

import { useMobileNav } from "./MobileNavContext";

type Props = { title: string; subtitle?: string };

export default function PageHeader({ title, subtitle }: Props) {
  const { setOpen } = useMobileNav();

  return (
    <div className="mb-6 flex items-start justify-between gap-4">
      <div className="flex items-start gap-3">
        <button
          onClick={() => setOpen(true)}
          aria-label="Ouvrir le menu"
          className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] text-text-2 hover:bg-subtle md:hidden"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M3 6h18M3 12h18M3 18h18" /></svg>
        </button>
        <div>
          <h1 className="text-[22px] font-semibold tracking-tight">{title}</h1>
          {subtitle && <p className="mt-1 text-[14px] text-text-3">{subtitle}</p>}
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-3">
        <label className="hidden items-center gap-2 rounded-[10px] border border-line bg-faint px-3 py-2 text-[13px] text-text-3 sm:flex">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0"><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" /></svg>
          <input
            type="text"
            placeholder="Rechercher un client…"
            className="w-40 bg-transparent text-text placeholder:text-text-3 focus:outline-none"
          />
        </label>

        <button
          aria-label="Notifications"
          className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] border border-line text-text-2 hover:bg-subtle"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6" /><path d="M9.5 20a2.5 2.5 0 0 0 5 0" /></svg>
          <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-alerte" />
        </button>
      </div>
    </div>
  );
}

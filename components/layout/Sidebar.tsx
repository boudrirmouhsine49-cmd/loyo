"use client";

import Link from "next/link";
import { navigation } from "@/lib/nav";
import { currentUser } from "@/data/mock";
import { initials } from "@/lib/format";
import NavItem from "./NavItem";
import ThemeToggle from "./ThemeToggle";

type Props = { open: boolean; onClose: () => void };

export default function Sidebar({ open, onClose }: Props) {
  return (
    <>
      {/* voile sombre sur mobile quand le menu est ouvert */}
      {open && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-30 bg-black/30 md:hidden"
        />
      )}

      <aside
        className={`fixed z-40 flex h-full w-64 flex-col bg-sidebar transition-transform md:sticky md:top-0 md:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center gap-2 px-5 py-5">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="var(--text)" className="shrink-0">
            <path d="M12 0l2.2 8.3L22 12l-7.8 3.7L12 24l-2.2-8.3L2 12l7.8-3.7z" />
          </svg>
          <span className="text-[17px] font-bold text-text">Loyo</span>
        </div>

        <div className="px-5 pb-5">
          <button className="flex w-full items-center justify-center gap-2 rounded-[10px] bg-btn px-3.5 py-2.5 text-[13px] font-semibold text-btn-text transition-colors hover:opacity-90">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" />
              <rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" />
            </svg>
            Scanner une carte
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 pb-6">
          {navigation.map((group) => (
            <div key={group.title} className="mb-4">
              <div className="label px-3 pb-1.5 pt-2">{group.title}</div>
              {group.links.map((link) => (
                <NavItem key={link.slug} {...link} onNavigate={onClose} />
              ))}
            </div>
          ))}
        </nav>

        <div className="border-t border-line-light px-3 py-3">
          <ThemeToggle />

          <Link
            href="/parametres"
            className="mt-3 flex items-center gap-2.5 rounded-[10px] px-2 py-2 transition-colors hover:bg-subtle"
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-subtle text-[12px] font-semibold text-text-2">
              {initials(currentUser.name)}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[13px] font-medium text-text">{currentUser.name}</span>
              <span className="block text-[11px] text-text-3">{currentUser.role}</span>
            </span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-text-muted">
              <path d="M9 6l6 6-6 6" />
            </svg>
          </Link>
        </div>
      </aside>
    </>
  );
}

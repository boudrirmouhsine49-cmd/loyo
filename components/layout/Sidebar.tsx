"use client";

import { X } from "lucide-react";
import { navGroups } from "@/lib/nav";
import { NavItem } from "@/components/layout/NavItem";

type Props = {
  open: boolean;
  onClose: () => void;
};

// Navigation principale. Sur mobile elle se transforme en drawer
// (repliée par défaut, ouverte via le bouton menu de la Topbar).
export function Sidebar({ open, onClose }: Props) {
  return (
    <>
      {/* Fond assombri derrière le drawer mobile */}
      {open && (
        <button
          aria-label="Fermer le menu"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 shrink-0 flex-col border-r border-border bg-card p-4 transition-transform lg:static lg:z-auto lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="mb-6 flex items-center justify-between px-2">
          <span className="text-lg font-semibold text-text">Loyo</span>
          <button
            aria-label="Fermer le menu"
            onClick={onClose}
            className="rounded-btn-sm p-1 text-text-3 hover:bg-hover lg:hidden"
          >
            <X size={18} />
          </button>
        </div>

        <nav className="flex flex-1 flex-col gap-5 overflow-y-auto">
          {navGroups.map((group) => (
            <div key={group.label}>
              <p className="mb-1 px-3 font-mono text-[11px] tracking-[.05em] text-text-muted uppercase">
                {group.label}
              </p>
              <div className="flex flex-col gap-0.5">
                {group.links.map((link) => (
                  <NavItem key={link.href} link={link} onNavigate={onClose} />
                ))}
              </div>
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
}

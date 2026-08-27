"use client";

import { navigation } from "@/lib/nav";
import { merchantName } from "@/data/mock";
import NavItem from "./NavItem";

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
        className={`fixed z-40 flex h-full w-64 flex-col border-r border-line bg-card transition-transform md:sticky md:top-0 md:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center gap-2 px-5 py-5">
          <div className="flex h-8 w-8 items-center justify-center rounded-[9px] bg-btn text-btn-text text-[15px] font-bold">
            L
          </div>
          <div>
            <div className="text-[14px] font-semibold leading-tight">Loyo</div>
            <div className="text-[11px] text-text-3 leading-tight">{merchantName}</div>
          </div>
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
      </aside>
    </>
  );
}

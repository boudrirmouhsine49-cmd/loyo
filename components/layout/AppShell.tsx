"use client";

import { ReactNode } from "react";
import Sidebar from "./Sidebar";
import { MobileNavProvider, useMobileNav } from "./MobileNavContext";

function Shell({ children }: { children: ReactNode }) {
  const { open, setOpen } = useMobileNav();
  return (
    <div className="flex min-h-screen">
      <Sidebar open={open} onClose={() => setOpen(false)} />
      <main className="mx-auto w-full max-w-6xl flex-1 px-5 py-6">{children}</main>
    </div>
  );
}

export default function AppShell({ children }: { children: ReactNode }) {
  return (
    <MobileNavProvider>
      <Shell>{children}</Shell>
    </MobileNavProvider>
  );
}

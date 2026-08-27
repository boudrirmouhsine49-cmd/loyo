"use client";

import { ReactNode } from "react";
import type { CurrentUser } from "@/model/types";
import Sidebar from "./Sidebar";
import { MobileNavProvider, useMobileNav } from "./MobileNavContext";

function Shell({ children, currentUser }: { children: ReactNode; currentUser: CurrentUser }) {
  const { open, setOpen } = useMobileNav();
  return (
    <div className="flex min-h-screen">
      <Sidebar open={open} onClose={() => setOpen(false)} currentUser={currentUser} />
      <main className="mx-auto w-full max-w-6xl flex-1 px-5 py-6">{children}</main>
    </div>
  );
}

export default function AppShell({
  children,
  currentUser,
}: {
  children: ReactNode;
  currentUser: CurrentUser;
}) {
  return (
    <MobileNavProvider>
      <Shell currentUser={currentUser}>{children}</Shell>
    </MobileNavProvider>
  );
}

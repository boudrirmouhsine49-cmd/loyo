"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

type MobileNavValue = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const MobileNavContext = createContext<MobileNavValue | null>(null);

// Partage l'état "menu mobile ouvert" entre PageHeader (bouton hamburger)
// et Sidebar (le tiroir lui-même), sans avoir à le faire remonter à
// chaque page.
export function MobileNavProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return <MobileNavContext.Provider value={{ open, setOpen }}>{children}</MobileNavContext.Provider>;
}

export function useMobileNav() {
  const ctx = useContext(MobileNavContext);
  if (!ctx) throw new Error("useMobileNav doit être utilisé dans MobileNavProvider");
  return ctx;
}

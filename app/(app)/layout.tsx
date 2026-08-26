import type { ReactNode } from "react";
import { AppShell } from "@/components/layout/AppShell";

// Layout commun à tous les écrans de l'application (sidebar + topbar).
// Deviendra le groupe protégé (login requis) à la Phase 3.
export default function AppLayout({ children }: { children: ReactNode }) {
  return <AppShell>{children}</AppShell>;
}

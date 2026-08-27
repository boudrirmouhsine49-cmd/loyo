import AppShell from "@/components/layout/AppShell";
import { getCurrentUser } from "@/model/account";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const currentUser = getCurrentUser();
  return <AppShell currentUser={currentUser}>{children}</AppShell>;
}

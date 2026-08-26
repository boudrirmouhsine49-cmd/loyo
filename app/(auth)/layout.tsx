import type { ReactNode } from "react";

// Layout des écrans d'authentification : pas de sidebar/topbar,
// juste le contenu centré. La logique de connexion arrive en Phase 3.
export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-app p-4">
      <div className="w-full max-w-sm">{children}</div>
    </div>
  );
}

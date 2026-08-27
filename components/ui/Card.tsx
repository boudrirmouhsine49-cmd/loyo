import type { ReactNode } from "react";

type Props = {
  title?: string;
  subtitle?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
};

// Conteneur de base réutilisé par tous les blocs de l'app.
export function Card({ title, subtitle, action, children, className }: Props) {
  return (
    <div className={`rounded-card border border-border bg-card p-5 ${className ?? ""}`}>
      {(title || action) && (
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            {title && <h2 className="text-sm font-semibold text-text">{title}</h2>}
            {subtitle && <p className="mt-0.5 text-xs text-text-3">{subtitle}</p>}
          </div>
          {action}
        </div>
      )}
      {children}
    </div>
  );
}

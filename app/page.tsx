import Link from "next/link";

// Page d'accueil provisoire (Phase 0). Sera remplacée par une vraie
// landing page ou une redirection automatique selon l'état de connexion.
export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-app p-4 text-center">
      <div>
        <h1 className="text-2xl font-semibold text-text">Loyo</h1>
        <p className="mt-2 text-sm text-text-3">
          Carte de fidélité digitale pour les petits commerces.
        </p>
      </div>

      <div className="flex gap-3">
        <Link
          href="/dashboard"
          className="rounded-btn bg-btn px-4 py-2 text-sm font-medium text-btn-text hover:bg-btn-hover"
        >
          Voir le tableau de bord
        </Link>
        <Link
          href="/login"
          className="rounded-btn border border-border bg-card px-4 py-2 text-sm font-medium text-text hover:bg-hover"
        >
          Connexion
        </Link>
      </div>
    </div>
  );
}

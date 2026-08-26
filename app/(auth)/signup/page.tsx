import Link from "next/link";

// Écran d'inscription — le formulaire sera branché à Supabase Auth
// en Phase 3. Pour l'instant, page vide fidèle au design system.
export default function SignupPage() {
  return (
    <div className="rounded-card border border-border bg-card p-6">
      <h1 className="text-lg font-semibold text-text">Créer un compte</h1>
      <p className="mt-2 text-sm text-text-3">Cet écran sera construit à la Phase 3.</p>
      <p className="mt-4 text-sm text-text-2">
        Déjà un compte ?{" "}
        <Link href="/login" className="text-text underline underline-offset-2">
          Se connecter
        </Link>
      </p>
    </div>
  );
}

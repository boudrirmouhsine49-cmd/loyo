import { createClient } from "@supabase/supabase-js";

// Client "admin" : utilise la clé service_role, qui CONTOURNE la RLS.
// Ne jamais importer ce fichier depuis un Client Component ou un module
// qui finirait dans le bundle navigateur. Réservé au code serveur et
// aux scripts de test (seed / vérification directe du ledger).
export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } },
  );
}

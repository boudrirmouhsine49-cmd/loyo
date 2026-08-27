import { createClient } from "@supabase/supabase-js";

// Client navigateur : utilise la clé publique (anon), soumis aux policies RLS.
// À utiliser uniquement dans des Client Components ("use client").
export function createBrowserClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}

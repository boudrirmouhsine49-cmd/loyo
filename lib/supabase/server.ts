import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// Client serveur scopé au jeton de l'appelant (header "Authorization:
// Bearer <jwt>") : les requêtes passent par ce client respectent la RLS
// comme si l'utilisateur les faisait lui-même. C'est ce que les routes
// API (Controller) utilisent pour savoir "qui appelle" — aujourd'hui les
// routes de points, demain l'app de scan.
export function createRequestClient(request: Request): SupabaseClient {
  const authHeader = request.headers.get("authorization") ?? "";
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { global: { headers: { Authorization: authHeader } } },
  );
}

export type CallerContext = {
  utilisateurId: string;
  commerceId: string;
  role: "gerant" | "employe";
};

// Résout l'employé/gérant qui appelle une route API à partir de son jeton.
// Renvoie null si le jeton est absent/invalide, ou si aucun membre
// d'équipe actif n'est associé à ce compte.
export async function resolveCaller(request: Request): Promise<CallerContext | null> {
  const supabase = createRequestClient(request);

  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData.user) return null;

  const { data: member, error: memberError } = await supabase
    .from("team_members")
    .select("id, commerce_id, role, actif")
    .eq("auth_user_id", userData.user.id)
    .single();

  if (memberError || !member || !member.actif) return null;

  return { utilisateurId: member.id, commerceId: member.commerce_id, role: member.role };
}

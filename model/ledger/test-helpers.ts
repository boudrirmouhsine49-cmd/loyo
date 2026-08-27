import { createAdminClient } from "@/lib/supabase/admin";

// Aides RÉSERVÉES AUX TESTS : créent/suppriment des lignes directement
// (via le client admin), sans passer par le Model — c'est le Model
// lui-même qui est sous test ici.

export function admin() {
  return createAdminClient();
}

type CommerceOverrides = Partial<{
  modePoints: "visite" | "montant";
  pointsParVisite: number;
  pointsParEuro: number;
  arrondiMontant: "floor" | "round" | "ceil";
  delaiMinEntreGains: number;
  seuilNiveauArgent: number;
  seuilNiveauOr: number;
}>;

export async function creerCommerceDeTest(overrides: CommerceOverrides = {}): Promise<string> {
  const { data, error } = await admin()
    .from("commerces")
    .insert({
      nom: `Commerce test ${crypto.randomUUID()}`,
      mode_points: overrides.modePoints ?? "visite",
      points_par_visite: overrides.pointsParVisite ?? 10,
      points_par_euro: overrides.pointsParEuro ?? 1,
      arrondi_montant: overrides.arrondiMontant ?? "floor",
      delai_min_entre_gains: overrides.delaiMinEntreGains ?? 60,
      seuil_niveau_argent: overrides.seuilNiveauArgent ?? 500,
      seuil_niveau_or: overrides.seuilNiveauOr ?? 1500,
    })
    .select("id")
    .single();
  if (error || !data) throw error ?? new Error("Échec création commerce de test");
  return data.id as string;
}

// Supprime le commerce : les clients/team_members/rewards/transactions
// liés partent en cascade (ON DELETE CASCADE), donc un seul appel nettoie
// tout ce qu'un test a créé.
export async function supprimerCommerceDeTest(commerceId: string): Promise<void> {
  await admin().from("commerces").delete().eq("id", commerceId);
}

export async function creerClientDeTest(commerceId: string, codeCarte?: string): Promise<string> {
  const { data, error } = await admin()
    .from("clients")
    .insert({ commerce_id: commerceId, code_carte: codeCarte ?? `CARTE-${crypto.randomUUID().slice(0, 8)}` })
    .select("id")
    .single();
  if (error || !data) throw error ?? new Error("Échec création client de test");
  return data.id as string;
}

export async function creerEmployeDeTest(
  commerceId: string,
  role: "gerant" | "employe" = "employe",
): Promise<string> {
  const { data, error } = await admin()
    .from("team_members")
    .insert({
      commerce_id: commerceId,
      nom: "Employé test",
      email: `test-${crypto.randomUUID()}@example.invalid`,
      role,
    })
    .select("id")
    .single();
  if (error || !data) throw error ?? new Error("Échec création employé de test");
  return data.id as string;
}

export async function creerRecompenseDeTest(
  commerceId: string,
  coutPoints: number,
  limiteParClient = 0,
): Promise<string> {
  const { data, error } = await admin()
    .from("rewards")
    .insert({ commerce_id: commerceId, nom: "Récompense test", cout_points: coutPoints, limite_par_client: limiteParClient })
    .select("id")
    .single();
  if (error || !data) throw error ?? new Error("Échec création récompense de test");
  return data.id as string;
}

// Recule la date du dernier gain d'un client, pour simuler l'écoulement
// du délai anti-double-scan sans attendre en temps réel dans les tests.
export async function reculerDernierGain(clientId: string, minutes: number): Promise<void> {
  await admin()
    .from("transactions")
    .update({ created_at: new Date(Date.now() - minutes * 60_000).toISOString() })
    .eq("client_id", clientId)
    .eq("type", "gain");
}

export async function lireClient(clientId: string) {
  const { data } = await admin().from("clients").select("*").eq("id", clientId).single();
  return data;
}

import type { SupabaseClient } from "@supabase/supabase-js";
import type { Commerce, Client, Reward, Solde } from "./types";

// MODEL — accès aux données du ledger. Toutes les lectures/écritures
// passent par un client "admin" (service_role, qui contourne la RLS) :
// c'est pourquoi CHAQUE requête ici filtre explicitement sur commerce_id.
// C'est ce cloisonnement explicite — pas la RLS — qui garantit qu'un
// commerce ne peut jamais lire ni modifier les données d'un autre depuis
// le Model (voir tests de cloisonnement).

export async function getCommerce(admin: SupabaseClient, commerceId: string): Promise<Commerce | null> {
  const { data, error } = await admin
    .from("commerces")
    .select("*")
    .eq("id", commerceId)
    .maybeSingle();
  if (error || !data) return null;
  return {
    id: data.id,
    nom: data.nom,
    modePoints: data.mode_points,
    pointsParVisite: data.points_par_visite,
    pointsParEuro: Number(data.points_par_euro),
    arrondiMontant: data.arrondi_montant,
    delaiMinEntreGains: data.delai_min_entre_gains,
    seuilNiveauArgent: data.seuil_niveau_argent,
    seuilNiveauOr: data.seuil_niveau_or,
  };
}

export async function getClient(
  admin: SupabaseClient,
  commerceId: string,
  clientId: string,
): Promise<Client | null> {
  const { data, error } = await admin
    .from("clients")
    .select("*")
    .eq("id", clientId)
    .eq("commerce_id", commerceId)
    .maybeSingle();
  if (error || !data) return null;
  return mapClient(data);
}

export async function getClientByCodeCarte(
  admin: SupabaseClient,
  commerceId: string,
  codeCarte: string,
): Promise<Client | null> {
  const { data, error } = await admin
    .from("clients")
    .select("*")
    .eq("code_carte", codeCarte)
    .eq("commerce_id", commerceId)
    .maybeSingle();
  if (error || !data) return null;
  return mapClient(data);
}

export async function getReward(
  admin: SupabaseClient,
  commerceId: string,
  rewardId: string,
): Promise<Reward | null> {
  const { data, error } = await admin
    .from("rewards")
    .select("*")
    .eq("id", rewardId)
    .eq("commerce_id", commerceId)
    .maybeSingle();
  if (error || !data) return null;
  return {
    id: data.id,
    commerceId: data.commerce_id,
    nom: data.nom,
    coutPoints: data.cout_points,
    limiteParClient: data.limite_par_client,
    actif: data.actif,
  };
}

// Dernière transaction de type 'gain' pour ce client (garde-fou anti-double-scan).
export async function getDerniereDateGain(
  admin: SupabaseClient,
  commerceId: string,
  clientId: string,
): Promise<Date | null> {
  const { data, error } = await admin
    .from("transactions")
    .select("created_at")
    .eq("commerce_id", commerceId)
    .eq("client_id", clientId)
    .eq("type", "gain")
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  if (error || !data) return null;
  return new Date(data.created_at);
}

// Nombre d'échanges déjà effectués pour cette récompense par ce client (limite_par_client).
export async function compterEchanges(
  admin: SupabaseClient,
  commerceId: string,
  clientId: string,
  recompenseId: string,
): Promise<number> {
  const { count, error } = await admin
    .from("transactions")
    .select("id", { count: "exact", head: true })
    .eq("commerce_id", commerceId)
    .eq("client_id", clientId)
    .eq("type", "echange")
    .eq("recompense_id", recompenseId);
  if (error) return 0;
  return count ?? 0;
}

// Recalcule les deux soldes en additionnant TOUT le ledger du client —
// jamais de solde "en cache" qu'on incrémenterait/décrémenterait soi-même.
export async function recalculerSoldes(
  admin: SupabaseClient,
  commerceId: string,
  clientId: string,
): Promise<Solde> {
  const { data, error } = await admin
    .from("transactions")
    .select("points, points_statut_delta")
    .eq("commerce_id", commerceId)
    .eq("client_id", clientId);
  if (error || !data) return { pointsDepensables: 0, pointsStatut: 0 };

  return data.reduce(
    (solde, t) => ({
      pointsDepensables: solde.pointsDepensables + t.points,
      pointsStatut: solde.pointsStatut + t.points_statut_delta,
    }),
    { pointsDepensables: 0, pointsStatut: 0 },
  );
}

export async function insererTransaction(
  admin: SupabaseClient,
  row: {
    commerceId: string;
    clientId: string;
    type: "gain" | "echange" | "ajustement";
    points: number;
    pointsStatutDelta: number;
    recompenseId?: string | null;
    motif?: string | null;
    utilisateurId: string | null;
  },
): Promise<void> {
  await admin.from("transactions").insert({
    commerce_id: row.commerceId,
    client_id: row.clientId,
    type: row.type,
    points: row.points,
    points_statut_delta: row.pointsStatutDelta,
    recompense_id: row.recompenseId ?? null,
    motif: row.motif ?? null,
    utilisateur_id: row.utilisateurId,
  });
}

export async function mettreAJourClient(
  admin: SupabaseClient,
  commerceId: string,
  clientId: string,
  patch: { pointsDepensables: number; pointsStatut: number; niveau: string; dateDerniereVisite?: string },
): Promise<void> {
  await admin
    .from("clients")
    .update({
      points_depensables: patch.pointsDepensables,
      points_statut: patch.pointsStatut,
      niveau: patch.niveau,
      ...(patch.dateDerniereVisite ? { date_derniere_visite: patch.dateDerniereVisite } : {}),
    })
    .eq("id", clientId)
    .eq("commerce_id", commerceId);
}

function mapClient(data: Record<string, unknown>): Client {
  return {
    id: data.id as string,
    commerceId: data.commerce_id as string,
    codeCarte: data.code_carte as string,
    pointsDepensables: data.points_depensables as number,
    pointsStatut: data.points_statut as number,
    niveau: data.niveau as Client["niveau"],
    dateDerniereVisite: (data.date_derniere_visite as string | null) ?? null,
  };
}

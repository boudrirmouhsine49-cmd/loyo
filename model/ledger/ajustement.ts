import type { SupabaseClient } from "@supabase/supabase-js";
import { calculerNiveau } from "./niveau";
import { getCommerce, getClient, recalculerSoldes, insererTransaction, mettreAJourClient } from "./repo";
import { ok, err, type LedgerResult, type Solde, type Niveau } from "./types";

export type AjusterManuelParams = {
  commerceId: string;
  clientId: string;
  delta: number; // + ou -
  motif: string;
  utilisateurId: string;
  role: "gerant" | "employe";
};

// RÈGLE 3 — Ajustement manuel (gérant seulement).
//
// Hypothèse à valider : la consigne ne précise pas l'effet d'un
// ajustement sur points_statut. On applique ici points_statut_delta=0
// dans tous les cas (l'ajustement ne corrige que la monnaie dépensable,
// jamais le niveau) — cohérent avec "points_statut ne baisse JAMAIS" :
// s'il pouvait monter via un ajustement positif, il faudrait aussi
// pouvoir le faire baisser pour corriger une erreur, ce qui violerait
// la règle. À ajuster si l'intention était différente.
export async function ajusterManuel(
  admin: SupabaseClient,
  params: AjusterManuelParams,
): Promise<LedgerResult<Solde & { niveau: Niveau }>> {
  if (params.role !== "gerant") {
    return err("role_insuffisant", "Seul un gérant peut effectuer un ajustement manuel.");
  }
  if (!params.motif || !params.motif.trim()) {
    return err("motif_requis", "Un motif est obligatoire pour un ajustement manuel.");
  }

  const commerce = await getCommerce(admin, params.commerceId);
  if (!commerce) return err("commerce_introuvable", "Commerce introuvable.");

  const client = await getClient(admin, params.commerceId, params.clientId);
  if (!client) return err("client_introuvable", "Client introuvable.");

  await insererTransaction(admin, {
    commerceId: params.commerceId,
    clientId: client.id,
    type: "ajustement",
    points: params.delta,
    pointsStatutDelta: 0,
    motif: params.motif.trim(),
    utilisateurId: params.utilisateurId,
  });

  const solde = await recalculerSoldes(admin, params.commerceId, client.id);
  const niveau = calculerNiveau(solde.pointsStatut, commerce);

  await mettreAJourClient(admin, params.commerceId, client.id, { ...solde, niveau });

  return ok({ ...solde, niveau });
}

import type { SupabaseClient } from "@supabase/supabase-js";
import { calculerNiveau } from "./niveau";
import {
  getCommerce,
  getClient,
  getReward,
  compterEchanges,
  recalculerSoldes,
  insererTransaction,
  mettreAJourClient,
} from "./repo";
import { ok, err, type LedgerResult, type Solde, type Niveau } from "./types";

export type EchangerRecompenseParams = {
  commerceId: string;
  clientId: string;
  recompenseId: string;
  utilisateurId: string;
};

// RÈGLE 2 — Échange d'une récompense. Toujours validé par un employé ET
// par le serveur, jamais déclenché seul par le client.
export async function echangerRecompense(
  admin: SupabaseClient,
  params: EchangerRecompenseParams,
): Promise<LedgerResult<Solde & { niveau: Niveau }>> {
  const commerce = await getCommerce(admin, params.commerceId);
  if (!commerce) return err("commerce_introuvable", "Commerce introuvable.");

  // Étape 1 : identifier client + récompense, cloisonnés sur commerce_id.
  const client = await getClient(admin, params.commerceId, params.clientId);
  if (!client) return err("client_introuvable", "Client introuvable.");

  const reward = await getReward(admin, params.commerceId, params.recompenseId);
  if (!reward || !reward.actif) return err("recompense_introuvable", "Récompense introuvable.");

  // Étape 2 : solde suffisant.
  if (client.pointsDepensables < reward.coutPoints) {
    return err("solde_insuffisant", "Solde de points insuffisant pour cette récompense.");
  }

  // Étape 3 : limite par client (0 = illimité).
  if (reward.limiteParClient > 0) {
    const dejaEchanges = await compterEchanges(admin, params.commerceId, client.id, reward.id);
    if (dejaEchanges >= reward.limiteParClient) {
      return err("limite_atteinte", "Limite d'échanges atteinte pour cette récompense.");
    }
  }

  // Étape 4 : le statut ne bouge JAMAIS à l'échange (points_statut_delta=0).
  await insererTransaction(admin, {
    commerceId: params.commerceId,
    clientId: client.id,
    type: "echange",
    points: -reward.coutPoints,
    pointsStatutDelta: 0,
    recompenseId: reward.id,
    utilisateurId: params.utilisateurId,
  });

  // Étape 5-6 : le surplus est conservé naturellement (on recalcule depuis
  // le ledger, on ne "consomme" jamais tout le solde). Le niveau reste
  // inchangé car points_statut n'a pas bougé.
  const solde = await recalculerSoldes(admin, params.commerceId, client.id);
  const niveau = calculerNiveau(solde.pointsStatut, commerce);

  await mettreAJourClient(admin, params.commerceId, client.id, { ...solde, niveau });

  return ok({ ...solde, niveau });
}

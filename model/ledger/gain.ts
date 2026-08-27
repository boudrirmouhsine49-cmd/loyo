import type { SupabaseClient } from "@supabase/supabase-js";
import { calculerNiveau } from "./niveau";
import {
  getCommerce,
  getClientByCodeCarte,
  getDerniereDateGain,
  recalculerSoldes,
  insererTransaction,
  mettreAJourClient,
} from "./repo";
import { ok, err, type LedgerResult, type Solde, type Niveau } from "./types";

export type AttribuerPointsParams = {
  commerceId: string;
  codeCarte: string;
  utilisateurId: string;
  /** Requis si le commerce est en mode_points='montant'. */
  montantAchat?: number;
};

function arrondir(valeur: number, mode: "floor" | "round" | "ceil"): number {
  if (mode === "ceil") return Math.ceil(valeur);
  if (mode === "round") return Math.round(valeur);
  return Math.floor(valeur);
}

// RÈGLE 1 — Gain de points.
export async function attribuerPoints(
  admin: SupabaseClient,
  params: AttribuerPointsParams,
): Promise<LedgerResult<Solde & { niveau: Niveau }>> {
  const commerce = await getCommerce(admin, params.commerceId);
  if (!commerce) return err("commerce_introuvable", "Commerce introuvable.");

  // Étape 1 : identifier le client via code_carte ET commerce_id.
  const client = await getClientByCodeCarte(admin, params.commerceId, params.codeCarte);
  if (!client) return err("client_introuvable", "Aucun client trouvé pour cette carte.");

  // Étape 2 : garde-fou anti-double-scan.
  const dernierGain = await getDerniereDateGain(admin, params.commerceId, client.id);
  if (dernierGain) {
    const minutesEcoulees = (Date.now() - dernierGain.getTime()) / 60_000;
    if (minutesEcoulees < commerce.delaiMinEntreGains) {
      const minutesRestantes = Math.ceil(commerce.delaiMinEntreGains - minutesEcoulees);
      return err(
        "trop_tot",
        `Points déjà attribués il y a ${Math.floor(minutesEcoulees)} min. Réessayez dans ${minutesRestantes} min.`,
      );
    }
  }

  // Étape 3 : calcul des points selon le mode du commerce.
  let points: number;
  if (commerce.modePoints === "visite") {
    points = commerce.pointsParVisite;
  } else {
    if (params.montantAchat == null || params.montantAchat < 0) {
      return err("montant_requis", "Le montant de l'achat est requis pour ce commerce.");
    }
    points = arrondir(params.montantAchat * commerce.pointsParEuro, commerce.arrondiMontant);
  }

  // Étapes 4-7 : écrire la ligne du ledger, recalculer, mettre à jour le client.
  await insererTransaction(admin, {
    commerceId: params.commerceId,
    clientId: client.id,
    type: "gain",
    points,
    pointsStatutDelta: points,
    utilisateurId: params.utilisateurId,
  });

  const solde = await recalculerSoldes(admin, params.commerceId, client.id);
  const niveau = calculerNiveau(solde.pointsStatut, commerce);

  await mettreAJourClient(admin, params.commerceId, client.id, {
    ...solde,
    niveau,
    dateDerniereVisite: new Date().toISOString(),
  });

  return ok({ ...solde, niveau });
}

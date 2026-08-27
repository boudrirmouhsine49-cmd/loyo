import { NextResponse } from "next/server";
import type { LedgerError } from "@/model/ledger";

// CONTROLLER — aide d'orchestration partagée par les routes /api/points/*.
// Traduit un échec métier (LedgerError) en réponse HTTP. Aucune règle
// métier ici : juste un mapping code -> statut HTTP.
const STATUS_PAR_CODE: Record<LedgerError["code"], number> = {
  commerce_introuvable: 404,
  client_introuvable: 404,
  recompense_introuvable: 404,
  trop_tot: 409,
  solde_insuffisant: 400,
  limite_atteinte: 400,
  role_insuffisant: 403,
  motif_requis: 400,
  montant_requis: 400,
};

export function erreurLedgerEnReponse(erreur: LedgerError) {
  return NextResponse.json({ error: erreur }, { status: STATUS_PAR_CODE[erreur.code] });
}

export function nonAuthentifie() {
  return NextResponse.json(
    { error: { code: "non_authentifie", message: "Authentification requise." } },
    { status: 401 },
  );
}

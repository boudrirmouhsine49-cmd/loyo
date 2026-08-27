import { NextResponse } from "next/server";
import { resolveCaller } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { attribuerPoints } from "@/model/ledger";
import { erreurLedgerEnReponse, nonAuthentifie } from "../_lib";

// CONTROLLER — orchestration uniquement : identifie l'appelant, appelle
// le Model, renvoie la réponse. C'est cette route que l'app de scan
// appellera plus tard.
export async function POST(request: Request) {
  const caller = await resolveCaller(request);
  if (!caller) return nonAuthentifie();

  const body = await request.json().catch(() => null);
  if (!body?.code_carte || typeof body.code_carte !== "string") {
    return NextResponse.json(
      { error: { code: "requete_invalide", message: "code_carte requis." } },
      { status: 400 },
    );
  }

  const result = await attribuerPoints(createAdminClient(), {
    commerceId: caller.commerceId,
    codeCarte: body.code_carte,
    utilisateurId: caller.utilisateurId,
    montantAchat: typeof body.montant_achat === "number" ? body.montant_achat : undefined,
  });

  if (!result.ok) return erreurLedgerEnReponse(result.error);
  return NextResponse.json(result.data);
}

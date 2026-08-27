import { NextResponse } from "next/server";
import { resolveCaller } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { ajusterManuel } from "@/model/ledger";
import { erreurLedgerEnReponse, nonAuthentifie } from "../_lib";

// CONTROLLER — orchestration uniquement. Le contrôle "gérant seulement"
// est une règle métier : il vit dans ajusterManuel() (Model), pas ici.
export async function POST(request: Request) {
  const caller = await resolveCaller(request);
  if (!caller) return nonAuthentifie();

  const body = await request.json().catch(() => null);
  if (!body?.client_id || typeof body.delta !== "number" || !body?.motif) {
    return NextResponse.json(
      { error: { code: "requete_invalide", message: "client_id, delta et motif requis." } },
      { status: 400 },
    );
  }

  const result = await ajusterManuel(createAdminClient(), {
    commerceId: caller.commerceId,
    clientId: body.client_id,
    delta: body.delta,
    motif: body.motif,
    utilisateurId: caller.utilisateurId,
    role: caller.role,
  });

  if (!result.ok) return erreurLedgerEnReponse(result.error);
  return NextResponse.json(result.data);
}

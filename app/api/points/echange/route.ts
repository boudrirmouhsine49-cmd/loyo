import { NextResponse } from "next/server";
import { resolveCaller } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { echangerRecompense } from "@/model/ledger";
import { erreurLedgerEnReponse, nonAuthentifie } from "../_lib";

// CONTROLLER — orchestration uniquement. L'échange n'est jamais déclenché
// par le client final : cette route n'est appelée qu'après validation
// explicite par un employé.
export async function POST(request: Request) {
  const caller = await resolveCaller(request);
  if (!caller) return nonAuthentifie();

  const body = await request.json().catch(() => null);
  if (!body?.client_id || !body?.reward_id) {
    return NextResponse.json(
      { error: { code: "requete_invalide", message: "client_id et reward_id requis." } },
      { status: 400 },
    );
  }

  const result = await echangerRecompense(createAdminClient(), {
    commerceId: caller.commerceId,
    clientId: body.client_id,
    recompenseId: body.reward_id,
    utilisateurId: caller.utilisateurId,
  });

  if (!result.ok) return erreurLedgerEnReponse(result.error);
  return NextResponse.json(result.data);
}

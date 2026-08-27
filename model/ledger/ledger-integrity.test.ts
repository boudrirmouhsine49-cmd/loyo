import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { attribuerPoints } from "./gain";
import { echangerRecompense } from "./echange";
import { ajusterManuel } from "./ajustement";
import { recalculerSoldes } from "./repo";
import {
  admin,
  creerCommerceDeTest,
  supprimerCommerceDeTest,
  creerClientDeTest,
  creerEmployeDeTest,
  creerRecompenseDeTest,
  lireClient,
} from "./test-helpers";

describe("7. Recalcul depuis le ledger", () => {
  let commerceId: string;
  let clientId: string;
  let codeCarte: string;
  let gerantId: string;

  beforeEach(async () => {
    commerceId = await creerCommerceDeTest({ pointsParVisite: 200, delaiMinEntreGains: 0 });
    codeCarte = `CARTE-${crypto.randomUUID().slice(0, 8)}`;
    clientId = await creerClientDeTest(commerceId, codeCarte);
    gerantId = await creerEmployeDeTest(commerceId, "gerant");
  });

  afterEach(async () => {
    await supprimerCommerceDeTest(commerceId);
  });

  it("après plusieurs opérations, le solde en cache (clients) == la somme du ledger (transactions)", async () => {
    const recompenseId = await creerRecompenseDeTest(commerceId, 150);

    await attribuerPoints(admin(), { commerceId, codeCarte, utilisateurId: gerantId }); // +200 / +200
    await attribuerPoints(admin(), { commerceId, codeCarte, utilisateurId: gerantId }); // +200 / +200
    await echangerRecompense(admin(), { commerceId, clientId, recompenseId, utilisateurId: gerantId }); // -150 / +0
    await ajusterManuel(admin(), {
      commerceId, clientId, delta: -30, motif: "Test intégrité", utilisateurId: gerantId, role: "gerant",
    }); // -30 / +0

    // Attendu : dépensable = 200+200-150-30 = 220 ; statut = 200+200 = 400.
    const soldeRecalcule = await recalculerSoldes(admin(), commerceId, clientId);
    expect(soldeRecalcule.pointsDepensables).toBe(220);
    expect(soldeRecalcule.pointsStatut).toBe(400);

    // Le solde mis en cache sur la ligne `clients` doit être EXACTEMENT
    // celui recalculé depuis le ledger — jamais une valeur "à part".
    const client = await lireClient(clientId);
    expect(client?.points_depensables).toBe(soldeRecalcule.pointsDepensables);
    expect(client?.points_statut).toBe(soldeRecalcule.pointsStatut);
  });

  it("le nombre de lignes du ledger correspond exactement au nombre d'opérations effectuées", async () => {
    await attribuerPoints(admin(), { commerceId, codeCarte, utilisateurId: gerantId });
    await ajusterManuel(admin(), {
      commerceId, clientId, delta: 5, motif: "Test", utilisateurId: gerantId, role: "gerant",
    });

    const { count } = await admin()
      .from("transactions")
      .select("id", { count: "exact", head: true })
      .eq("client_id", clientId);

    expect(count).toBe(2);
  });
});

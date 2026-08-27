import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { attribuerPoints } from "./gain";
import { echangerRecompense } from "./echange";
import {
  admin,
  creerCommerceDeTest,
  supprimerCommerceDeTest,
  creerClientDeTest,
  creerEmployeDeTest,
  creerRecompenseDeTest,
} from "./test-helpers";

describe("echangerRecompense (RÈGLE 2 — échange)", () => {
  let commerceId: string;
  let clientId: string;
  let codeCarte: string;
  let utilisateurId: string;

  beforeEach(async () => {
    // 600 points en un seul gain, pour manipuler facilement le solde.
    commerceId = await creerCommerceDeTest({ pointsParVisite: 600, seuilNiveauArgent: 500, seuilNiveauOr: 1500 });
    codeCarte = `CARTE-${crypto.randomUUID().slice(0, 8)}`;
    clientId = await creerClientDeTest(commerceId, codeCarte);
    utilisateurId = await creerEmployeDeTest(commerceId);
    await attribuerPoints(admin(), { commerceId, codeCarte, utilisateurId }); // -> 600 / 600, niveau argent
  });

  afterEach(async () => {
    await supprimerCommerceDeTest(commerceId);
  });

  it("2. échange : points_depensables baisse, le SURPLUS est conservé, points_statut et niveau INCHANGÉS", async () => {
    const recompenseId = await creerRecompenseDeTest(commerceId, 500);

    const result = await echangerRecompense(admin(), { commerceId, clientId, recompenseId, utilisateurId });

    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.data.pointsDepensables).toBe(100); // 600 - 500, surplus conservé
    expect(result.data.pointsStatut).toBe(600); // inchangé
    expect(result.data.niveau).toBe("argent"); // inchangé (500 >= seuilNiveauArgent)
  });

  it("5. solde insuffisant : échange refusé proprement, rien n'est débité", async () => {
    const recompenseId = await creerRecompenseDeTest(commerceId, 1000); // > solde (600)

    const result = await echangerRecompense(admin(), { commerceId, clientId, recompenseId, utilisateurId });

    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error.code).toBe("solde_insuffisant");
  });

  it("6. limite_par_client : échange au-delà de la limite refusé", async () => {
    const recompenseId = await creerRecompenseDeTest(commerceId, 100, 1); // limite = 1

    const premier = await echangerRecompense(admin(), { commerceId, clientId, recompenseId, utilisateurId });
    expect(premier.ok).toBe(true); // 600 -> 500, 1er échange OK

    const second = await echangerRecompense(admin(), { commerceId, clientId, recompenseId, utilisateurId });
    expect(second.ok).toBe(false);
    if (!second.ok) expect(second.error.code).toBe("limite_atteinte");
  });

  it("limite_par_client = 0 : illimité, plusieurs échanges acceptés", async () => {
    const recompenseId = await creerRecompenseDeTest(commerceId, 100, 0);

    const premier = await echangerRecompense(admin(), { commerceId, clientId, recompenseId, utilisateurId });
    const second = await echangerRecompense(admin(), { commerceId, clientId, recompenseId, utilisateurId });

    expect(premier.ok).toBe(true);
    expect(second.ok).toBe(true);
  });
});

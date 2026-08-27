import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { ajusterManuel } from "./ajustement";
import {
  admin,
  creerCommerceDeTest,
  supprimerCommerceDeTest,
  creerClientDeTest,
  creerEmployeDeTest,
} from "./test-helpers";

describe("ajusterManuel (RÈGLE 3 — ajustement manuel)", () => {
  let commerceId: string;
  let clientId: string;
  let gerantId: string;
  let employeId: string;

  beforeEach(async () => {
    commerceId = await creerCommerceDeTest();
    clientId = await creerClientDeTest(commerceId);
    gerantId = await creerEmployeDeTest(commerceId, "gerant");
    employeId = await creerEmployeDeTest(commerceId, "employe");
  });

  afterEach(async () => {
    await supprimerCommerceDeTest(commerceId);
  });

  it("un gérant peut ajouter des points manuellement, avec motif", async () => {
    const result = await ajusterManuel(admin(), {
      commerceId,
      clientId,
      delta: 50,
      motif: "Geste commercial : carte perdue",
      utilisateurId: gerantId,
      role: "gerant",
    });

    expect(result.ok).toBe(true);
    if (result.ok) expect(result.data.pointsDepensables).toBe(50);
  });

  it("un gérant peut retirer des points manuellement (erreur de caisse)", async () => {
    await ajusterManuel(admin(), {
      commerceId, clientId, delta: 100, motif: "Correction initiale",
      utilisateurId: gerantId, role: "gerant",
    });

    const result = await ajusterManuel(admin(), {
      commerceId, clientId, delta: -30, motif: "Erreur de caisse le 12/08",
      utilisateurId: gerantId, role: "gerant",
    });

    expect(result.ok).toBe(true);
    if (result.ok) expect(result.data.pointsDepensables).toBe(70);
  });

  it("8. un 'employe' ne peut PAS faire d'ajustement manuel", async () => {
    const result = await ajusterManuel(admin(), {
      commerceId,
      clientId,
      delta: 50,
      motif: "Tentative non autorisée",
      utilisateurId: employeId,
      role: "employe",
    });

    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error.code).toBe("role_insuffisant");
  });

  it("motif obligatoire : un ajustement sans motif est refusé", async () => {
    const result = await ajusterManuel(admin(), {
      commerceId,
      clientId,
      delta: 50,
      motif: "   ", // vide une fois trim()
      utilisateurId: gerantId,
      role: "gerant",
    });

    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error.code).toBe("motif_requis");
  });
});

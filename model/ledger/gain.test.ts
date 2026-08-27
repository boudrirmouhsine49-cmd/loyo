import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { attribuerPoints } from "./gain";
import { admin, creerCommerceDeTest, supprimerCommerceDeTest, creerClientDeTest, creerEmployeDeTest, reculerDernierGain } from "./test-helpers";

describe("attribuerPoints (RÈGLE 1 — gain)", () => {
  let commerceId: string;
  let clientId: string;
  let codeCarte: string;
  let utilisateurId: string;

  beforeEach(async () => {
    commerceId = await creerCommerceDeTest({ pointsParVisite: 10, delaiMinEntreGains: 60 });
    codeCarte = `CARTE-${crypto.randomUUID().slice(0, 8)}`;
    clientId = await creerClientDeTest(commerceId, codeCarte);
    utilisateurId = await creerEmployeDeTest(commerceId);
  });

  afterEach(async () => {
    await supprimerCommerceDeTest(commerceId);
  });

  it("1. gain simple : points_depensables ET points_statut montent tous les deux", async () => {
    const result = await attribuerPoints(admin(), { commerceId, codeCarte, utilisateurId });

    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.data.pointsDepensables).toBe(10);
    expect(result.data.pointsStatut).toBe(10);
  });

  it("mode 'montant' : points = montant × points_par_euro, arrondi", async () => {
    const commerceMontant = await creerCommerceDeTest({
      modePoints: "montant",
      pointsParEuro: 2.5,
      arrondiMontant: "floor",
    });
    const carte = `CARTE-${crypto.randomUUID().slice(0, 8)}`;
    const c = await creerClientDeTest(commerceMontant, carte);
    const u = await creerEmployeDeTest(commerceMontant);

    const result = await attribuerPoints(admin(), {
      commerceId: commerceMontant,
      codeCarte: carte,
      utilisateurId: u,
      montantAchat: 12.9, // 12.9 * 2.5 = 32.25 -> floor -> 32
    });

    expect(result.ok).toBe(true);
    if (result.ok) expect(result.data.pointsDepensables).toBe(32);
    await supprimerCommerceDeTest(commerceMontant);
    void c;
  });

  it("4. garde-fou anti-double-scan : refuse un second gain avant le délai, accepte après", async () => {
    const premier = await attribuerPoints(admin(), { commerceId, codeCarte, utilisateurId });
    expect(premier.ok).toBe(true);

    const second = await attribuerPoints(admin(), { commerceId, codeCarte, utilisateurId });
    expect(second.ok).toBe(false);
    if (!second.ok) expect(second.error.code).toBe("trop_tot");

    // Simule l'écoulement du délai (61 min pour un délai de 60 min).
    await reculerDernierGain(clientId, 61);

    const troisieme = await attribuerPoints(admin(), { commerceId, codeCarte, utilisateurId });
    expect(troisieme.ok).toBe(true);
    if (troisieme.ok) expect(troisieme.data.pointsDepensables).toBe(20);
  });

  it("3. franchissement de seuil : bronze -> argent -> or au bon moment", async () => {
    const c2 = await creerCommerceDeTest({
      pointsParVisite: 100,
      delaiMinEntreGains: 0,
      seuilNiveauArgent: 150,
      seuilNiveauOr: 300,
    });
    const carte = `CARTE-${crypto.randomUUID().slice(0, 8)}`;
    await creerClientDeTest(c2, carte);
    const u = await creerEmployeDeTest(c2);

    const g1 = await attribuerPoints(admin(), { commerceId: c2, codeCarte: carte, utilisateurId: u });
    expect(g1.ok).toBe(true);
    if (g1.ok) expect(g1.data.niveau).toBe("bronze"); // 100 < 150

    const g2 = await attribuerPoints(admin(), { commerceId: c2, codeCarte: carte, utilisateurId: u });
    expect(g2.ok).toBe(true);
    if (g2.ok) expect(g2.data.niveau).toBe("argent"); // 200 >= 150, < 300

    const g3 = await attribuerPoints(admin(), { commerceId: c2, codeCarte: carte, utilisateurId: u });
    expect(g3.ok).toBe(true);
    if (g3.ok) expect(g3.data.niveau).toBe("or"); // 300 >= 300

    await supprimerCommerceDeTest(c2);
  });

  it("client introuvable (mauvais code_carte) est refusé proprement", async () => {
    const result = await attribuerPoints(admin(), {
      commerceId,
      codeCarte: "CARTE-INEXISTANTE",
      utilisateurId,
    });
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error.code).toBe("client_introuvable");
  });
});

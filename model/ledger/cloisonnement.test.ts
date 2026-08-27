import { describe, it, expect, afterEach } from "vitest";
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

describe("Cloisonnement multi-commerce", () => {
  const aNettoyer: string[] = [];

  afterEach(async () => {
    await Promise.all(aNettoyer.splice(0).map(supprimerCommerceDeTest));
  });

  it("9a. impossible d'attribuer des points à un client d'un AUTRE commerce", async () => {
    const commerceA = await creerCommerceDeTest();
    const commerceB = await creerCommerceDeTest();
    aNettoyer.push(commerceA, commerceB);

    const codeCarte = `CARTE-${crypto.randomUUID().slice(0, 8)}`;
    await creerClientDeTest(commerceB, codeCarte); // le client appartient à B
    const utilisateurA = await creerEmployeDeTest(commerceA); // l'employé appartient à A

    // Un employé du commerce A tente d'attribuer des points en donnant le
    // code carte d'un client du commerce B : le Model cherche ce code
    // carte UNIQUEMENT dans commerce A -> ne le trouve pas.
    const result = await attribuerPoints(admin(), {
      commerceId: commerceA,
      codeCarte,
      utilisateurId: utilisateurA,
    });

    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error.code).toBe("client_introuvable");
  });

  it("9b. impossible d'échanger une récompense d'un commerce pour un client d'un AUTRE commerce", async () => {
    const commerceA = await creerCommerceDeTest();
    const commerceB = await creerCommerceDeTest();
    aNettoyer.push(commerceA, commerceB);

    const clientA = await creerClientDeTest(commerceA);
    const utilisateurA = await creerEmployeDeTest(commerceA);
    // Donne assez de points au client A pour ne pas être bloqué par "solde insuffisant".
    await admin().from("clients").update({ points_depensables: 10_000, points_statut: 10_000 }).eq("id", clientA);

    const recompenseB = await creerRecompenseDeTest(commerceB, 100); // récompense du commerce B

    const result = await echangerRecompense(admin(), {
      commerceId: commerceA, // on agit "en tant que" commerce A
      clientId: clientA,
      recompenseId: recompenseB, // mais la récompense appartient à B
      utilisateurId: utilisateurA,
    });

    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error.code).toBe("recompense_introuvable");
  });

  it("9c. impossible d'échanger pour un client d'un autre commerce, même avec une récompense valide", async () => {
    const commerceA = await creerCommerceDeTest();
    const commerceB = await creerCommerceDeTest();
    aNettoyer.push(commerceA, commerceB);

    const clientB = await creerClientDeTest(commerceB); // le client appartient à B
    const recompenseA = await creerRecompenseDeTest(commerceA, 100);
    const utilisateurA = await creerEmployeDeTest(commerceA);

    const result = await echangerRecompense(admin(), {
      commerceId: commerceA,
      clientId: clientB, // client d'un autre commerce
      recompenseId: recompenseA,
      utilisateurId: utilisateurA,
    });

    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error.code).toBe("client_introuvable");
  });
});

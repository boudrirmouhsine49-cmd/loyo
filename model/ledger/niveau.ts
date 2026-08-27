import type { Commerce, Niveau } from "./types";

// Règle métier : le niveau dépend uniquement de points_statut (jamais de
// points_depensables), comparé aux seuils propres au commerce.
export function calculerNiveau(
  pointsStatut: number,
  commerce: Pick<Commerce, "seuilNiveauArgent" | "seuilNiveauOr">,
): Niveau {
  if (pointsStatut >= commerce.seuilNiveauOr) return "or";
  if (pointsStatut >= commerce.seuilNiveauArgent) return "argent";
  return "bronze";
}

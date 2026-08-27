// MODEL — types du moteur de points. Les noms de champs correspondent
// aux colonnes SQL (snake_case côté DB) traduites en camelCase ici.

export type Niveau = "bronze" | "argent" | "or";
export type TypeTransaction = "gain" | "echange" | "ajustement";

export type Commerce = {
  id: string;
  nom: string;
  modePoints: "visite" | "montant";
  pointsParVisite: number;
  pointsParEuro: number;
  arrondiMontant: "floor" | "round" | "ceil";
  delaiMinEntreGains: number; // minutes
  seuilNiveauArgent: number;
  seuilNiveauOr: number;
};

export type Client = {
  id: string;
  commerceId: string;
  codeCarte: string;
  pointsDepensables: number;
  pointsStatut: number;
  niveau: Niveau;
  dateDerniereVisite: string | null;
};

export type Reward = {
  id: string;
  commerceId: string;
  nom: string;
  coutPoints: number;
  limiteParClient: number;
  actif: boolean;
};

export type Transaction = {
  id: string;
  commerceId: string;
  clientId: string;
  type: TypeTransaction;
  points: number;
  pointsStatutDelta: number;
  recompenseId: string | null;
  motif: string | null;
  utilisateurId: string | null;
  createdAt: string;
};

export type Solde = { pointsDepensables: number; pointsStatut: number };

// Toute fonction du ledger qui peut échouer pour une raison métier
// (pas une erreur d'infra) renvoie ce type, plutôt que de lever une
// exception : les échecs métier sont attendus et doivent être traités
// proprement par le Controller (refus propre -> code HTTP adapté).
export type LedgerError = {
  code:
    | "commerce_introuvable"
    | "client_introuvable"
    | "recompense_introuvable"
    | "trop_tot"
    | "solde_insuffisant"
    | "limite_atteinte"
    | "role_insuffisant"
    | "motif_requis"
    | "montant_requis";
  message: string;
};

export type LedgerResult<T> = { ok: true; data: T } | { ok: false; error: LedgerError };

export function ok<T>(data: T): LedgerResult<T> {
  return { ok: true, data };
}

export function err<T>(code: LedgerError["code"], message: string): LedgerResult<T> {
  return { ok: false, error: { code, message } };
}

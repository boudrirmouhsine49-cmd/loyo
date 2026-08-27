import type { Tier, CampaignStatus } from "./types";

export const tierColor: Record<Tier, string> = {
  Or: "var(--tier-or)",
  Argent: "var(--tier-argent)",
  Bronze: "var(--tier-bronze)",
};

// [couleur texte, couleur fond] pour les badges de statut
export const campaignStatusColor: Record<CampaignStatus, [string, string]> = {
  Active: ["var(--accent)", "var(--accent-bg)"],
  Planifiée: ["var(--info)", "var(--info-bg)"],
  Automatique: ["var(--special)", "var(--special-bg)"],
};

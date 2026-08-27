// Types centralisés de l'app. Complétés au fur et à mesure des écrans
// (voir CLAUDE.md, section "Modèle de données").

export type Tier = "or" | "argent" | "bronze";

export type TrendTone = "success" | "danger";

export type Kpi = {
  id: string;
  label: string;
  value: string;
  caption: string;
  trend: string;
  trendTone: TrendTone;
};

export type OnboardingStep = {
  id: string;
  label: string;
  done: boolean;
};

export type WeeklyVisit = {
  day: string;
  visits: number;
};

export type TierBreakdownItem = {
  tier: Tier;
  label: string;
  count: number;
};

export type ActivityItem = {
  id: string;
  who: string;
  action: string;
  detail?: string;
  when: string;
};

export type ReactivationClient = {
  id: string;
  name: string;
  tier: Tier;
  inactiveDays: number;
};

export type CampaignStatus = "active" | "planifiee" | "automatique";

export type CampaignPreview = {
  id: string;
  name: string;
  status: CampaignStatus;
};

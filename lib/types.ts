export type Tier = "Or" | "Argent" | "Bronze";

export type Kpi = {
  label: string;
  value: string;
  compare: string;
  trend: string;
};

export type OnboardingStep = { label: string; done: boolean };

export type TierStat = { name: Tier; count: number };

export type Activity = {
  who: string;
  what: string;
  when: string;
  kind: "points" | "tier" | "campaign" | "reward" | "auto" | "join";
};

export type Inactive = {
  name: string;
  tier: Tier;
  days: number;
};

export type CampaignStatus = "Active" | "Planifiée" | "Automatique";
export type Campaign = { name: string; status: CampaignStatus; usagePct?: number };

export type VisitPoint = { label: string; visits: number };

export type CurrentUser = { name: string; role: string };

export type NavLink = { slug: string; label: string };
export type NavGroup = { title: string; links: NavLink[] };

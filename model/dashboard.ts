import {
  dashboardKpis,
  onboardingSteps,
  weeklyVisitsTrend,
  returnRatePct,
  tierStats,
  recentActivity,
  inactives,
  campaignsPreview,
} from "./mock-source";
import type { Kpi, OnboardingStep, VisitPoint, TierStat, Activity, Inactive, Campaign } from "./types";

// MODEL — toute la logique métier de l'écran /dashboard. C'est la SEULE
// couche qui lit la source de données (mock-source.ts aujourd'hui,
// Supabase en Phase 2) et qui applique les règles de l'app. Les routes
// API (Controller) et les pages (View) ne font qu'appeler ces fonctions.

export function getDashboardKpis(): Kpi[] {
  return dashboardKpis;
}

export function getOnboardingProgress(): {
  steps: OnboardingStep[];
  done: number;
  total: number;
  pct: number;
} {
  const done = onboardingSteps.filter((step) => step.done).length;
  const total = onboardingSteps.length;
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;
  return { steps: onboardingSteps, done, total, pct };
}

export function getVisitsTrend(): { points: VisitPoint[]; growthPct: number } {
  const first = weeklyVisitsTrend[0].visits;
  const last = weeklyVisitsTrend[weeklyVisitsTrend.length - 1].visits;
  const growthPct = Math.round(((last - first) / first) * 100);
  return { points: weeklyVisitsTrend, growthPct };
}

export function getReturnRatePct(): number {
  return returnRatePct;
}

export function getTierBreakdown(): TierStat[] {
  return tierStats;
}

export function getRecentActivity(): Activity[] {
  return recentActivity;
}

// Règle métier : un client est considéré "urgent" à relancer au-delà de
// ce nombre de jours sans visite.
const URGENT_INACTIVITY_DAYS = 20;

export function getInactiveClients(): { clients: Inactive[]; urgentCount: number } {
  const urgentCount = inactives.filter((client) => client.days >= URGENT_INACTIVITY_DAYS).length;
  return { clients: inactives, urgentCount };
}

// Règle métier : nombre de campagnes mises en avant sur le tableau de bord.
const CAMPAIGNS_PREVIEW_COUNT = 3;

export function getCampaignsPreview(): Campaign[] {
  return campaignsPreview.slice(0, CAMPAIGNS_PREVIEW_COUNT);
}

export type DashboardData = {
  kpis: Kpi[];
  onboarding: ReturnType<typeof getOnboardingProgress>;
  visitsTrend: ReturnType<typeof getVisitsTrend>;
  returnRatePct: number;
  tierBreakdown: TierStat[];
  recentActivity: Activity[];
  inactiveClients: ReturnType<typeof getInactiveClients>;
  campaignsPreview: Campaign[];
};

// Agrège tout ce dont l'écran /dashboard a besoin en un seul appel.
export function getDashboardData(): DashboardData {
  return {
    kpis: getDashboardKpis(),
    onboarding: getOnboardingProgress(),
    visitsTrend: getVisitsTrend(),
    returnRatePct: getReturnRatePct(),
    tierBreakdown: getTierBreakdown(),
    recentActivity: getRecentActivity(),
    inactiveClients: getInactiveClients(),
    campaignsPreview: getCampaignsPreview(),
  };
}

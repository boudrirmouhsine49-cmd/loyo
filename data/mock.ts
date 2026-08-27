// Données fictives (Phase 1). Remplacées par Supabase en Phase 2.
// Client-exemple : Café du Coin, Luxembourg.

import type {
  ActivityItem,
  CampaignPreview,
  Kpi,
  OnboardingStep,
  ReactivationClient,
  TierBreakdownItem,
  WeeklyVisit,
} from "@/lib/types";

export const dashboardKpis: Kpi[] = [
  {
    id: "active-clients",
    label: "Clients actifs",
    value: "2 131",
    caption: "2 027 le mois dernier",
    trend: "+5,1 %",
    trendTone: "success",
  },
  {
    id: "weekly-visits",
    label: "Visites / semaine",
    value: "852",
    caption: "834 la semaine dernière",
    trend: "+2,1 %",
    trendTone: "success",
  },
  {
    id: "return-rate",
    label: "Taux de retour",
    value: "68 %",
    caption: "65 % le mois dernier",
    trend: "+3 pts",
    trendTone: "success",
  },
  {
    id: "points-distributed",
    label: "Points distribués",
    value: "128 k",
    caption: "cette semaine",
    trend: "+6,4 %",
    trendTone: "success",
  },
];

export const onboardingSteps: OnboardingStep[] = [
  { id: "card", label: "Créez votre carte de fidélité", done: true },
  { id: "rewards", label: "Ajoutez vos récompenses", done: true },
  { id: "qr-code", label: "Générez votre QR code", done: true },
  { id: "team", label: "Formez votre équipe", done: false },
  { id: "first-client", label: "Enregistrez votre premier client", done: false },
];

export const weeklyVisits: WeeklyVisit[] = [
  { day: "Lun", visits: 105 },
  { day: "Mar", visits: 110 },
  { day: "Mer", visits: 130 },
  { day: "Jeu", visits: 125 },
  { day: "Ven", visits: 145 },
  { day: "Sam", visits: 160 },
  { day: "Dim", visits: 77 },
];

export const tierBreakdown: TierBreakdownItem[] = [
  { tier: "or", label: "Or", count: 340 },
  { tier: "argent", label: "Argent", count: 890 },
  { tier: "bronze", label: "Bronze", count: 1317 },
];

export const recentActivity: ActivityItem[] = [
  { id: "1", who: "Marie Laurent", action: "a gagné 30 points", when: "il y a 4 min" },
  { id: "2", who: "Thomas Koch", action: "a atteint le niveau Or", when: "il y a 22 min" },
  {
    id: "3",
    who: "Campagne « Double points »",
    action: "a été programmée",
    when: "il y a 1 h",
  },
  {
    id: "4",
    who: "Sophie Mueller",
    action: "a utilisé sa récompense",
    detail: "1 café offert",
    when: "il y a 2 h",
  },
  {
    id: "5",
    who: "Relance automatique",
    action: "12 clients inactifs relancés",
    when: "il y a 3 h",
  },
  { id: "6", who: "Jean Bernard", action: "a rejoint le programme", when: "il y a 5 h" },
];

export const reactivationClients: ReactivationClient[] = [
  { id: "1", name: "Robert Martin", tier: "or", inactiveDays: 47 },
  { id: "2", name: "Léa Weber", tier: "argent", inactiveDays: 32 },
  { id: "3", name: "Paul Schmit", tier: "bronze", inactiveDays: 28 },
  { id: "4", name: "Anna Klein", tier: "argent", inactiveDays: 21 },
];

export const campaignsPreview: CampaignPreview[] = [
  { id: "1", name: "Retour client", status: "active" },
  { id: "2", name: "Café offert", status: "active" },
  { id: "3", name: "Double points le week-end", status: "planifiee" },
  { id: "4", name: "Anniversaire", status: "automatique" },
];

import type {
  Kpi, OnboardingStep, TierStat, Activity, Inactive, Campaign, VisitPoint, CurrentUser,
} from "./types";

// MODEL — source de données brute (Café du Coin, Phase 1).
// En Phase 2, ce fichier est remplacé par des requêtes Supabase ; le reste
// du Model (dashboard.ts, etc.) n'aura pas à changer.

export const merchantName = "Café du Coin";

export const currentUser: CurrentUser = { name: "Gilles C.", role: "Gérant" };

// Même donnée que le KPI "Taux de retour", utilisée par le donut ReturnDonut.
export const returnRatePct = 68;

export const dashboardKpis: Kpi[] = [
  { label: "Clients actifs", value: "2 131", compare: "2 027 le mois dernier", trend: "+5,1 %" },
  { label: "Visites / semaine", value: "852", compare: "834 la semaine dernière", trend: "+2,1 %" },
  { label: "Taux de retour", value: "68 %", compare: "65 % le mois dernier", trend: "+3 pts" },
  { label: "Points distribués", value: "128 k", compare: "cette semaine", trend: "+6,4 %" },
];

export const onboardingSteps: OnboardingStep[] = [
  { label: "Créez votre carte de fidélité", done: true },
  { label: "Ajoutez vos récompenses", done: true },
  { label: "Générez votre QR code", done: false },
  { label: "Formez votre équipe", done: false },
  { label: "Enregistrez votre premier client", done: false },
];

// Visites par semaine, 12 dernières semaines (du plus ancien au plus récent).
// +42 % entre la première et la dernière semaine (852 = visites de la semaine, cf. KPI).
export const weeklyVisitsTrend: VisitPoint[] = [
  { label: "il y a 12 sem.", visits: 600 },
  { label: "il y a 11 sem.", visits: 615 },
  { label: "il y a 10 sem.", visits: 640 },
  { label: "il y a 9 sem.", visits: 655 },
  { label: "il y a 8 sem.", visits: 670 },
  { label: "il y a 7 sem.", visits: 690 },
  { label: "il y a 6 sem.", visits: 705 },
  { label: "il y a 5 sem.", visits: 730 },
  { label: "il y a 4 sem.", visits: 750 },
  { label: "il y a 3 sem.", visits: 780 },
  { label: "il y a 2 sem.", visits: 810 },
  { label: "cette semaine", visits: 852 },
];

export const tierStats: TierStat[] = [
  { name: "Or", count: 340 },
  { name: "Argent", count: 890 },
  { name: "Bronze", count: 1317 },
];

export const recentActivity: Activity[] = [
  { who: "Marie Laurent", what: "a gagné 30 points", when: "il y a 4 min", kind: "points" },
  { who: "Thomas Koch", what: "a atteint le niveau Or", when: "il y a 22 min", kind: "tier" },
  { who: "Campagne « Double points »", what: "a été programmée", when: "il y a 1 h", kind: "campaign" },
  { who: "Sophie Mueller", what: "a utilisé sa récompense · 1 café offert", when: "il y a 2 h", kind: "reward" },
  { who: "Relance automatique", what: "12 clients inactifs relancés", when: "il y a 3 h", kind: "auto" },
  { who: "Jean Bernard", what: "a rejoint le programme", when: "il y a 5 h", kind: "join" },
];

export const inactives: Inactive[] = [
  { name: "Robert Martin", tier: "Or", days: 47 },
  { name: "Léa Weber", tier: "Argent", days: 32 },
  { name: "Paul Schmit", tier: "Bronze", days: 28 },
  { name: "Anna Klein", tier: "Argent", days: 21 },
];

export const campaignsPreview: Campaign[] = [
  { name: "Retour client", status: "Active", usagePct: 24 },
  { name: "Café offert", status: "Active", usagePct: 38 },
  { name: "Double points le week-end", status: "Planifiée" },
  { name: "Anniversaire", status: "Automatique" },
];

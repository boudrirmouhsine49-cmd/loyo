import type {
  Kpi, OnboardingStep, TierStat, Activity, Inactive, Campaign,
} from "@/lib/types";

// Données de démonstration du tableau de bord (Café du Coin).
// À remplacer par des vraies données (Supabase) en Phase 3.

export const merchantName = "Café du Coin";

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

// Visites par jour de la semaine (lun -> dim)
export const weeklyVisits: { day: string; visits: number }[] = [
  { day: "Lun", visits: 118 },
  { day: "Mar", visits: 132 },
  { day: "Mer", visits: 124 },
  { day: "Jeu", visits: 140 },
  { day: "Ven", visits: 156 },
  { day: "Sam", visits: 112 },
  { day: "Dim", visits: 70 },
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
  { name: "Retour client", status: "Active" },
  { name: "Café offert", status: "Active" },
  { name: "Double points le week-end", status: "Planifiée" },
  { name: "Anniversaire", status: "Automatique" },
];

import type { NavGroup } from "./types";

export const navigation: NavGroup[] = [
  {
    title: "Quotidien",
    links: [
      { slug: "dashboard", label: "Pilotage" },
      { slug: "clients", label: "Clients" },
    ],
  },
  {
    title: "Fidélité",
    links: [
      { slug: "recompenses", label: "Récompenses" },
      { slug: "carte", label: "Carte de fidélité" },
      { slug: "campagnes", label: "Campagnes" },
      { slug: "resultats", label: "Résultats" },
    ],
  },
  {
    title: "Automatisations",
    links: [
      { slug: "relance", label: "Relance auto" },
      { slug: "anniversaires", label: "Anniversaires" },
      { slug: "parrainage", label: "Parrainage" },
      { slug: "offres-flash", label: "Offres flash" },
    ],
  },
  {
    title: "Compte",
    links: [
      { slug: "notifications", label: "Notifications" },
      { slug: "export", label: "Export" },
      { slug: "equipe", label: "Équipe" },
      { slug: "parametres", label: "Paramètres" },
    ],
  },
];

export const pageMeta: Record<string, [string, string]> = {
  dashboard: ["Tableau de bord", "Vue d'ensemble de votre programme de fidélité"],
  clients: ["Clients", "Tous les clients de votre programme"],
  recompenses: ["Récompenses", "Créez et gérez les récompenses de votre programme"],
  carte: ["Carte de fidélité", "Personnalisez la carte digitale de votre commerce"],
  campagnes: ["Campagnes", "Créez et suivez vos campagnes de fidélisation"],
  resultats: ["Résultats", "La valeur générée par votre programme de fidélité"],
  relance: ["Relance des inactifs", "Faites revenir les clients qui décrochent"],
  anniversaires: ["Offres d'anniversaire", "Une attention automatique le jour J"],
  parrainage: ["Parrainage", "Vos clients recommandent, tout le monde gagne"],
  "offres-flash": ["Offres flash", "Des offres ponctuelles pour les heures creuses"],
  notifications: ["Notifications", "Historique des messages envoyés à vos clients"],
  export: ["Export", "Vos données, où vous en avez besoin"],
  equipe: ["Équipe", "Gérez les comptes de votre équipe"],
  parametres: ["Paramètres", "Compte, abonnement et équipe"],
};

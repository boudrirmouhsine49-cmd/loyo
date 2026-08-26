import type { LucideIcon } from "lucide-react";
import {
  LayoutDashboard,
  Users,
  Gift,
  CreditCard,
  Megaphone,
  BarChart3,
  BellRing,
  Cake,
  UserPlus,
  Zap,
  History,
  Download,
  Settings,
  UsersRound,
} from "lucide-react";

export type NavLink = {
  label: string;
  href: string;
  icon: LucideIcon;
};

export type NavGroup = {
  label: string;
  links: NavLink[];
};

// Structure de la sidebar : un groupe = une section (voir CLAUDE.md, section 4).
export const navGroups: NavGroup[] = [
  {
    label: "Quotidien",
    links: [
      { label: "Pilotage", href: "/dashboard", icon: LayoutDashboard },
      { label: "Clients", href: "/clients", icon: Users },
    ],
  },
  {
    label: "Fidélité",
    links: [
      { label: "Récompenses", href: "/recompenses", icon: Gift },
      { label: "Carte de fidélité", href: "/carte", icon: CreditCard },
      { label: "Campagnes", href: "/campagnes", icon: Megaphone },
      { label: "Résultats", href: "/resultats", icon: BarChart3 },
    ],
  },
  {
    label: "Automatisations",
    links: [
      { label: "Relance", href: "/relance", icon: BellRing },
      { label: "Anniversaires", href: "/anniversaires", icon: Cake },
      { label: "Parrainage", href: "/parrainage", icon: UserPlus },
      { label: "Offres flash", href: "/offres-flash", icon: Zap },
    ],
  },
  {
    label: "Compte",
    links: [
      { label: "Notifications", href: "/notifications", icon: History },
      { label: "Export", href: "/export", icon: Download },
      { label: "Paramètres", href: "/parametres", icon: Settings },
      { label: "Équipe", href: "/equipe", icon: UsersRound },
    ],
  },
];

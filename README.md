# Loyo — SaaS de carte de fidélité

Application Next.js (App Router) + TypeScript + Tailwind v4.
Thème clair/sombre, layout sidebar + topbar, dashboard complet (données de démo).

## Lancer en local
```
npm install
npm run dev
```
Puis ouvrir http://localhost:3000 (redirige vers /dashboard).

## Structure
- `app/` — pages et layouts (groupe `(app)` = écrans avec menu, `(auth)` = connexion)
- `components/ui` — briques réutilisables (Card, Button, Pill, Avatar…)
- `components/layout` — Sidebar, Topbar, thème
- `components/dashboard` — blocs du tableau de bord
- `lib/` — types, couleurs, navigation, helpers
- `data/mock.ts` — données de démonstration (à remplacer par Supabase plus tard)

Voir `CLAUDE.md` pour le contexte complet et la feuille de route.

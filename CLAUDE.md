# Loyo — Contexte projet (à lire par Claude Code)

> Ce fichier est le cerveau du projet. Claude Code le lit automatiquement à chaque session.
> **Toujours respecter les règles de la section « Conventions » avant d'écrire du code.**

---

## 1. Le produit

**Loyo** est un SaaS de **carte de fidélité digitale** pour les petits commerces (cafés, restos, boutiques).
Le commerçant gère ses clients, ses récompenses et ses campagnes ; le client ajoute sa carte dans son téléphone (Apple/Google Wallet, sans app à installer) et gagne des points à chaque visite via un scan de QR code.

Client-exemple utilisé dans les données de démo : **« Café du Coin »**, Luxembourg. Langue de l'interface : **français**.

---

## 2. Stack technique (ne pas dévier sans validation)

- **Next.js 15** (App Router) + **TypeScript**
- **Tailwind CSS v4**
- **Supabase** (Postgres + Auth + Storage) pour le back-end
- **Vercel** pour le déploiement
- Icônes : SVG inline (comme le prototype) ou `lucide-react`
- Polices : **Inter** (texte) + **IBM Plex Mono** (labels/chiffres) via `next/font/google`

---

## 3. Design system (extrait fidèlement du prototype — NE PAS inventer d'autres couleurs)

Toutes les couleurs passent par des **variables CSS** définies dans `app/globals.css`. Les composants n'utilisent JAMAIS de couleur en dur : ils utilisent `var(--nom)` ou les classes Tailwind mappées dessus.

### Thème clair (par défaut)
```
--bg-app:#FAFAFA  --bg-card:#FFFFFF  --bg-faint:#FAFAFA  --bg-subtle:#F0F0F0  --bg-hover:#E4E4E4
--border:#E4E4E4  --border-light:#EFEFEF
--text:#0A0A0A  --text-2:#454545  --text-3:#828282  --text-muted:#9E9E9E
--btn:#171717  --btn-text:#FFFFFF  --btn-hover:#000000
```

### Thème sombre
```
--bg-app:#131313  --bg-glass:rgba(19,19,19,0.85)
--bg-card:#1D1D1D  --bg-faint:#232323  --bg-subtle:#2B2B2B  --bg-hover:#343434
--border:#303030  --border-light:#292929
--text:#F2F2F2  --text-2:#C7C7C7  --text-3:#9B9B9B  --text-muted:#757575
--btn:#F2F2F2  --btn-text:#111111  --btn-hover:#FFFFFF
```

### Couleurs sémantiques (identiques dans les 2 thèmes)
```
Niveau Or:#B0894A   Argent:#93A0A8   Bronze:#B07446
Succès:#1E7A50 / fond #E7F4EC
Alerte:#D14343 / fond #FBEBEA
Info:#B0714A   / fond #F6ECE2
Spécial:#4C86C4 / fond #E8F0F9
Accent:#171717 / fond #F0F0F0
```

### Formes & espacements
- Rayons : cartes `15px`, inputs/boutons `10px`, petits boutons `8–9px`, pastilles (pills) `20px`, avatars ronds `50%`.
- Cartes : `background:var(--bg-card)`, `border:1px solid var(--border)`.
- Labels en majuscules discrètes : IBM Plex Mono, `10–11px`, `letter-spacing:.05em`, `text-transform:uppercase`, couleur `--text-muted`.
- Chiffres/stats : `font-variant-numeric:tabular-nums`.
- Toggle (interrupteur) : piste `44×26px` rayon `14px`, bouton `20px` qui glisse de `18px`, piste noire (`--btn`) quand actif.

---

## 4. Écrans (routes) à construire

Layout commun : **sidebar** (gauche) + **topbar** (haut) + zone de contenu. Sidebar repliable en drawer sur mobile.

| Route | Écran | Groupe sidebar |
|---|---|---|
| `/dashboard` | Pilotage (KPIs, graph visites, taux de retour, activité, relances, campagnes) | Quotidien |
| `/clients` | Liste clients + **fiche client** (panneau latéral) | Quotidien |
| `/recompenses` | Récompenses (CRUD + activer/désactiver) | Fidélité |
| `/carte` | Carte de fidélité (perso couleur/logo/récompense + aperçu téléphone) | Fidélité |
| `/campagnes` | Campagnes (liste + **modale nouvelle campagne**) | Fidélité |
| `/resultats` | Résultats (CA généré, tableau par campagne) | Fidélité |
| `/relance` | Relance auto des inactifs (config + file d'attente) | Automatisations |
| `/anniversaires` | Offre d'anniversaire auto | Automatisations |
| `/parrainage` | Parrainage auto | Automatisations |
| `/offres-flash` | Offres flash (heures creuses) | Automatisations |
| `/notifications` | Historique des envois (filtres) | Compte |
| `/export` | Export CSV/Excel des données | Compte |
| `/parametres` | Commerce, abonnement, équipe, RGPD | Compte |
| `/equipe` | Membres de l'équipe (rôles Gérant/Employé) | Compte |
| `/login`, `/signup` | Authentification | — |

**Overlays globaux** (dispo partout) : Scan QR (avec caméra), Fiche client, Nouvelle campagne, Ajouter récompense, Inviter membre, Contacter client, Relance perso, Toast de confirmation.

---

## 5. Modèle de données (tables Supabase)

```
merchants        id, name, address, phone, lang, logo_url, card_color, theme,
                 reward_pts, reward_name, plan, created_at
team_members     id, merchant_id→merchants, name, email, role('gerant'|'employe'),
                 active, auth_user_id
clients          id, merchant_id, name, email, phone, address, birthday,
                 tier('or'|'argent'|'bronze'), points, created_at
visits           id, client_id→clients, points, created_at
rewards          id, merchant_id, name, threshold, active
campaigns        id, merchant_id, name, description, audience, status, message,
                 sent_count, scheduled_at, created_at
flash_offers     id, merchant_id, kind, message, window_label, status
referrals        id, merchant_id, sponsor_id→clients, referred_id→clients,
                 pts_sponsor, pts_referred, created_at
notifications    id, merchant_id, type, title, description, created_at
automations      id, merchant_id, kind('relance'|'birthday'|'referral'|'flash'),
                 enabled, config(jsonb)
```

Règle métier centrale : un **scan** = créer une `visit` (+points) et incrémenter `clients.points`. Une récompense est atteinte quand `points >= reward.threshold`.

Sécurité : activer **Row Level Security (RLS)** sur toutes les tables ; chaque commerçant ne voit que les données de son `merchant_id`.

---

## 6. Architecture des fichiers (BEAUCOUP de petits fichiers, jamais de gros fichier fourre-tout)

```
loyo/
├─ app/
│  ├─ globals.css                # variables CSS des 2 thèmes + reset
│  ├─ layout.tsx                 # <html>, polices, ThemeProvider
│  ├─ (auth)/login/page.tsx
│  ├─ (auth)/signup/page.tsx
│  └─ (app)/                     # groupe protégé (nécessite login)
│     ├─ layout.tsx              # Sidebar + Topbar + <main>
│     ├─ dashboard/page.tsx
│     ├─ clients/page.tsx
│     ├─ recompenses/page.tsx
│     └─ ... (une page par route)
├─ components/
│  ├─ ui/                        # briques réutilisables
│  │  ├─ Card.tsx  Button.tsx  Toggle.tsx  Pill.tsx  Stat.tsx  Avatar.tsx  Modal.tsx  Toast.tsx
│  ├─ layout/  Sidebar.tsx  Topbar.tsx  ThemeToggle.tsx  NavItem.tsx
│  ├─ dashboard/  KpiCard.tsx  VisitsChart.tsx  ReturnDonut.tsx  ActivityFeed.tsx ...
│  ├─ clients/  ClientTable.tsx  ClientRow.tsx  ClientDrawer.tsx ...
│  └─ ... (un dossier par feature)
├─ lib/
│  ├─ supabase/client.ts         # client navigateur
│  ├─ supabase/server.ts         # client serveur
│  ├─ colors.ts                  # couleurs sémantiques (Or/Argent/succès…)
│  ├─ format.ts                  # formatage nombres FR, initiales, dates
│  └─ types.ts                   # types TypeScript de toutes les tables
├─ data/
│  └─ mock.ts                    # données de démo (Phase 1, avant Supabase)
├─ CLAUDE.md                     # ce fichier
└─ ... (config Next/Tailwind/etc.)
```

**Règle d'or : un composant = un fichier.** Si un fichier dépasse ~150 lignes, le découper.

---

## 7. Conventions (à respecter systématiquement)

1. **TypeScript strict.** Toujours typer les props (`type Props = {...}`) et les données. Types centralisés dans `lib/types.ts`.
2. **Petits fichiers, une responsabilité.** Pas de composant géant. Extraire dès que ça grossit.
3. **Server Components par défaut** ; ajouter `"use client"` seulement si le composant a de l'interactivité (state, onClick, hooks).
4. **Aucune couleur en dur** dans les composants : uniquement `var(--…)` ou `lib/colors.ts`.
5. **Données d'abord fictives** (`data/mock.ts`), on branche Supabase seulement à la Phase 2 → chaque écran doit marcher visuellement avant le back.
6. **Réutiliser les briques `components/ui/`** au lieu de recopier du style (un vrai `<Button>`, `<Card>`, `<Toggle>`…).
7. Textes de l'interface **en français**. Code, noms de variables et commentaires techniques **en anglais**.
8. **Expliquer simplement** ce qui est fait à chaque étape (le dev débute) et ne jamais casser ce qui marche déjà.
9. Commits **petits et fréquents**, un message clair par étape.

---

## 8. Feuille de route (construire dans cet ordre, une phase à la fois)

- **Phase 0 — Fondations** : projet créé, `globals.css` (2 thèmes), polices, layout (Sidebar + Topbar), ThemeToggle clair/sombre persistant, routing des 14 écrans (pages vides). ✅ Objectif : app qui tourne, thème qui bascule, navigation OK.
- **Phase 1 — UI statique** : chaque écran construit avec les données de `data/mock.ts`, fidèle au prototype. Overlays (scan, fiche client, modales).
- **Phase 2 — Supabase** : projet Supabase, schéma SQL des tables, seed de démo, RLS.
- **Phase 3 — Auth + lecture** : login/signup, sessions, chaque écran lit les vraies données du commerçant connecté.
- **Phase 4 — Actions** : scan → visite + points, CRUD clients/récompenses/campagnes, toggles d'automatisation persistés.
- **Phase 5 — Automatisations & wallet** : relance/anniversaire/parrainage, cartes Apple/Google Wallet, envois email.
- **Phase 6 — Déploiement** : Vercel + variables d'env + tests.

> Ne commence une phase que si la précédente tourne. À chaque fin de phase, faire un récap de ce qui marche.

-- BRIQUE 1 — socle : commerces, équipe, clients. Multi-tenant via RLS
-- (chaque commerce ne voit jamais les données d'un autre).

create table commerces (
  id uuid primary key default gen_random_uuid(),
  nom text not null,
  mode_points text not null default 'visite'
    check (mode_points in ('visite', 'montant')),
  points_par_visite integer not null default 10
    check (points_par_visite >= 0),
  points_par_euro numeric not null default 1
    check (points_par_euro >= 0),
  arrondi_montant text not null default 'floor'
    check (arrondi_montant in ('floor', 'round', 'ceil')),
  delai_min_entre_gains integer not null default 60
    check (delai_min_entre_gains >= 0), -- minutes
  seuil_niveau_argent integer not null default 500
    check (seuil_niveau_argent >= 0),
  seuil_niveau_or integer not null default 1500
    check (seuil_niveau_or >= seuil_niveau_argent),
  created_at timestamptz not null default now()
);

create table team_members (
  id uuid primary key default gen_random_uuid(),
  commerce_id uuid not null references commerces(id) on delete cascade,
  auth_user_id uuid unique references auth.users(id) on delete cascade,
  nom text not null,
  email text not null,
  role text not null check (role in ('gerant', 'employe')),
  actif boolean not null default true,
  created_at timestamptz not null default now()
);
create index team_members_commerce_id_idx on team_members(commerce_id);
create index team_members_auth_user_id_idx on team_members(auth_user_id);

create table clients (
  id uuid primary key default gen_random_uuid(),
  commerce_id uuid not null references commerces(id) on delete cascade,
  code_carte text not null,
  nom text,
  email text,
  telephone text,
  points_depensables integer not null default 0,
  points_statut integer not null default 0,
  niveau text not null default 'bronze'
    check (niveau in ('bronze', 'argent', 'or')),
  date_derniere_visite timestamptz,
  created_at timestamptz not null default now(),
  unique (commerce_id, code_carte)
);
create index clients_commerce_id_idx on clients(commerce_id);

-- Commerce de l'utilisateur connecté (via sa ligne team_members active).
-- security definer : contourne la RLS de team_members pour cette seule
-- lecture ciblée, afin d'éviter une dépendance circulaire dans les
-- policies (une policy sur team_members ne peut pas s'appuyer sur une
-- lecture de team_members elle-même soumise à la RLS).
create function auth_commerce_id() returns uuid
language sql stable security definer set search_path = public as $$
  select commerce_id from team_members
  where auth_user_id = auth.uid() and actif
  limit 1
$$;

create function auth_role() returns text
language sql stable security definer set search_path = public as $$
  select role from team_members
  where auth_user_id = auth.uid() and actif
  limit 1
$$;

alter table commerces enable row level security;
alter table team_members enable row level security;
alter table clients enable row level security;

create policy "commerce visible par son équipe" on commerces
  for select using (id = auth_commerce_id());

create policy "équipe visible par son propre commerce" on team_members
  for select using (commerce_id = auth_commerce_id());

create policy "clients visibles par leur commerce" on clients
  for select using (commerce_id = auth_commerce_id());

create policy "clients créés dans son propre commerce" on clients
  for insert with check (commerce_id = auth_commerce_id());

-- Volontairement PAS de policy "update" pour les rôles applicatifs :
-- points_depensables / points_statut ne doivent JAMAIS être modifiables
-- directement (même par un membre de l'équipe), uniquement recalculés
-- par le Model depuis le ledger (via la clé service_role, qui contourne
-- la RLS). Voir migration Brique 2 pour le même principe sur `transactions`.

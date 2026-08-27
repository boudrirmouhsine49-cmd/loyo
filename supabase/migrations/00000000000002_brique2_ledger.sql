-- BRIQUE 2 — le ledger : récompenses + transactions (le journal immuable
-- des points). Les soldes (clients.points_depensables/points_statut) ne
-- sont JAMAIS mis à jour directement : seul le Model (via service_role,
-- qui contourne la RLS) les recalcule après avoir écrit une ligne ici.

create table rewards (
  id uuid primary key default gen_random_uuid(),
  commerce_id uuid not null references commerces(id) on delete cascade,
  nom text not null,
  cout_points integer not null check (cout_points > 0),
  limite_par_client integer not null default 0 check (limite_par_client >= 0), -- 0 = illimité
  actif boolean not null default true,
  created_at timestamptz not null default now()
);
create index rewards_commerce_id_idx on rewards(commerce_id);

create table transactions (
  id uuid primary key default gen_random_uuid(),
  commerce_id uuid not null references commerces(id) on delete cascade,
  client_id uuid not null references clients(id) on delete cascade,
  type text not null check (type in ('gain', 'echange', 'ajustement')),
  points integer not null, -- delta sur points_depensables (+ ou -)
  points_statut_delta integer not null default 0, -- delta sur points_statut (jamais négatif en pratique)
  recompense_id uuid references rewards(id),
  motif text,
  utilisateur_id uuid references team_members(id),
  created_at timestamptz not null default now(),
  -- Un ajustement doit toujours porter un motif ; un gain/échange n'en a pas besoin.
  constraint motif_obligatoire_pour_ajustement
    check (type <> 'ajustement' or motif is not null)
);
create index transactions_commerce_id_idx on transactions(commerce_id);
create index transactions_client_id_created_at_idx on transactions(client_id, created_at desc);

alter table rewards enable row level security;
alter table transactions enable row level security;

create policy "récompenses visibles par leur commerce" on rewards
  for select using (commerce_id = auth_commerce_id());

create policy "historique visible par son commerce" on transactions
  for select using (commerce_id = auth_commerce_id());

-- Volontairement AUCUNE policy insert/update/delete sur `transactions`
-- pour les rôles applicatifs (authenticated) : le ledger n'est écrit que
-- par le Model via la clé service_role, après vérification des règles
-- métier (garde-fou anti-double-scan, solde suffisant, rôle gérant pour
-- un ajustement...). C'est ce qui rend le ledger réellement immuable,
-- pas seulement "par convention".

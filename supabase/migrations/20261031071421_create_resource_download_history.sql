create table if not exists public.resource_downloads (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  resource_id uuid references public.academic_resources(id) on delete set null,
  title_snapshot text not null,
  storage_path_snapshot text not null,
  downloaded_at timestamptz not null default now()
);

create index if not exists idx_resource_downloads_user_date
  on public.resource_downloads(user_id, downloaded_at desc);
create index if not exists idx_resource_downloads_resource
  on public.resource_downloads(resource_id);

alter table public.resource_downloads enable row level security;

drop policy if exists "Users read own resource downloads" on public.resource_downloads;
create policy "Users read own resource downloads" on public.resource_downloads
for select to authenticated
using (user_id = (select auth.uid()));

drop policy if exists "Users log own authorized resource downloads" on public.resource_downloads;
create policy "Users log own authorized resource downloads" on public.resource_downloads
for insert to authenticated
with check (
  user_id = (select auth.uid())
  and exists (
    select 1 from public.academic_resources r
    where r.id = resource_id
      and r.storage_path = storage_path_snapshot
      and r.publication_status = 'published'
      and r.verification_status = 'verified'
      and r.rights_status = any (array['public_domain','authorized','licensed'])
  )
);

grant select, insert on public.resource_downloads to authenticated;
revoke update, delete on public.resource_downloads from anon, authenticated;


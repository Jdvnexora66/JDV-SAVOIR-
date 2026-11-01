-- Restrict Storage mutations to the intended staff roles.
-- Educational document access remains private except verified, rights-cleared published resources.
drop policy if exists "staff delete educational documents" on storage.objects;
drop policy if exists "staff read educational documents" on storage.objects;
drop policy if exists "staff update educational documents" on storage.objects;
drop policy if exists "staff upload educational documents" on storage.objects;
create policy "staff delete educational documents" on storage.objects for delete to authenticated using (bucket_id='jdv-educational-documents' and exists (select 1 from public.admin_roles ar where ar.user_id=(select auth.uid()) and ar.role in ('super_admin','admin','pedagogical_manager','moderator')));
create policy "staff read educational documents" on storage.objects for select to authenticated using (bucket_id='jdv-educational-documents' and exists (select 1 from public.admin_roles ar where ar.user_id=(select auth.uid()) and ar.role in ('super_admin','admin','pedagogical_manager','teacher','moderator')));
create policy "staff update educational documents" on storage.objects for update to authenticated using (bucket_id='jdv-educational-documents' and exists (select 1 from public.admin_roles ar where ar.user_id=(select auth.uid()) and ar.role in ('super_admin','admin','pedagogical_manager','moderator'))) with check (bucket_id='jdv-educational-documents' and exists (select 1 from public.admin_roles ar where ar.user_id=(select auth.uid()) and ar.role in ('super_admin','admin','pedagogical_manager','moderator')));
create policy "staff upload educational documents" on storage.objects for insert to authenticated with check (bucket_id='jdv-educational-documents' and exists (select 1 from public.admin_roles ar where ar.user_id=(select auth.uid()) and ar.role in ('super_admin','admin','pedagogical_manager','teacher','moderator')));
drop policy if exists "staff delete public assets" on storage.objects;
drop policy if exists "staff update public assets" on storage.objects;
drop policy if exists "staff upload public assets" on storage.objects;
create policy "staff delete public assets" on storage.objects for delete to authenticated using (bucket_id='jdv-public-assets' and exists (select 1 from public.admin_roles ar where ar.user_id=(select auth.uid()) and ar.role in ('super_admin','admin')));
create policy "staff update public assets" on storage.objects for update to authenticated using (bucket_id='jdv-public-assets' and exists (select 1 from public.admin_roles ar where ar.user_id=(select auth.uid()) and ar.role in ('super_admin','admin'))) with check (bucket_id='jdv-public-assets' and exists (select 1 from public.admin_roles ar where ar.user_id=(select auth.uid()) and ar.role in ('super_admin','admin')));
create policy "staff upload public assets" on storage.objects for insert to authenticated with check (bucket_id='jdv-public-assets' and exists (select 1 from public.admin_roles ar where ar.user_id=(select auth.uid()) and ar.role in ('super_admin','admin')));

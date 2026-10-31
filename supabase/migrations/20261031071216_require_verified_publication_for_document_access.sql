drop policy if exists "academic resources published read" on public.academic_resources;
create policy "academic resources published read" on public.academic_resources
for select to anon, authenticated
using (
 publication_status = 'published'
 and verification_status = 'verified'
 and rights_status = any (array['public_domain','authorized','licensed','link_only'])
);

drop policy if exists "published verified educational documents read" on storage.objects;
create policy "published verified educational documents read" on storage.objects
for select to anon, authenticated
using (
 bucket_id = 'jdv-educational-documents'
 and exists (
   select 1 from public.academic_resources r
   where r.storage_path = objects.name
     and r.publication_status = 'published'
     and r.verification_status = 'verified'
     and r.rights_status = any (array['public_domain','authorized','licensed'])
 )
);


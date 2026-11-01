-- Prevent placeholder catalog entries without files or verified rights from appearing as published resources.
update public.academic_resources
set publication_status = 'draft',
    verification_status = 'pending',
    rights_status = 'unverified'
where storage_path is null
   or btrim(storage_path) = ''
   or rights_status not in ('public_domain', 'authorized', 'licensed');

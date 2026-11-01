-- Backfill the course domain from its linked education program.
-- Safe to rerun: only fills missing domain links and never overwrites an existing value.
UPDATE public.courses AS c
SET education_domain_id = p.domain_id
FROM public.education_programs AS p
WHERE c.education_program_id = p.id
  AND c.education_domain_id IS NULL
  AND p.domain_id IS NOT NULL;

-- Link resources to a registered source when their source URL host matches
-- a registered source base URL host. Keep unmatched URLs intact for review.
-- Safe to rerun: only fills missing source_id values.
UPDATE public.academic_resources AS r
SET source_id = s.id
FROM public.resource_sources AS s
WHERE r.source_id IS NULL
  AND r.source_url IS NOT NULL
  AND lower(regexp_replace(split_part(regexp_replace(r.source_url, '^https?://([^/]+).*$', '\\1'), ':', 1), '^www\\.', ''))
      = lower(regexp_replace(split_part(regexp_replace(s.base_url, '^https?://([^/]+).*$', '\\1'), ':', 1), '^www\\.', ''));

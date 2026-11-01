-- Register authoritative source portals and complete deterministic catalog domain links.
-- Idempotent: only inserts missing source records and fills NULL foreign keys.

INSERT INTO public.resource_sources
  (name, scope, base_url, is_active, source_type, trust_level, rights_policy, notes, checked_at)
SELECT v.name, v.scope, v.base_url, v.is_active, v.source_type, v.trust_level,
       v.rights_policy, v.notes, now()
FROM (VALUES
  ('Conseil National de l’Éducation — portail de publications',
   'Références et publications relatives à l’éducation nationale au Bénin',
   'https://cne.globalitnet.bj/', true, 'institutional_catalogue', 'institutional', 'link_only',
   'Source institutionnelle identifiée par le domaine et la page de publications; vérifier la disponibilité et la version de chaque texte avant republication.'),
  ('Portail national des textes juridiques — Justice Bénin',
   'Textes juridiques officiels, dont les lois-cadres relatives à l’éducation et à la formation',
   'https://textes.justice.bj/', true, 'official_portal', 'official', 'link_only',
   'Référence vers le texte juridique officiel; conserver le lien et les métadonnées, ne pas héberger de copie sans validation des droits.'),
  ('Ministère de l’Enseignement supérieur et de la Recherche scientifique — Bénin',
   'Documents et textes institutionnels de l’enseignement supérieur',
   'https://enseignementsuperieur.gouv.bj/', true, 'government_ministry', 'official', 'link_only',
   'Portail ministériel; vérifier l’authenticité, la date et les conditions de réutilisation de chaque document.')
) AS v(name, scope, base_url, is_active, source_type, trust_level, rights_policy, notes)
WHERE NOT EXISTS (
  SELECT 1 FROM public.resource_sources s WHERE s.base_url = v.base_url
);

-- Link resources to registered sources by normalized hostname; preserve unmatched URLs.
UPDATE public.academic_resources r
SET source_id = s.id
FROM public.resource_sources s
WHERE r.source_id IS NULL
  AND r.source_url IS NOT NULL
  AND regexp_replace(lower(split_part(split_part(r.source_url, '://', 2), '/', 1)), '^www\\.', '', 'i')
      = regexp_replace(lower(split_part(split_part(s.base_url, '://', 2), '/', 1)), '^www\\.', '', 'i');

-- Derive domain only from the linked school-level stage; do not guess specific programs.
UPDATE public.courses c
SET education_domain_id = d.id,
    updated_at = now()
FROM public.school_levels l
JOIN public.education_domains d
  ON d.code = CASE
    WHEN l.stage = 'primary' THEN 'primary'
    WHEN l.stage = 'secondary' THEN 'secondary_general'
  END
WHERE c.level_id = l.id
  AND c.education_domain_id IS NULL
  AND l.stage IN ('primary', 'secondary');

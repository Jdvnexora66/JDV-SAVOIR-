-- Create unpublished inventory placeholders for CEP normal sessions (2012–2025).
-- These are drafts only; no exam papers or source claims are fabricated.
INSERT INTO public.exam_sessions
  (exam_id, exam_year, session_name, series, status, source_name, source_url, verified_at)
SELECT e.id, y.exam_year, 'Session normale', NULL, 'draft',
       NULL, NULL, NULL
FROM public.exams e
CROSS JOIN generate_series(2012, 2025) AS y(exam_year)
WHERE e.code = 'CEP'
  AND NOT EXISTS (
    SELECT 1 FROM public.exam_sessions s
    WHERE s.exam_id = e.id
      AND s.exam_year = y.exam_year
      AND s.session_name = 'Session normale'
      AND s.series IS NULL
  );

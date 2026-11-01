-- Remove legacy broad staff policies that could OR-bypass scoped role policies.
drop policy if exists "staff insert courses" on public.courses;
drop policy if exists "staff update courses" on public.courses;
drop policy if exists "staff delete courses" on public.courses;
drop policy if exists "staff insert lessons" on public.lessons;
drop policy if exists "staff update lessons" on public.lessons;
drop policy if exists "staff delete lessons" on public.lessons;
drop policy if exists "staff insert exam sessions" on public.exam_sessions;
drop policy if exists "staff update exam sessions" on public.exam_sessions;
drop policy if exists "staff delete exam sessions" on public.exam_sessions;
drop policy if exists "staff insert exam documents" on public.exam_documents;
drop policy if exists "staff update exam documents" on public.exam_documents;
drop policy if exists "staff delete exam documents" on public.exam_documents;

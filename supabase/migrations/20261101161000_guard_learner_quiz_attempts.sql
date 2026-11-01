-- Keep learner-submitted quiz attempts limited to published exercises and prevent client-forged scores.
create or replace function public.guard_learner_quiz_attempt()
returns trigger
language plpgsql
security invoker
set search_path = ''
as $$
begin
  if auth.uid() is null or new.user_id <> auth.uid() then
    raise exception 'AUTHENTICATION_REQUIRED' using errcode = '28000';
  end if;
  if not exists (
    select 1
    from public.exercises e
    join public.lessons l on l.id = e.lesson_id
    join public.courses c on c.id = l.course_id
    where e.id = new.exercise_id
      and e.status = 'published'
      and l.status = 'published'
      and c.status = 'published'
  ) then
    raise exception 'EXERCISE_NOT_AVAILABLE' using errcode = 'P0001';
  end if;
  new.score := null;
  return new;
end;
$$;

drop trigger if exists guard_learner_quiz_attempt on public.quiz_attempts;
create trigger guard_learner_quiz_attempt
before insert on public.quiz_attempts
for each row execute function public.guard_learner_quiz_attempt();

drop policy if exists "users create own quiz attempts" on public.quiz_attempts;
create policy "users create own published quiz attempts"
on public.quiz_attempts
for insert to authenticated
with check (
  user_id = (select auth.uid())
  and exists (
    select 1
    from public.exercises e
    join public.lessons l on l.id = e.lesson_id
    join public.courses c on c.id = l.course_id
    where e.id = quiz_attempts.exercise_id
      and e.status = 'published'
      and l.status = 'published'
      and c.status = 'published'
  )
);

revoke all on function public.guard_learner_quiz_attempt() from public, anon, authenticated;

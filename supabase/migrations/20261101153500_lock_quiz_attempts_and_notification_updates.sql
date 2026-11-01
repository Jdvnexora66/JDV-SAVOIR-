-- Keep quiz attempts immutable after submission; allow users to mark only their own notifications as read.
drop policy if exists "users update own quiz attempts" on public.quiz_attempts;
revoke update on table public.quiz_attempts from authenticated;
revoke update on table public.notifications from authenticated;
grant update (read_at) on table public.notifications to authenticated;
drop policy if exists "users update own notifications" on public.notifications;
create policy "users mark own notifications read" on public.notifications for update to authenticated using (user_id=(select auth.uid())) with check (user_id=(select auth.uid()));
alter table public.learning_progress drop constraint if exists learning_progress_progress_percent_range;
alter table public.learning_progress add constraint learning_progress_progress_percent_range check (progress_percent >= 0 and progress_percent <= 100);

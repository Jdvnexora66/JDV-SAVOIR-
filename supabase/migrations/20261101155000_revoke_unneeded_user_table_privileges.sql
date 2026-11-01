-- Remove destructive/unused table privileges from end-user roles.
revoke delete, truncate, references, trigger on table public.quiz_attempts from authenticated;
revoke delete, truncate, references, trigger on table public.profiles from authenticated;
revoke insert, delete, truncate, references, trigger on table public.notifications from authenticated;
revoke delete, truncate, references, trigger on table public.learning_progress from authenticated;

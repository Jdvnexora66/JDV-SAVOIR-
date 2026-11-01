-- Purchases are created only through the guarded SECURITY DEFINER RPC.
-- Clients may read their own rows through the existing owner-select RLS policy.
revoke all on table public.document_purchases from anon;
revoke insert, update, delete, truncate, references, trigger on table public.document_purchases from authenticated;
grant select on table public.document_purchases to authenticated;

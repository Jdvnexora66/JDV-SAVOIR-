drop policy if exists "Admins manage bookstore orders" on public.bookstore_orders;
create policy "Admins manage bookstore orders" on public.bookstore_orders
for all to authenticated
using (exists (select 1 from public.admin_roles ar where ar.user_id = (select auth.uid()) and ar.role = any (array['super_admin','admin','commercial_manager'])))
with check (exists (select 1 from public.admin_roles ar where ar.user_id = (select auth.uid()) and ar.role = any (array['super_admin','admin','commercial_manager'])));

drop policy if exists "Users create own pending bookstore orders" on public.bookstore_orders;
create policy "Users create own pending bookstore orders" on public.bookstore_orders
for insert to authenticated
with check (user_id = (select auth.uid()) and status = 'pending' and paid_at is null);

drop policy if exists "Users view own bookstore orders" on public.bookstore_orders;
create policy "Users view own bookstore orders" on public.bookstore_orders
for select to authenticated
using (user_id = (select auth.uid()));

drop policy if exists "Catalog managers manage products" on public.bookstore_products;
create policy "Catalog managers manage products" on public.bookstore_products
for all to authenticated
using (exists (select 1 from public.admin_roles ar where ar.user_id = (select auth.uid()) and ar.role = any (array['super_admin','admin','commercial_manager','pedagogical_manager'])))
with check (exists (select 1 from public.admin_roles ar where ar.user_id = (select auth.uid()) and ar.role = any (array['super_admin','admin','commercial_manager','pedagogical_manager'])));

drop policy if exists "Users add items to own pending orders" on public.bookstore_order_items;
create policy "Users add items to own pending orders" on public.bookstore_order_items
for insert to authenticated
with check (
 exists (select 1 from public.bookstore_orders o where o.id = order_id and o.user_id = (select auth.uid()) and o.status = 'pending')
 and exists (select 1 from public.bookstore_products p where p.id = product_id and p.availability_status = 'available' and p.verification_status = 'verified')
);

drop policy if exists "Users view own bookstore order items" on public.bookstore_order_items;
create policy "Users view own bookstore order items" on public.bookstore_order_items
for select to authenticated
using (exists (select 1 from public.bookstore_orders o where o.id = order_id and o.user_id = (select auth.uid())));

drop policy if exists "Admins manage library entitlements" on public.library_entitlements;
create policy "Admins manage library entitlements" on public.library_entitlements
for all to authenticated
using (exists (select 1 from public.admin_roles ar where ar.user_id = (select auth.uid()) and ar.role = any (array['super_admin','admin','commercial_manager'])))
with check (exists (select 1 from public.admin_roles ar where ar.user_id = (select auth.uid()) and ar.role = any (array['super_admin','admin','commercial_manager'])));

drop policy if exists "Users view own library entitlements" on public.library_entitlements;
create policy "Users view own library entitlements" on public.library_entitlements
for select to authenticated
using (user_id = (select auth.uid()));


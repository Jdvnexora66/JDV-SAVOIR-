create index if not exists idx_bookstore_order_items_order_fk on public.bookstore_order_items(order_id);
create index if not exists idx_bookstore_order_items_product_fk on public.bookstore_order_items(product_id);
create index if not exists idx_bookstore_orders_user_fk on public.bookstore_orders(user_id);
create index if not exists idx_lesson_resources_resource_fk on public.lesson_resources(resource_id);
create index if not exists idx_library_entitlements_order_item_fk on public.library_entitlements(order_item_id);
create index if not exists idx_library_entitlements_product_fk on public.library_entitlements(product_id);

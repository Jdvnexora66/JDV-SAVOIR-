-- Harden the authenticated document-purchase RPC.
-- It intentionally runs as SECURITY DEFINER to create a purchase row while
-- keeping direct INSERT privileges on document_purchases restricted.
-- All referenced relations/functions are schema-qualified in the function body.
ALTER FUNCTION public.create_document_purchase(uuid, uuid)
  SET search_path = '';

REVOKE EXECUTE ON FUNCTION public.create_document_purchase(uuid, uuid)
  FROM PUBLIC, anon;

GRANT EXECUTE ON FUNCTION public.create_document_purchase(uuid, uuid)
  TO authenticated, service_role;

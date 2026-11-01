-- Grant the configured first administrator only after this exact email is verified.
-- Safe to run before the account exists: the trigger handles signup/confirmation later.
CREATE OR REPLACE FUNCTION public.bootstrap_verified_super_admin()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  IF lower(coalesce(NEW.email, '')) = 'romarica15@gmail.com'
     AND NEW.email_confirmed_at IS NOT NULL THEN
    INSERT INTO public.admin_roles (user_id, role)
    VALUES (NEW.id, 'super_admin')
    ON CONFLICT (user_id)
    DO UPDATE SET role = 'super_admin';
  END IF;
  RETURN NEW;
END;
$$;

REVOKE ALL ON FUNCTION public.bootstrap_verified_super_admin() FROM PUBLIC, anon, authenticated;

DROP TRIGGER IF EXISTS bootstrap_verified_super_admin_on_auth_user
ON auth.users;

CREATE TRIGGER bootstrap_verified_super_admin_on_auth_user
AFTER INSERT OR UPDATE OF email, email_confirmed_at
ON auth.users
FOR EACH ROW
EXECUTE FUNCTION public.bootstrap_verified_super_admin();

import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

// Netlify build variables are preferred. Public fallback values keep the deployed
// learner auth screens connected if the build context omits Vite env injection.
const url = import.meta.env.VITE_SUPABASE_URL || 'https://veqmwnobwteqyiottrmw.supabase.co';
const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_-jcPEXBUZFAmf9Vvzalc9w_ME3uX44i';

// This is the public publishable/anon key only. Never put service_role/secret keys in browser builds.
export const supabase = url && key ? createClient<Database>(url, key) : null;

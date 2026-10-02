import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let _browser: SupabaseClient | null = null;

export function getSupabaseBrowser(): SupabaseClient {
  if (_browser) return _browser;
  _browser = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  return _browser;
}

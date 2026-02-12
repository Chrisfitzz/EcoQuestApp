import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://neynsjohdechnkjlureu.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_RqFtBgd0dVTNJPp8G3cjDw_G-_YQcwy";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
// Supabase Client, API.etc - Gav

import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

export const SUPABASE_URL = "https://rjpizlfrpostnfunkxhb.supabase.co";
export const SUPABASE_KEY = "sb_publishable_YAYIWDygOJh_rrOh6C1dqg_Qa9j_bgl";

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
window.supabaseClient = supabase;
console.log("Supabase module client initialized.");

// Supabase Configuration
// Replace these with your actual Supabase URL and Anon Key
const SUPABASE_URL = 'https://rjpizlfrpostnfunkxhb.supabase.co';
const SUPABASE_KEY = 'sb_publishable_YAYIWDygOJh_rrOh6C1dqg_Qa9j_bgl';

// Initialize the Supabase client safely
window.supabaseClient = null;

try {
    if (SUPABASE_URL !== 'YOUR_SUPABASE_URL') {
        window.supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
        console.log("Supabase client initialized.");
    } else {
        console.warn("Supabase credentials not set! Please update supabase_config.js");
    }
} catch (e) {
    console.error("Supabase Initialization Error:", e);
}

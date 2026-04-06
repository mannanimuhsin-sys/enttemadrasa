// Supabase Configuration
// Replace these with your actual Supabase URL and Anon Key
const SUPABASE_URL = 'YOUR_SUPABASE_URL';
const SUPABASE_KEY = 'YOUR_SUPABASE_ANON_KEY';

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

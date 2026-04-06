// Supabase Configuration
// Replace these with your actual Supabase URL and Anon Key
const SUPABASE_URL = 'YOUR_SUPABASE_URL';
const SUPABASE_KEY = 'YOUR_SUPABASE_ANON_KEY';

// Initialize the Supabase client
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

console.log("Supabase client initialized.");

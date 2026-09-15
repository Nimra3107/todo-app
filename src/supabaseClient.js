import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || "https://fzggyzywqgzkoxefbmmk.supabase.co";
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ6Z2d5enl3cWd6a294ZWZibW1rIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODkxMjQyNzEsImV4cCI6MjEwNDcwMDI3MX0.nwszWzX0FIMJKkWyD0ImMk2hhgfFa5ZwV7Nv0svVXo0";

export const supabase = createClient(supabaseUrl, supabaseKey);
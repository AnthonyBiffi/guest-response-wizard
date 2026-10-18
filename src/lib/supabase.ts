import { createClient } from "@supabase/supabase-js";

export type DatabaseGuest = {
  id: string;
  name: string;
  gift: string;
  confirmed: boolean;
  created_at?: string;
};

const supabaseUrl = import.meta.env["VITE_SUPABASE_URL"] as string | undefined;
const supabaseAnonKey = import.meta.env["VITE_SUPABASE_ANON_KEY"] as string | undefined;

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
  supabaseAnonKey &&
  supabaseUrl !== "https://your-project.supabase.co" &&
  !supabaseUrl.includes("your-project")
);

export const supabase =
  isSupabaseConfigured && supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

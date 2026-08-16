import { createClient } from "@supabase/supabase-js";

const envUrl = (process.env.NEXT_PUBLIC_SUPABASE_URL || "").trim();
const envKey = (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "").trim();

function formatSupabaseUrl(urlStr) {
  if (!urlStr) return "https://demo.supabase.co";
  let formatted = urlStr;
  if (!formatted.startsWith("http://") && !formatted.startsWith("https://")) {
    if (formatted.includes(".supabase.co")) {
      formatted = `https://${formatted}`;
    } else if (!formatted.startsWith("sb_") && /^[a-zA-Z0-9_-]+$/.test(formatted)) {
      formatted = `https://${formatted}.supabase.co`;
    } else {
      return "https://demo.supabase.co";
    }
  }
  try {
    new URL(formatted);
    return formatted;
  } catch {
    return "https://demo.supabase.co";
  }
}

export const supabaseUrl = formatSupabaseUrl(envUrl);
export const supabaseAnonKey = envKey || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.dummykey";

export const isSupabaseConfigured = Boolean(
  envUrl &&
  envKey &&
  supabaseUrl !== "https://demo.supabase.co" &&
  !supabaseUrl.includes("xyzcompany")
);

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true
  }
});



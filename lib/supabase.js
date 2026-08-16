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

/**
 * Uploads a raw File object directly to Supabase Storage bucket.
 * Tries buckets ('products', 'product-images', 'images') and returns public URL string.
 */
export async function uploadToSupabaseStorage(file) {
  if (!isSupabaseConfigured || !file) return null;
  try {
    const fileExt = file.name ? file.name.split('.').pop() : 'jpg';
    const fileName = `prod_${Date.now()}_${Math.random().toString(36).substring(2, 7)}.${fileExt}`;
    
    const bucketsToTry = ['products', 'product-images', 'images'];
    
    for (const bucket of bucketsToTry) {
      const { data, error } = await supabase.storage
        .from(bucket)
        .upload(fileName, file, { cacheControl: '3600', upsert: true });

      if (!error && data) {
        const { data: pubUrlObj } = supabase.storage.from(bucket).getPublicUrl(fileName);
        if (pubUrlObj?.publicUrl) {
          return pubUrlObj.publicUrl;
        }
      }
    }
  } catch (err) {
    console.warn("Supabase storage upload fallback:", err);
  }
  return null;
}




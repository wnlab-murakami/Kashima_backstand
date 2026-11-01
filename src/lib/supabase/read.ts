import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let cached: SupabaseClient | null | undefined;

/**
 * 読み取り専用（anonキー）のSupabaseクライアント。
 * 環境変数が設定されていない場合は null を返す（例外を投げない）。
 * 呼び出し側（src/lib/placements.ts）は null を「配置機能が無効」として扱い、
 * サイトの他の部分は従来通り表示できるようにする。
 */
export function getReadClient(): SupabaseClient | null {
  if (cached !== undefined) return cached;

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY;

  if (!url || !key) {
    console.warn(
      "[supabase] SUPABASE_URL / SUPABASE_ANON_KEY が設定されていないため、配置情報の表示は無効になります。"
    );
    cached = null;
    return cached;
  }

  cached = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return cached;
}

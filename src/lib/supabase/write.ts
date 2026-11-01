import "server-only"; // クライアントコンポーネントから誤ってimportされたらビルドエラーにする
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let cached: SupabaseClient | undefined;

/**
 * 書き込み用（service roleキー）のSupabaseクライアント。
 * RLSをバイパスするため、サーバー側（Server Action）以外からは絶対に呼ばないこと。
 * 環境変数が無い場合は例外を投げる（呼び出し元のServer Actionでユーザー向けメッセージに変換する）。
 */
export function getWriteClient(): SupabaseClient {
  if (cached) return cached;

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error(
      "SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY が設定されていません。配置の保存はできません。"
    );
  }

  cached = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return cached;
}

/**
 * サーバーはUTCで動くことがあるため、日付の計算は必ずこのファイルの関数経由で
 * 日本時間（Asia/Tokyo）に揃える。`new Date().toISOString()` 系を直接使うと、
 * 深夜0時〜9時のあいだ日付が1日ずれるので使わないこと。
 */

const TOKYO_TIME_ZONE = "Asia/Tokyo";

/** 日本時間の「今日」を YYYY-MM-DD で返す */
export function todayInTokyo(now: Date = new Date()): string {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: TOKYO_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(now);

  const get = (type: string) =>
    parts.find((p) => p.type === type)?.value ?? "";

  return `${get("year")}-${get("month")}-${get("day")}`;
}

const ISO_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

export function isIsoDate(value: unknown): value is string {
  return typeof value === "string" && ISO_DATE_PATTERN.test(value);
}

/** "2026-11-01" -> "2026年11月1日（日）" */
export function formatJaDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  // 正午UTCにしておくことで、どのタイムゾーンで解釈されても日付がずれない
  const dt = new Date(Date.UTC(y, m - 1, d, 12));
  return new Intl.DateTimeFormat("ja-JP", {
    timeZone: TOKYO_TIME_ZONE,
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "short",
  }).format(dt);
}

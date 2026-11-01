"use server";

import { revalidatePath } from "next/cache";
import { savePlacement, type Assignments } from "@/lib/placements";
import { isPositionId } from "@/lib/positions";
import { isIsoDate } from "@/lib/date";

export type SavePayload = {
  date: string;
  assignments: Record<string, string[]>;
};

export type SaveResult =
  | { ok: true; savedAt: number }
  | { ok: false; message: string };

const MAX_NAME_LENGTH = 40;
const MAX_NAMES_PER_POSITION = 30;

/**
 * 配置を保存するServer Action。
 * Server Actionは実質的に公開エンドポイントなので、クライアント側の検証を信用せず
 * ここでも入力を再検証する。
 */
export async function savePlacementAction(
  _prev: SaveResult | null,
  payload: SavePayload
): Promise<SaveResult> {
  if (!isIsoDate(payload?.date)) {
    return { ok: false, message: "日付の形式が正しくありません。" };
  }

  const clean: Assignments = {};
  for (const [key, value] of Object.entries(payload.assignments ?? {})) {
    if (!isPositionId(key) || !Array.isArray(value)) continue;
    const names = value
      .map((n) => String(n).trim().slice(0, MAX_NAME_LENGTH))
      .filter(Boolean)
      .slice(0, MAX_NAMES_PER_POSITION);
    if (names.length > 0) clean[key] = names;
  }

  try {
    await savePlacement(payload.date, clean);
  } catch (err) {
    // 生のエラーはURLや鍵の断片を含む可能性があるため、そのまま返さない。
    console.error("[placement] 保存に失敗しました:", err);
    return {
      ok: false,
      message: "保存に失敗しました。通信環境を確認して、もう一度お試しください。",
    };
  }

  revalidatePath("/");
  revalidatePath("/leader-manual/placement");
  return { ok: true, savedAt: Date.now() };
}

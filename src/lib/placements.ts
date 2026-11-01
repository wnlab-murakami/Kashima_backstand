import { getReadClient } from "@/lib/supabase/read";
import { getWriteClient } from "@/lib/supabase/write";
import { isPositionId, type PositionId } from "@/lib/positions";

/** position id -> その場所に配置された名前の配列 */
export type Assignments = Partial<Record<PositionId, string[]>>;

export type Placement = {
  assignmentDate: string | null;
  assignments: Assignments;
  updatedAt: string | null;
};

/** 信頼できないjsonbの値を型安全なAssignmentsに絞り込む。未知のキーは無視する。 */
function parseAssignments(raw: unknown): Assignments {
  if (typeof raw !== "object" || raw === null || Array.isArray(raw)) {
    return {};
  }

  const out: Assignments = {};
  for (const [key, value] of Object.entries(raw as Record<string, unknown>)) {
    if (!isPositionId(key) || !Array.isArray(value)) continue;
    const names = value
      .filter((n): n is string => typeof n === "string")
      .map((n) => n.trim())
      .filter(Boolean);
    if (names.length > 0) out[key] = names;
  }
  return out;
}

/**
 * 保存されている配置を読み取る。
 * 例外を投げない：env未設定・DB到達不可・データなしのいずれも null を返す。
 * ホーム画面はこの関数の戻り値に関わらず常に描画できる（グレースフルデグレード）。
 */
export async function getPlacement(): Promise<Placement | null> {
  const supabase = getReadClient();
  if (!supabase) return null;

  try {
    const { data, error } = await supabase
      .from("placements")
      .select("assignment_date, assignments, updated_at")
      .eq("id", 1)
      .maybeSingle();

    if (error) {
      console.error("[placement] 読み取りに失敗しました:", error.message);
      return null;
    }
    if (!data) return null;

    return {
      assignmentDate: (data.assignment_date as string | null) ?? null,
      assignments: parseAssignments(data.assignments),
      updatedAt: (data.updated_at as string | null) ?? null,
    };
  } catch (err) {
    console.error("[placement] 読み取り中に例外が発生しました:", err);
    return null;
  }
}

/**
 * 配置を保存する（常にid=1の1行を上書き。履歴は残さない）。
 * 失敗時は例外を投げる。呼び出し元のServer Actionでユーザー向けメッセージに変換すること。
 */
export async function savePlacement(
  date: string,
  assignments: Assignments
): Promise<void> {
  const supabase = getWriteClient();
  const { error } = await supabase
    .from("placements")
    .upsert(
      { id: 1, assignment_date: date, assignments },
      { onConflict: "id" }
    );
  if (error) {
    throw new Error(`保存に失敗しました: ${error.message}`);
  }
}

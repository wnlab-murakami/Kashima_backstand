import { getPlacement } from "@/lib/placements";
import { POSITION_AREAS } from "@/lib/positions";
import { todayInTokyo, formatJaDate } from "@/lib/date";

/**
 * ホーム画面の「本日の配置」カード。
 * データが無い場合（未入力・Supabase未設定・到達不可のいずれも）は何も表示しない。
 * Supabaseが遅い/落ちていても、呼び出し側のSuspenseにより他の表示をブロックしない。
 */
export default async function TodayPlacement() {
  const placement = await getPlacement();
  if (!placement) return null;

  const { assignments } = placement;
  if (Object.keys(assignments).length === 0) return null;

  const today = todayInTokyo();

  return (
    <div className="bg-white rounded-xl shadow-md p-5 mb-4">
      <h2 className="text-[#1A2753] border-b-2 border-[#A70028] pb-2 mt-0 mb-4 text-center text-xl font-bold">
        本日の配置
      </h2>
      <p className="text-center text-sm text-gray-600 mb-2">
        {formatJaDate(today)}
      </p>

      {POSITION_AREAS.map((area) => {
        const rows = area.positions
          .map((p) => ({ label: p.label, names: assignments[p.id] ?? [] }))
          .filter((r) => r.names.length > 0);
        if (rows.length === 0) return null;

        return (
          <div key={area.id}>
            <h3 className="text-[#1A2753] text-lg font-bold mt-4 mb-1 text-center">
              {area.label}
            </h3>
            <ul className="pl-5 mt-1">
              {rows.map((r) => (
                <li key={r.label}>
                  {r.label} — {r.names.join(" / ")}
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}

"use client";

import { useActionState, useMemo, useState } from "react";
import { POSITION_AREAS } from "@/lib/positions";
import { savePlacementAction, type SaveResult } from "@/app/leader-manual/placement/actions";

type Row = { key: string; name: string };
type EditorState = Record<string, Row[]>;

type PlacementEditorProps = {
  initialDate: string;
  initialAssignments: Partial<Record<string, string[]>>;
  updatedAt: string | null;
};

/**
 * crypto.randomUUID()はhttp（非セキュアコンテキスト）で使えないブラウザがあるため、
 * ローカルWi-Fi経由のスマホ動作確認でも安全なフォールバックを用意する。
 */
function makeRowKey(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    try {
      return crypto.randomUUID();
    } catch {
      // フォールバックへ
    }
  }
  return `row-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function buildInitialState(
  assignments: Partial<Record<string, string[]>>
): EditorState {
  const state: EditorState = {};
  for (const area of POSITION_AREAS) {
    for (const position of area.positions) {
      const names = assignments[position.id] ?? [];
      state[position.id] = names.map((name) => ({ key: makeRowKey(), name }));
    }
  }
  return state;
}

function toPayload(state: EditorState): Record<string, string[]> {
  const out: Record<string, string[]> = {};
  for (const [positionId, rows] of Object.entries(state)) {
    const names = rows.map((r) => r.name.trim()).filter(Boolean);
    if (names.length > 0) out[positionId] = names;
  }
  return out;
}

function formatUpdatedAt(iso: string | null): string | null {
  if (!iso) return null;
  try {
    return new Intl.DateTimeFormat("ja-JP", {
      timeZone: "Asia/Tokyo",
      month: "numeric",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(iso));
  } catch {
    return null;
  }
}

const initialSaveState: SaveResult | null = null;

export default function PlacementEditor({
  initialDate,
  initialAssignments,
  updatedAt,
}: PlacementEditorProps) {
  const [date, setDate] = useState(initialDate);
  const [state, setState] = useState<EditorState>(() =>
    buildInitialState(initialAssignments)
  );
  const [result, submit, isPending] = useActionState(
    savePlacementAction,
    initialSaveState
  );

  const lastSavedLabel = useMemo(
    () => formatUpdatedAt(updatedAt),
    [updatedAt]
  );

  function addRow(positionId: string) {
    setState((prev) => ({
      ...prev,
      [positionId]: [...(prev[positionId] ?? []), { key: makeRowKey(), name: "" }],
    }));
  }

  function updateName(positionId: string, rowKey: string, name: string) {
    setState((prev) => ({
      ...prev,
      [positionId]: (prev[positionId] ?? []).map((row) =>
        row.key === rowKey ? { ...row, name } : row
      ),
    }));
  }

  function removeRow(positionId: string, rowKey: string) {
    setState((prev) => ({
      ...prev,
      [positionId]: (prev[positionId] ?? []).filter((row) => row.key !== rowKey),
    }));
  }

  function clearArea(area: (typeof POSITION_AREAS)[number]) {
    const hasAny = area.positions.some((p) => (state[p.id]?.length ?? 0) > 0);
    if (!hasAny) return;
    if (!window.confirm(`「${area.label}」の入力を全て削除します。よろしいですか？`)) {
      return;
    }
    setState((prev) => {
      const next = { ...prev };
      for (const position of area.positions) {
        next[position.id] = [];
      }
      return next;
    });
  }

  function clearAllAreas() {
    const hasAny = Object.values(state).some((rows) => rows.length > 0);
    if (!hasAny) return;
    if (!window.confirm("全てのエリアの入力を削除します。よろしいですか？")) {
      return;
    }
    setState((prev) => {
      const next: EditorState = {};
      for (const positionId of Object.keys(prev)) {
        next[positionId] = [];
      }
      return next;
    });
  }

  function handleSave() {
    submit({ date, assignments: toPayload(state) });
  }

  return (
    <div>
      <label className="flex items-center gap-2 mb-4">
        <span className="w-20 shrink-0 text-sm text-gray-700">日付</span>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          aria-label="配置の日付"
          className="flex-1 border border-gray-300 rounded p-2 outline-none focus:border-[#1A2753]"
        />
      </label>

      {lastSavedLabel && (
        <p className="text-xs text-gray-500 mb-3">最終更新: {lastSavedLabel}</p>
      )}

      <button
        type="button"
        onClick={clearAllAreas}
        className="w-full mb-3 border border-[#A70028] text-[#A70028] rounded-lg py-2 font-bold hover:bg-[#A70028]/5"
      >
        全て削除
      </button>

      <div className="space-y-2 mb-4">
        {POSITION_AREAS.map((area) => (
          <details key={area.id} className="border border-gray-200 rounded-lg overflow-hidden group" open>
            <summary className="bg-gray-50 px-4 py-3 cursor-pointer font-bold flex justify-between items-center list-none text-[#1A2753]">
              <span>{area.label}</span>
              <span className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    clearArea(area);
                  }}
                  className="text-xs font-normal border border-gray-300 rounded px-2 py-1 text-gray-600 hover:bg-gray-100"
                >
                  このエリアを削除
                </button>
                <span className="text-sm transition-transform duration-300 group-open:rotate-180">
                  ▼
                </span>
              </span>
            </summary>
            <div className="px-4 py-4 bg-white border-t border-gray-200 space-y-4">
              {area.positions.map((position) => {
                const rows = state[position.id] ?? [];
                const showPositionLabel = area.positions.length > 1;
                return (
                  <div key={position.id}>
                    {showPositionLabel && (
                      <p className="font-bold text-[#1A2753] mb-2">
                        {position.label}
                        <span className="ml-2 text-sm font-normal text-gray-600">
                          {rows.length}名
                        </span>
                      </p>
                    )}
                    <div className="space-y-2">
                      {rows.map((row, i) => (
                        <div key={row.key} className="flex items-center gap-2">
                          <input
                            type="text"
                            value={row.name}
                            onChange={(e) =>
                              updateName(position.id, row.key, e.target.value)
                            }
                            placeholder="氏名"
                            autoComplete="off"
                            aria-label={`${position.label} ${i + 1}人目の氏名`}
                            className="flex-1 border border-gray-300 rounded p-2 outline-none focus:border-[#1A2753]"
                          />
                          <button
                            type="button"
                            onClick={() => removeRow(position.id, row.key)}
                            aria-label={`${position.label} ${i + 1}人目を削除`}
                            className="shrink-0 w-11 h-11 flex items-center justify-center border border-gray-300 rounded text-gray-600 hover:bg-gray-100"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={() => addRow(position.id)}
                      className="mt-2 w-full border border-dashed border-[#1A2753] text-[#1A2753] rounded py-2 font-bold hover:bg-[#1A2753]/5"
                    >
                      ＋ 名前を追加
                    </button>
                  </div>
                );
              })}
            </div>
          </details>
        ))}
      </div>

      <button
        type="button"
        disabled={isPending}
        onClick={handleSave}
        className="block w-full bg-[#1A2753] text-white px-5 py-3 rounded-lg font-bold text-center hover:bg-[#2c3e8a] disabled:opacity-60 transition-all"
      >
        {isPending ? "保存中…" : "この内容で保存する"}
      </button>

      <div aria-live="polite" className="mt-3 min-h-6">
        {result?.ok === true && (
          <p className="text-sm text-[#1A2753] font-bold">保存しました。</p>
        )}
        {result?.ok === false && (
          <p className="text-sm text-[#A70028] font-bold">{result.message}</p>
        )}
      </div>
    </div>
  );
}

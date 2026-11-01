/**
 * 配置場所の定義。ここだけを編集すれば入力画面とホーム画面の両方に反映されます。
 *
 * 【編集方法】
 *  - 配置を追加 : 該当エリアの positions 配列に { id, label } を追加
 *  - 配置を削除 : 行を削除
 *  - 名前を変更 : label だけを変更する（id は変更しない）
 *
 * ⚠️ id はデータベースに保存されるキーです。id を変更すると、
 *    過去に保存した配置データがその配置と結びつかなくなります。
 *    表示名を変えたいだけなら label のみ変更してください。
 */

export type PositionDef = { readonly id: string; readonly label: string };

export type AreaDef = {
  readonly id: string;
  readonly label: string;
  readonly href: string;
  readonly positions: readonly PositionDef[];
};

export const POSITION_AREAS = [
  {
    id: "entrance",
    label: "スタンド入口",
    href: "/backstand-entrance",
    positions: [
      { id: "entrance-o", label: "O入口" },
      { id: "entrance-p", label: "P入口" },
      { id: "entrance-q", label: "Q入口" },
      { id: "entrance-r", label: "R入口" },
      { id: "entrance-s", label: "S入口" },
      { id: "entrance-t", label: "T入口" },
    ],
  },
  {
    id: "inside",
    label: "スタンド内",
    href: "/backstand-inside",
    positions: [{ id: "inside", label: "スタンド内" }],
  },
  {
    id: "sofa",
    label: "ソファシート",
    href: "/sofa-seat",
    positions: [{ id: "sofa", label: "ソファシート" }],
  },
  {
    id: "seat-pr",
    label: "席詰め広報",
    href: "/seat-arrangement-pr",
    positions: [{ id: "seat-pr", label: "席詰め広報" }],
  },
  {
    id: "trash",
    label: "エコステーション",
    href: "/trash-station",
    positions: [{ id: "trash", label: "エコステーション" }],
  },
] as const satisfies readonly AreaDef[];

/** 全配置のフラットなリスト（エリア情報付き） */
export const ALL_POSITIONS = POSITION_AREAS.flatMap((area) =>
  area.positions.map((p) => ({ ...p, areaId: area.id, areaLabel: area.label }))
);

export type PositionId =
  (typeof POSITION_AREAS)[number]["positions"][number]["id"];

const POSITION_IDS: ReadonlySet<string> = new Set(
  ALL_POSITIONS.map((p) => p.id)
);

export function isPositionId(value: unknown): value is PositionId {
  return typeof value === "string" && POSITION_IDS.has(value);
}

import Header from "@/components/Header";
import BackButton from "@/components/BackButton";
import PlacementEditor from "@/components/PlacementEditor";
import { getPlacement } from "@/lib/placements";
import { todayInTokyo } from "@/lib/date";

export const dynamic = "force-dynamic";

export const metadata = {
  robots: { index: false, follow: false },
};

export default async function PlacementEditPage() {
  const placement = await getPlacement();

  return (
    <>
      <Header />
      <div className="max-w-3xl mx-auto px-5 py-5">
        <h2 className="text-[#1A2753] text-2xl font-bold text-center mb-2">
          配置入力
        </h2>
        <p className="text-sm text-gray-600 mb-4 text-center">
          入力した内容は保存すると、ホーム画面の「本日の配置」に反映されます。
        </p>

        <PlacementEditor
          initialDate={placement?.assignmentDate ?? todayInTokyo()}
          initialAssignments={placement?.assignments ?? {}}
          updatedAt={placement?.updatedAt ?? null}
        />

        <hr className="border-0 border-t-2 border-[#333] my-6" />

        <BackButton />
      </div>
    </>
  );
}

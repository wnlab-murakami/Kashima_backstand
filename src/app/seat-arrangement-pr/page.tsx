import Header from "@/components/Header";
import BackButton from "@/components/BackButton";

export default function SeatArrangementPrPage() {
  return (
    <>
      <Header />
      <div className="max-w-3xl mx-auto px-5 py-5">
        <h2 className="text-[#1A2753] text-2xl font-bold mb-4">席詰め広報</h2>
        <h3 className="text-[#1A2753] text-lg font-bold mb-2">業務内容</h3>
        <p>イーストゾーン（自由席）を看板を持って巡回する。入場開始時刻から巡回を開始してください。
          特に入場開始から1時間と試合開始前の30分は混雑するので、巡回を重点的に行う。
        </p>
        <hr className="border-0 border-t-2 border-[#333] my-6" />
        <h3 className="text-[#1A2753] text-lg font-bold mb-2">準備</h3>
        <p>看板を確認し、巡回するエリアを把握してください。エリアについてはリーダーが説明いたします。</p>
        <hr className="border-0 border-t-2 border-[#333] my-6" />
        <h3 className="text-[#1A2753] text-lg font-bold mb-2">終了後</h3>
        <p>4階T入口横のスタッフオンリーと書かれた部屋の前でお待ちください。</p>
        <BackButton />
      </div>
    </>
  );
}

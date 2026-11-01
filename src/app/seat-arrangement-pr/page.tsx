import Header from "@/components/Header";
import BackButton from "@/components/BackButton";

export default function SeatArrangementPrPage() {
  return (
    <>
      <Header />
      <div className="max-w-3xl mx-auto px-5 py-5">
        <h2 className="text-[#1A2753] text-2xl font-bold mb-4 text-center">席詰め広報</h2>

        <h3 className="text-[#1A2753] text-lg font-bold mb-2">業務内容</h3>
        <ul className="pl-5 mb-4">
          <li>4階イーストゾーン（自由席）を席詰め広報看板を持って巡回する</li>
          <li>お客様に声をかけ、席詰めのお願いをする</li>
        </ul>

        <hr className="border-0 border-t-2 border-[#333] my-6" />

        <h3 className="text-[#1A2753] text-lg font-bold mb-2">巡回時間</h3>
        <ul className="pl-5 mb-4">
            <li>開場5分前から1時間</li>
            <li>試合開始1時間前から試合開始5分前まで</li>
        </ul>

        <hr className="border-0 border-t-2 border-[#333] my-6" />

        <h3 className="text-[#1A2753] text-lg font-bold mb-2">準備</h3>
        <ul className="pl-5 mb-4">
          <li>看板を確認し、巡回するエリアを把握してください</li>
        </ul>

        <hr className="border-0 border-t-2 border-[#333] my-6" />

        <h3 className="text-[#1A2753] text-lg font-bold mb-2">試合開始1時間後</h3>
        <ul className="pl-5 mb-4">
          <li>5ゲートに集合、交差点の交通整理を行う。5ゲートリーダーの指示に従ってください</li>
        </ul>


        <hr className="my-4" />
        <BackButton />
      </div>
    </>
  );
}

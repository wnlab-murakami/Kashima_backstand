import Header from "@/components/Header";
import BackButton from "@/components/BackButton";

export default function SofaSeatPage() {
  return (
    <>
      <Header />
      <div className="max-w-3xl mx-auto px-5 py-5">
        <h2 className="text-[#1A2753] text-2xl font-bold text-center mb-2">ソファシート</h2>

        <h3 className="text-[#1A2753] text-lg font-bold mb-2">業務内容</h3>
        <ul className="pl-5 mb-4">
          <li>チケットを確認</li>
          <li>ソファシートとゆったりシートのチケット所持者のみ通過させる</li>
          <li>こども広場は親と未就学児の同伴であれば上記のチケットなしでも利用可能</li>
          <li>人数制限あり（10組20名程度）</li>
          <li>エリア内の食事は×、飲料は○</li>
        </ul>

        <hr className="border-0 border-t-2 border-[#333] my-6" />

        <h3 className="text-[#1A2753] text-lg font-bold mb-2">準備</h3>
        <ul className="pl-5 mb-4">
          <li>各シートカバーを取り外し、収納BOXに入れる</li>
          <li>※シートカバーベルトがあるものは一緒に収納する</li>
        </ul>

        <hr className="border-0 border-t-2 border-[#333] my-6" />

        <h3 className="text-[#1A2753] text-lg font-bold mb-2">試合終了後</h3>
        <ul className="pl-5 mb-4">
          <li>収納BOXからシートカバーを取り出し、各シートにかける</li>
          <li>※シートカバーベルトがついていたシートにベルトを戻す</li>
        </ul>

        <hr className="my-4" />
        <BackButton />
      </div>
    </>
  );
}

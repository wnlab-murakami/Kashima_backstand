import Header from "@/components/Header";
import BackButton from "@/components/BackButton";

export default function SofaSeatPage() {
  return (
    <>
      <Header />
      <div className="max-w-3xl mx-auto px-5 py-5">
        <h2 className="text-[#1A2753] text-2xl font-bold mb-4">ソファシート</h2>
        <p>業務内容：お客様のチケットを確認する</p>
        <p>ソファシートとゆったりシートのチケット所持者のみ通過させる</p>
        <p>
          こども広場は親と未就学児の同伴であれば上記のチケットなしでも利用可能。人数制限あり（10組20名程度）
        </p>
        <p>エリア内の食事は×、飲料は○</p>
        <hr className="border-0 border-t-2 border-[#333] my-6" />
        <h3 className="text-[#1A2753] font-bold mb-2">準備</h3>
        <p>各シートカバーを取り外し、収納BOXに入れる。</p>
        <p>※シートカバーベルトがあるものは一緒に収納する。</p>
        <hr className="border-0 border-t-2 border-[#333] my-6" />
        <h3 className="text-[#1A2753] font-bold mb-2">終了後</h3>
        <p>収納BOXからシートカバーを取り出し、各シートにかける。</p>
        <p>※シートカバーベルトがついていたシートにベルトを戻す。</p>
        <p>座席清掃を行う。</p>
        <BackButton />
      </div>
    </>
  );
}

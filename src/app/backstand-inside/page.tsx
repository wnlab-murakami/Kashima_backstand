import Header from "@/components/Header";
import BackButton from "@/components/BackButton";
import ManualImage from "@/components/ManualImage";

export default function BackstandInsidePage() {
  return (
    <>
      <Header />
      <div className="max-w-3xl mx-auto px-5 py-5">
        <h2 className="text-[#1A2753] text-2xl font-bold mb-4 text-center">バックスタンド内</h2>
        <h3 className="text-[#1A2753] text-lg font-bold mb-2">業務内容</h3>
        <p>下記マニュアルを確認して、休憩時間を調整してください。</p>
        <p>入場開始時刻の10分前から配置についてください。</p>
        <p>わからないことや質問があれば、リーダーに連絡をしてください。</p>
        <hr className="border-0 border-t-2 border-[#333] my-6" />
        <h3 className="text-[#1A2753] text-lg font-bold mb-2">準備</h3>
        <p>休憩時間を各自決めてください。（例：1人30分休憩、昼食時45分休憩など）</p>
        <hr className="border-0 border-t-2 border-[#333] my-6" />
        <h3 className="text-[#1A2753] text-lg font-bold mb-2">試合終了後</h3>
        <p>2階と4階のスタンド内のごみ拾いを行います。</p>
        <p>ごみ拾いで使用する袋は後半開始後に配布します。</p>
        <hr className="border-0 border-t-2 border-[#333] my-6" />
        <h3 className="text-[#1A2753] text-lg font-bold mb-2">配置図</h3>
        <ManualImage src="/uploads/backstand_inside.webp" alt="配置図" />
        <BackButton />
      </div>
    </>
  );
}

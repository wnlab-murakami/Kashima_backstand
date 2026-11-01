import Header from "@/components/Header";
import BackButton from "@/components/BackButton";
import ManualImage from "@/components/ManualImage";

export default function BackstandEntrancePage() {
  return (
    <>
      <Header/>
      <div className="max-w-3xl mx-auto px-5 py-5">
        <h2 className="text-[#1A2753] text-2xl font-bold text-center mb-2">バックスタンド入口</h2>

        <h3 className="text-[#1A2753] text-lg font-bold mb-2">業務内容</h3>
        <ul className="pl-5 mb-4">
          <li>チケット確認を行う。（※横断幕を持ってスタンドに入る人はチケット確認せずに通してよいです）</li>
          <li>立ち位置：階段の反対側</li>
          <li>開始時間：開場10分前から</li>
          <li className="font-bold">2人体制で対応する時間帯</li>
          <ul className="pl-5 mb-4">
            <li>・キックオフ1時間前</li>
            <li>・ハーフタイム（試合開始から45分後）から後半開始まで</li>
            <li>・後半開始から40分後から</li>
          </ul>
          <li>後半開始から40分後には入口の柵を両方開放してください。</li>
          <li className="text-red-500">※O入口とP入口はアウェイチームのグッズを身に着けた方は入れないので注意してください</li>
        </ul>

        <hr className="border-0 border-t-2 border-[#333] my-6" />

        <h3 className="text-[#1A2753] text-lg font-bold mb-2">準備</h3>
        <ul className="pl-5 mb-4">
          <li>担当場所の入場可能チケットの確認</li>
          <li>休憩時間を各自決めてください。（例：1人30分休憩、昼食時45分休憩など）</li>
        </ul>

        <hr className="border-0 border-t-2 border-[#333] my-6" />

        <h3 className="text-[#1A2753] text-lg font-bold mb-2">試合終了後</h3>
        <ul className="pl-5 mb-4">
          <li>下層と上層のスタンド内のごみ拾いを行います</li>
          <li>使用するゴミ袋は後半開始後に配布します</li>
        </ul>

        <hr className="border-0 border-t-2 border-[#333] my-6" />
        <h3 className="text-[#1A2753] text-lg font-bold mb-2">座席案内図</h3>
        <p>特殊座席の案内方法です。画像を確認して案内してください</p>
        <hr className="my-4" />
        <ManualImage src="/uploads/2022guidemap-1.webp" alt="スタジアム図" />
        <hr className="my-6" />
        <BackButton />
      </div>
    </>
  );
}

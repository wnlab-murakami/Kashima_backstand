import Header from "@/components/Header";
import BackButton from "@/components/BackButton";
import ManualImage from "@/components/ManualImage";

export default function BackstandInsidePage() {
  return (
    <>
      <Header />
      <div className="max-w-3xl mx-auto px-5 py-5">
        <h2 className="text-[#1A2753] text-2xl font-bold text-center mb-2">バックスタンド内</h2>

        <h3 className="text-[#1A2753] text-lg font-bold mb-2">業務内容</h3>
        <ul className="pl-5 mb-4">
          <li>カテゴリー間の移動を防ぐためにチケット確認を行う</li>
          <li style={{marginBottom: '1rem'}}>3人1組で北と南に分かれて業務を行う</li>
          <li>開始時間：入場開始時刻の10分前から</li>
          <li>立ち位置：配置図の赤丸</li>
          <li style={{marginBottom: '1rem'}}>向き：配置図の矢印の方向に向く</li>
          <li>選手のアップが始まるタイミングから姿勢を低くして業務を行う</li>
          <li>試合終了まではお客様の視界の邪魔にならないようにしてください</li>
        </ul>

        <hr className="border-0 border-t-2 border-[#333] my-6" />

        <h3 className="text-[#1A2753] text-lg font-bold mb-2">準備</h3>
        <ul className="pl-5 mb-4">
          <li>カテゴリー番号の把握</li>
          <li>座席案内方法の確認</li>
          <li>休憩時間を各自決めてください（例：1人30分休憩、昼食時45分休憩など）</li>
        </ul>

        <hr className="border-0 border-t-2 border-[#333] my-6" />

        <h3 className="text-[#1A2753] text-lg font-bold mb-2">試合終了後</h3>
        <ul className="pl-5 mb-4">
          <li>下層と上層のスタンド内のごみ拾いを行います</li>
          <li>使用するゴミ袋は後半開始後に配布します</li>
        </ul>

        <hr className="border-0 border-t-2 border-[#333] my-6" />

        <h3 className="text-[#1A2753] text-lg font-bold mb-2">配置図</h3>
        <ul className="pl-5 mb-4">
          <li>配置場所を確認してください</li>
        </ul>
        <hr className="my-4" />
        <ManualImage src="/uploads/backstand_inside.webp" alt="配置図" />

        <hr className="border-0 border-t-2 border-[#333] my-6" />
        <h3 className="text-[#1A2753] text-lg font-bold mb-2">座席案内図</h3>
        <ul className="pl-5 mb-4">
          <li>特殊座席の案内方法を確認してください</li>
        </ul>
        <hr className="my-4" />
        <ManualImage src="/uploads/2022guidemap-1.webp" alt="スタジアム図" />

        <hr className="my-4" />
        <BackButton />
      </div>
    </>
  );
}

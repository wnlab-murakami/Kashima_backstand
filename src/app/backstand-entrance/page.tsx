import Header from "@/components/Header";
import BackButton from "@/components/BackButton";
import ManualImage from "@/components/ManualImage";

export default function BackstandEntrancePage() {
  return (
    <>
      <Header />
      <div className="max-w-3xl mx-auto px-5 py-5">
        <h2 className="text-[#1A2753] text-2xl font-bold text-center mb-2">
          バックスタンド下層入口
        </h2>
        <h3 className="text-center font-bold mb-4">
          下記を確認し、ペアで業務を行ってください。
        </h3>
        <ul className="pl-5 mb-4">
          <li>階段の反対側に立ってチケット確認を行う。</li>
          <li>OとPゲートはアウェイチームのグッズを身に着けた方は入れない。</li>
          <li>一般入場10分前から配置につく。</li>
          <li>キックオフ1時間前、ハーフタイム、試合終了5分前は2人体制で対応してください。</li>
          <li>試合終了5分前から入口の柵を両方開放してください。</li>
          <li>試合終了後、座席清掃をおこないます。</li>
        </ul>
        <hr className="border-0 border-t-2 border-[#333] my-6" />
        <ManualImage src="/uploads/2022guidemap1.png" alt="スタジアム図" />
        <hr className="border-0 border-t-2 border-[#333] my-6" />
        <ManualImage src="/uploads/Entrance_backstand.webp" alt="配置図・マニュアル" />
        <BackButton />
      </div>
    </>
  );
}

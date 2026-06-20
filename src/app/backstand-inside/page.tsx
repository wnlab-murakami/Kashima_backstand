import Header from "@/components/Header";
import BackButton from "@/components/BackButton";
import ManualImage from "@/components/ManualImage";

export default function BackstandInsidePage() {
  return (
    <>
      <Header />
      <div className="max-w-3xl mx-auto px-5 py-5">
        <h2 className="text-[#1A2753] text-2xl font-bold mb-4">バックスタンド内</h2>
        <p>下記マニュアルを確認して、休憩時間を調整してください。</p>
        <p>優先入場10分前から配置についてください。</p>
        <p>わからないことや質問があれば、リーダーに連絡をしてください。</p>
        <hr className="border-0 border-t-2 border-[#333] my-6" />
        <h3 className="text-[#1A2753] font-bold mb-2">配置図・マニュアル</h3>
        <ManualImage src="/uploads/Inside_backstand.webp" alt="配置図・マニュアル" />
        <BackButton />
      </div>
    </>
  );
}

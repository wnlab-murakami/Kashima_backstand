import Header from "@/components/Header";
import BackButton from "@/components/BackButton";

export default function TrashStationPage() {
  return (
    <>
      <Header />
      <div className="max-w-3xl mx-auto px-5 py-5">
        <h2 className="text-[#1A2753] text-2xl font-bold mb-4">エコステーション</h2>
        <h3 className="text-[#1A2753] font-bold mb-2">業務内容</h3>
        <p>ファンクラブブース前の白いテントの中にて、お客様のゴミを回収します。分別方法が分かれているので注意してください。
          ゴミが溜まり次第、ゴミ袋の入れ替えを行う。
          食べ残しについては、中のザルが溜まったタイミングで可燃ごみに移し替える。
          ゴミ袋はテント内に集約し、場内を巡回している回収スタッフに引き渡す。</p>
        <hr className="border-0 border-t-2 border-[#333] my-6" />
        <h3 className="text-[#1A2753] font-bold mb-2">準備</h3>
        <p>ゴミ箱に分別用の袋を用意してください。エコステーション専用のビブスがあるので、それを着用して業務を行ってください。</p>
        <hr className="border-0 border-t-2 border-[#333] my-6" />
        <h3 className="text-[#1A2753] font-bold mb-2">運用時間</h3>
        <p>開場から試合終了後30分程度まで。試合終了後は、ゴミの回収を行い、分別用の袋を片付けてください。</p>
        <h3 className="text-[#1A2753] font-bold mb-2">終了後</h3>
        <p>業務終了後は、エコステーションの前でお待ちください。</p>
        <BackButton />
      </div>
    </>
  );
}

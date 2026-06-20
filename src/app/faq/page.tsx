import Header from "@/components/Header";
import BackButton from "@/components/BackButton";
import FaqAccordion from "@/components/FaqAccordion";

const faqItems = [
  {
    question: "Q. 落とし物を拾ったら？",
    answer:
      "A. QゲートとRゲートの間にあるファンクラブブースに預ける。どこで拾得したかメモをしておいてください。",
  },
  {
    question: "Q. 再入場は可能ですか？",
    answer: "A. はい、可能です。1,2,5,6ゲートから再入場ができます。",
  },
  {
    question: "Q. 迷子を発見したら？",
    answer:
      "A. 名前、性別、年齢、特徴を確認し、リーダーへ連絡してください。リーダーが到着するまで周囲確認を行ってください。",
  },
  {
    question: "Q. お客様に座席の場所を聞かれたら？",
    answer:
      "A. チケットの座席番号を確認し、近くの座席案内図を指差しながら丁寧にご案内してください。不明な場合は、リーダーに確認をお願いします。",
  },
  {
    question: "Q. 喫煙所の場所を聞かれたら？",
    answer:
      "A. カシマスポーツセンターの裏に来場者用の喫煙所があります。再入場口を出て、ジーコ像がある方角にカシマスポーツセンターがあります。",
  },
  {
    question: "Q. 体調不良や怪我をされたお客様がいたら？",
    answer:
      "A. すぐにリーダーに連絡してください。お客様の安全を最優先し、落ち着いて対応してください。",
  },
];

export default function FaqPage() {
  return (
    <>
      <Header />
      <div className="max-w-3xl mx-auto px-5 py-5">
        <h2 className="text-[#1A2753] text-2xl font-bold mb-4">
          よくある質問一覧
        </h2>
        <div className="bg-white rounded-xl shadow-md p-5 mb-4">
          <FaqAccordion items={faqItems} />
        </div>
        <BackButton />
      </div>
    </>
  );
}

import Link from "next/link";
import Header from "@/components/Header";

const menuItems = [
  { href: "/backstand-entrance", label: "バックスタンド入口" },
  { href: "/backstand-inside", label: "バックスタンド内" },
  { href: "/sofa-seat", label: "ソファシート" },
  { href: "/documents", label: "スタジアム構造を見る" },
  { href: "/faq", label: "よくある質問" },
];

export default function Home() {
  return (
    <>
      <Header title="アルバイトマニュアル" />
      <div className="max-w-3xl mx-auto px-5 py-5 animate-fade-in">
        <div className="bg-white rounded-xl shadow-md p-5 mb-4">
          <h2 className="text-[#1A2753] border-b-2 border-[#A70028] pb-2 mt-0 mb-4 text-center text-xl font-bold">
            全体連絡事項
          </h2>
          <h3 className="text-[#1A2753] text-base font-bold mt-4 mb-1">トイレ</h3>
          <p>5ゲートの再入場口を出て右手側の階段下にあります。</p>
          <h3 className="text-[#1A2753] text-base font-bold mt-4 mb-1">休憩の取り方</h3>
          <p>5ゲートの再入場口から外に出て、グッズ売り場の前を通り控室に戻ってください。</p>
          <h3 className="text-[#1A2753] text-base font-bold mt-4 mb-1">🚫禁止事項</h3>
          <ul className="pl-5 mt-1">
            <li>エレベーターの使用禁止</li>
            <li>緊急事態以外での配置場所の離脱禁止</li>
          </ul>
        </div>

        <h2 className="text-[#1A2753] text-xl font-bold mt-5 mb-2">メニュー</h2>
        <p className="mb-4">配置場所の情報を確認してください。</p>
        <div className="flex flex-col gap-4">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block bg-[#1A2753] text-white px-5 py-3 rounded-lg font-bold text-center no-underline hover:bg-[#2c3e8a] hover:-translate-y-0.5 transition-all"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

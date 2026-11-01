import { Suspense } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import TodayPlacement from "@/components/TodayPlacement";

export const dynamic = "force-dynamic";

const menuItems = [
  { href: "/backstand-entrance", label: "スタンド入口" },
  { href: "/backstand-inside", label: "スタンド内" },
  { href: "/sofa-seat", label: "ソファシート" },
  { href: "/seat-arrangement-pr", label: "席詰め広報" },
  { href: "/trash-station", label: "エコステーション" },
  { href: "/documents", label: "マップ" },
  { href: "/faq", label: "よくある質問" },
];

export default function Home() {
  return (
    <>
      <Header title="バックスタンド" secretLinkHref="/leader-manual" />
      <div className="max-w-3xl mx-auto px-5 py-5 animate-fade-in">
        <div className="bg-white rounded-xl shadow-md p-5 mb-4">
          <h2 className="text-[#1A2753] border-b-2 border-[#A70028] pb-2 mt-0 mb-4 text-center text-xl font-bold">
            全体連絡事項
          </h2>
          <h3 className="text-[#1A2753] text-lg font-bold mt-4 mb-1 text-center">トイレ</h3>
          <p>5ゲートの再入場口を出て右手側の階段下にあります。</p>
          <h3 className="text-[#1A2753] text-lg font-bold mt-4 mb-1 text-center">控室への向かい方</h3>
          <p>5ゲートの再入場口から外に出て、グッズ売り場の前を通り控室に戻って休憩してください。</p>
          <h3 className="text-[#1A2753] text-lg font-bold mt-4 mb-1 text-center">🚫禁止事項</h3>
          <ul className="pl-5 mt-1">
            <li>・エレベーターの使用禁止</li>
            <li>・緊急事態以外での配置場所の離脱禁止</li>
          </ul>
        </div>

        <Suspense fallback={null}>
          <TodayPlacement />
        </Suspense>

        <h2 className="text-[#1A2753] text-xl font-bold mt-5 mb-2 text-center">メニュー</h2>
        <p className="mb-4">配置場所のマニュアルを確認してください。</p>
        <div className="grid grid-cols-2 gap-4">
          {menuItems.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              className={`block bg-[#1A2753] text-white px-5 py-3 rounded-lg font-bold text-center no-underline hover:bg-[#2c3e8a] hover:-translate-y-0.5 transition-all ${
                menuItems.length % 2 === 1 && index === menuItems.length - 1
                  ? "col-span-2"
                  : ""
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

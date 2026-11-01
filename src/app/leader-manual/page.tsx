import Link from "next/link";
import Header from "@/components/Header";
import BackButton from "@/components/BackButton";

export const metadata = {
  robots: { index: false, follow: false },
};

const memoFields = [
  "現在地",
  "氏名",
  "年齢",
  "性別",
  "お連れ様○/×",
  "歩行可能○/×",
  "症状",
];

const choiceFields = ["お連れ様○/×", "歩行可能○/×"];

export default function LeaderManualPage() {
  return (
    <>
      <Header />
      <div className="max-w-3xl mx-auto px-5 py-5">
        <h2 className="text-[#1A2753] text-2xl font-bold text-center mb-2">
          リーダーマニュアル
        </h2>
        <h3 className="text-[#1A2753] text-lg font-bold mb-2">配置入力</h3>
        <p className="text-sm text-gray-600 mb-2">
          入力した配置は、ホーム画面の「本日の配置」に表示されます。
        </p>
        <Link
          href="/leader-manual/placement"
          className="block bg-[#1A2753] text-white px-5 py-3 rounded-lg font-bold text-center no-underline hover:bg-[#2c3e8a] hover:-translate-y-0.5 transition-all mb-4"
        >
          本日の配置を入力する
        </Link>

        <hr className="border-0 border-t-2 border-[#333] my-6" />

        <h3 className="text-[#1A2753] text-lg font-bold mb-2">設営</h3>
        <ul className="pl-5 mb-4">
          <li>5ゲートと3ゲートのトラメガの設置</li>
          <li>医務室の椅子の設置</li>
          <li>メインスタンドのエグゼクティブシートのカバー外し</li>
        </ul>

        <hr className="border-0 border-t-2 border-[#333] my-6" />

        <h3 className="text-[#1A2753] text-lg font-bold mb-2">所持する鍵</h3>
        <ul className="pl-5 mb-4">
          <li>本部から→132（授乳室）、188（4F医務室）、197（4F医務室）</li>
          <li>管理事務所から→191（4F倉庫）、177(メインスタンド用)</li>
          <li>控え室から→224F（南京錠のカギ、小さいカギだけついてるもの）</li>
        </ul>

        <hr className="border-0 border-t-2 border-[#333] my-6" />

        <h3 className="text-[#1A2753] text-lg font-bold mb-2">
          リーダーミーティング後
        </h3>
        <ul className="pl-5 mb-4">
          <li>バックスタンドの鍵開け（4階医務室、倉庫、3階）</li>
          <li>
            授乳室で使うバッグに132の鍵をつけ、授乳室の担当者(ナガオサさん)に渡す。
          </li>
        </ul>

        <hr className="border-0 border-t-2 border-[#333] my-6" />

        <h3 className="text-[#1A2753] text-lg font-bold mb-2">
          全体ミーティング後
        </h3>
        <ul className="pl-5 mb-4">
          <li>ソファシートのカバー外し</li>
          <li>4階医務室と倉庫の鍵開け終了報告を、無線で本部に連絡</li>
        </ul>

        <hr className="border-0 border-t-2 border-[#333] my-6" />

        <h3 className="text-[#1A2753] text-lg font-bold mb-2">片付け、撤収</h3>
        <ol className="list-decimal pl-5 mb-4 space-y-2">
          <li>
            後半になったら、スタンド入口とスタンド内の方々にゴミ拾い用のビニール袋の配布をする。
          </li>
          <li>
            試合終了前にイーストゾーンの入り口のバナーを外して、柵を開けておく。バナーは4階倉庫に撤収。
          </li>
          <li>
            試合終了後、2階キッズエリアのリストと売上金を回収する。鍵返却時に本部に直接持っていくので4階の部屋に保管しておく。
          </li>
          <li>
            こども広場のブロックを4階のT入場口隣のstaff
            onlyの部屋に片づける。使用する台車は6ゲートから借りてくる。エレベーターが混むので、売店搬出の時間までに済ませる。
          </li>
          <li>
            2階スタンド内のごみ拾いが終わったら4階イーストゾーンのごみ拾いをしてもらう。この時、落とし物は一つの袋にまとめてもらう。4階の清掃が終了したらスタッフは終了。
          </li>
          <li>
            4階のゴール裏、北と南スタンドの柵についてるラミネートを取り、倉庫に撤収する。柵が閉まってる場合は開ける。倉庫と医務室のカギを閉める。3階の南京錠は警備の方が閉めてくれるのでノータッチ。
          </li>
          <li>
            2階のO、Pゲート入口にあるアウェーグッズ規制の看板を取り外し、Oゲート前の縦階段に撤収。
          </li>
          <li>
            カギを本部、管理事務所に返却。落とし物とこども広場の人数集計表とキッズハウスの売上金と人数集計表を本部に持っていく。
          </li>
        </ol>

        <hr className="border-0 border-t-2 border-[#333] my-6" />

        <h3 className="text-[#1A2753] text-lg font-bold mb-2">
          医務・迷子対応メモ
        </h3>
        <p className="text-sm text-gray-600 mb-2">
          医務対応や迷子対応があった際に記入してください。（このメモは保存されません。ページを離れると内容は消えます）
        </p>
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 mb-4 pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className="flex-none w-full snap-center border border-gray-300 rounded-lg p-3"
            >
              <p className="font-bold text-[#1A2753] mb-2">
                記録 {i + 1} / 10
              </p>
              <div className="space-y-2">
                {memoFields.map((field) =>
                  choiceFields.includes(field) ? (
                    <div key={field} className="flex items-center gap-2">
                      <span className="w-28 shrink-0 text-sm text-gray-700">
                        {field}
                      </span>
                      <div className="flex gap-2">
                        {["○", "×"].map((choice) => (
                          <label key={choice} className="cursor-pointer">
                            <input
                              type="radio"
                              name={`${field}-${i}`}
                              value={choice}
                              className="peer hidden"
                            />
                            <span className="inline-block w-9 text-center border border-gray-300 rounded py-1 peer-checked:bg-[#1A2753] peer-checked:text-white peer-checked:border-[#1A2753]">
                              {choice}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div key={field} className="flex items-center gap-2">
                      <label className="w-28 shrink-0 text-sm text-gray-700">
                        {field}
                      </label>
                      <input
                        type="text"
                        className="flex-1 border border-gray-300 rounded p-1.5 outline-none focus:border-[#1A2753]"
                        aria-label={field}
                      />
                    </div>
                  )
                )}
              </div>
            </div>
          ))}
        </div>

        <hr className="border-0 border-t-2 border-[#333] my-6" />

        <BackButton />
      </div>
    </>
  );
}

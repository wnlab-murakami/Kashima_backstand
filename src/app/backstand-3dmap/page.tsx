import Header from "@/components/Header";
import BackButton from "@/components/BackButton";

const MAP_SRC = "/3dmap/index.html";

export default function Backstand3dMapPage() {
  return (
    <>
      <Header />
      <div className="max-w-6xl mx-auto px-5 py-5">
        <h2 className="text-[#1A2753] text-2xl font-bold text-center mb-4">
          バックスタンド3Dマップ
        </h2>

        <iframe
          src={MAP_SRC}
          title="バックスタンド3Dマップ"
          className="block w-full h-[80vh] min-h-[600px] rounded-xl border border-gray-300 bg-white shadow-md"
        />

        <a
          href={MAP_SRC}
          target="_blank"
          rel="noopener noreferrer"
          className="block text-center text-[#1A2753] underline mt-3"
        >
          全画面で開く
        </a>

        <hr className="my-6" />
        <BackButton />
      </div>
    </>
  );
}

import Link from "next/link";

export default function BackButton() {
  return (
    <Link
      href="/"
      className="block bg-[#1A2753] text-white px-5 py-3 rounded-lg font-bold text-center no-underline hover:bg-[#2c3e8a] hover:-translate-y-0.5 transition-all"
    >
      ホームに戻る
    </Link>
  );
}

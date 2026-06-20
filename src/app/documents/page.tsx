import fs from "fs";
import path from "path";
import Image from "next/image";
import Header from "@/components/Header";
import BackButton from "@/components/BackButton";

const EXCLUDED_FILES = ["Entrance_backstand.webp", "Inside_backstand.webp"];
const SUPPORTED_EXTENSIONS = [".png", ".webp"];

export default function DocumentsPage() {
  const uploadsDir = path.join(process.cwd(), "public", "uploads");
  const files = fs.existsSync(uploadsDir)
    ? fs
        .readdirSync(uploadsDir)
        .filter(
          (f) =>
            SUPPORTED_EXTENSIONS.includes(path.extname(f).toLowerCase()) &&
            !EXCLUDED_FILES.includes(f)
        )
        .sort()
    : [];

  return (
    <>
      <Header />
      <div className="max-w-3xl mx-auto px-5 py-5">
        <h2 className="text-[#1A2753] text-2xl font-bold mb-4">
          スタジアム構造一覧
        </h2>
        {files.length > 0 ? (
          <div className="flex flex-col items-center gap-5">
            {files.map((file) => (
              <Image
                key={file}
                src={`/uploads/${file}`}
                alt={file}
                width={600}
                height={400}
                className="w-full max-w-[600px] h-auto border border-gray-200 rounded-lg"
              />
            ))}
          </div>
        ) : (
          <p>表示できる資料画像はありません。</p>
        )}
        <hr className="border-0 border-t-2 border-[#333] my-6" />
        <BackButton />
      </div>
    </>
  );
}

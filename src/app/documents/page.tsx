import fs from "fs";
import path from "path";
import Header from "@/components/Header";
import BackButton from "@/components/BackButton";
import ImageGallery from "@/components/ImageGallery";

const EXCLUDED_FILES = ["Entrance_backstand.webp", "Inside_backstand.webp", "socio_membercard.webp"];
const SUPPORTED_EXTENSIONS = [".webp"];

const FILE_LABELS: Record<string, string> = {
  "2022guidemap-1.webp": "座席案内（LEXUS ROOM・VIEW BOX等）",
  "2026-07Seat.webp": "座席カテゴリー図",
  "mercari-stadium1.webp": "座席番号・ブロック図",
  "z_26stadium260813-1.webp": "座席カテゴリー・番号詳細図",
};

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
        <h2 className="text-[#1A2753] text-2xl font-bold mb-4 text-center">
          スタジアムマップ
        </h2>
        {files.length > 0 ? (
          <ImageGallery files={files} labels={FILE_LABELS} />
        ) : (
          <p>表示できる資料画像はありません。</p>
        )}
        <hr className="border-0 border-t-2 border-[#333] my-6" />
        <BackButton />
      </div>
    </>
  );
}

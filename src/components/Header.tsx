import Image from "next/image";

interface HeaderProps {
  title?: string;
}

export default function Header({ title = "アルバイト情報サイト" }: HeaderProps) {
  return (
    <div className="bg-gradient-to-br from-[#A70028] to-[#8b0020] text-white py-4 text-center shadow-md">
      <Image
        src="/logo.png"
        alt="チームロゴ"
        width={200}
        height={50}
        className="max-h-[50px] w-auto mx-auto mb-1 object-contain"
        priority
      />
      <h1 className="m-0 text-[1.8em] font-bold">{title}</h1>
    </div>
  );
}

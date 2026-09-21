"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface HeaderProps {
  title?: string;
  secretLinkHref?: string;
}

const SECRET_TAP_COUNT = 3;
const SECRET_TAP_RESET_MS = 1500;

export default function Header({
  title = "アルバイト情報サイト",
  secretLinkHref,
}: HeaderProps) {
  const router = useRouter();
  const tapCountRef = useRef(0);
  const tapTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleLogoTap = () => {
    if (!secretLinkHref) return;

    tapCountRef.current += 1;
    if (tapTimerRef.current) clearTimeout(tapTimerRef.current);

    if (tapCountRef.current >= SECRET_TAP_COUNT) {
      tapCountRef.current = 0;
      router.push(secretLinkHref);
      return;
    }

    tapTimerRef.current = setTimeout(() => {
      tapCountRef.current = 0;
    }, SECRET_TAP_RESET_MS);
  };

  return (
    <div className="bg-gradient-to-br from-[#A70028] to-[#8b0020] text-white py-4 text-center shadow-md">
      <Image
        src="/logo.png"
        alt="チームロゴ"
        width={200}
        height={50}
        className="max-h-[50px] w-auto mx-auto mb-1 object-contain"
        priority
        onClick={handleLogoTap}
      />
      <h1 className="m-0 text-[1.8em] font-bold">{title}</h1>
    </div>
  );
}

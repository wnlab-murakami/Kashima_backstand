import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

const GA_ID = "G-R2MQS00TRJ";

export const metadata: Metadata = {
  title: "鹿島バックスタンド",
  description: "バックスタンドアルバイトマニュアル",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}');
        `}
      </Script>
      <body>{children}</body>
    </html>
  );
}

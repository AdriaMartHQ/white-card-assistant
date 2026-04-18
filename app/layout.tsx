import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "White Card Assistant · 白卡填写助手",
  description:
    "免费工具，帮助在塞尔维亚的外国人填写并打印白卡（外国人居住登记表 Obrazac 1）。本工具不替代官方登记。",
  robots: { index: true, follow: true },
};

// viewport-fit=cover is required for env(safe-area-inset-*) on iPhone
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body className="antialiased">{children}</body>
    </html>
  );
}

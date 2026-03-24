import type { Metadata } from "next";
import { Noto_Sans_SC } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import ParticleBackground from "./components/ParticleBackground";

const notoSansSC = Noto_Sans_SC({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "牛新元的博客",
  description: "个人技术博客，分享技术与生活",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="h-full antialiased">
      <body className={`${notoSansSC.variable} min-h-full flex flex-col font-sans relative`}>
        <ParticleBackground />
        <header className="sticky top-0 z-50 border-b border-[var(--card-border)] bg-[#0a0a0f]/80 backdrop-blur-md">
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)]"></div>
          <nav className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
            <Link href="/" className="text-xl font-bold bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)] bg-clip-text text-transparent">
              牛新元的博客
            </Link>
            <div className="flex gap-8">
              <Link href="/" className="hover:text-[var(--primary)] transition-colors">
                首页
              </Link>
              <Link href="/categories" className="hover:text-[var(--primary)] transition-colors">
                分类
              </Link>
              <Link href="/tags" className="hover:text-[var(--primary)] transition-colors">
                标签
              </Link>
            </div>
          </nav>
        </header>
        <main className="flex-1 max-w-4xl mx-auto px-4 py-8 w-full">
          {children}
        </main>
        <footer className="py-8 text-center text-sm text-gray-500">
          © 2026 牛新元的博客. 使用 Next.js 构建.
        </footer>
      </body>
    </html>
  );
}

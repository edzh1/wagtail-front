import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { getPageData } from '@/httpService'
import { headers } from 'next/headers';

const inter = Inter({ subsets: ["latin"] });

export async function generateMetadata(): Promise<Metadata> {
  const headersList = headers();
  const pathname = headersList.get("x-pathname") || "";

  const data = await getPageData({
    path: pathname,
    searchParams: {},
    headers: {},
  });

  const seo = data?.props?.componentProps?.seo

  return {
    title: seo?.seoHtmlTitle,
    description: seo?.seoMetaDescription,
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}

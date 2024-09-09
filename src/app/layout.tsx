import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import TanstackQueryProvider from "@/utils/TanstackQueryProvider";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Biblio",
  description: "The Community where Book Lovers come together",
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html data-theme="noir" lang="en">
      <body className={inter.className}>
        <TanstackQueryProvider>
          {children}
        </TanstackQueryProvider>
      </body>
    </html>
  );
}

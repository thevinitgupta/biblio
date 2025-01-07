import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import TanstackQueryProvider from "@/utils/TanstackQueryProvider";
import useGlobalStore from "@/utils/zustand";
import DaisyThemeProvider from "@/hooks/useDaisyTheme";
import Navbar from "@/components/Navbar";
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
    <html lang="en">
      <body className={`${inter.className}`}>
        <DaisyThemeProvider>
        <TanstackQueryProvider>

          <Navbar/>
          {children}

        </TanstackQueryProvider>
        </DaisyThemeProvider>
      </body>
    </html>
  );
}
